const creatPromise = (num)=>{
    return new Promise((resolve, reject)=>{resolve(num)})
}


const co = require("co");
function* foo(x) {
  console.log(1111);
  let y = 2 * (yield creatPromise(x + 1)); //yield可暂停，next方法可启动，每次返回的是yield后的表达式结果
  console.log(2222);
  let z = yield creatPromise(y / 3); //yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值
  console.log(3333);
  return x + y + z;
}
// let it = foo(5);
// console.log(it.next()); // => {value: 6, done: false}
// console.log("inner");
// console.log(it.next(12)); // => {value: 8, done: false}
// console.log(it.next(13)); // => {value: 42, done: true}
co(foo(5))