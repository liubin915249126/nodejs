## child_process
child_process模块给予node任意创建子进程的能力

### 几个api
#!/usr/bin/env node

#### child_process.exec(command[, options][, callback])
   子进程来执行shell命令,可以通过回调参数来获取脚本shell执行结果
```js
    const { exec } = require('child_process');
    exec('cat *.js bad_file | wc -l', (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    });
```   
#### child_process.execfile(file[, args][, options][, callback])
    与exec类型不同的是，不衍生一个 shell，而是，指定的可执行的 file 被直接衍生为一个新进程，
    这使得它比 child_process.exec() 更高效。 由于没有衍生 shell，因此不支持像 I/O 重定向和文件查找这样的行为。
```js
    const { execFile } = require('child_process');
    const child = execFile('node', ['--version'], (error, stdout, stderr) => {
    if (error) {
        throw error;
    }
    console.log(stdout);
    });
```

#### child_process.spawn(command[, args][, options])
    仅仅执行一个shell命令，不需要获取执行结果
```js
    const { spawn } = require('child_process');
    const ls = spawn('ls', ['-lh', '/usr']);

    ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    });

    ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    });

    ls.on('close', (code) => {
    console.log(`子进程退出，退出码 ${code}`);
    });
```    
#### child_process.fork(modulePath[, args][, options])   
与另外三个不同的是它开启的是一个node进程，执行的只能是js文件。
并通过建立 IPC 通讯通道来调用指定的模块，该通道允许父进程与子进程之间相互发送信息。
[example](../test/fork.js)


[参考文献](https://www.cnblogs.com/cangqinglang/p/9886657.html)
[nodejs.cn](http://nodejs.cn/)