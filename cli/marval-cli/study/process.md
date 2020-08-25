## process
进程
####  process.argv process.argv0
```js
    $  node script.js a b c
    process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数
    0: /usr/local/bin/node
    1: script.js
    2: a
    3: b
    4: c
```
#### process.env 
环境变量