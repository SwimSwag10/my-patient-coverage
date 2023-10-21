import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfrontOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as kms from "aws-cdk-lib/aws-kms";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

/*
*
* DESC: each one of these const values are constructs in the "MyPatientCoverage" stack.
*
*/

export class MyPatientCoverage extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 👇 This is for creating the dynamodb table
    const MPCDynamoTableName = cdk.Fn.importValue("MPCDynamoTableName");
    const MPCDynamoTable = dynamodb.Table.fromTableName(
      this,
      "ImportedTable",
      MPCDynamoTableName
    );
    
    // 👇 A S3 bucket is basically a normal database.
    const websiteBucket = new s3.Bucket(this, "static-my-patient-coverage", {
      accessControl: s3.BucketAccessControl.PRIVATE,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 👇 We are storing the static website in the S3 Bucket we just created.
    // We will later use this static storage for hosting on cloudfront.
    const staticDeployment = new s3Deployment.BucketDeployment(
      this,
      "deployStaticWebsite",
      {
        sources: [s3Deployment.Source.asset("../app/build")],
        destinationBucket: websiteBucket,
      }
    );

    // 👇 This is us adding the S3 bucket with the static frotend to cloudfront.
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "OriginAccessIdentity"
    );
    websiteBucket.grantRead(originAccessIdentity);

    const myPatientCoverageAPI = new apigateway.RestApi(
      this,
      "myPatientCoverageAPI",
    );
    const MPCAPIRoot = myPatientCoverageAPI.root.addResource("api");

    const userCredKey = new kms.Key(this, "MPCUserCredKey", {
      description: "KMS key used to encrypt client credentials",
      keySpec: kms.KeySpec.RSA_2048,
    });

    const pubKeyLambda = new lambda.Function(this, "getPublicKey", {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      handler: "index.main",
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/getPublicKey")),
      environment: {
        KMS_KEY_ID: userCredKey.keyId,
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones
        ),
      }, 
    });
    const pubKeyLamInt = new apigateway.LambdaIntegration(pubKeyLambda);
    MPCAPIRoot.addResource("public-key").addMethod("GET", pubKeyLamInt);
    userCredKey.grant(pubKeyLambda, "kms:DescribeKey");
    pubKeyLambda.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["kms:GetPublicKey"],
        resources: [userCredKey.keyArn],
      })
    );

    const deltaRoute = MPCAPIRoot.addResource("deltadental");

    const puppeteerLayer = new lambda.LayerVersion(this, "puppeteerLayer", {
      compatibleRuntimes: [lambda.Runtime.NODEJS_16_X],
      code: lambda.Code.fromAsset(
        path.join(__dirname, "/../src/puppeteerLayer")
      ),
    });

    const deltaLogin = new lambda.Function(this, "delta-login", {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(30),
      handler: "index.main",
      layers: [puppeteerLayer],
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/deltaLogin")),
      environment: {
        TABLE_NAME: MPCDynamoTable.tableName,
        KMS_KEY_ID: userCredKey.keyId,
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones
        ),
      },
    });
    userCredKey.grant(deltaLogin, "kms:Decrypt");

    // ❔ what is the deltaProxy for?
    const deltaProxy = new lambda.Function(this, "delta-proxy", {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(3),
      handler: "index.main",
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/deltaProxy")),
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones
        ),
      },
    });

    const deltaLoginLamInt = new apigateway.LambdaIntegration(deltaLogin);
    deltaRoute.addResource("login").addMethod("POST", deltaLoginLamInt);

    const MPCLayer = new lambda.LayerVersion(this, "MPCLayer", {
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/MPCLayer")),
    });

    const tableRole = new iam.Role(this, "MPCLambdaDynamoRole", {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });

    MPCDynamoTable.grantReadWriteData(tableRole);
    tableRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        "service-role/AWSLambdaBasicExecutionRole"
      )
    );

    const signUpLambda = new lambda.Function(this, "signup", {
      runtime: lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(10),
      handler: "index.main",
      code: lambda.Code.fromAsset(path.join(__dirname, "/../src/signup")),
      layers: [MPCLayer],
      environment: {
        REGION: cdk.Stack.of(this).region,
        AVAILABILITY_ZONES: JSON.stringify(
          cdk.Stack.of(this).availabilityZones
        ),
      },
      role: tableRole,
    });

    const signupLamInt = new apigateway.LambdaIntegration(signUpLambda);
    MPCAPIRoot.addResource("signup").addMethod("POST", signupLamInt);

    const MPCDistribution = new cloudfront.Distribution(
      this,
      "MPCDistribution",
      {
        defaultRootObject: "index.html",
        defaultBehavior: {
          origin: new cloudfrontOrigins.S3Origin(websiteBucket, {
            originAccessIdentity,
          }),
          cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        },
        additionalBehaviors: {
          "/api/*": {
            origin: new cloudfrontOrigins.RestApiOrigin(myPatientCoverageAPI),
            allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
            cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
          },
        },
      }
    );

    MPCDistribution.node.addDependency(myPatientCoverageAPI);
  }
}
