
const puppeteer = require('puppeteer');
const {getPageNumObj,getImgUrl,saveImg} = require('./utils.js')


const entryUrl = 'https://www.23jj.com'

const getPage = async(url) =>{
    const totalPageObj = {};
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    
    const total = await page.evaluate(e=>{
        const $ = document.querySelector
        const $$ = document.querySelectorAll
        const doms = [...document.querySelectorAll('.pic>.page>a')]
        const total = doms[doms.length-2].innerText;
        return total;
    })
    new Promise((resolve) => {
        for(let i = 1; i <=total;i++){
            setTimeout(async() =>{
              const page = await browser.newPage();
              await loadPage(page,i)
              await page.close()
            },i*2500)
        }
    })
    async function loadPage(page,i){
        await page.goto(`${url}/page/${i}`);
        const pageList = await page.evaluate(e=>{
            const $ = document.querySelector
            const $$ = document.querySelectorAll
            const sectionList = Array.from(document.querySelectorAll('.main .pic ul>li'))
            return sectionList.map(item =>{
                const link = item.querySelector('a').getAttribute('href')
                const title = item.querySelector('.title a').innerText
                return {
                    link,
                    title
                }
            })
        })
        if(Array.isArray(pageList)){
            for(let j=0;j<pageList.length;j++){
              const {title,link} = pageList[j]
              const currentPage = page;
              await currentPage.goto(`${entryUrl}${link}`)
              const imgUrl = await getImgUrl(currentPage);
              console.log('imgUrl',imgUrl)
  
              saveImg(imgUrl.link, imgUrl.title,1)
              await currentPage.tap('#page>a:nth-last-of-type(1)')
  
  
              const pageNumObj = getPageNumObj(currentPage);
              console.log('pageNumObj',pageNumObj)
              const imgUrlByIndex = await getImgUrl(currentPage);
  
              console.log('imgUrlByIndex',imgUrlByIndex)
              saveImg(imgUrlByIndex.link, imgUrlByIndex.title,j)
              if(pageNumObj.current>pageNumObj.total){
                  return;
              }
            }
        }
    }
}

getPage(entryUrl);