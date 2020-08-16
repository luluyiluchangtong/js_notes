"use strict";
// 基础类型
// 布尔值
var isBoolean = true;
// 数字
var isNumber = 90;
// 字符串
var isString = "li ming";
var age = 23;
var theStudent = "my name is " + isString;
console.log(theStudent);
// 数组
var isArray = [1, 2, 3];
var isArray1 = [1, 2, 3];
// 元组 --- 一个已知 数量 和 类型 的数组         ???当访问一个越界的元素，会使用联合类型替代???
var isTuple = ["abc", 34];
// 枚举  --- 为一组 数值 赋予 名字，
var Color;
(function (Color) {
    //   Red = 1, 默认是从 0 开始，可手动 指定成员的 数值
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["blue"] = 2] = "blue";
})(Color || (Color = {}));
var c = Color.Green;
console.log(c);
var colorName = Color[2];
console.log(colorName);
console.log(Color[2]);
// Any --- 不希望 类型检查器 对以下情况进行检查而是直接让它们通过编译阶段的检查
// "不清楚类型的变量/来自动态的内容/对现有代码进行改写/只知道部分数据类型"
var notSure = "str";
notSure = 34;
notSure = [1, 2, 3];
// Void --- 当一个函数没有返回值的时候，定义返回值类型为  void
function warnUser() {
    console.log("This is my warning message");
}
// null undefined  ---  是所有类型的子类型
// never --- 为那些永远不存在值的 函数或变量 定义的类型
function error(message) {
    throw new Error(message);
}
// Object --- 非原始类型， 是引用类型
// declare function create(o: object | null): void;
// create([1, 2, 3]); // OK
// create({ a: "aa" }); // OK
// create(null); // OK
// 类型断言
var str = "my name is lu";
var strLength = str.length; // 即这里断言 str 就是一个 string 类型
