const puppeteer = require('puppeteer');

const listUrl =(keyWord)=> `https://s.taobao.com/search?q=${keyWord}&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180430&ie=utf8`
const loginUrl = (keyWord)=> `https://login.taobao.com/member/login.jhtml?redirectURL=http://s.taobao.com/search?q=${keyWord}&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180430&ie=utf8`

// (async () => {
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
  
//   const navigationPromise = page.waitForNavigation()
  
//   await navigationPromise
  
//   await navigationPromise
  
//   await page.waitForSelector('#page > #content > .content-layout > .login-box-warp > #J_LoginBox')
//   await page.click('#page > #content > .content-layout > .login-box-warp > #J_LoginBox')
  
//   await page.waitForSelector('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
//   await page.click('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
  
//   await page.waitForSelector('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
//   await page.click('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
  
//   await page.waitForSelector('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
//   await page.click('#J_StaticForm > #J_Form > .field > #J_StandardPwd > #TPL_password_1')
  
//   await page.waitForSelector('.bd > #J_StaticForm > #J_Form > .submit > #J_SubmitStatic')
//   await page.click('.bd > #J_StaticForm > #J_Form > .submit > #J_SubmitStatic')
  
//   await navigationPromise
  
//   await navigationPromise
  
//   await browser.close()
// })()



async function getPage(url){
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(url)

    await page.click('#J_Quick2Static')
    await page.waitFor(1000);
    await page.type('#TPL_username_1', '18205556911');
    await page.waitFor(1000);
    await page.type('#TPL_password_1', 'Len.liu/56911');
    await page.waitFor(1000);
    await page.click('#J_SubmitStatic');
    
    const navigationPromise = page.waitForNavigation()
    await navigationPromise

    const result =await page.evaluate(e=>{
       const items = Array.from(document.querySelectorAll('.items .item'));
       return dataList = items.map((item)=>{
          const title =  item.getElementsByClassName('title')[0].innerHTML
          const price = item.getElementsByClassName('price')[0].innerHTML
          return {
              title,price
          }
       })
    });
    console.log(result)
    // await browser.close();
}

getPage(loginUrl('python'))