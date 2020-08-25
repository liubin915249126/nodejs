## path

#### api 
```js
    basename('/foo/bar/baz/asdf/quux.html');    //quux.html
    basename('/foo/bar/baz/asdf/quux.html');    ///foo/bar/baz/asdf
    extname('/foo/bar/baz/asdf/quux.html');    //html
    path.format({
        root: '/ignored',
        dir: '/home/user/dir',
        base: 'file.txt'
    });
    // 返回: '/home/user/dir/file.txt'
    path.parse('/home/user/dir/file.txt');
    // 返回:
    // { root: '/',
    //   dir: '/home/user/dir',
    //   base: 'file.txt',
    //   ext: '.txt',
    //   name: 'file' }

    path.resolve('/foo/bar', './baz');
    // 返回: '/foo/bar/baz'
    path.resolve('/foo/bar', '/tmp/file/');
    // 返回: '/tmp/file'
    path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');
    // 如果当前工作目录是 /home/myself/node，
    // 则返回 '/home/myself/node/wwwroot/static_files/gif/image.gif'
```

#### 几种路径
- __dirname: 总是返回被执行的 js 所在文件夹的绝对路径
- __filename: 总是返回被执行的 js 的绝对路径
- process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径
-  ./
  - 在 require() 中使用是跟 __dirname 的效果相同，不会因为启动脚本的目录不一样而改变，
  - 在其他情况下跟 process.cwd() 效果相同，是相对于启动脚本所在目录的路径。