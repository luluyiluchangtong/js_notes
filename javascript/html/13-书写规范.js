// if (value.length < 8) { // 为什么要小于 8，8 表示啥？长度，还是位移，还是高度？Oh,my God!!
//     ....
// }

// const MAX_INPUT_LENGTH = 8;
// if (value.length < MAX_INPUT_LENGTH) { // 一目了然，不能超过最大输入长度
//     ....
// }

// 对于求值获取的变量，没有兜底
// const MIN_NAME_LENGTH = 8;
// let lastName = fullName[1];
// if(lastName.length > MIN_NAME_LENGTH) { // 这样你就给你的代码成功的埋了一个坑，你有考虑过如果 fullName = ['jackie'] 这样的情况吗？这样程序一跑起来就爆炸。要不你试试。
//     ....
// }

// 对于求值变量，做好兜底
// const MIN_NAME_LENGTH = 8;
// let lastName = fullName[1] || ''; // 做好兜底，fullName[1] 中取不到的时候，不至于赋值个 undefined, 至少还有个空字符，从根本上讲，lastName 的变量类型还是 String，String 原型链上的特性都能使用，不会报错。不会变成 undefined。
// if(lastName.length > MIN_NAME_LENGTH) {
//     ....
// }
// 其实在项目中有很多求值变量，对于每个求值变量都需要做好兜底。
// let propertyValue = Object.attr || 0; // 因为 Object.attr 有可能为空，所以需要兜底。
// 但是，赋值变量就不需要兜底了。
// let a = 2; // 因为有底了，所以不要兜着。
// let myName = 'Tiny'; // 因为有底了，所以不要兜着。

// 从命名无法知道返回值类型，，对于返回 true or false 的函数，最好以 should/is/can/has 开头，，对于其他的返回类型函数，可类似使用。。即 语义化 函数命名
// function showFriendsList() {....}
// 现在问，你知道这个返回的是一个数组，还是一个对象，还是 true or false。你能答的上来否？你能答得上来我请你吃松鹤楼的满汉全席还请你不要当真。

// 一个函数完成一个独立的功能，不要一个函数混杂多个功能, 如果你的函数中会根据某个布尔参数产生不同的分支，那就拆分这个函数
// 这是软件工程中最重要的一条规则，当函数需要做更多的事情时，它们将会更难进行编写、测试、理解和组合

// 函数内使用 if 语句时， 可使用多态 class extends 来实现相同的任务。。 把不变的部分隔离出来，把可变的部分封装起来，
// 相对于修改代码来说，仅仅增加代码就能完成同样的功能，这显然优雅和安全得多
// 多态最根本的作用就是通过把过程化的条件分支语句转化为 对象的多态性 ，从而消除这些条件分支语句
var makeSound = function (animal) {
  animal.sound();
};

var Duck = function () {};
Duck.prototype.sound = function () {
  console.log("嘎嘎嘎");
};

var Chicken = function () {};
Chicken.prototype.sound = function () {
  console.log("咯咯咯");
};

makeSound(new Duck()); // 嘎嘎嘎
makeSound(new Chicken()); // 咯咯咯

// 尽量使用箭头函数
// function foo() {
//   // code
// }

// let foo = () => {
//   // code
// };

// 尽量使用class 类实现继承

// 使用 短语句 代替 条件语句   var a=b?c:d  var a=b||c   代替  if else

// 函数的参数 避免使用超过 2 个， 如果有需要传入多个参数，可使用 对象代替  let obj={a:1,b:2,c:3}  function Fn(obj){} 代替 function Fn(a:1,b:2,c:3){}

// 构造函数命名  function MyPerson(){},  普通函数命名  function myPerson(){},  变量命名 var my_person,  私有变量  _name

// 书写API文档: 通过代码注释自动生成文档,  相关工具  http://yuilibrary.com/projects/yuidoc
