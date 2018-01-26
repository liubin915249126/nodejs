const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const baseUrl = 'http://www.meizitu.com/';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl);
    //获取图片url,title;
    const pics = await page.evaluate(e => {
        let articles = Array.from($('.postContent'));
        let picArr = articles.map((item) => {
            let img = $(item).find('img');
            let targetUrl = $(item).find('a');
            let src = img.attr('src');
            let alt = targetUrl.attr('title');
            return {
                src,
                alt
            }
        })
        return picArr;
    });
    //加载每一张图片的资源
    pics.forEach(async (item, index) => {
        let picUrl = item.src;
        let typeArr = picUrl.split('.');
        let type = typeArr[typeArr.length-1];
        axios.get(picUrl,{responseType: 'stream'})
        .then((res)=>{
            console.log('正在下载第'+index+'张图片',"格式为"+type)
            res.data.pipe(fs.createWriteStream(__dirname+'/dist/num'+index+'.'+type));
        })
    })
    // 写入文件
    //console.log(pics);
    await browser.close();
})();