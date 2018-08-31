![clipboard.png](/img/bVbfzuo?w=828&h=838 "clipboard.png")

您是否曾想过按住按钮几秒钟才能在Vue应用程序中执行某个功能？

您是否曾想在应用程序上创建一个按钮，通过按一次（或按住按钮的整个输入）来清除单个输入？

如果你曾有过这些想法，很好，我也是。那么恭喜你看到了这篇文章。

本文将解释如何通过按下（或按住）按钮来执行功能和删除输入。

首先，我将解释如何在VanillaJS中实现这一目标。然后，为它创建一个Vue指令。

那么，让我们开始吧。

### 原理

为了实现长按，用户需要按住按钮几秒钟。

要在代码中复制它，我们需要在按下鼠标“单击”按钮时监听，启动计时器，不管我们希望用户在执行函数之前按住按钮，并在时间设置之后执行该功能。

非常简单！但是，我们需要知道用户何时按住该按钮。

### 怎么做

当用户单击按钮时，在单击事件之前会触发另外两个事件： mousedown 和 mouseup 。

当用户按下鼠标按钮时会调用 _mousedown_ 事件，而当用户释放该按钮时会调用mouseup事件。

我们需要做的就是：

发生mousedown事件后启动计时器。

清除该计时器，并且在2secs标记之前触发mouseup事件后不执行该函数。即完整点击事件。

只要计时器在到达那个时间之前没有被清除，我们就会发现mouseup事件没有被触发 - 我们可以说用户没有释放按钮。因此，它被认为是长按，然后我们可以继续执行所述功能。

### 实际操作

让我们深入研究代码并完成这项工作。

首先，我们必须定义3件事，即：

_variable_ 用于存储计时器。

_start_ 函数启动计时器。

_cancel_ 函数取消定时器

### 变量

这个变量基本上保存了setTimeout的值，所以我们可以在发生mouseup事件时取消它。

    let pressTimer = null;

我们将变量设置为null，这样我们就可以检查变量，以便知道当前是否有一个活动定时器，然后才能取消它。

### 启动功能

该函数由setTimeout组成，它基本上是Javascript中的一种方法，它允许我们在函数中声明的特定持续时间之后执行函数。

请记住，在创建click事件的过程中，会触发两个事件。但我们需要启动计时器的是mousedown事件。因此，如果是单击事件，我们不需要启动计时器。

    
    // Create timeout ( run function after 1s )
    let start = (e) => {
        
        // Make sure the event trigger isn't a click event
        if (e.type === 'click' && e.button !== 0) {
            return;
        }
        // Make sure we don't currently have a setTimeout running
        // before starting another
        if (pressTimer === null) {
            pressTimer = setTimeout(() => {
                // Execute soemthing !!!
            }, 1000)
        }
    }

### 取消功能

这个函数基本上就是名字所说的，取消了调用start函数时创建的setTimeout。

要取消setTimeout，我们将在javascript中使用 _clearTimeout_ 方法，该方法基本上清除了使用setTimeout（）设置的计时器方法。

在使用clearTimeout之前，我们首先需要检查 _pressTimer_ 变量是否设置为null。如果它未设置为null，则表示存在活动计时器。所以，我们需要清除计时器，你猜对了，将 _pressTimer_ 变量设置为 _null_ 。

    let cancel = (e) => {
        // Check if timer has a value or not
        if (pressTimer !== null) {
            clearTimeout(pressTimer)
            pressTimer = null
        }
    }

一旦 _mouseup_ 事件被触发，就会调用此函数。

### 设置触发器

剩下的就是将事件监听器添加到要添加长按效果的按钮上。

    addEventListener("mousedown", start);
    addEventListener("click", cancel);

总而言之，我们有：

    // Define variable
    let pressTimer = null;
    
    // Create timeout ( run function after 1s )
    let start = (e) => {
    
        if (e.type === 'click' && e.button !== 0) {
            return;
        }
    
        if (pressTimer === null) {
            pressTimer = setTimeout(() => {
    
                // Execute something !!!
    
            }, 1000);
        }
    }
    
    // Cancel Timeout
    let cancel = (e) => {
    
        // Check if timer has a value or not
        if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
        }
    }
    
    // select element with id longPressButton
    let el = document.getElementById('longPressButton');
    
    // Add Event listeners
    el.addEventListener("mousedown", start);
    
    // Cancel timeouts if this events happen
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);

### 将它全部包装在Vue指令中

在创建Vue指令时，Vue允许我们在组件的全局或本地定义指令，但在本文中我们将使用全局路由。

让我们构建完成此任务的指令。

