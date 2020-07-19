
 
const getPageNumObj = async (page)=>{
    const pageNumObj = await page.evaluate(e=>{
        const $ = document.querySelector
        const $$ = document.querySelectorAll
        const total = document.querySelector('#page>a:nth-of-last-type(2)').innerText;
        const current = document.querySelector('#page>em').innerText;
        return {
            total,current
        };
    })
    return pageNumObj;
} 


const  getImgUrl = async (page)=>{
    const picObj = await page.evaluate(e=>{
        const $ = document.querySelector
        const $$ = document.querySelectorAll
        const img = document.querySelector('#content>a>img');
        return {
            title:img.getAttribute('alt'),
            link:img.getAttribute('src'),
        };
    })
    return picObj;
}

saveImg = async(url,title,index)=>{
    console.log(`正在下载${title}第${index+1}张`)
    const type = url.split('.').slice(-1);
    axios.get(url,{responseType: 'stream'})
        .then((res)=>{
            let path = __dirname+'/dist/'+title;
            if(!fs.exists(path)){
                fs.mkdir(path,()=>{
                    res.data.pipe(fs.createWriteStream(path+'/'+index+'.'+type));
                });
            }
            
        })
}

module.exports ={
    getPageNumObj,getImgUrl,saveImg
}