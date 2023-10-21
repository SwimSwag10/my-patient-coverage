import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class MPCDynamoStack extends cdk.Stack {
  public readonly MPCTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    /*
    *
    * TODO: We need to change the "pk" to the email.
    * 
    */

    // 👇 This creates the MyPatientCoverage table
    this.MPCTable = new dynamodb.Table(this, 'MyPatientCoverage', {
      partitionKey: { name: 'pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'sk', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // 👇 This creates the first GSI inside of the mypatient
    this.MPCTable.addGlobalSecondaryIndex({
      indexName: 'GSI1',
      partitionKey: { name: 'gsi1-pk', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'gsi1-sk', type: dynamodb.AttributeType.STRING },
      nonKeyAttributes: ['email', 'username'],
      projectionType: dynamodb.ProjectionType.INCLUDE,
    });

    // 👇 This is basically a console log after deployment? I think it's used to connect this stack with the other stack.
    new cdk.CfnOutput(this, 'MPCDynamoTable', {
      value: this.MPCTable.tableName,
      exportName: 'MPCDynamoTableName',
    });
  }
}