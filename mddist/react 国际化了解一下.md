背景
==

楼主最近新接了一个项目，从0开始做，需要做多语言的国际化，今天搞了一下，基本达到了想要的效果， 在这里简单分享下：

* * *

一些探索
----

也说不上是探索吧，就Google了一波， 去gayHub 上找了一个比较成熟的库 `react-i18next`， 写了一些代码，现将过程分享一下， 附带详细代码，手把手教你实现国际化。

先睹为快
----

先看一下最后的成果：

     // ...
    import i18n from '@src/i18n';
    
    
    // xxx component
    
     console.log('哈哈哈哈哈i18n来一发:', i18n.t('INVALID_ORDER'));
    
    // ...
    render() { 
      // ...
      <button> {i18n.t('INVALID_ORDER')} <button>
    }
    
    

控制台中：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

对应json 中的信息：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

开始
--

### 原理

原理其实很简单： 字符串替换。

拉取远程的国际化json文件到本地，再根据语言做一个映射就可以了。

废话不多说， 来看代码吧。

先简单看一下目录结构：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

先看一下 `config` 里面的 相关代码：

`env.js`:

    'use strict';
    
    const fs = require('fs');
    const path = require('path');
    const paths = require('./paths');
    const languages = require('./languages');
    
    // Make sure that including paths.js after env.js will read .env variables.
    delete require.cache[require.resolve('./paths')];
    
    const NODE_ENV = process.env.NODE_ENV;
    if (!NODE_ENV) {
      throw new Error(
        'The NODE_ENV environment variable is required but was not specified.'
      );
    }
    
    // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
    var dotenvFiles = [
      `${paths.dotenv}.${NODE_ENV}.local`,
      `${paths.dotenv}.${NODE_ENV}`,
      // Don't include `.env.local` for `test` environment
      // since normally you expect tests to produce the same
      // results for everyone
      NODE_ENV !== 'test' && `${paths.dotenv}.local`,
      paths.dotenv,
    ].filter(Boolean);
    
    // Load environment variables from .env* files. Suppress warnings using silent
    // if this file is missing. dotenv will never modify any environment variables
    // that have already been set.  Variable expansion is supported in .env files.
    // https://github.com/motdotla/dotenv
    // https://github.com/motdotla/dotenv-expand
    dotenvFiles.forEach(dotenvFile => {
      if (fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
          require('dotenv').config({
            path: dotenvFile,
          })
        );
      }
    });
    
    // We support resolving modules according to `NODE_PATH`.
    // This lets you use absolute paths in imports inside large monorepos:
    // https://github.com/facebookincubator/create-react-app/issues/253.
    // It works similar to `NODE_PATH` in Node itself:
    // https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
    // Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
    // Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
    // https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
    // We also resolve them to make sure all tools using them work consistently.
    const appDirectory = fs.realpathSync(process.cwd());
    process.env.NODE_PATH = (process.env.NODE_PATH || '')
      .split(path.delimiter)
      .filter(folder => folder && !path.isAbsolute(folder))
      .map(folder => path.resolve(appDirectory, folder))
      .join(path.delimiter);
    
    // Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
    // injected into the application via DefinePlugin in Webpack configuration.
    const REACT_APP = /^REACT_APP_/i;
    
    function getClientEnvironment(publicUrl) {
      const raw = Object.keys(process.env)
        .filter(key => REACT_APP.test(key))
        .reduce(
          (env, key) => {
            env[key] = process.env[key];
            return env;
          },
          {
            // Useful for determining whether we’re running in production mode.
            // Most importantly, it switches React into the correct mode.
            NODE_ENV: process.env.NODE_ENV || 'development',
            // Useful for resolving the correct path to static assets in `public`.
            // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
            // This should only be used as an escape hatch. Normally you would put
            // images into the `src` and `import` them in code to get their paths.
            PUBLIC_URL: publicUrl,
            LANGUAGE: {
              resources: languages.resources,
              defaultLng: languages.defaultLng
            },
            COUNTRY: process.env.COUNTRY
          }
        );
      // Stringify all values so we can feed into Webpack DefinePlugin
      const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
          env[key] = JSON.stringify(raw[key]);
          return env;
        }, {}),
      };
    
      return { raw, stringified };
    }
    
    module.exports = getClientEnvironment;
    

主要看lannguage 相关的代码就好了， 其他的都`create-react-app` 的相关配置， 不用管。

