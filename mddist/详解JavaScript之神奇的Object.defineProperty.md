**摘要：** JavaScript有个很神奇的[Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，了解一下？

### =与Object.defineProperty

为JavaScript对象新增或者修改属性，有两种不同方式：**直接使用=赋值**或者**使用Object.defineProperty()定义**。如下：

    // 示例1
    var obj = {};
    
    // 直接使用=赋值
    obj.a = 1;
    
    // 使用Object.defineProperty定义
    Object.defineProperty(obj, "b",
    {
        value: 2
    });
    
    console.log(obj) // 打印"{a: 1, b: 2}"

这样看两者似乎没有区别，对吧？但是，如果使用[Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)查看obj.a与obj.b的属性的**描述描述符(property descriptor)**时，会发现=与Object.defineProperty并不一样：

    // 示例2
    var obj = {};
    
    obj.a = 1;
    
    Object.defineProperty(obj, "b",
    {
        value: 2
    });
    
    console.log(Object.getOwnPropertyDescriptor(obj, "a")); // 打印"{value: 1, writable: true, enumerable: true, configurable: true}"
    console.log(Object.getOwnPropertyDescriptor(obj, "b")); // 打印"{value: 2, writable: false, enumerable: false, configurable: false}"

可知，使用=赋值时，属性的属性描述符value是可以修改的，而writable、enumerable和configurable都为true。

而使用Object.defineProperty()定义的属性的属性描述符writable、enumerable和configurable默认值为false，但是都可以修改。对于writable、enumerable和configurable的含义，从名字就不难猜中，后文也会详细介绍。

使用=赋值，等价于使用Object.defineProperty()定义时，同时将writable、enumerable和configurable设为true。代码示例3和4是等价的：

    // 示例3
    var obj = {};
    
    obj.name = "Fundebug";
    console.log(Object.getOwnPropertyDescriptor(obj, "name")); // 打印{value: "Fundebug", writable: true, enumerable: true, configurable: true}

    // 示例4
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: true,
        enumerable: true,
        configurable: true
    });
    console.log(Object.getOwnPropertyDescriptor(obj, "name")); // 打印{value: "Fundebug", writable: true, enumerable: true, configurable: true}

### Object.defineProperty()

使用Object.defineProperty()定义时若只定义value，则writable、enumerable和configurable默认值为false。代码示例5和6是等价的：

    // 示例5
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug"
    });
    console.log(Object.getOwnPropertyDescriptor(obj, "name")); // 打印{value: "Fundebug", writable: false, enumerable: false, configurable: false}

    // 示例6
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: false,
        enumerable: false,
        configurable: false
    });
    console.log(Object.getOwnPropertyDescriptor(obj, "name")); // 打印{value: "Fundebug", writable: false, enumerable: false, configurable: false}

由于writable、enumerable和configurable都是false，导致obj.name属性不能赋值、不能遍历而且不能删除：

    // 示例7
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug"
    });
    
    // writable为false，无法赋值
    obj.name = "云麒";
    console.log(obj.name); // 打印"Fundebug"
    
    // enumerable为false，无法遍历
    console.log(Object.keys(obj)); // 打印"[]"
    
    // configurable为false，无法删除
    delete obj.name;
    console.log(obj.name); // 打印"Fundebug"

若在严格模式("use strict")下，示例7中的代码会报错，下文可见。

### writable

writable为false时，属性不能再次赋值，严格模式下会报错**“Cannot assign to read only property”**（_如果你希望实时监控类似的应用错误的话，欢迎免费试用[Fundebug](https://www.fundebug.com/)，我们支持前端网页、微信小程序、微信小游戏，Node.js以及Java错误监控！_）：

    // 示例8
    "use strict"
    
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: false,
        enumerable: true,
        configurable: true
    });
    
    obj.name = "云麒"; // 报错“Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'”

writable为true时，属性可以赋值，这一点读者不妨自行测试。

### enumerable

enumerable为false时，属性不能遍历：

    // 示例9
    "use strict"
    
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: true,
        enumerable: false,
        configurable: true
    });
    
    console.log(Object.keys(obj)) // 打印"[]"

enumerable为true时，属性可以遍历，这一点读者不妨自行测试。

### configurable

enumerable为false时，属性不能删除，严格模式下会报错**“Cannot delete property”**：

    // 示例10
    "use strict"
    
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: true,
        enumerable: true,
        configurable: false
    });
    
    delete obj.name // 报错“Uncaught TypeError: Cannot delete property 'name' of #<Object>”

enumerable为true时，属性可以删除，这一点读者不妨自行测试。

### writable与configurable

当writable与enumerable同时为false时，属性不能重新使用Object.defineProperty()定义，严格模式下会报错**“Cannot redefine property”**：

    // 示例11
    "use strict"
    
    var obj = {};
    
    Object.defineProperty(obj, "name",
    {
        value: "Fundebug",
        writable: false,
        configurable: false
    })
    
    Object.defineProperty(obj, "name",
    {
        value: "云麒"
    }) // 报错“Uncaught TypeError: Cannot redefine property: name”

当writable或者enumerable为true时，属性可以重新使用Object.defineProperty()定义，这一点读者不妨自行测试。

本文所有代码示例都在Chrome 67上测试。

### 参考

*   [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
*   [Object.getOwnPropertyDescriptor()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
*   [StackOverflow: Why can't I redefine a property in a Javascript object?](https://stackoverflow.com/questions/25517989/why-cant-i-redefine-a-property-in-a-javascript-object/51112727#51112727)

### 关于Fundebug

[Fundebug](https://www.fundebug.com)专注于JavaScript、微信小程序、微信小游戏，Node.js和Java实时BUG监控。  
自从2016年双十一正式上线，Fundebug累计处理了5亿+错误事件，得到了众多知名用户的认可。欢迎免费试用！

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