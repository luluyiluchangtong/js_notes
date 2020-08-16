// 基本类型 Number

// 什么是  64位双精度浮点型（double-precision 64-bit floating point format） (IEEE 754) ？？？？？

//  "显示的创建 Number 对象" 基本包装类型(特殊的引用类型)：
let n = new Number(24);

//  "隐式的创建 Number 对象"  基本包装类型：
//  每当读取一个基本类型的值的时候，内部就 创建一个 对应的基本包装类型的 "对象"(new Number())，从而让我们能够调用一些方法来操作这些数据
let n = 24;
// 每当读取一个基本类型的时候，后台就会创建一个对应的基本包装类型的对象，步骤：1. 创建实例  2.调用对应方法  3.销毁实例
// 从而让我们能够调用一些方法来操作这些数据。
let Num = 1243.235;
Num.toFixed(1);
console.log(Num.toFixed(1));

//   转型函数
// const Obj = {a: 34} | [1,2,3]
Number(24 / "ab" / true / false / null / undefined / Obj);
//     24 / NaN /   1  /    0  /   0  /   NaN     /  NaN

// numObj 的方法
// toFixed()  指定 小数部分 的显示位数，多于实际位数就用 0 补齐。
let num = 42.63245;
num.toFixed(0 / 1 / 2);
(42.63245).toFixed(0 / 1 / 2); // 42  42.6  42.63

// toPrecision()  指定 有效位数 的显示位数
num.toPrecision(1 / 2 / 3);
(42.63245).toPrecision(1 / 2 / 3); // 4e+1  43  42.6

//  Number对象的属性
Number.MAX_VALUE; // 1.7976931348623157e+308 最大数值
Number.MIN_VALUE; //  5e-324 最小数值
Number.MAX_SAFE_INTEGER; // 9007199254740991 最大安全整数
Number.MIN_SAFE_INTEGER; //  -9007199254740991 最小安全整数
Number.POSITIVE_INFINITY; // infinity
Number.NEGATIVE_INFINITY; // -infinity
Number.prototype; // 所有 Number 实例都继承自 Number.prototype

//   Number 对象的方法
//   isInteger()   检测 值 是否是整数
Number.isInteger(42 / 42.3); // true/false

//   isSafeInteger()   检测 值  是否是安全整数
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true

//   isFinite();  判断是否是有限数字
Number.isFinite();

//   isNaN(value)
//   isNaN 中的 NaN  只有在 1. 参数 是真正的数字类型， 2.且值为 NaN 的时候(计算失败)才会返回 true
//   和全局函数 isNaN() 相比，Number.isNaN() 不会强制将参数转换成数字， 用 Number.isNaN()更靠谱
Number.isNaN(1 / "foo"); //true
console.log(Number.isNaN(1 * "f")); // true
console.log(Number.isNaN(1 + "1")); // false
Number.isNaN(NaN); // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0); // true
console.log(Number.isNaN(0 / 1)); // false
console.log(Number.isNaN(1 / 0)); // false

// parseInt(string,radix)  parseFloat(string) 把一个 表示数字的字符串 解析成 整数/浮点数,
// 转换第一个无效字符之前的字符串. 和全局方法是一样的..   radix 代表该进位系统的数字
// 浮点数：包含 小数点 小数位   12.5
var a = "42";
var b = "42px";
Number.parseInt(a); // 42  传递进去的必须是 字符串(非则强制转换)。 第二个参数默认是  10 进制的  ！！js中所有的值都有一个默认的字符串形式！
Number.parseFloat(a); // 42

// 将 一个表示数字的字符串 转换 为对应的数字另两种方法（是使用一元加法运算符, Number() ）：
var a = "34";
// 方式一： +a  a++
// 方式二： Number(a);
// 方式三： parseInt() / parseFloat(); // parseInt() 是解析字符串， 相对于前两种 转换字符串方法 会慢一些。。
var a = "45";
var b = a++;
console.log(typeof +a); // number
console.log(typeof b); // number
console.log(b); // 45
console.log(a); //46

// 数字转字符串
var a = 90;
toString();
a + "";

// Number的 toString() 覆盖了Object.prototype.toString(); 而不是继承

// 什么时候返回 NaN :

// 1.无穷大除以无穷大、
// 2.给任意负数做开方运算
// 3.算数运算符与不是数字或无法转换为数字的操作数一起使用时都将返回 NaN
Infinity / Infinity; // 无穷大除以无穷大
Math.sqrt(-1); // 给任意负数做开方运算
"a" - 1; // 算数运算符与不是数字或无法转换为数字的操作数一起使用
"a" * 1;
"a" / 1;

parseInt("a"); // 字符串解析成数字
parseFloat("a");
