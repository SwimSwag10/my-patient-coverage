const AWS = require('aws-sdk')
const kms = new AWS.KMS()

async function main(event) {
  const params = {
    KeyId: process.env.KMS_KEY_ID,
  }
  
  try {
    // ❔ What would this "publicKey" look like if we log it?
    const publicKey = await kms.getPublicKey(params).promise();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({publicKey: publicKey.PublicKey.toString('base64')}),
      isBase64Encoded: true,
    }
  } catch (error) {
    console.error(error);
    return { 
      statusCode: 500,
      body: JSON.stringify({ error: 'Could not retrieve public key' }),
    }
  }
}

module.exports = {main}