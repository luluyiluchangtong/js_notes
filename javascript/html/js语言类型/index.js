     // 类型值之间的宽松相等与严格相等(== === )，类型值之间的连接( + )，存在（显式的强制转换， 隐式的强制转换）
     // 类型及转换  --- js的强制类型转换总是得到 string  number  boolean 中的一种。
     // 在强制转换前，其实是由内部的  toString()  toNumber()  toBoolean() 等抽象操作作用的。。
     // toString()  toNumber() toBoolean() 的背后其实是调用了 String()   Number()  Boolean()  方法

     //  1.比较：object 与 非object 
     // ToPrimitive 抽象操作将查询 对象 有没有valueOf()方法，如果valueOf()可用并且它返回一个 "基本类型值"，
     // 那么 这个 值 就将用于强制转换。如果对象没有原始值，则valueOf将返回对象本身(一般都是返回本身)，如果此时toString()可用，那么就由它来 "提供" 用于强制转换的值
     // 除了  Math 和 Error 没有 valueOf方法，其他的都有。
     const str = "lu"
     const obj = {
             a: 45
     }
     console.log(str === obj) // false

     //  2.比较：string === Number  Boolean === Number  String Boolean 会隐式转换为 Number 再进行比较！

     //  3.比较：任何东西与boolean, 会将Boolean转为  1 / 0

     //  4. null==undefined


     // js 运算中 浮点数的运算中 精度是不能精确的。。。。
     // 基本类型的处理规则; 对象的处理规则（转换为相应的基本类型值，内部调用 valueOf() toString()进行强制类型转换）  

     // JavaScript 是一门跨平台、面向对象的脚本语言，它能使网页可交互
     // JavaScript 内置了一些对象的标准库，比如数组（Array），日期（Date），数学（Math）和一套核心语句，包括运算符、流程控制符以及声明方式等
     // 在 JavaScript 中，指令被称为语句， 那么一条语句就是一个指令     