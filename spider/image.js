//依赖模块
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var async = require('async');

// 目标网址
var url = 'http://desk.zol.com.cn/meinv/1920x1080/1.html';

// 本地存储目录
var dir = __dirname + '/images';
// var dir = './images';

// 图片链接地址
var links = [];

// 创建目录
mkdirp(dir, function (err) {
    if (err) {
        console.log(err);
    }
});

// 发送请求
function imageDownLoad(url, i) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.photo-list-padding a img').each(function () {
                var src = $(this).attr('src');
                // src = src.replace(/t_s208x130c5/, 't_s960x600c5');
                if (src) {
                    download(src, dir, Math.floor(Math.random() * 100000) + src.substr(-4, 4), i)
                };
            });
        }
    });
}

for (let i = 1; i <= 100; i++) {
    let url = 'http://desk.zol.com.cn/meinv/1920x1080/' + i + '.html';
    imageDownLoad(url, i)
}

// console.log(links)

// links.forEach((items,index,arr)=>{
//     console.log(items)
//     // 每次只执行一个异步操作
//     async.mapSeries(items, function(item, callback) {
//         if(item){download(item, dir, Math.floor(Math.random()*100000) + item.substr(-4,4),index)};
//         callback(null, item);
//     }, function(err, results) {});
// })



// 下载方法
var download = function (url, dir, filename, foldName) {
    request.head(url, function (err, res, body) {
        console.log(err)
        if (res.statusCode == 200 && !err) {
            request(url)
                .on('error', (error) => {
                    console.log(error)
                })
                .pipe(fs.createWriteStream(dir + "/" + foldName + '/' + filename))

                .on('close', () => {
                    var bu = fs.createReadStream(fpath, {
                        start: 0,
                        end: 262
                    });
                    bu.on('data', function (chunk) {
                        console.log(chunk.toString()); //这是结果
                    });
                });
        }

    });
};