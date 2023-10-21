/*
*
* DESC: The User credential KMS key can only be decrypted by this deltaLogin lambda function.
*
*/

const puppeteer = require("puppeteer-core");
// const puppeteer = require('zyte-smartproxy-puppeteer');
const chromium = require("@sparticuz/chromium");
const AWS = require("aws-sdk");

const kms = new AWS.KMS();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main(event) {
  try {
    let { credentials } = JSON.parse(event.body);
    const ciphertextBlob = Buffer.from(credentials, "base64");
    const params = {
      CiphertextBlob: ciphertextBlob,
      EncryptionAlgorithm: "RSAES_OAEP_SHA_256",
      KeyId: process.env.KMS_KEY_ID,
    };
    let decryptedCredentials = await kms.decrypt(params).promise();
    decryptedCredentials = JSON.parse(
      decryptedCredentials.Plaintext.toString()
    );

    const browser = await puppeteer.launch({
      // spm_apikey: '95da4ae4cf964e799ae10f2984afe668',
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
      defaultViewport: chromium.defaultViewport,
      args: [...chromium.args, "--hide-scrollbars"],
    });
    console.log("Opened Browser");
    const page = await browser.newPage();
    console.log("Opened Page");

    await page.setRequestInterception(true);
    let usefulRequestHeaders = {};
    page.on("request", (request) => {
      // const headers = request.headers()
      // const headerKeys = Object.keys(headers)
      // headerTitles = [
      //     ...headerTitles,
      //     ...headerKeys.filter(newKey => !headerTitles.find(oldKey => oldKey == newKey))
      // ]
      // const url = request.url()
      // requestHeaders.push({ url, ...headers })
      let url = request.url();
      console.log("request url", url);
      if (
        url ==
        "https://www.dentalofficetoolkit.com/api/dot-gateway/v1/announcements/search"
      ) {
        usefulRequestHeaders = { ...request.headers() };
        console.log("hello!");
      }
      request.continue();
    });

    await page.goto("https://www.dentalofficetoolkit.com/dot-ui/login");
    console.log("Went to Page");

    await page.waitForSelector('button[type="submit"]');
    /*
    *
    * TODO: we need to add the ability to call the credentials from the user db and put them inside of the username and password.
    * It is importan to note that we are going to have to have a session middleware instead of just calling the db directly. We
    * want to avoid calling the db with another user's credentials.
    * 
    */
    await page.type('input[name="userId"]', "username");
    await page.type('input[name="password"]', "password");
    console.log("Typed Credentials");
    await page.click('button[type="submit"]');

    await page.waitForSelector("app-activity-log");
    console.log("got into dashboard");

    // ❔ What is the purpose of this loop?
    for (let i = 0; i < 10; i++) {
      if (usefulRequestHeaders.headerName) {
        await browser.close();
        // ❔ Why is this kms encyrpt function here? It was commented out a while ago.
        // kms.encrypt();
        return {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: "check log" }),
          isBase64Encoded: true,
        };
      }
      // TODO: instead of a hard amount of time, do random sleep time so identification of bot activity is reduced. 
      // Minimum of 3 seconds, max of 10 seconds. Check for timeouts.
      await sleep(300);
    }

    // const response = await fetch(
    //   "https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claimpayment/search",
    //   {
    //     method: "POST",
    //     headers: usefulRequestHeaders,
    //     body: JSON.stringify({
    //       start_date: "2023-02-12T05:47:48.522Z",
    //       end_date: "2023-05-13T05:47:48.522Z",
    //       carrier_acronyms: ["DDPA"],
    //       begin_index: 0,
    //       is_search: false,
    //       order: "desc",
    //       order_by_fields: ["issue_date"],
    //       payment_type: "EFT",
    //       payment_payee_type: "Provider",
    //     }),
    //   }
    // );

    // if (response.ok) {
    //   console.log(await response.json());
    // }

    await browser.close();
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Critical failure" }),
    };
  }
}

module.exports = { main };
