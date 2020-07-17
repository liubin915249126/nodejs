var AipOcrClient = require("baidu-aip-sdk").ocr;
var fs = require('fs');

// 设置APPID/AK/SK
var APP_ID = "21439394";
var API_KEY = "GledxbhGkRMGDWZVlAGP1ulu";
var SECRET_KEY = "";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);



var image = fs.readFileSync("./img/img2.jpeg").toString("base64");

// 调用通用文字识别, 图片参数为本地图片
client.generalBasic(image).then(function(result) {
    console.log(JSON.stringify(result));
}).catch(function(err) {
    // 如果发生网络错误
    console.log(err);
});

// const url = 'https://tesseract.projectnaptha.com/img/eng_bw.png'
// // 调用通用文字识别, 图片参数为远程url图片
// client.generalBasicUrl(url).then(function(result) {
//     console.log(JSON.stringify(result));
// }).catch(function(err) {
//     // 如果发生网络错误
//     console.log(err);
// });