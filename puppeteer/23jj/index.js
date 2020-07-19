
const puppeteer = require('puppeteer');

const entryUrl = 'https://www.23jj.com/'

const getPage = async(url) =>{
    const totalPageObj = {};
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const total = await page.evaluate(e=>{
        const $ = document.querySelector
        const $$ = document.querySelectorAll
        const total = document.querySelector('.pic>.page>a:nth-of-last-type(2)').innerText;
        return total;
    })

    for(let i = 0; i <total;i++){
        await page.goto(`${url}/page/${i}`);
        const pageList = await page.evaluate(e=>{
            const $ = document.querySelector
            const $$ = document.querySelectorAll
            const sectionList = Array.from(document.querySelectorAll('.main>.pic ul li'))
            return sectionList.map(item =>{
                const link = item.querySelector('a').getAttribute('href')
                const title = item.querySelector('.title a').innerText
                return {
                    link, title
                }
            })
        })
        totalPageObj[i] = pageList;
    }
    console.log(totalPageObj);
}

getPage(entryUrl);