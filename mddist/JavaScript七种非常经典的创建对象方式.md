JavaScript创建对象的方式有很多，通过Object构造函数或对象字面量的方式也可以创建单个对象，显然这两种方式会产生大量的重复代码，并不适合量产。接下来介绍七种非常经典的创建对象的方式，他们也各有优缺点。（内容主要来自于《JavaScript高级程序设计》，还参考了一下别人写的文章）

一、工厂模式
------

    function createPerson(name, job) { 
     var o = new Object();
     o.name = name;
     o.job = job;
     o.sayName = function() { 
      console.log(this.name); 
     } 
     return o 
    } 
    var person1 = createPerson('Mike', 'student') 
    var person2 = createPerson('X', 'engineer') 

可以无数次调用这个工厂函数，每次都会返回一个包含两个属性和一个方法的对象。  
工厂模式虽然解决了创建多个相似对象的问题，但是没有解决对象识别问题，即不能知道一个对象的类型。

二、构造函数模式
--------

    function Person(name, job) { 
     this.name = name;
     this.job = job;
     this.sayName = function() { 
      console.log(this.name);
     } 
    } 
    var person1 = new Person('Mike', 'student') 
    var person2 = new Person('X', 'engineer') 
    

没有显示的创建对象，使用new来调用这个构造函数，使用new后会自动执行如下操作：  
①创建一个新对象；  
②将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；  
③执行构造函数中的代码（为这个新对象添加属性）；  
④返回新对象。  
缺点：每个方法都要在每个实例上重新创建一遍。  
创建两个完成同样任务的的Function实例的确没有必要。况且有this对象在，根本不用在执行代码前就把函数绑定到特定的对象上，可以通过这样的形式定义：

    function Person( name, age, job ){
        this.name = name;
        this.age = age;
        this.job = job;
    
        this.sayName = sayName;
    }
    
    function sayName(){
        alert( this.name );
    }

如此一来，就可以将sayName()函数的定义转移到构造函数外部。而在构造函数内部，我们将sayName属性设置成全局的sayName函数。这样的话，由于sayName包含的是一个指向函数的指针，因此person1和person2对象就可以共享在全局作用域中定义的同一个sayName()函数。

这样做解决了两个函数做同一件事的问题，但是新的问题又来了：在全局作用域中定义的函数实际上只能被某个对象调用，这让全局作用域有点名不副实。而更重要的是：如果对象需要定义很多方法，那么就需要定义很多个全局函数，这样一来，我们自定义的这个引用类型就毫无封装性可言了。

这些问题可以通过使用原型模式来解决。

三、原型模式
------

    function Person() { 
    } 
    Person.prototype.name = 'Mike' 
    Person.prototype.job = 'student' 
    Person.prototype.sayName = function() { 
     console.log(this.name) 
    } 
    var person1 = new Person() 
    

将信息直接添加到原型对象上。使用原型的好处是可以让所有的实例对象共享它所包含的属性和方法，不必在构造函数中定义对象实例信息，而是可以将这些信息直接添加到原型对象中。  
①理解原型  
无论什么时候,只要创建了一个新函数,就会根据一组特定的规则为该函数创建一个prototype属性。  
在默认情况下，所有**prototype**属性都会自动获得一个**constructor**（构造函数）属性，这个属性包含一个指向**prototype**属性所在函数的指针。  
每当代码读取某个对象的某个属性时,都会执行一搜索，目标是具有给定名字的属性。搜索首先从对象实例本身开始。如果在实例中找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。如果在原型对象中找到了这个属性，则返回该属性的值。  
虽然可以通过对象实例访问保存在原型中的值，但却不能通过对象实例重写原型中的值。  
如果我们在实例中添加了一个属性，而该属性与实例中的一个属性同名，那么就会在实例中创建该属性，该属性将会屏蔽原型中的那个属性。  
即使是将属性设置为null，也只是在实例中的属性值为null。  
不过，使用delete操作符可以完全删除实例属性，从而能够重新访问原型中的属性。  
使用_hasOwnProperty()_ 方法可以检测一个属性是存在于实例中，还是存在与原型中。这个方法只在给定属性存在于对象实例中时，才会返回true。

