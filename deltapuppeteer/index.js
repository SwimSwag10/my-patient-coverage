const puppeteer = require('puppeteer')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.setRequestInterception(true)
    const requestHeaders = []
    let headerTitles = []
    let usefulRequestHeaders = {}
    page.on('request', (request) => {
        // const headers = request.headers()
        // const headerKeys = Object.keys(headers)
        // headerTitles = [
        //     ...headerTitles,
        //     ...headerKeys.filter(newKey => !headerTitles.find(oldKey => oldKey == newKey))
        // ]
        // const url = request.url()
        // requestHeaders.push({ url, ...headers })
        if (request.url() == "https://www.dentalofficetoolkit.com/api/dot-gateway/v1/announcements/search") {
            usefulRequestHeaders = {...request.headers()}
        }

        // Required
        request.continue()
    })

    await page.goto('https://www.dentalofficetoolkit.com/dot-ui/login')

    await page.waitForSelector('button[type="submit"]')
    await page.type('input[name="userId"]', 'username')
    await page.type('input[name="password"]', 'password')
    await page.click('button[type="submit"]')

    await page.waitForSelector("app-activity-log")
    await sleep(3000)

    // This endpoint is all payments.
    // This endpoint does NOT require any differing data from providers.
    const response = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claimpayment/search", {
        method: 'POST',
        headers: usefulRequestHeaders,
        body: JSON.stringify({
            "start_date":"2023-02-12T05:47:48.522Z",
            "end_date":"2023-02-23T05:47:48.522Z",
            "begin_index":0,
            "carrier_acronyms":["DDPA"],
            "payment_payee_type":"Provider",
            "payment_type":"EFT",
            "is_search":false,
            "order_by_fields":["issue_date"],
            "order":"desc",
        }),
    })

    // This endpoint is all pre-treatment estimates within a certain time period.
    // This endpoint requires the providerDetails endpoint to be called to get the licenseNumber, licenseState and taxNumber
    // const pretreatmentSearch = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claim/search", {
    //     method: 'POST',
    //     headers: usefulRequestHeaders,
    //     body: JSON.stringify({
    //         "startDate":"2023-02-16T20:55:59.742Z", // all pre-treatment estimates since 2022.
    //         "endDate":"2023-05-17T20:55:59.742Z",
    //         "beginIndex":0,
    //         "licenseNumber":"16745", 
    //         "licenseState":"OH",
    //         "taxNumber":"341923388",
    //         "searchType":"AL-PTE",
    //     }),
    // })

    // claim/search has a searchType in the payload that can have many options.
    const claimTest = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claim/search", {
        method: 'POST',
        headers: usefulRequestHeaders,
        body: JSON.stringify({
            "startDate":"2023-05-03T17:37:05.308Z",
            "endDate":"2023-08-01T17:37:05.308Z",
            "beginIndex":0,
            "licenseNumber":"16745",
            "licenseState":"OH",
            "taxNumber":"341923388",
            "searchType":"CS-DC",
        }),
    })

    const EFTDetails = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/EFTPaymentDetails?eftId=NjYyN0Y0ODI5RTRERjAxQzlBQjM4MTk2MkNCODVGNTBEQjFFNEIyNUFGQkE2RTBFOUY4OUNEN0Y0OQ%3D%3D", {
        method: 'GET',
        headers: usefulRequestHeaders,
    })

    const ClaimDetails = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claimdetail?claimId=NjAyREUxRUJFMTVERjMxQjlEQkY4MDkwMjhGOTFCOTI4ODRBMzVDQTcxM0MxMEI3MUUzOTAwNUFGMjQ2OEI%3D", {
        method: 'GET',
        headers: usefulRequestHeaders,
    })

    const userContext = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/usercontext?userId=JDFleagle", {
        method: 'GET',
        headers: usefulRequestHeaders,
    })

    if (EFTDetails.ok || userContext.ok) {
        console.log(await EFTDetails.json(), await userContext.json() )
    }

    await browser.close()
})()