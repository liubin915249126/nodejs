
'use strict'  
  
const http = require('https');  
//const url = require('url');  
  
var biliUrl = `https://bangumi.bilibili.com/web_api/season/  
            index_global?page=1&page_size=20&version=0  
            &is_finish=0&start_year=0&tag_id=&index_type=1  
            &index_sort=0&quarter=`;  
  
http.get(biliUrl, (res) => {  
    var data = '';  //接口数据  
  
    res.on('data', (chunk) => {  
        data += chunk;    //拼接数据块  
    });  
    res.on('end', function() {  
        let json = JSON.parse(data); //解析json  
         
        console.log(json);  //打印json  
    })  
}).on('error', () =>   
    console.log('获取数据出错!')  
);