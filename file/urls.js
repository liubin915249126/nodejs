const path = require("path");
const fs = require("fs");
function getFileList(filePath) {
  return new Promise((resovle, reject) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        var listArr = [];
        files.forEach(filename => {
          listArr.push(filename);
          resovle(listArr);
        });
      }
    });
  });
}

function getUrls(fileRoot, rootUrl,urls) {
  const files = fs.readdirSync(fileRoot);
  files.forEach(function(filename) {
    //获取当前文件的绝对路径
    var filedir = path.join(fileRoot, filename);
    //根据文件路径获取文件信息，返回一个fs.Stats对象
    const stats = fs.statSync(filedir);
    var isFile = stats.isFile(); //是文件
    var isDir = stats.isDirectory(); //是文件夹
    rootUrl += `/${filename}`;
    if (isFile) {
      console.log(111, rootUrl);
      urls.push(rootUrl.replace(/\.js/g, ""));
      rootUrl = "";
    }
    if (isDir) {
      return getUrls(filedir, rootUrl ,urls); //递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  });
  return urls
}

const urls = getUrls(path.resolve(__dirname, "build"), "", []);
console.log(222, urls);
// getUrls(path.resolve('./',"src"))
