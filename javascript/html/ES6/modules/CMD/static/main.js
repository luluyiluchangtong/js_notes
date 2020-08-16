define(function (require, exports, module) {
    var changeText = require('changeText');
    var $ = require('jquery');
    var showText = function () {
        $('#title').text(changeText.init());
    }
    function box() { console.log('ss') }
    console.log('ss')

    exports.showText = showText;
})

const a = 23;
const b = 23;
const c = a + b;


