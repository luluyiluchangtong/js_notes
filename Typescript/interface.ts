// 接口

// 1.声明接口

// 带有 可选属性 的接口,
// 可选属性的好处之一是可以对可能存在的属性进行预定义，好处之二是可以捕获引用了不存在的属性时的错误
interface Person {
  name1?: string;
  age1?: number;
}

// 带有 只读属性 的接口
interface Point {
  readonly x: number;
  readonly y: number;
}
let p1: Point = { x: 34, y: 89 };

// 只读数组
let readonlyArray: ReadonlyArray<number> = [1, 2, 3];

// 额外的属性检查
interface Person {
  name1?: string;
  age1?: number;
  [propName: string]: any; // 定义的时候可以传入 额外的 '键值对', 即 接口内未声明的 键值对
}

// 普通接口
interface Person {
  name: string;
  age: number;
}
// 2.引用接口
function person(personObj: Person) {
  console.log(personObj.name);
}
// 3.定义接口
const thePerson = { name: "li", age: 23 };
person(thePerson);



// 可通过接口 声明如下类型
// 1.函数类型

