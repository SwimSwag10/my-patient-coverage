import { openPage } from "../utils/puppeteer.js"

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function getDeltaAuth(credentials) {
    try {
        const page = await openPage('https://www.dentalofficetoolkit.com/dot-ui/login')
    
        const requestHeaders = []
        let headerTitles = []
        let usefulRequestHeaders = {}
        await page.setRequestInterception(true)
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
        await page.waitForSelector('button[type="submit"]')
        await page.type('input[name="userId"]', credentials.username)
        await page.type('input[name="password"]', credentials.password)
        await page.click('button[type="submit"]')
    
        await page.waitForSelector("app-activity-log")
        await sleep(3000)
        await page.closeBrowser()

        return usefulRequestHeaders
    } catch (err) {
        console.error(err)
    }
}

async function getPayments(authHeaders) {
    const response = await fetch("https://www.dentalofficetoolkit.com/api/dot-gateway/v1/claimpayment/search", {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({"start_date":"2023-02-12T05:47:48.522Z","end_date":"2023-05-13T05:47:48.522Z","carrier_acronyms":["DDPA"],"begin_index":0,"is_search":false,"order":"desc","order_by_fields":["issue_date"],"payment_type":"EFT","payment_payee_type":"Provider"}),
    })

    if (response.ok) {
        return await response.json()
    }
}

export function registerEndpoints(app) {
    app.post('/deltadental/login', (req, res) => {
        getDeltaAuth(req.body.credentials).then((authHeaders) => {
            res.json({authHeaders})
        })
    })

    app.post('/deltadental/payments', (req, res) => {
        getPayments(req.body.authHeaders).then((response) => {
            res.json({payments: response.payments})
        })
    })
}