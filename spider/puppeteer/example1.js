const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://www.baidu.com');
    await page.screenshot({
        path: 'img/example.png'
    });
    await page.pdf({
        path: 'img/example.pdf',
        format: 'A4'
    });
    await browser.close();
})()