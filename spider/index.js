'use strict'
var http = require('http');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');
var request = require('request');
var express = require('express');
var i = 0;
var app = express();
var url = "http://www.qiushibaike.com/hot/";
//var url2 = 'http://news.shu.edu.cn/Default.aspx?tabid=446';

function initial(url){
    var options = {
      url: url,
      method: 'GET',
      charset: "utf-8",
      headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36"
          //"cookie": " _T_WM=c6e67dd3773085ebf63b81778381a2b1; gsid_CTandWM=4uMv2ba21rkB8ho3hqv8e9CwQ9N; SUB=_2A257qZl7DeRxGeRM4lER9i7KyzuIHXVZVSczrDV6PUJbstAKLUr6kW1LHeuIAgfHZHYy22vhb76od0DHmdOwcg..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhLygbFuS9AymbY0nh4Sasg5JpX5o2p; SUHB=0ebcnsIKZFdqK-; SSOLoginState=1454237995";
      }
    }
    request(options,function(error,response){
       if(!error && response.statusCode == 200){
         var $ = cheerio.load(response.body)
         var max = $('.pagination li').eq(-2).find('.page-numbers').text().trim();
         for(var i=1;i<=max;i++){
           var current_url = 'http://www.qiushibaike.com/hot/page/'+i;
           var dir = 'data/index'+i+'.txt';
           var options = {
             url: current_url,
             method: 'GET',
             charset: "utf-8",
             headers: {
                 "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36",
                  "cookie": " _T_WM=c6e67dd3773085ebf63b81778381a2b1; gsid_CTandWM=4uMv2ba21rkB8ho3hqv8e9CwQ9N; SUB=_2A257qZl7DeRxGeRM4lER9i7KyzuIHXVZVSczrDV6PUJbstAKLUr6kW1LHeuIAgfHZHYy22vhb76od0DHmdOwcg..; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhLygbFuS9AymbY0nh4Sasg5JpX5o2p; SUHB=0ebcnsIKZFdqK-; SSOLoginState=1454237995"
              }
           }
           try {
            request(options,function(error1,response1){
                console.log(response1.statusCode)
                if(!error1 && response1.statusCode == 200){
                    var $ = cheerio.load(response1.body)
                    $('.article').each(function(index,item){
                        var text = $(item).find('span').text().trim();
                        console.log(dir);
                      fs.appendFile(dir,text+'\n',{encoding:'utf-8'},function(err){
                        if(err){
                          console.log(err)
                        }
                      })
                    })
                }
              })
           } catch (error) {
               console.log(error)
           }
           
         }
        //  $('.content').each(function(index,item){
        //     var text = $(item).find('span').text().trim();
        //     //console.log(text);
        //     fs.appendFile('data/index.text',text+'\n',{encoding:'utf-8'},function(err){
        //       if(err){
        //         console.log(err)
        //       }
        //     })
        //     //console.log(text);
        //  })
         console.log(max);
       }
    })
  }
initial(url)

// function startRequest(url){
//     //   var options = {
//     //       host: host,
//     //       port: 80,
//     //       path: path,
//     //       headers: {
//     //       'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36'
//     //       }
//     // };
//    http.get(url,function(res){
//       var html = '';
//       var title = [];
//       res.setEncoding('utf-8'); //防止中文乱码
//       res.on('data',function(chunk){
//         html+=chunk;
//       })
//       res.on('end',function(){
//         var $ = cheerio.load(html);
//         var current = $('.current').text().trim();
//         var article = $('.listArticle').length;
//         //console.log(html);
//         console.log(article);
//       })
//    })
// }
// startRequest(url);