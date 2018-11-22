const puppeteer = require('puppeteer');
const listUrl = (keyWord)=> `https://search.jd.com/Search?keyword=${keyWord}&enc=utf-8&wq=node&pvid=5222f87704b946b695476d76901c9f2a`


async function getPage(url){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url)
    const result =await page.evaluate(e=>{
       const items = Array.from(document.querySelectorAll('.gl-warp .gl-item'));
       return dataList = items.map((item)=>{
          const title =  item.getElementsByClassName('p-name')[0].innerHTML
          const price = item.getElementsByClassName('p-price')[0].innerHTML
          const picUrl = item.querySelector('.p-img img').getAttribute('src')
          return {
              title,price,picUrl
          }
       })
    });
    console.log(result)
    await browser.close();
}

getPage(listUrl('node'))