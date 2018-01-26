'use strict'

const cheerio = require('cheerio');
const superagent = require('superagent');
const fs = require('fs');

let url = "http://www.qiushibaike.com/hot/";

function initial(url) {
    superagent.get(url)
        .end((err, res) => {
            if (err) {
                return console.log(err);
            } else {
                let $ = cheerio.load(res.text);
                $('.content').each((index, item) => {
                    let text = $(item).find('span').text().trim();
                    fs.writeFile(__dirname + '/data1/hot.txt', (index + 1) + '.  ' + text + "\r\n", {}, (err) => {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log('写入成功')
                        }
                    })
                })
            }
        })
}
initial(url);