var cp = require('child_process');
process.on('message',function(m){
 console.log(m);
})
process.send({"message":"hello I am child"})