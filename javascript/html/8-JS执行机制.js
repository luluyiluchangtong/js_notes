// 解释器：直接执行用编程语言编写的指令的程序
// 编译器：把源代码转换成（翻译）低级语言的程序

// js 编译机制和运行原理
// 对变量进行赋值所执行的查询叫 LHS。
// 找到并使用变量值所执行的查询叫 RHS。
// JS引擎在你的代码执行的前一刻（有时是在执行期间！）编译它， 编译大致有三个步骤：1.词法分析 2.解析成抽象的语法树 3.代码生成
// var a=2 --- 编译器 通过 作用域 查看 var a， 没有则让作用域声明;  js引擎通过 作用域 查找 a 并将值 2 赋值给 a， a=2。 没有则报错！
// 总结来说：变量的赋值会执行两个操作，首先 ---编译器--- 会在当前作用域 “声明” 一个变量（如果之前没有声明过），
// 然后在运行时 ---引擎--- 会在当前作用域中 “查找” 该变量（找不到就向上一级作用域查找），如果能够找到就会对它赋值。
// ---引擎---在为变量赋值的时候会在作用域中 查找 变量，但是执行怎样的查找，用什么方式，会对最终的查找结果造成影响
// 这意味着，无论声明出现在作用域中的什么地方，都将在代码本身被执行前首先进行处理。
//  编译器 ---> 作用域 <--- 引擎

// var a=2; 实际上是被 js引擎 看成了两部分： 编译阶段 var a   执行阶段 a=2 ，这里变量和函数声明会被移动到代码顶端，这就是在作用域中 “提升”的概念。

// 软件设计中，应该遵循最小限度的暴露必要内容原则，在选择作用域来包含 "变量" 和 "函数"时，则是最小限度的暴露在全局作用域中
// 函数是 js 中最常用的 作用域单元

// 查询操作LHS： b=  c=  a=2         LHS找不到变量会自动在全局创建一个
// 赋值操作RHS： foo(2)  =a  a+  +b  RHS找不到变量会抛出错误ReferenceError

// 例子1：
function foo(a) {
  // 这里隐式包含了 a = 2 这个赋值，所以对 a 进行了 LHS 查询
  var b = a;
  // 这里对 a 进行了 RHS 查询，找到 a 的值，然后对 b 进行 LHS 查询，把 2 赋值给 b
  return a + b;
  // 这里包含了对 a 和 b 进行的 RHS 查询
}

// js引擎对变量进行查询操作的方式：LHS --- 对变量进行赋值操作（当变量在左边）  RHS --- 获取变量的值（当变量在右边）

// stack 栈（执行栈）  queue 队列（异步任务队列）   heap 堆（内存堆）

// V8 引擎主要由两部分组成：
// 内存堆：这是  内存分配 的地方
// 调用栈：这是  代码执行 的地方

// 调用栈： '调用栈' 是解释器（比如浏览器中的 JavaScript 解释器）追踪函数执行流的一种机制,是一种拥有 LIFO（后进先出）数据结构的栈
// 每调用一个函数，解释器就会把该函数添加进 '调用栈' 并开始执行。
// 正在 '调用栈' 中执行的函数还调用了其它函数，那么新函数也将会被添加进 '调用栈' ，一旦这个函数被调用，便会立即执行。
// 当前函数执行完毕后，解释器将其清出 '调用栈' ，继续执行当前执行环境下的剩余的代码。
// 当分配的 '调用栈' 空间被占满时，会引发“堆栈溢出”错误

function foo() {
  throw new Error("SessionStack will help you resolve crashes :)");
}
function bar() {
  foo();
}
function start() {
  bar();
}
start();

// 会生成以下的堆栈追踪:  foo -> bar -> start
//                     foo()
//          bar()      bar()      bar()
// start()  start()    start()    start()   start()
// 即 先分配调用栈，再按 后进先出 执行其中的函数

function multiply(x, y) {
  return x * y;
}
function printSquare(x) {
  var s = multiply(x, x);
  console.log(s);
}
printSquare(5);

// 会生成以下的堆栈追踪:   console.log(s) -> multiply(x, x) -> printSquare(5)

// 回调函数在没有终止条件的情况下调用自己，会造成 “堆栈溢出” 错误！！
function foo() {
  foo();
}
foo();
// Maximum call stack size exceeded

