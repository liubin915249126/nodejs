const fs = require("fs");

function writeFile(name,content){
    fs.writeFile(`./mddist/${name}.md`,content,{},(e)=>{
      console.log("写入"+name+'成功',e)
    })
}

module.exports = {
    writeFile,
}