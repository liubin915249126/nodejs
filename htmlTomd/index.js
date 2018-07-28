const puppeteer = require('puppeteer');
const {writeFile} = require('./write');


const articleUrl = "https://segmentfault.com/a/1190000015779297"

const transferUrl =  "https://tool.lu/markdown/"




async function getArticleHtml (url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    const articleId =  url.slice('/')[url.slice.length-1];
    const articleInfo =await page.evaluate(e=>{
        const articleTitle = document.querySelector('#articleTitle>a').innerText;
        const articleHtml = document.querySelector('.article').outerHTML;
        return {
            articleTitle,
            articleHtml,
        }
    })
    await browser.close();
    transfer(articleInfo)
    return articleInfo;
}

async function transfer(articleInfo){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(transferUrl);
    
    //填充并模拟点击
    let md;
    try {
        await page.type("#main_form textarea",' ');
        await page.type("#main_form textarea",articleInfo.articleHtml);
        await page.click("#main_form [type='submit']").then(async(e)=>{
            console.log(333,e)
            md = await page.evaluate(e=>{
                const input = document.querySelector('#main_form textarea');
                // const input = form.querySelector('textarea');
                const md1 = input.value;
                console.log(111,md1);
                return {md1};
             })
        })
 
        await page.on('response',async(res)=>{
            console.log(222,res.url());
         })
    } catch (error) {
        console.log(error)
    }
    
    writeFile(articleInfo.articleTitle,md.md1)
    await browser.close();
}

module.exports = {
    getArticleHtml,
}

getArticleHtml(articleUrl)