再看下 `language.js` 里面的逻辑：

    const path = require('path');
    const paths = require('./paths');
    const localesHash = require('../i18n/localesHash');
    const resourcesHash = require('../i18n/resourcesHash');
    
    const COUNTRY = process.env.COUNTRY || 'sg';
    const country = (COUNTRY).toUpperCase();
    const defaultLng = localesHash[country][0];
    
    const langs = [
      'en',
      'id'
    ];
    
    const prefixLangs = [];
    const entries = {};
    
    for (let i = 0, len = langs.length; i < len; i++) {
      const prefixLang = `dict_${langs[i]}`
      prefixLangs.push(prefixLang)
      entries[prefixLang] = path.resolve(paths.appSrc, `../i18n/locales/${langs[i]}.json`)
    }
    
    const resources = {
      [defaultLng]: {
        common: resourcesHash[defaultLng]
      }
    }
    
    exports.resources = resources;
    exports.defaultLng = defaultLng;
    

逻辑也比较简单， 根据语言列表把对应的json 内容加进来。 作为示例，这里我设置的是 英文 和 印尼语。

下面看 `i18n` 文件里面的内容：

`locales` 里面放的是语言的json 文件， 内容大概是：

    {
        "msg_Created": "Pesanan telah terbuat"
        // ...
    }

`localesHash.js`:

    module.exports = {
      SG: ['en'],
      ID: ['id']
    }
    

`resourcesHash.js`:

    module.exports = {
      'en': require('./locales/en.json'),
      'id': require('./locales/id.json')
    }
    

`index.js`

    const path = require('path')
    const fs = require('fs')
    const fetch = require('isomorphic-fetch')
    const localesHash = require('./localesHash')
    
    const argv = process.argv.slice(2)
    const country = (argv[0] || '').toUpperCase()
    
    const i18nServerURI = locale => {
      const keywords = {
        'en': 'en',
        'id': 'id'
      }
      const keyword = keywords[locale]
      return keyword === 'en'
        ? 'xxx/json/download'
        : `/${keyword}/json/download`
    }
    
    const fetchKeys = async (locale) => {
      const uri = i18nServerURI(locale)
      console.log(`Downloading ${locale} keys...\n${uri}`)
      const respones = await fetch(uri)
      const keys = await respones.json()
      return keys
    }
    
    const access = async (filepath) => {
      return new Promise((resolve, reject) => {
        fs.access(filepath, (err) => {
          if (err) {
            if (err.code === 'EXIST') {
              resolve(true)
            }
            resolve(false)
          }
          resolve(true)
        })
      })
    }
    
    const run = async () => {
      const locales = localesHash[country] || Object
        .values(localesHash)
        .reduce(
          (previous, current) =>
            previous.concat(current), []
        )
      if (locales === undefined) {
        console.error('This country is not in service.')
        return
      }
      for (const locale of locales) {
        const keys = await fetchKeys(locale)
        const data = JSON.stringify(keys, null, 2)
        const directoryPath = path.resolve(__dirname, 'locales')
        if (!fs.existsSync(directoryPath)) {
          fs.mkdirSync(directoryPath)
        }
        const filepath = path.resolve(__dirname, `locales/${locale}.json`)
        const isExist = await access(filepath)
        const operation = isExist ? 'update' : 'create'
        console.log(operation)
        fs.writeFileSync(filepath, `${data}\n`)
        console.log(`${operation}\t${filepath}`)
      }
    }
    
    run();
    

再看下`src` 中的配置：

