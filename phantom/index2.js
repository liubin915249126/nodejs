const phantom = require('phantom');
const cheerio = require('cheerio');


const listUrl =(keyWord)=> `https://s.taobao.com/search?q=${keyWord}&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180430&ie=utf8`

async function getPage(url) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(url);
  console.log(status)
  page.evaluate(function() {
    return document.body.innerHTML;
  }).then(function(html){
      console.log(html)
    let $ = cheerio.load(html);
    let dataList = [];
    $('.items .item').each((index,item)=>{
        dataList.push ({
            title:$(item).find('.title').text(),
            price:$(item).find('.price').text(),
            // picUrl:$(item).find('.p-img img').attr('data-lazy-img'),
            // commit:$(item).find('.p-commit a').text(),
            // shop:$(item).find('.p-shop a').text(),
        })
     })
     console.log(dataList)
  });
    
  const content = await page.property('content');
//   console.log(content);

  await instance.exit();
};

getPage(listUrl('node'))