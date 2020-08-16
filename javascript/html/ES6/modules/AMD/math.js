// require.js加载的模块，采用 AMD 规范。也就是说，模块必须按照 AMD 的规定来写
　
define(function () {　　　　
    var add = function (x, y) {　　　　　　
        return x + y;　　　　
    };　　　　
    return {　　　　　　
        add: add　　　　
    };　　
});

// 当定义的模块 依赖 其他的模块时　
define(['myLib'], function (myLib) {　　　　
    function foo() {　　　　　　
        myLib.doSomething();　　　　
    }　　　　
    return {　　　　　　
        foo: foo　　　　
    };　　
});