`i18nn.js`

    
    import i18next from 'i18next'
    import { firstLetterUpper } from './common/helpers/util';
    const env = process.env;
    let LANGUAGE = process.env.LANGUAGE;
    LANGUAGE = typeof LANGUAGE === 'string' ? JSON.parse(LANGUAGE) : LANGUAGE
    
    const { defaultLng, resources } = LANGUAGE
    
    i18next
      .init({
        lng: defaultLng,
        fallbackLng: defaultLng,
        defaultNS: 'common',
        keySeparator: false,
        debug: env.NODE_ENV === 'development',
        resources,
        interpolation: {
          escapeValue: false
        },
        react: {
          wait: false,
          bindI18n: 'languageChanged loaded',
          bindStore: 'added removed',
          nsMode: 'default'
        }
      })
    
    function isMatch(str, substr) {
      return str.indexOf(substr) > -1 || str.toLowerCase().indexOf(substr) > -1
    }
    
    export const changeLanguage = (locale) => {
      i18next.changeLanguage(locale)
    }
    
    // Uppercase the first letter of every word. abcd => Abcd or abcd efg => Abcd Efg
    export const tUpper = (str, allWords = true) => {
      return firstLetterUpper(i18next.t(str), allWords)
    }
    
    // Uppercase all letters. abcd => ABCD
    export const tUpperCase = (str) => {
      return i18next.t(str).toUpperCase()
    }
    
    export const loadResource = lng => {
      let p;
    
      return new Promise((resolve, reject) => {
        if (isMatch(defaultLng, lng)) resolve()
    
        switch (lng) {
          case 'id':
            p = import('../i18n/locales/id.json')
            break
          default:
            p = import('../i18n/locales/en.json')
        }
    
        p.then(data => {
          i18next.addResourceBundle(lng, 'common', data)
          changeLanguage(lng)
        })
          .then(resolve)
          .catch(reject)
      })
    }
    
    export default i18next
    

     // firstLetterUpper
    
    export const firstLetterUpper = (str, allWords = true) => {
      let tmp = str.replace(/^(.)/g, $1 => $1.toUpperCase())
      if (allWords) {
        tmp = tmp.replace(/\s(.)/g, $1 => $1.toUpperCase())
      }
      return tmp;
    }

这些准备工作做好后, 还需要把i18n 注入到app中：

`index.js`:

    import React from 'react';
    import { render } from 'react-dom';
    import { Provider } from 'react-redux';
    import rootReducer from './common/redux/reducers';
    import { configureStore } from './common/redux/store';
    import { Router } from 'react-router-dom';
    import createBrowserHistory from 'history/createBrowserHistory';
    import { I18nextProvider } from 'react-i18next';
    import i18n from './i18n';
    import './common/styles/index.less';
    import App from './App';
    export const history = createBrowserHistory();
    
    const ROOT = document.getElementById('root');
    
    render(
      <I18nextProvider i18n={i18n}>
        <Provider store={configureStore(rootReducer)} >
          <Router history={history}>
            <App />
          </Router>
        </Provider>
      </I18nextProvider>,
      ROOT
    );
    

如何使用
----

加入上面的代码后， 控制台会有一些log 信息， 表示语言已经加载好了。

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

在具体的业务组件中，使用方法是：

     // ...
    import i18n from '@src/i18n';
    
    console.log('哈哈哈哈哈i18n来一发:', i18n.t('INVALID_ORDER'));
    
    

控制台中：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

对应json 中的信息：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

后面你就可以愉快的加各种词条了。

Tips
----

我们在src 中的文件中引入了src 目录外的文件， 这是create-react-app 做的限制， 编译会报错， 把它去掉就好了：

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

![clipboard.png](https://static.segmentfault.com/v-5b973eab/global/img/squares.svg "clipboard.png")

结语
--

这里作为例， 就是把语言的json 文件下载下来放到locales 目录里， 如果想实时拉取，要保证文件下载完之后再render app.

类似：

    loadResource(getLocale())
      .then(() => {
        import('./app.js')
      })
    

  
当然你也可以免了这一步，直接下载好放到工程里来。

大概就是这样，以上就是实现国际化的全部代码，希望对大家有所帮助。

[](#awakeapp)Awake.app
======================

[中文介绍](http://type.so/object-c/awake-app.html)

[![screenshot](https://camo.githubusercontent.com/2bb97b776db20dbac366727cf21328d8f8a2c8bb/68747470733a2f2f7261772e6769746875622e636f6d2f7869616f7a692f4177616b652e6170702f6d61737465722f73637265656e73686f742e706e67)](https://camo.githubusercontent.com/2bb97b776db20dbac366727cf21328d8f8a2c8bb/68747470733a2f2f7261772e6769746875622e636f6d2f7869616f7a692f4177616b652e6170702f6d61737465722f73637265656e73686f742e706e67)

An app for mac osx to prevent sleeping; inspired by Caffeine.

1.  left click to toggle "should sleep status"
2.  right click for menu

"run at login" will not take effect unless you put this app in the `/Applications` directory.

### [](#download)download

[https://github.com/xiaozi/Awake.app/releases](https://github.com/xiaozi/Awake.app/releases)

### [](#apple-script-supported)apple script supported

tell application "Awake"
    turn on for 1
    \-\- turn off
end tell