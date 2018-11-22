'use strict'

const cheerio = require('cheerio');
const superagent = require('superagent');

const listUrl = (keyWord)=> `https://search.jd.com/Search?keyword=${keyWord}&enc=utf-8&wq=node&pvid=5222f87704b946b695476d76901c9f2a`


function initial(url) {
    let dataList = [];
    superagent.get(url)
        .end((err, res) => {
            if (err) {
                return console.log(1111,err);
            } else {
                // console.log(2222,res.text);
                let $ = cheerio.load(res.text);
                console.log(res.text)
                $('.gl-warp .gl-item').each((index,item)=>{
                    dataList.push ({
                        title:$(item).find('.p-name a').html(),
                        price:$(item).find('.p-price').text(),
                        picUrl:$(item).find('.p-img img').attr('data-lazy-img'),
                        commit:$(item).find('.p-commit a').text(),
                        shop:$(item).find('.p-shop a').text(),
                    })
                })
                console.log(dataList)
            }
        })
        
}
initial(listUrl('node'));