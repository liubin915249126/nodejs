const puppeteer = require('puppeteer');
const axios = require('axios');
const {postEmail} = require('./email.js');
const schedule = require("node-schedule");

// const api = 'http://admin.uuang.co.id/admin/loan/list?current=0&size=1000&descs%5B0%5D=priority'
const api = 'http://admin.uuang.co.id/admin/loan/list?current=0&size=10000&descs%5B0%5D=priority'
const baseUrl = "https://play.google.com/store/apps/details?id="

function getData(url){
   axios.get(url)
   .then(((res)=>{
       const { data, status } = res.data;
       if(status===200){
           const { records } = data;
           getPage(records);
       }
   })).catch((err)=>{
     console.log(err)
   })
}

async function getPage(records){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log(records.length)
    const list = [];
    const errRecords = [];
    for(let index=0;index<records.length;index++){
        const { packageName, status } = records[index];
        if(status==="ACTIVE"){
            try {
                await page.goto(`${baseUrl}${packageName}`);
                const result =await page.evaluate(e=>{
                const error_section = document.querySelector('#error-section');
                if(error_section){
                    return error_section.innerText;
                }
                return null;
                });
                if(result){
                  list.push(records[index]);  
                }
            } catch (error) {
                errRecords.push(records[index]);
                console.log(error);
            }
        }
    }
    
    postEmail(list);
    await browser.close();
    console.log('检索完毕',list.length+'个被下架')
}
getData(api);
 // getPage('com.yinshan.program.banda1');

function schedule(){
    const rule    = new schedule.RecurrenceRule();
    rule.hour =10;
    rule.minute =0;
    rule.second =0;
    schedule.scheduleJob(rule, function(){  
        getData(api);
    });
}
schedule();