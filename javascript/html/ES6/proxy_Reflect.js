// Proxy是ES6中提供的新的API，可以用来定义对象各种 基本操作 的自定义行为

// let p=new Proxy(target, handlers)
// target  要被代理的对象，可以是一个object或者function
// handlers 对该代理对象的各种操作行为处理
let a = 23;
let b = 90;
(a, b) => a + b

function handler() {

}
const obj = {
    a: 2
}
let p = new Proxy(obj, handler)
p.b = 56
console.log(p)
console.log(obj)