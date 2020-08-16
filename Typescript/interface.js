"use strict";
// 接口
var p1 = { x: 34, y: 89 };
// 只读数组
var readonlyArray = [1, 2, 3];
// 2.引用接口
function person(personObj) {
    console.log(personObj.name);
}
// 3.定义接口
var thePerson = { name: "li", age: 23 };
person(thePerson);
// 可通过接口 声明如下类型
// 1.函数类型
