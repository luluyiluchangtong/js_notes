// 数据库： 有组织的存放数据，并按照不同大的需求进行查询。。
// 事务： 在计算机术语中，事务通常就是指数据库事务，一个数据库事务通常包含对数据库进行读或写的一个操作序列
// 数据存储和检索的 解决方案： 文件系统直接存储，关系型数据库，NoSQL数据库科
// 关系型数据库：MySQL  SQLServer  Oracle     非关系型数据库：MongoDB  Redis
// 它们之间的区别：
// 前者使用 表结构 存储数据； 后者使用更为灵活的 数据文件 存储数据
// 前者数据存储之前会需要有很多设置，后者可以随时写入数据
// 前者通过 user_id 字段关联用户表， 或者则没有关联，每条购物数据都有用户信息

// 导入数据到 MongoDB 服务器， 使用nodeJS 处理 从数据库中查询到的而数据，然后将数据放到模板中
// mongoose  　Mongoose 是在node.js异步环境下对 mongodb进行便捷操作的对象模型工具
// Mongoose 是LearnBoost 提供的一个 Node模块，让你可以顺畅地使用MongoDB。
// MongoDB driver   node-mongodb-native / mongoose


// 而 MongoDB 相比较于 Redis等又具有更好的 索引机制： 单键索引，多键索引，数组索引，全文索引，地理位置索引；
//                                       而且文档的格式与服务器端和客户端处理的格式非常接近

// mongod    数据库的执行程序
// mongo     连接 数据库服务器 的客户端
// mongoimport   mongoexport    数据的导入导出
// mongodump   mongorestore     数据的二进制形式导入导出
// mongostat   查看mongo 服务器的状态
// 索引
// 集合
// 复制集
// 分片
// 数据集合

// 数据库 database      test123
// 集合 collection      person  
// 文档 document     { "_id" : ObjectId("5c05f134bf7c667bae2c88bc"), "title" : "is data!" }  _id 唯一的，不可变的。 
// BSON 方式，即是二进制的 JSON，最大不可超过 16MB
// 数据字段 field     "title" : "is data!"   不支持具有相同名称的字段， 为支持的数据类型都哦分配了 1~255 的整数 ID
// 索引 index  
// primary key

// data 存放 数据库 目录；  默认 数据库 为 db
// log 日志文件
// conf 启动配置文件
// bin 二进制文件

// 打开一个窗口：mongod：启动 MongoDB 服务器并侦听数据库请求 
// 方式一：mongod --dbpath  D:\MongoDB\Server\4.0\data   mongod --port 28008 --dbpath  D:\...  指定参数 port  dbpath
// 方式二：通过配置文件启动

// 再打开一个窗口(以管理员身份运行！！)：命令行 mongo 启动（MongoDB shell）  连接数据库， 关闭服务器：db.shutdownServer()， quit() 命令退出 MongoDB shell
//               基于 js 所以可以使用 js 语法与数据库交互  for(var i=0; i<100; i++) db.person.insert({x:i}) 插入  99 个文档
// MongoDB shell 提供了很多原生方法： Date()  version() 。。。
// MongoDB shell 脚本编程的三种方式：--eval    load()   mongo a.js

// 查看所有数据库  show dbs
// 新建/切换 数据库 use test123

// 在当前数据库 test123 的 集合 person 下新增文档 document，并在文档中插入 数据字段 field ：db.person.insert({"title":"is data!"})
// db.person.insert({"title":"is data!"})   
// test123 数据库   
// person 集合  
// { "_id" : ObjectId("5c05f134bf7c667bae2c88bc"), "title" : "is data!" } 文档
// "title" : "is data!"  字段

// 查询数据
// show dbs  显示所有数据库
// show collections  显示所有集合
// db.person.find()  显示某个集合下的所有文档   db.person.find().count()  多少条数据
// db.person.find().skip(3).limit(2).sort({x:1}) 找出所有集合，跳过 3条， 显示限制为 2条， 大到小排序

// 更新数据
// db.person.update({x:3},{x:999})    更新 x 为999
// db.person.update({z:100},{$set:{y:99}})  更新部分数据
// db.person.update({x:3},{x:999},true)   如果查找并想更新的数据 x:3 不存在， 则insert 一条 x:999
// 默认是更新 第一个文档的数据
// 更新多个文档的数据   db.person.update({c:1},{$set:{c:2}},false,true)

// 删除数据库： 
// db.person.remove({c:2})  删除 指定的 document
// db.dropDatabase()    此时删除了数据库 test123

// 根据索引查询
//  db.person.getIndexes()    查询索引
//  db.person.ensureIndex()   创建索引

// 索引的类型
// id / 单键 / 多键 / 复合 / 过期 / 全文 / 地理位置 索引
// _id 索引，创建数据时，自动生成的 索引
// 单键索引，db.person.ensureIndex({x:1})   在 x:1 这个字段上创建索引，
// 多键索引，值 具有多个记录，db.person.ensureIndex({x:[1,2,3,4,5]}) 
// 复合索引， db.person.ensureIndex({x:1, y:1})        查找复合索引， db.person.find({x:1,y:1})
// 过期索引，db.person.ensureIndex({x:1}, {expireAfterSeconds:10})   即这条数据设置有一定期限

// 在数据集合 person 中创建全文索引
// 创建 全文索引， db.person.ensureIndex({article:"text"})   
// 插入数据， db.person.insert({"article":"aa bb cc dd ee"})  db.person.insert({"article":"aa bb  dd ee"})
// 全局查找， db.person.find({$text:{$search:"aa"}})  
//           db.person.find({$text:{$search:"aa -cc"}}) 不包含 cc 的文档 
//           db.person.find({$text:{$search:"\"aa\" \"cc\""}}) 即包含 aa  又包含 cc 的文档 
//           db.person.find({$text:{$search:"aa"}},{score:{$meta:"textScore"}})   全文查找出的文档结果的 相似度的值， 链接上 .sort() 则会对该值有个排序
// 例子 ： { "_id" : ObjectId("5c08d2b60878d0d88492747e"), "article" : "aa bb cc dd ee", "score" : 0.6 } 每一条会多出一个 score 值
// 
// 全文索引， db.person.ensureIndex({key_1:"text",key_2:"text"})
// 全文索引， db.person.ensureIndex({"$**":"text"})     以字段值为 text 的 所有字段 为索引进行全文查找

// 地理位置索引
// 2D 索引 --- 平面地理位置索引；   
// db.person.ensureIndex({w:"2d"})
//  db.location.insert({w:[3,2]})  经度： -180 - 180   维度：-90 - 90
//  db.location.find({w:{$near:[1,1]}})   返回 100 个最近距离的位置
//  db.location.find({w:{$near:[1,1],$maxDistance:10}})   返回 10 以内的位置

// 查询形状中的点：方形 $box   圆形 $center  多边形 $polygon
// db.location.find({w:{$geoWithin:{$box:[[0,0],[3,3]]}}})   [0,0] 到 [3,3]  中的点
// db.location.find({w:{$geoWithin:{$center:[[0,0],5]}}})    
// db.location.find({w:{$geoWithin:{$polygon:[[0,0],[0,1],[2,5],[6,1]]}}})

// 2Dsphere索引 --- 球面地理位置索引；
// db.person.ensureIndex({w:"2dsphere"})

// 索引构建情况分析
// mongostat 工具  profile 集合  日志介绍  explain分析
// mongostat -h  127.0.0.1:27017

// 创建用户
// 权限认证

// MongoDB将 数据记录 存储为 BSON 文档