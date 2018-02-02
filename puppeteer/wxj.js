const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

const baseUrl = 'http://www.syrinx.cc/agents/';
let index = 1000

function loadImgCatch(index) {
    let url = baseUrl + index + '/image';
    try {
        axios.get(url,{responseType: 'stream'})
        .then((res)=>{
           console.log('正在下载第'+index+'张图片');
           let path = __dirname+'/wxj/';
           if(!fs.exists(path)){
            fs.mkdir(path,()=>{
                res.data.pipe(fs.createWriteStream(path+'/'+index));
            });
        }
        }).catch((err)=>{
            //console.log(err)
        })
    } catch (error) {
        // console.log(error)
    }
}

// function loadImg(index) {
//     let url = baseUrl + index + '/image';
//     return axios.get(url,{responseType: 'stream'})
//         .then((res)=>{
//            console.log('正在下载第'+index+'张图片');
//            let path = __dirname+'/wxj/';
//            if(!fs.exists(path)){
//             fs.mkdir(path,()=>{
//                 res.data.pipe(fs.createWriteStream(path+'/'+index));
//             });
//         }
//         }).catch((err)=>{
//             console.log(err)
//         })
// }

// function loop() {
//     for(let i=1000;i<9999;i++){
//         var task = [];
//         task.push(loadImg(i))
//         return Promise.all(task);
//      }
// }
// loop().then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err);
// })
