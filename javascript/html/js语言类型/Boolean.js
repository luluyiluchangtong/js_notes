// 基本类型 Boolean

//  "显示的创建 Boolean 对象" --- 基本包装类型(特殊的引用类型)：
let n = new Boolean(true);

//  "隐式的创建 Boolean 对象" --- 基本包装类型：
//  每当读取一个基本类型的值的时候，内部就 创建一个 对应的基本包装类型的 "对象"，从而让我们能够调用一些方法来操作这些数据
let n = true;

// 转型函数
Boolean(undefined / null / false / +0 / -0 / NaN); // false
// falsy列表 --- undefined  null  false  +0, -0, and NaN   ""  以及不传递任何参数时。 任何没有明确地存在于falsy列表中的东西，都是 truthy

var b = new Boolean(false);
if (b); //结果视为真
if (b == true); // 结果视为假
// 不要混淆原始的布尔值true和false 与 Boolean对象的真和假
