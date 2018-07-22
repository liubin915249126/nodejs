const axios = require('axios');

const url = "https://segmentfault.com/api/timelines/hottest/month?page=2&_=7949bb30c67249cf89dbfdc99eb1967a"


function getData(url){
  axios.get(url)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })
}

getData(url)