// '调用栈' 中的函数调用需要大量的时间来处理，事实上，问题是当 '调用栈' 有函数要执行，浏览器就不能做任何事，它会被堵塞住，
// 一旦你的浏览器开始处理 '调用栈' 中的众多任务，大多数浏览器都会停止响应并报一个错误，询问你是否想终止 web 页面
// 那么，如何在不阻塞 UI 的情况下执行复杂的代码，让浏览器不会不响应?解决方案就是 '异步回调'

// js 的执行机制：
// javascript是一门单线程语言
// Event Loop是javascript的执行机制
// '执行' 和 '运行' 有很大的区别，javascript在不同的环境下，比如node，浏览器，Ringo等等，执行方式是不同的。而运行大多指javascript解析引擎，是统一的

// 定时器：setTimeout()/clearTimeout()  setInterval()/clearInterval()
// 传递给 setTimeOut() 中函数的参数必须放在末尾。
function sayHi(who) {
  alert("Hello " + who + "!");
}
let myGreeting = setTimeout(sayHi, 2000, "Mr. Universe");

// 递归 setTimeout() 类似 setInterval()  前者代码 执行间隔 相等，后者代码 执行间隔 包括运行代码所用时间
let i = 1;

setTimeout(function run() {
  console.log(i);
  i++;
  setTimeout(run, 100);
}, 100);

// 立即执行的异步
setTimeout(alert("s"), 0); // 即所有主线程执行完毕后最先执行的异步代码

function box() {
  console.log("a");
}
let clear = setInterval(box, 3000);
// setTimeout() 或 setInterval() 返回一个值，，这个值 传递给 clearTimeout() 或 clearInterval()
clearTimeout(clear);
// 设定一个定时器 150ms 后执行，并不代表，150ms后代码会马上执行，只是在 150ms后代码被加入到 '任务队列' 中，如果此时队列中没有其他代码，主线程 空闲时 才会去执行，
// 所以时间的设定只是任务队列里的一个先后顺序，并不能保证就是这个时间准确到时就执行。。
// 设定 0ms 时是在 主线程 空闲最早的时候执行。即主线程的任务全部执行完毕时

// 除了广义的同步任务和异步任务，我们对任务有更精细的定义：
// macro-task(宏任务)：包括整体代码 script setTimeout setInterval
// micro-task(微任务)：Promise  process.nextTick  Promise.then

// 进入整体代码(宏任务)后，开始第一次循环: 进入整体代码(宏任务)的第一个执行队列。接着按顺序执行 “整体代码(宏任务)下的” 所有微任务
// 然后再次从下一个宏任务开始，找到宏任务其中一个任务队列执行完毕，再执行 “下一个宏任务之后 '所有的' ” 微任务。
// 完了，再次执行下一个宏任务。。
// 这里宏任务的队列是： yi  er  san
// 这里微任务的队列是： si  wu  liu
// 执行顺序是： yi  si  er  wu  san   liu      主线程（宏任务）--- 微任务 --- 宏任务 --- 微任务
console.log("1"); // yi
setTimeout(function () {
  // er
  console.log("2");
  process.nextTick(function () {
    console.log("3");
  });
  new Promise(function (resolve) {
    // wu  // Promise 的执行器会立即执行，早于源代码中在其之后的任何代码,和 setTimeout机制一样。
    console.log("4");
    resolve();
  }).then(function () {
    console.log("5");
  });
});

process.nextTick(function () {
  console.log("6");
});

new Promise(function (resolve) {
  // si
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

setTimeout(function () {
  // san
  console.log("9");
  process.nextTick(function () {
    console.log("10");
  });
  new Promise(function (resolve) {
    // liu
    console.log("11");
    resolve();
  }).then(function () {
    console.log("12");
  });
});
console.log("13"); // yi
// 1  7  13 6  8       2  4  3  5      9  11 10 12
// 分三轮出结果。。先执行宏
// 第一轮：宏任务 -> 微任务：同步代码script > promise > process.nextTick > promise.then >   1  7  13 6  8
// 第二轮：宏任务 -> 微任务：setTimeout / setInterval > promise > process.nextTick > promise.then    2  4  3  5
// 第三轮：宏任务 -> 微任务：setTimeout / setInterval > promise > process.nextTick > promise.then    9  11 10 12
// 宏任务：同步代码script  setTimeout  setInterval
// 微任务：promise  process.nextTick  promise.then
