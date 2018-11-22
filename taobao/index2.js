'use strict'

const cheerio = require('cheerio');
const superagent = require('superagent');

const listUrl =(keyWord)=> `https://s.taobao.com/search?q=${keyWord}&imgfile=&js=1&stats_click=search_radio_all%3A1&initiative_id=staobaoz_20180430&ie=utf8`

function initial(url) {
    superagent.get(url)
        .end((err, res) => {
            if (err) {
                return console.log(1111,err);
            } else {
                let $ = cheerio.load(res.text);
                console.log(res.text)
                let dataList = [];
                $('.items .item').each((item,index)=>{
                    console.log(index,item)
                    dataList.push ({
                        title:$(item).find('.title').text(),
                        price:$(item).find('.price').text(),
                    })
                })
                console.log(dataList)
            }
        })
}
initial(listUrl('node'));