首先，我们必须声明自定义指令的名称。

    Vue.directive('longpress', {
      
    }

这基本上注册了一个名为 _v-longpress的全局自定义指令._

接下来，我们使用一些参数添加bind _hook函数_ ，这允许我们引用元素指令绑定，获取传递给指令的值并标识使用该指令的组件。

    
    Vue.directive('longpress', {
      bind: function (el, binding, vNode) {
        
      }
    }

接下来，我们在bind函数中添加我们的长按javascript代码。

    Vue.directive('longpress', {
        bind: function (el, binding, vNode) {
    
            // Define variable
            let pressTimer = null
    
            // Define funtion handlers
            // Create timeout ( run function after 1s )
            let start = (e) => {
    
                if (e.type === 'click' && e.button !== 0) {
                    return;
                }
    
                if (pressTimer === null) {
                    pressTimer = setTimeout(() => {
                        // Execute something !!!
                    }, 1000)
                }
            }
    
            // Cancel Timeout
            let cancel = (e) => {
                // Check if timer has a value or not
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
            }
    
            // Add Event listeners
            el.addEventListener("mousedown", start);
            // Cancel timeouts if this events happen
            el.addEventListener("click", cancel);
            el.addEventListener("mouseout", cancel);
        }
    })

接下来，我们需要添加一个函数来运行将传递给 _longpress_ 指令的方法。

    // Long Press vue directive
    Vue.directive('longpress', {
        bind: function (el, binding, vNode) {
    
            // Define variable
            let pressTimer = null
    
            // Define funtion handlers
            // Create timeout ( run function after 1s )
            let start = (e) => {
    
                if (e.type === 'click' && e.button !== 0) {
                    return;
                }
    
                if (pressTimer === null) {
                    pressTimer = setTimeout(() => {
                        // Execute function
                        handler()
                    }, 1000)
                }
            }
    
            // Cancel Timeout
            let cancel = (e) => {
                // Check if timer has a value or not
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
            }
            // Run Function
            const handler = (e) => {
                // Execute method that is passed to the directive
                binding.value(e)
            }
    
            // Add Event listeners
            el.addEventListener("mousedown", start);
    
            // Cancel timeouts if this events happen
            el.addEventListener("click", cancel);
            el.addEventListener("mouseout", cancel);
            
        }
    })
    

现在我们可以在我们的Vue应用程序中使用该指令，该指令将正常工作，直到用户添加的值不是指令值中的函数。所以我们必须通过在发生这种情况时警告用户来防止这种情况。

要警告用户，我们将以下内容添加到bind函数：

    // Make sure expression provided is a function
    if (typeof binding.value !== 'function') {
      // Fetch name of component
      const compName = vNode.context.name
      // pass warning to console
      let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
      if (compName) { warn += `Found in component '${compName}' ` }
      console.warn(warn)
    }

最后，这个指令也适用于触控设备。所以我们为 touchstart ， touchend ＆ touchcancel 添加事件监听器。

把所有东西放在一起：

    Vue.directive('longpress', {
        bind: function (el, binding, vNode) {
            // Make sure expression provided is a function
            if (typeof binding.value !== 'function') {
                // Fetch name of component
                const compName = vNode.context.name
                // pass warning to console
                let warn = `[longpress:] provided expression '${binding.expression}' is not a function, but has to be`
                if (compName) { warn += `Found in component '${compName}' ` }
    
                console.warn(warn)
            }
    
            // Define variable
            let pressTimer = null
    
            // Define funtion handlers
            // Create timeout ( run function after 1s )
            let start = (e) => {
    
                if (e.type === 'click' && e.button !== 0) {
                    return;
                }
    
                if (pressTimer === null) {
                    pressTimer = setTimeout(() => {
                        // Run function
                        handler()
                    }, 1000)
                }
            }
    
            // Cancel Timeout
            let cancel = (e) => {
                // Check if timer has a value or not
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = null
                }
            }
            // Run Function
            const handler = (e) => {
                binding.value(e)
            }
    
            // Add Event listeners
            el.addEventListener("mousedown", start);
            el.addEventListener("touchstart", start);
            // Cancel timeouts if this events happen
            el.addEventListener("click", cancel);
            el.addEventListener("mouseout", cancel);
            el.addEventListener("touchend", cancel);
            el.addEventListener("touchcancel", cancel);
        }
    })

现在引用我们的Vue组件：

    <template>
        <div>
            <button v-longpress="incrementPlusTen" @click="incrementPlusOne">{{value}}</button>
        </div>
    </template>
    
    <script>
    export default {
        data() {
            return {
                value: 10
            }
        },
        methods: {
            // Increment value plus one
            incrementPlusOne() {
                this.value++
            },
            // increment value plus 10
            incrementPlusTen() {
                this.value += 10
            }
        }
    }
    </script>

如果您希望了解有关自定义指令的更多信息，可以使用的钩子函数，可以传递给此钩子函数的参数，函数缩写。伟大的家伙@vuejs在解释它[这里](https://vuejs.org/v2/guide/custom-directive.html)方面做得很好。

成功 !!!

### 插件：[LogRocket](#)，一个用于网络应用的DVR(录像机)

![clipboard.png](https://static.segmentfault.com/v-5b7544bd/global/img/squares.svg "clipboard.png")

[LogRocket](https://logrocket.com/signup/)是一个前端日志记录工具，可让您像在自己的浏览器中一样重放问题。LogRocket不是猜测错误发生的原因，也不是要求用户提供屏幕截图和日志转储，而是让您重播会话以快速了解出现了什么问题。它适用于任何应用程序，无论框架如何，并且具有从Redux，Vuex和@ngrx / store记录其他上下文的插件。  
除了记录Redux操作和状态之外，LogRocket还记录控制台日志，JavaScript错误，堆栈跟踪，带有标题+正文的网络请求/响应，浏览器元数据和自定义日志。它还使用DOM来记录页面上的HTML和CSS，重新创建即使是最复杂的单页应用程序的像素完美视频。

[在这里试一试吧。](https://logrocket.com/signup/)

附：[代码示范来源](https://gist.github.com/c0depanda)点击预览

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