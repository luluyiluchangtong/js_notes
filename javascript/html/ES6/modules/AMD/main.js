// 使用require.config()方法，我们可以对模块的加载行为进行自定义
require.config({
    paths: {
        "jquery": "jquery.min",
        "underscore": "underscore.min",
        "backbone": "backbone.min",
        shim: { // 加载没有按 AMD要求写的模块时 需要定义 shim 对象。 exports --- 输出变量  deps --- 模块的依赖项
            'underscore': {
                exports: '_'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        },
        "math": "math"
    }
});
// require.js要求，每个模块是一个单独的js文件
// require.js提供了一个优化工具 uglify.js ，当模块部署完毕以后，可以用这个工具将多个模块合并在一个文件中，减少HTTP请求数。

// require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {　　　　
//     // some code here
//     // 加载的模块会以 参数 的形式传入回调函数， 从而在回调函数内部就可以使用这些模块。
//     　　});

require(['math'], function (math) {
    alert(math.add(1, 1));
});