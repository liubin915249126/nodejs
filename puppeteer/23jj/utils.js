const axios = require("axios");
const fs = require("fs");

const getPageNumObj = async (page) => {
  const pageNumObj = await page.evaluate((e) => {
    const $ = document.querySelector;
    const $$ = document.querySelectorAll;
    const doms = [...document.querySelectorAll("#page>a")];
    const total = doms[doms.length - 2].innerText;
    const current = document.querySelector("#page>em").innerText;
    return {
      total,
      current,
    };
  });
  return pageNumObj;
};

const getImgUrl = async (page) => {
  const picObj = await page.evaluate((e) => {
    const $ = document.querySelector;
    const $$ = document.querySelectorAll;
    const img = document.querySelector("#content>a>img");
    debugger;
    return {
      title: img.getAttribute("alt"),
      link: img.getAttribute("src"),
    };
  });
  return picObj;
};
const saveFile = (filePath, fileData)=> {
    return new Promise((resolve, reject) => {
     // 块方式写入文件
     const wstream = fs.createWriteStream(filePath);
    
     wstream.on('open', () => {
      const blockSize = 128;
      const nbBlocks = Math.ceil(fileData.length / (blockSize));
      for (let i = 0; i < nbBlocks; i += 1) {
       const currentBlock = fileData.slice(
        blockSize * i,
        Math.min(blockSize * (i + 1), fileData.length),
       );
       wstream.write(currentBlock);
      }
    
      wstream.end();
     });
     wstream.on('error', (err) => { reject(err); });
     wstream.on('finish', () => { resolve(true); });
    });
   }
const saveImg = async (url, title, index) => {
  const type = url.split(".").slice(-1);
  const res = await axios.get(`https:${url}`, { responseType: "stream" });
  console.log(`${title}第${index + 1}张下载完成`);
  let path = __dirname + "/dist/" + title;

  fs.exists(path, (exits) => {
    if (!exits) {
      fs.mkdir(path,{ recursive: true },async(error) => {
        if(error) {
            return
        }  
        // await saveFile(path + "/" + index + "." + type,res.data)
        res.data.pipe(fs.createWriteStream(path + "/" + index + "." + type));
      });
    }else{
        res.data.pipe(fs.createWriteStream(path + "/" + index + "." + type));
    }
  });
};

module.exports = {
  getPageNumObj,
  getImgUrl,
  saveImg,
};
