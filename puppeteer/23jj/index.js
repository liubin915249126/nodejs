
const puppeteer = require('puppeteer');
const {getPageNumObj,getImgUrl,saveImg} = require('./utils.js')


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
                    link,
                    title
                }
            })
        })
        totalPageObj[i] = pageList;
    }
    console.log(totalPageObj);
    Object.keys(totalPageObj).forEach(async({link, title},index) => {
        await page.goto(`${entryUrl}/${link}`)
        await page.tab('#page>a:nth-of-last-type(1)');
        const imgUrl = getImgUrl(page);
        saveImg(imgUrl.link, imgUrl.title,1)
        const pageNumObj = getPageNumObj(page);
        const imgUrlByIndex = getImgUrl(page);
        saveImg(imgUrl.link, imgUrl.title,pageNumObj.current)
        if(pageNumObj.current>pageNumObj.total){
            return;
        }
    })
}

getPage(entryUrl);