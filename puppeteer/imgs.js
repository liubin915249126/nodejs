const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const baseUrl = 'http://www.meizitu.com/';
const indexUrl = "http://www.meizitu.com/a/more_2.html";

async function getTotal() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl);
    const total =await page.evaluate(e=>{
        let $lis = Array.from($('#wp_page_numbers').find('ul').find('li'));
        let total = $($lis[$lis.length-3]).find('a').text();
        return total;
    });
    console.log(total);
    //循环每一页
    for(let i=2;i<3;i++){
        let currentUrl = "http://www.meizitu.com/a/more_"+i+".html";
        await page.goto(currentUrl);
        const urls = await page.evaluate(e=>{
            let wraps = Array.from($('#maincontent').find('.wp-item'));
            let urls = wraps.map((item)=>{
               let alt =  $(item).find('img').attr('alt');
               let url = $(item).find('a').attr('href');
               return {
                   alt,url
               }
            });
            return urls;
        })
        urls.forEach(async (item,index)=>{
            await page.goto(item.url);
            const imgUrls = await page.evaluate(e=>{
                let imgs = Array.from($('#picture').find("img"))
                return imgUrls = imgs.map((item)=>{
                    let imgUrl = $(item).attr('src');
                    let imgAlt = $(item).attr('alt');
                    return {
                        imgUrl,imgAlt
                    }
                })
            });
            imgUrls.forEach((urlObj,cindex)=>{
               let url = urlObj.imgUrl;
               let alt = urlObj.imgAlt;
               let typeArr = url.split('.');
               let type = typeArr[typeArr.length-1];
               loadImg(url,cindex,alt,type,index,i)
            })
        })
    };

    await browser.close();
}


function loadImg(url,index,name,type,pindex,page) {
    axios.get(picUrl,{responseType: 'stream'})
        .then((res)=>{
            let innerPath = '第'+page+'页' + '第'+pindex+'目';
            if(!fs.exists(innerPath)){
                fs.mkdir(innerPath);
            }
            res.data.pipe(fs.createWriteStream(__dirname+'/dist/'+innerPath+'name'+'.'+type));
        })
}


getTotal();