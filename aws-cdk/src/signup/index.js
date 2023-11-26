const AWS = require("aws-sdk")
const crypto = require("crypto")
const dynamodb = new AWS.DynamoDB.DocumentClient()

const TABLE_NAME = process.env.TABLE_NAME || '';

async function main(event) {
  const body = JSON.parse(event.body);
  
  if (!body.password || !body.email) {
    console.log("Body:", body)
    const error = new Error('Some Credentials Missing')
    console.log('Error', error)
    return { status: false, message: 'Some Credentials Missing', error: error }
  }
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.scryptSync(body.password, salt, 64).toString('hex')
  const userId = crypto.randomUUID()

  const currentTime = new Date()

  /*
  *
  * TODO: Change the transactwrite items to something more readable that can fit into one non-transaction put req.
  * 
  */

  const params = {
    TransactItems: [
      {
        // 👇 this is "GET user Where userId"
        Put: {
          // ❔ are each of the these "Items" rows in the table?
          TableName: TABLE_NAME,
          Item: {
            pk: `USER#${userId}`,
            sk: "ACCOUNT",
            password: hash,
            salt: salt,
            verified: false,
            createdAt: currentTime,
            updatedAt: currentTime
          }
        }
      },
      {
        Put: {
          TableName: TABLE_NAME,
          Item: {
            pk: `USERNAME`,
            sk: body.username,
            "gsi1-pk": `USER#${userId}`,
            "gsi1-sk": "USERNAME",
            createdAt: currentTime,
            updatedAt: currentTime
          }
        }
      },
      {
        Put: {
          // 👇 this is "GET user Where email"
          TableName: TABLE_NAME,
          Item: {
            pk: `EMAIL`,
            sk: body.email,
            "gsi1-pk": `USER#${userId}`,
            "gsi1-sk": "EMAIL",
            createdAt: currentTime,
            updatedAt: currentTime
          }
        }
      }
    ]
  }

  const serializedTransactionRequest = JSON.stringify(params);
  const dataSizeInBytes = Buffer.byteLength(serializedTransactionRequest, 'utf8');
  console.log(`Size of transactWrite request data: ${dataSizeInBytes} bytes`);

  console.log("After the params were created! Params:", params)

  try {
    // ❔ Why are we using transactWrite vs put?
    const data = await dynamodb.transactWrite(params).promise()
    console.log("Transactwrite data:", data)
    return { status: true, message: 'Data inserted successfully', data: data }
  } catch (error) {
    console.log('Error', error)
    return { status: false, message: 'Data insertion failed', error: error }
  }
}

module.exports = {main}