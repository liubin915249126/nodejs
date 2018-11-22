const phantom = require('phantom');
const cheerio = require('cheerio');


const listUrl = (keyWord)=> `https://search.jd.com/Search?keyword=${keyWord}&enc=utf-8&wq=node&pvid=5222f87704b946b695476d76901c9f2a`

async function getPage(url) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    // console.info('Requesting', requestData.url);
  });

  const status = await page.open(url);
  console.log(status)
  page.evaluate(function() {
    return document.body.innerHTML;
  }).then(function(html){
    let $ = cheerio.load(html);
    let dataList = [];
    $('.gl-warp .gl-item').each((index,item)=>{
        dataList.push ({
            title:$(item).find('.p-name a').text(),
            price:$(item).find('.p-price').text(),
            picUrl:$(item).find('.p-img img').attr('data-lazy-img'),
            commit:$(item).find('.p-commit a').text(),
            shop:$(item).find('.p-shop a').text(),
        })
     })
     console.log(dataList)
  });
    
  const content = await page.property('content');
//   console.log(content);

  await instance.exit();
};

getPage(listUrl('node'))