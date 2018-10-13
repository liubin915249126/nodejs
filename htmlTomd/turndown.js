const puppeteer = require('puppeteer');
const {writeFile} = require('./write');

const TurndownService = require('turndown')

// const articleUrl = "https://segmentfault.com/a/1190000016344599"
// const articleUrl = "https://segmentfault.com/a/1190000016390560"
// const articleUrl = "https://segmentfault.com/a/1190000016261602"
const articleUrl = "https://segmentfault.com/a/1190000016504891"

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

module.exports = {
    getArticleHtml,
}

function transfer(articleInfo){
    const turndownService = new TurndownService()
    const markdown = turndownService.turndown(articleInfo.articleHtml)
    // console.log(markdown)
    writeFile(articleInfo.articleTitle,markdown)
}

getArticleHtml(articleUrl)