undefined // 没有值       是全局对象的一个属性

undefined
// 未赋值的变量的返回值;  没有返回值的函数返回的也是 undefined 
// null  undefined
null == undefined; // true   
null === undefined; // false
NaN == NaN;
NaN === NaN; // false
-
0 === +0; // true
Object.is(NaN, NaN) // true
Object.is(-0, +0) // false
// Object.is()用于处理这种特殊情况, 一般使用 ==  ===，因为效率会更高！

var a;
a + 2 // NaN  '数值类型环境中'  undefined 值会被转换为 NaN。

var n = null;
console.log(n * 32); // 0   空值 null 在 '数值类型环境中' 会被当作0来对待，而 '布尔类型环境中' 会被当作 false