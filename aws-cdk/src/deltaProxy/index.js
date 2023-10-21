async function main(event) {
  const { httpMethod, body } = event;

  try {
    const response = await fetch(`https://www.dentalofficetoolkit.com/api/dot-gateway/oidc/login`, {
      method: 'GET'
    });

    return {
      statusCode: response.status,
      headers: {
        // ❔ the reason we nned this os because we want the backend to only accept requests from the frontend domains ORIGIN.
        'Access-Control-Allow-Origin': '*', // Change this to frontend domain
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE',
      },
      body: JSON.stringify({
        endpoint: "/deltadental/login",
        data: response.data
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

module.exports = {main}