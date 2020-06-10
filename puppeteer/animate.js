const puppeteer = require('puppeteer');
const fs = require('fs');

const url = 'https://animate.style/';

async function getJson(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const animationList = await page.evaluate(e=>{
        const $ = document.querySelector
        const $$ = document.querySelectorAll
        const sectionList = Array.from(document.querySelectorAll('.animation-list>section'))
        return sectionList.map((section)=>{
            const animationTitle = section.getElementsByClassName('animation-title')[0].innerHTML
            const animationItems = section.getElementsByClassName('animation-item')
            return {
                title:animationTitle,
                children:[...animationItems].map(item =>item.getAttribute('data-animation'))
            }
        })
    })
    fs.writeFile('./animate.json',JSON.stringify(animationList),'utf8',function(err){
        //如果err=null，表示文件使用成功，否则，表示希尔文件失败
        if(err)
            console.log('写文件出错了，错误是：'+err);
        else
            console.log('ok');
    }) 
    await browser.close();
}

getJson(url)
