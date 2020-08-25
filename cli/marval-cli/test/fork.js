var cp = require('child_process');
//只有使用fork才可以使用message事件和send()方法

console.log(__dirname)

var n = cp.fork(`${__dirname}/child.js`);
n.on('message',function(m){
  console.log(m);
})

n.send({"message":"hello"});
