#### babel 编译
```bash
   npm init
   npm install --save-dev @babel/core @babel/cli
   npm install --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties babel-preset-env
```
#### .babelrc
```js
   {
"presets": ["env"],
  "plugins": [
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", {"loose": true}]
  ]
}
```
#### 编译
```js
   babel async.js --out-file dist/async-compiled.js 
```

sudo npm install -g @babel/cli
Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/@babel/cli/node_modules/fsevents/.node-gyp'

#### 
npx babel async.js --out-file dist/async-compiled.js
node node_modules/@babel/cli/bin/babel.js async.js --out-file dist/async-compiled.js