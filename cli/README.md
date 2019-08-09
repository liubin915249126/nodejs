#### 

#### commander
>
    Option() ——> 初始化自定义参数对象，设置“关键字”和“描述”
    Command() ——> 初始化命令行参数对象，直接获得命令行输入,返回一个数组或者string
    Command#command() ——> 定义命令名称
    Command#arguments() ——> 定义初始命令的参数
    Command#parseExpectedArgs() ——> 解析预期参数
    Command#action() ——> 注册命令的回调函数
    Command#option() ——> 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔
    Command#allowUnknownOption() ——> 允许命令行未知参数
    Command#parse() ——> 解析process.argv，设置选项和定义时调用命令
    Command#parseOptions() ——> 解析参数
    Command#opts() ——>设置参数
    Command#description() ——> 添加命令描述
    Command#alias() ——> 设置命令别名
    Command#usage() ——> 设置/获取用法
    Command#name()
    Command#outputHelp() ——> 设置展示的help信息
    Command#help()
>

yarn add --dev @babel/core babel-preset-latest-node
yarn add --dev @babel/register  
yarn add --dev @babel/polyfill
yarn add --dev @babel/cli
yarn add --dev babel-preset-env

https://www.jianshu.com/p/1c5d086c68fa