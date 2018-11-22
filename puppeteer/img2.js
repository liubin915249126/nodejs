const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const baseUrl = 'http://www.meizitu.com/';
const indexUrl = "http://www.meizitu.com/a/more_2.html";
const singleUrl = 'http://www.meizitu.com/a/5580.html';

async function getTotal() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(singleUrl);
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
    console.log(imgUrls)
    imgUrls.forEach((urlObj,cindex)=>{
       let url = urlObj.imgUrl;
       let alt = urlObj.imgAlt;
       let typeArr = url.split('.');
       let type = typeArr[typeArr.length-1];
       loadImg(url,cindex,alt,type)
    })
    await browser.close();
}


function loadImg(url,index,name,type) {
    axios.get(url,{responseType: 'stream'})
        .then((res)=>{
            let innerPath =  singleUrl.replace(/[^0-9]/ig,"");
            let path = __dirname+'/dist/'+innerPath;
            console.log('正在下载第'+index+'张图片','类型为'+type,'名称为'+name)
            if(!fs.exists(path)){
                fs.mkdir(path,()=>{
                    res.data.pipe(fs.createWriteStream(path+'/'+index+'.'+type));
                });
            }
            
        })
}


getTotal();