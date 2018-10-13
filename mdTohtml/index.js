const showdown  = require('showdown');
const fs = require("fs");
const path = require('path');



function readMd(fold,file){
  try{
    fs.readFile(path.join('./',`${fold}/${file}.md`),{encoding:'utf-8'},(err,content)=>{
        if(err){
            throw new Error(err)
        }
        convert(content,file)
      })
  }catch(err){

  }
}

function convert(text,name){
    var converter = new showdown.Converter(),
    html      = converter.makeHtml(text);
    fs.writeFile(`./htmldist/${name}.html`,html,{},(e)=>{
        console.log("写入"+name+'成功',e)
      }) 
}

readMd('mddist','ES6精华：Promise');