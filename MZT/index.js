const superagent = require('superagent');
const cheerio = require('cheerio');
const axios = require('axios')

const baseUrl = 'https://m.mzitu.com/'

function initial() {
    return new Promise((resolve,reject)=>{
      superagent.get(baseUrl)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          let $ = cheerio.load(res.text);
          let dataList = [];
          $('.blog .placeholder').each((index, item) => {
            dataList.push({
              title: $(item).find('h2 a').text(),
              pic: $(item).find('figure img').attr('data-original'),
              tag: $(item).find('.category a').text(),
              time: $($(item).find('.time')[0]).text(),
              read: $($(item).find('.time')[1]).text(),
              target:$(item).find('figure a').attr('href').replace(/[^0-9]/ig,"")
            })
          })
        //   console.log(dataList)
          resolve(dataList)
        }
      })
    })
}

async function detail(){
  const dataList = await initial()
  dataList.forEach((item,index)=>{
    const {target,pic} = item
    // loadImg(pic,target)
    const detailUrl = `${baseUrl}${target}`
    superagent.get(detailUrl)
    .end((err, res) => {
       if(err){
           console.log(err)
       }else{
           let $ = cheerio.load(res.text);
           let totalSpan = $('.prev-next-page').text();
           let total = totalSpan.split('/')[1].replace(/[^0-9]/ig,"")
           console.log(total)
       }
    })
  })
}



function loadImg(url,target) {
    let typeArr = url.split('.');
    let type = typeArr[typeArr.length-1];
    axios.get(url,{responseType: 'stream'})
        .then((res)=>{
            let path = __dirname+'/dist/';
            if(!fs.exists(path)){
                fs.mkdir(path,()=>{
                    res.data.pipe(fs.createWriteStream(path+'/'+target+'.'+type));
                });
            }
            
        }).catch((err)=>console.log(err))
}

detail()