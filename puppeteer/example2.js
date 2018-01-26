const puppeteer = require('puppeteer');
const fs = require('fs');
const baseUrl = 'https://www.qiushibaike.com/hot/';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(baseUrl);
    await page.screenshot({
        path: __dirname + '/dist/example2.png'
    });
    //获取
    const contents = await page.evaluate(e => {
        let contents = Array.from($('.content'));
        let textArr = contents.map((item) => {
            return $(item).find('span').text();
        })
        return textArr
    });
    // 写入文件
    contents.forEach((item,index)=>{
        writeFile(index+'.'+item+'\r\n')
    })
    console.log(contents);
    await browser.close();
})();

function writeFile(file){
    let writerStream = fs.createWriteStream(__dirname+'/dist/test.txt');
    writerStream.write(file, 'UTF8');
    writerStream.end();
}