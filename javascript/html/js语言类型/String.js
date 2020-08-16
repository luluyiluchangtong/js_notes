// 所有基本类型的值都是不可改变的。但需要注意的是，基本类型本身和一个赋值为基本类型的变量的区别。
// 变量会被赋予一个新值，而原值不能像数组、对象以及函数那样被改变
let bar = "abc";
bar.toUpperCase();
console.log(bar); //bar   原值不可改变
bar = bar.toUpperCase();
console.log(bar); // BAR  变量被赋予一个新值

let arr = [];
arr.push(12);
console.log(arr); // [12]

// 基本类型 String

//  "显示的创建 string 对象" --- 基本包装类型(特殊的引用类型)：
let s = new String("hello"); // typeof => "object"

//  "隐式的创建 string 对象" --- 基本包装类型：
//  每当读取一个基本类型的值的时候，内部就 创建一个 对应的基本包装类型的 "对象"，从而让我们能够调用一些方法来操作这些数据
let s = "hello";
// 每当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型的对象，步骤：1. 创建实例  2.调用对应方法  3.销毁实例
// 从而让我们能够调用一些方法来操作这些数据。
let str = "abc";
str.split(" ");
console.log(str);

// 转型函数
// const Obj = {a: 34} | [1,2,3]
String("ab" / 21 / true / null / undefined / Obj); // "ab"/"21"/'true'/'null'/'undefined'/"[object Object]"/"1,2,3"
// js中所有的值都有一个默认的字符串形式

// StrObj 的方法
const str = "lu zheng yong";

// indexOf(searchValue [, fromIndex])    lastIndexOf()
// 参数1: 指定查找的值  参数2: 开始查找的位置
// 返回 指定值的第一次出现的索引
console.log(str.indexOf("lu")); // 0
console.log(str.indexOf("lu z")); // 0
console.log(str.indexOf("u")); // 1
console.log(str.indexOf("x")); // -1  不存在某个字符则返回 -1

// includes(searchString [, position])
// 参数1: 指定查找的值  参数2: 开始查找的位置
// 返回 Boolean 包含查找的值 true 不包含 false
console.log(str.includes("n"));

// charAt(index)    charCodeAt(index)
const str1 = str.charAt(2);
console.log(str1); // z  返回 '指定索引' 下的 字符   或直接使用 str[2]

const str1 = str.charCodeAt(2);
console.log(str1); // 122  返回 '指定索引' 下的 字符编码

// trim()
let str = " a b ";
console.log(str.length); // 5

const str1 = str.trim(); // 去除前后空格
console.log(str1); // 3

const str2 = str.replace(/\s*/g, ""); // 去除所有空格
console.log(str2.length); // 2

// substring(indexStart[, indexEnd])
let str = "luZhengYong";
const str1 = str.substring(1, 2);
console.log(str1); // u  返回一个 子集  若有负的参数/NaN, 被当作 0

const str1 = str.substring(20, 2);
console.log(str1); // zheng yong  如果 indexStart 大于 indexEnd，则 substring 的执行效果就像两个参数调换了一样

const str2 = str.substring(4, 4);
console.log(str2); // ""

// substr()
const str2 = str.substr(1, 2);
console.log(str2); // uz
// 返回一个 子集  是 subString 的一个变本,
// 由于传递参数为 负值 的情况下（ 就是倒数第几个开始） IE 会有兼容性问题，未来可能会被弃用!!
// 即在需要兼容 IE 又用到负值的情况下请使用 slice() 代替

//   slice(beginSlice[, endSlice])
const str1 = str.slice(1, 2);
console.log(str1);
//   同 substring() 同时 它还可以传递负值,  相当于 strLength + 负值

//  split([separator[, limit]])
//  参数1: 指定作为分隔符的 字符串  参数2: 指定返回的分割片段的数量
//  返回 字符串数组
const str1 = str.split("n");
console.log(str1); // ["luzhe", "gyo", "g"]
//   split("")  split(" ")  split()  三种不同的情况对应不同的结果

//  判断 指定的字符 在字符串中出现的 次数
const str1 = str.split("e").length;
const display = str1 - 1;
console.log(display); // 1

var i = 0;
for (let ele in str) {
  if (str[ele] === "a") {
    i++;
  }
}
console.log(i);

//   repeat(count)
const str1 = str.repeat(2);
console.log(str1); // luzhengyongluzhengyong

//   replace(substr|regexp, newSubStr|function)
const str1 = str.replace("lu", "zhang");
console.log(str1); // zhang zheng yong

function box() {
  return "li";
}
const str1 = str.replace("lu", box);
console.log(str1); // li zheng yong

// toUpperCase()
const str1 = str.toUpperCase();
console.log(str1); //LUZHENGYONG

// startsWith()
const str1 = str.startsWith("lu");
console.log(str1); //true   是否以给定的某个字符串开头

// endsWith()
const str1 = str.endsWith("ong");
console.log(str1); //true

// concat()
const str1 = str.concat("abc");

// 模板字符串  占位符: `${变量或表达式}`  只能是一个 变量或表达式！！
const age = 25;
const strTemplete = `my age is ${age}`;
console.log(strTemplete);
const name = "lilei";
let message = `Hello, ${`my name is ${name}`}.`;
// 将模板字面量嵌入到另一个模板字面量内部

// String 对象的属性
// String.prototype  所有 String 实例都继承自 String.prototype

// String 对象的方法
// fromCharCode()
// fromCodePoint()
// raw()

// 查找最后一个字符
// Str[length-1]

// 标签模板
// 标签模板是在反引号前面引入一个标签（tag）。该标签是一个函数，用于处于定制化模板字符串后返回值
var name = "丁香医生";
var desc = "丁香医生是面向大众的科普性健康类网站";
tag`公司名：${name}简介：${desc}`;

// 字符串模板？？？