②原型与in操作符  
in操作符会在通过对象能够访问给定属性时返回true，无论该属性是存在于实例中还是原型中。

③更简单的原型语法

    function Person(){    
    }
    Person.prototype = {
        name : "Mike",
        age : 29,
        job : "engineer",    
        syaName : function(){
            alert( this.name );
        }
    };

//在上面的代码中，将Person.prototype设置为等于一个以对象字面量形式创建的新对象。最终结果相同，但有一个例外：constructor属性不再指向Person。

四、组合使用构造函数模式和原型模式
-----------------

组合使用构造函数模式和原型模式是使用最为广泛、认同度最高的一种创建自定义类型的方法。它可以解决上面那些模式的缺点，使用此模式可以让每个实例都会有自己的一份实例属性副本，但同时又共享着对方法的引用，这样的话，即使实例属性修改引用类型的值，也不会影响其他实例的属性值了。还支持向构造函数传递参数，可谓是集两种模式的优点。

    function Person(name) { 
     this.name = name; 
     this.friends = ['Jack', 'Merry']; 
    } 
    Person.prototype.sayName = function() { 
     console.log(this.name); 
    } 
    var person1 = new Person(); 
    var person2 = new Person(); 
    person1.friends.push('Van'); 
    console.log(person1.friends) //["Jack", "Merry", "Van"] 
    console.log(person2.friends) // ["Jack", "Merry"] 
    console.log(person1.friends === person2.friends) //false 
    

五、动态原型模式
--------

动态原型模式将所有信息都封装在了构造函数中，初始化的时候。可以通过检测某个应该存在的方法是否有效，来决定是否需要初始化原型。

    function Person(name, job) { 
      // 属性 
     this.name = name;
     this.job = job;
     // 方法 
     if(typeof this.sayName !== 'function') { 
      Person.prototype.sayName = function() { 
        console.log(this.name) 
      } 
     } 
    } 
    var person1 = new Person('Mike', 'Student') 
    person1.sayName() 
    

只有在sayName方法不存在的时候，才会将它添加到原型中。这段代码只会初次调用构造函数的时候才会执行。此后原型已经完成初始化，不需要在做什么修改了,这里对原型所做的修改，能够立即在所有实例中得到反映。  
其次，if语句检查的可以是初始化之后应该存在的任何属性或方法，所以不必用一大堆的if语句检查每一个属性和方法，只要检查一个就行。

六、寄生构造函数模式
----------

这种模式的基本思想就是创建一个函数，该函数的作用仅仅是封装创建对象的代码，然后再返回新建的对象

    function Person(name, job) { 
      var o = new Object();
     o.name = name;
     o.job = job;
     o.sayName = function() { 
      console.log(this.name) 
     } 
     return o 
    } 
    var person1 = new Person('Mike', 'student') 
    person1.sayName() 
    

这个模式，除了使用new操作符并把使用的包装函数叫做构造函数之外，和工厂模式几乎一样。  
构造函数如果不返回对象，默认也会返回一个新的对象，通过在构造函数的末尾添加一个return语句，可以重写调用构造函数时返回的值。

七、稳妥构造函数模式
----------

首先明白稳妥对象指的是没有公共属性，而且其方法也不引用this。稳妥对象最适合在一些安全环境中(这些环境会禁止使用this和new)，或防止数据被其他应用程序改动时使用。  
稳妥构造函数模式和寄生模式类似，有两点不同:**1.是创建对象的实例方法不引用this；2.不使用new操作符调用构造函数**

    function Person(name, job) { 
     var o = new Object();
     o.name = name;
     o.job = job;
     o.sayName = function() { 
      console.log(name) //注意这里没有了"this"；
     } 
     return o 
    } 
    var person1 = Person('Mike', 'student') 
    person1.sayName();
    

和寄生构造函数模式一样，这样创建出来的对象与构造函数之间没有什么关系，instanceof操作符对他们没有意义

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