const puppeteer = require('puppeteer');

const {getArticleHtml} = require("./index")

const url = "https://segmentfault.com/channel/frontend"
const prefix = "https://segmentfault.com/a/"

async function entery(url){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    
    try {
        console.log("start")
        await page.goto(url,{waitUntil:['load']});
        console.log("end")
        // const ids = await page.$$eval('.news-item',item=>item)
        const ids = await page.evaluate((e)=>{
            const items = document.querySelectorAll('.news-item');
            const ids = [].slice.apply(items).map((item)=>{
                return item.getAttribute('data-id')
            })
            return ids;
        })
        
        console.log(ids)

        for(let index=0;index<ids.length;index++){
            console.log(`开始第${index+1}篇`)
            let articleUrl =  `${prefix}${ids[index]}`
            getArticleHtml(articleUrl);
        }
    } catch (error) {
        console.log(111,error)
    }
    //await browser.close(); 
    
} 

entery(url);