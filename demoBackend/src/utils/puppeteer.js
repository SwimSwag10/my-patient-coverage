import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

export async function openPage(url) {
    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath(),
        headless: true,
        // ignoreHTTPSErrors: true,
        // defaultViewport: chromium.defaultViewport,
        // args: [...chromium.args, "--hide-scrollbars"],
    })
    const page = await browser.newPage()
    page.closeBrowser = async () => {
        return await browser.close()
    }
    await page.goto(url)
    return page
}
