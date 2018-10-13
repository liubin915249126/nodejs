> 参考
> 
> 1.[入门: 在macOS上搭建Flutter开发环境 系统要求](https://flutterchina.club/setup-macos/)
> 
> 2.[Mac 打开、编辑 .bash_profile 文件](https://blog.csdn.net/huxinguang_ios/article/details/78709428)

虽然网上有教程，但是过程中遇到些问题，这些问题教程里并没有，所以写这个文章记录一下。

1.打开终端
------

2.clone flutter
---------------

命令：

    git clone -b beta https://github.com/flutter/flutter.git

> 到此步终端报错：
> 
> error: RPC failed; curl 18 transfer closed with outstanding read data remaining
> 
> fatal: The remote end hung up unexpectedly
> 
> fatal: early EOF
> 
> fatal: index-pack failed
> 
> 解决办法看这一篇: [git clone 报错：error: RPC failed; curl 18 transfer closed with outstanding read data remaining 解决办法](https://www.jianshu.com/p/ddd1a39dcbc8)

3.打开(或创建) .bash_profile
-----------------------

### 1.打开

终端输入：

    open -e .bash_profile

如果不能成功打开，那就创建

### 2.创建

1.进入当前用户的home目录（默认就是）

    cd ~

或

    cd /Users/用户名

4.更新环境变量
--------

打开bash\_profile就是为了可以永久的更新环境变量，一劳永逸。请看解释和注意后根据自己的需要来将代码添加到打开的bash\_profile。

    export PUB_HOSTED_URL=https://pub.flutter-io.cn
    export FLUTTER_STORAGE_BASE_URL=https://storage.flutter-io.cn

**解释：** 由于一些`flutter`命令需要联网获取数据，如果您是在国内访问，由于众所周知的原因，直接访问很可能不会成功。 上面的`PUB_HOSTED_URL`和`FLUTTER_STORAGE_BASE_URL`是google为国内开发者搭建的临时镜像。你也可以不设置，如果你能翻墙的话。如果不能的话可以直接复制上面的代码

    export PATH= PATH_TO_FLUTTER_GIT_DIRECTORY/flutter/bin:$PATH

**注意**：`PATH_TO_FLUTTER_GIT_DIRECTORY` 为你flutter的路径，比如在当前用户路径里。如果不确定，可以点击mac上面菜单的"前往" --> "个人"，然后在此文件夹里找是否有flutter文件夹。如果有的话你的应该这样写:

    export PATH= /Users/用户名/flutter/bin:$PATH

然后输入以下命令更新刚刚配置的环境变量:

    source .bash_profile

然后输入以下命令，通过运行`flutter/bin`命令验证目录是否在已经在PATH中:

    echo $PATH

如果看到有flutter那就是配置好了

5.运行 flutter doctor
-------------------

输入下面这个命令，来看还有没有要安装的依赖项：

    flutter doctor

我的话一开始是这个

![提示flutter版本太低](https://static.segmentfault.com/v-5b8914e1/global/img/squares.svg "提示flutter版本太低")

让我更新flutter，我不想看到warning所以立马更新了。

    flutter upgrade

### 错误1：

然后就看x了，这是我第一个打叉的地方

    [✗] Android toolchain - develop for Android devices
        ✗ Unable to locate Android SDK.
          Install Android Studio from: https://developer.android.com/studio/index.html
          On first launch it will assist you in installing the Android SDK components.
          (or visit https://flutter.io/setup/#android-setup for detailed instructions).
          If Android SDK has been installed to a custom location, set $ANDROID_HOME to that location.

这是让我安装android studio并且设置好$ANDROID_HOME这个环境变量。

于是我便按照提示打开[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)，并且下载安装了android studio。

安装后最好运行一下android studio，好安装andriod sdk。运行好根据界面提示点下一步，如果没有sdk会提示安装，只要点就行了。记得查看下安装路径，一般路径都是在当前用户的Library文件夹里。

安装好sdk后，可以把android studio关了。

然后打开bash_profile

    open -e .bash_profile

在bash_profile里加上

    export ANDROID_HOME="/Users/用户名/Library/Android/sdk" //android sdk目录，替换为你自己的
    export PATH=${PATH}:${ANDROID_HOME}/tools
    export PATH=${PATH}:${ANDROID_HOME}/platform-tools

更新配置

    source .bash_profile

然后运行

    flutter doctor

看这一项还报错不。ok还是有报错，报错如下：

    [!] Android toolchain - develop for Android devices (Android SDK 28.0.2)
        ✗ Android licenses not accepted.  To resolve this, run: flutter doctor --android-licenses

根据提示运行：

    flutter doctor --android-licenses

然后根据提示一直y，y到结束为止。

### 错误2：

这是我第二个打叉的地方

    [!] iOS toolchain - develop for iOS devices
        ✗ Xcode installation is incomplete; a full installation is necessary for iOS development.
          Download at: https://developer.apple.com/xcode/download/
          Or install Xcode via the App Store.
          Once installed, run:
            sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
        ✗ libimobiledevice and ideviceinstaller are not installed. To install, run:
            brew install --HEAD libimobiledevice
            brew install ideviceinstaller
        ✗ ios-deploy not installed. To install:
            brew install ios-deploy
        ✗ CocoaPods not installed.
            CocoaPods is used to retrieve the iOS platform side's plugin code that responds to your plugin usage on the Dart side.
            Without resolving iOS dependencies with CocoaPods, plugins will not work on iOS.
            For more info, see https://flutter.io/platform-plugins
          To install:
            brew install cocoapods
            pod setup
    

依旧是根据提示，我去App Store安装了xcode。

安装好后根据之前的错误信息运行：

    sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer

然后：

    brew install --HEAD libimobiledevice

再然后：

    brew install ideviceinstaller

又然后：

    brew install ios-deploy

还然后：

    brew install cocoapods

最后然后：

    pod setup

进行到这我报错了：

    [!] /usr/bin/git clone https://github.com/CocoaPods/Specs.git master --progress
    
    Cloning into 'master'...
    remote: Counting objects: 2353094, done.        
    remote: Compressing objects: 100% (450/450), done.        
    error: RPC failed; curl 18 transfer closed with outstanding read data remaining
    fatal: The remote end hung up unexpectedly
    fatal: early EOF
    fatal: index-pack failed

弄个加速器就可以了。我用的云墙netfits，有试用，试用够下载了。如果有更好的加速器欢迎留言。

再运行doctor

    flutter doctor

ios还有报错：

    [!] iOS toolchain - develop for iOS devices (Xcode 9.4.1)
        ✗ Missing Xcode dependency: Python module "six".
          Install via 'pip install six' or 'sudo easy_install six'.

按照提示输入'pip install six' 或 'sudo easy_install six'。然后再运行doctor，我这里ios没有报错了。就剩错误3里的报错。

### 错误3：

    [✓] Android Studio (version 3.1)
        ✗ Flutter plugin not installed; this adds Flutter specific functionality.
        ✗ Dart plugin not installed; this adds Dart specific functionality.

android studio里还少了两个插件。我们打开andriod studio。

1.点击preferences

![](https://static.segmentfault.com/v-5b8914e1/global/img/squares.svg)

2.搜索plugins

![](https://static.segmentfault.com/v-5b8914e1/global/img/squares.svg)

3.搜索flutter

![image-20180813214903100](https://static.segmentfault.com/v-5b8914e1/global/img/squares.svg "image-20180813214903100")

4.点击安装

![image-20180813215025154](https://static.segmentfault.com/v-5b8914e1/global/img/squares.svg "image-20180813215025154")

有弹框提示要安装dart，同意。等安装好后重启andriod studio。

结语
--

当doctor没有错误的时候，那就是装好了。但是为了方便开发，我们还需要对编辑器做配置。鉴于这个比较容易，而且不太出现错误，所以我就不写了。大家自己参考文档来。

参考文档：[起步: 配置编辑器](https://flutterchina.club/get-started/editor/#vscode)

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