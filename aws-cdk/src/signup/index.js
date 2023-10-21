const AWS = require("aws-sdk")
const crypto = require("crypto")

const dynamodb = new AWS.DynamoDB.DocumentClient()

async function main(event) {
  const body = event.body
  // ❔ Do we want the user to have a username, or just email and password?
  if (!body.password || !body.email) {
    console.log(body)
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
  * TODO: add the email to an item with the "pk." We don't need to add any other GSI.
  * 
  */

  const params = {
    TransactItems: [
      {
        // 👇 this is "GET user Where userId"
        Put: {
          // ❔ are each of the these "Items" rows in the table?
          TableName: process.env.tableName,
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
          TableName: process.env.tableName,
          // 👇 this is "GET user Where username"
          Item: {
            pk: `USERNAME`,
            sk: body.username,
            // this makes it so that everytime the gsi is updated 
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
          TableName: process.env.tableName,
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

  try {
    // ❔ Why are we using transactWrite vs put?
    const data = await dynamodb.transactWrite(params).promise()
    return { status: true, message: 'Data inserted successfully', data: data }
  } catch (error) {
    console.log('Error', error)
    return { status: false, message: 'Data insertion failed', error: error }
  }
}

module.exports = {main}