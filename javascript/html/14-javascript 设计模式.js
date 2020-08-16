// 在 JavaScript开发中，闭包 和 高阶函数 的应用极多，在JavaScript 中，很多设计模式都是通过 闭包 和 高阶函数 实现的
// 将不变的部分和变化的部分隔开是每个设计模式的主题

// 单例模式： 保证一个类仅有一个实例，并提供一个访问它的全局访问点。。 惰性单例指的是在需要的时候才创建对象实例。
// 要实现一个 标准的单例模式 并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，
// 如果是，则在下一次获取该类的实例时，直接返回之前创建的对象
var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function () {
  alert(this.name);
};
Singleton.getInstance = function (name) {
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};
var a = Singleton.getInstance("sven1");
var b = Singleton.getInstance("sven2"); // 在这次获取该类的实例时，直接返回之前创建的对象
alert(a === b); // true

// 策略模式：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换，策略模式的目的就是将 算法的使用 与 算法的实现 分离开来
// 策略模式的实现并不复杂，关键是如何从策略模式的实现背后，找到封装变化、委托和多态性这些思想的价值
var calculateBonus = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return salary * 4;
  }
  if (performanceLevel === "A") {
    return salary * 3;
  }
  if (performanceLevel === "B") {
    return salary * 2;
  }
};
calculateBonus("B", 20000); // 输出：40000
calculateBonus("S", 6000); // 输出：24000

var strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
}; // 算法的实现

var calculateBonus = function (level, salary) {
  return strategies[level](salary);
}; // 算法的使用 （Context 并没有计算奖金的能力，而是把这个职责 委托 给了某个策略对象（strategies）

console.log(calculateBonus("S", 20000)); // 输出：80000
console.log(calculateBonus("A", 10000)); // 输出：30000

// 通过使用策略模式重构代码，我们消除了原程序中大片的条件分支语句。所有跟计算奖金有
// 关的逻辑不再放在 Context 中，而是分布在各个策略对象中

// 代理模式：为一个对象找一个替代对象，以便对原对象进行访问，使用代理的原因是我们不愿意或者不想对原对象直接进行操作
// 在 JavaScript 开发中最常用的是虚拟代理和缓存代理。

// 虚拟代理： 加载图片
// 图片懒加载
var myImage = (function () {
  var imgNode = document.createElement("img");
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    },
  };
})();

var proxyImage = (function () {
  var img = new Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  };
  return {
    setSrc: function (src) {
      console.log("src", src);
      myImage.setSrc(
        "http://seopic.699pic.com/photo/40007/8839.jpg_wh1200.jpg"
      );
      img.src = src;
    },
  };
})();

proxyImage.setSrc("http://seopic.699pic.com/photo/40006/7735.jpg_wh1200.jpg");

// 缓存代理：
// 分页数据，将页面和对应的结果进行缓存，当请求同一页的时候，就不再请求后端的接口而是从缓存中去取数据
const getFib = (number) => {
  if (number <= 2) {
    return 1;
  } else {
    return getFib(number - 1) + getFib(number - 2);
  }
};

const getCacheProxy = (fn, cache = new Map()) => {
  return new Proxy(fn, {
    apply(target, context, args) {
      const argsString = args.join(" ");
      if (cache.has(argsString)) {
        // 如果有缓存,直接返回缓存数据        console.log(`输出${args}的缓存结果: ${cache.get(argsString)}`);

        return cache.get(argsString);
      }
      const result = fn(...args);
      cache.set(argsString, result);

      return result;
    },
  });
};
const getFibProxy = getCacheProxy(getFib);
getFibProxy(40); // 102334155getFibProxy(40); // 输出40的缓存结果: 102334155

// 迭代器模式：迭代器模式是指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示
// 目前的绝大部分语言都内置了迭代器

// 发布-订阅模式（观察者模式） JavaScript 开发中，我们一般用 事件模型 来替代传统的发布—订阅模式
// 观察者模式指的是一个对象（Subject）维持一系列依赖于它的对象（Observer），
// 当有关状态发生变更时 Subject 对象则通知一系列 Observer 对象进行更新
document.body.addEventListener(
  "click",
  function () {
    alert("Hello World");
  },
  false
);
document.body.click(); //模拟用户点击
// 以上js就是观察者，DOM就是被观察者，给DOM添加点击事件就相当于订阅了DOM

var shoeObj = {}; // 定义发布者
shoeObj.list = []; // 缓存列表 存放订阅者回调函数

// 增加订阅者
shoeObj.listen = function (key, fn) {
  if (!this.list[key]) {
    // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
    this.list[key] = [];
  }
  this.list[key].push(fn); // 订阅消息添加到缓存列表
};

// 发布消息
shoeObj.trigger = function () {
  var key = Array.prototype.shift.call(arguments); // 取出消息类型名称
  var fns = this.list[key]; // 取出该消息对应的回调函数的集合

  // 如果没有订阅过该消息的话，则返回
  if (!fns || fns.length === 0) {
    return;
  }
  for (var i = 0, fn; (fn = fns[i++]); ) {
    fn.apply(this, arguments); // arguments 是发布消息时附送的参数
  }
};

// 小红订阅如下消息
shoeObj.listen("red", function (size) {
  console.log("尺码是：" + size);
});

// 小花订阅如下消息
shoeObj.listen("block", function (size) {
  console.log("再次打印尺码是：" + size);
});
shoeObj.trigger("red", 40);
shoeObj.trigger("block", 42);

// 取消订阅
var initEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};
var shoeObj = {};
initEvent(shoeObj);

// 小红订阅如下消息
shoeObj.listen(
  "red",
  (fn1 = function (size) {
    console.log("尺码是：" + size);
  })
);

// 小花订阅如下消息
shoeObj.listen(
  "red",
  (fn2 = function (size) {
    console.log("再次打印尺码是：" + size);
  })
);
shoeObj.remove("red", fn1);
shoeObj.trigger("red", 42);

// 命令模式：
// 命令模式最常见的应用场景是：有时候需要向某些对象发送请求，但是并不知道请求的接收者是谁，也不知道被请求的操作是什么
// 此时希望用一种松耦合的方式来设计程序，使得请求发送者和请求接收者能够消除彼此之间的耦合关系
var setCommand = function (button, command) {
  button.onclick = function () {
    command.execute();
  };
}; //  command 指令： 更新 删除 添加

var MenuBar = {
  refresh: function () {
    console.log("刷新菜单目录");
  },
};
var SubMenu = {
  add: function () {
    console.log("增加子菜单");
  },
  del: function () {
    console.log("删除子菜单");
  },
};

var RefreshMenuBarCommand = function (receiver) {
  this.receiver = receiver;
};
RefreshMenuBarCommand.prototype.execute = function () {
  this.receiver.refresh();
};

var AddSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};
AddSubMenuCommand.prototype.execute = function () {
  this.receiver.add();
};

var DelSubMenuCommand = function (receiver) {
  this.receiver = receiver;
};
DelSubMenuCommand.prototype.execute = function () {
  console.log("删除子菜单");
};

var refreshMenuBarCommand = new RefreshMenuBarCommand(MenuBar);
var addSubMenuCommand = new AddSubMenuCommand(SubMenu);
var delSubMenuCommand = new DelSubMenuCommand(SubMenu);

setCommand(button1, refreshMenuBarCommand);
setCommand(button2, addSubMenuCommand);
setCommand(button3, delSubMenuCommand);

// 简便方式
var bindClick = function (button, func) {
  button.onclick = func;
};

var MenuBar = {
  refresh: function () {
    console.log("刷新菜单界面");
  },
};

var SubMenu = {
  add: function () {
    console.log("增加子菜单");
  },
  del: function () {
    console.log("删除子菜单");
  },
};

bindClick(button1, MenuBar.refresh);
bindClick(button2, SubMenu.add);
bindClick(button3, SubMenu.del);

// 宏命令
var closeDoorCommand = {
  execute: function () {
    console.log("关门");
  },
};

var openPcCommand = {
  execute: function () {
    console.log("开电脑");
  },
};

var openQQCommand = {
  execute: function () {
    console.log("登录 QQ");
  },
};

var MacroCommand = function () {
  return {
    commandsList: [],
    add: function (command) {
      this.commandsList.push(command);
    },
    execute: function () {
      for (var i = 0, command; (command = this.commandsList[i++]); ) {
        command.execute();
      }
    },
  };
};
var macroCommand = MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();

// 组合模式
// 组合模式就是用小的子对象来构建更大的对象，而这些小的子对象本身也许是由更小的“孙对象”构成的
const MacroCommand = function () {
  return {
    lists: [],
    add: function (task) {
      this.lists.push(task);
    },
    excute: function () {
      // ①：组合对象调用这里的 excute，
      for (let i = 0; i < this.lists.length; i++) {
        this.lists[i].excute();
      }
    },
  };
};

const command1 = MacroCommand(); // 基本对象

command1.add({
  excute: () => console.log("煮咖啡"), // ②：基本对象调用这里的 excute，
});

const command2 = MacroCommand(); // 组合对象

command2.add({
  excute: () => console.log("打开电视"),
});

command2.add({
  excute: () => console.log("打开音响"),
});

const command3 = MacroCommand();

command3.add({
  excute: () => console.log("打开空调"),
});

command3.add({
  excute: () => console.log("打开电脑"),
});

const macroCommand = MacroCommand();
macroCommand.add(command1);
macroCommand.add(command2);
macroCommand.add(command3);

macroCommand.excute();

// 模板方法模式
// 是一种只需使用继承就可以实现的非常简单的模式
// ！！主要解决：一些方法通用，却在每一个子类都重新写了这一方法
// 模板方法模式是一种严重依赖抽象类的设计模式
var Beverage = function () {};
Beverage.prototype.boilWater = function () {
  console.log("把水煮沸");
};
Beverage.prototype.brew = function () {}; // 空方法，应该由子类重写
Beverage.prototype.pourInCup = function () {}; // 空方法，应该由子类重写
Beverage.prototype.addCondiments = function () {}; // 空方法，应该由子类重写
Beverage.prototype.init = function () {
  this.boilWater();
  this.brew();
  this.pourInCup();
  this.addCondiments();
};

var Coffee = function () {};
Coffee.prototype = new Beverage(); // 核心步骤
Coffee.prototype.brew = function () {
  console.log("用沸水冲泡咖啡");
};
Coffee.prototype.pourInCup = function () {
  console.log("把咖啡倒进杯子");
};
Coffee.prototype.addCondiments = function () {
  console.log("加糖和牛奶");
};
var Coffee = new Coffee();
Coffee.init();

var Tea = function () {};
Tea.prototype = new Beverage(); // 核心步骤
Tea.prototype.brew = function () {
  console.log("用沸水浸泡茶叶");
};
Tea.prototype.pourInCup = function () {
  console.log("把茶倒进杯子");
};
Tea.prototype.addCondiments = function () {
  console.log("加柠檬");
};
var tea = new Tea();
tea.init();

// 利用高阶函数
var Beverage = function (param) {
  var boilWater = function () {
    console.log("把水煮沸");
  };
  var brew =
    param.brew ||
    function () {
      throw new Error("必须传递 brew 方法");
    };
  var pourInCup =
    param.pourInCup ||
    function () {
      throw new Error("必须传递 pourInCup 方法");
    };
  var addCondiments =
    param.addCondiments ||
    function () {
      throw new Error("必须传递 addCondiments 方法");
    };
  var F = function () {};
  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  return F;
};
var Coffee = Beverage({
  brew: function () {
    console.log("用沸水冲泡咖啡");
  },
  pourInCup: function () {
    console.log("把咖啡倒进杯子");
  },
  addCondiments: function () {
    console.log("加糖和牛奶");
  },
});
var Tea = Beverage({
  brew: function () {
    console.log("用沸水浸泡茶叶");
  },
  pourInCup: function () {
    console.log("把茶倒进杯子");
  },
  addCondiments: function () {
    console.log("加柠檬");
  },
});
var coffee = new Coffee();
coffee.init();
var tea = new Tea();
tea.init();

// 享元模式：所谓享元模式，主要是对数据、方法的共享进行分离，
// 享元模式是为解决性能问题而生的模式，这跟大部分模式的诞生原因都不一样
// 在一个存在大量相似对象的系统中，享元模式可以很好地解决大量对象带来的性能问题。
var Model = function (sex, underwear) {
  this.sex = sex;
  this.underwear = underwear;
};
Model.prototype.takePhoto = function () {
  console.log("sex= " + this.sex + " underwear=" + this.underwear);
};
for (var i = 1; i <= 50; i++) {
  var maleModel = new Model("male", "underwear" + i);
  maleModel.takePhoto();
}
for (var j = 1; j <= 50; j++) {
  var femaleModel = new Model("female", "underwear" + j);
  femaleModel.takePhoto();
}

// 内衣工厂有100种男士内衣、100中女士内衣，要求给每种内衣拍照。
// 如果不使用享元模式则需要200个塑料模特；使用享元模式，只需要男女各1个模特
var Model = function (sex) {
  this.sex = sex;
};

Model.prototype.takePhoto = function () {
  console.log("sex= " + this.sex + " underwear=" + this.underwear);
};

//    分别创建一个男模特对象和一个女模特对象：
var maleModel = new Model("male"),
  femaleModel = new Model("female");
//    给男模特依次穿上所有的男装，并进行拍照：
for (var i = 1; i <= 50; i++) {
  maleModel.underwear = "underwear" + i;
  maleModel.takePhoto();
}
//    同样，给女模特依次穿上所有的女装，并进行拍照：
for (var j = 1; j <= 50; j++) {
  femaleModel.underwear = "underwear" + j;
  femaleModel.takePhoto();
}
//    可以看到，改进之后的代码，只需要两个对象便完成了同样的功能

// 职责链模式：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间
// 的耦合关系，将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止
var order = function (orderType, pay, stock) {
  if (orderType === 1) {
    // 500 元定金购买模式
    if (pay === true) {
      // 已支付定金
      console.log("500 元定金预购, 得到 100 优惠券");
    } else {
      // 未支付定金，降级到普通购买模式
      if (stock > 0) {
        // 用于普通购买的手机还有库存
        console.log("普通购买, 无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 2) {
    // 200 元定金购买模式
    if (pay === true) {
      console.log("200 元定金预购, 得到 50 优惠券");
    } else {
      if (stock > 0) {
        console.log("普通购买, 无优惠券");
      } else {
        console.log("手机库存不足");
      }
    }
  } else if (orderType === 3) {
    if (stock > 0) {
      console.log("普通购买, 无优惠券");
    } else {
      console.log("手机库存不足");
    }
  }
};
order(1, true, 500); // 输出： 500 元定金预购, 得到 100 优惠券

// 职责链模式

// 500 元订单
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500 元定金预购, 得到 100 优惠券");
  } else {
    order200(orderType, pay, stock); // 将请求传递给 200 元订单
  }
};
// 200 元订单
var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200 元定金预购, 得到 50 优惠券");
  } else {
    orderNormal(orderType, pay, stock); // 将请求传递给普通订单
  }
};
// 普通购买订单
var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买, 无优惠券");
  } else {
    console.log("手机库存不足");
  }
};
// 测试结果：
order500(1, true, 500); // 输出：500 元定金预购, 得到 100 优惠券
order500(1, false, 500); // 输出：普通购买, 无优惠券
order500(2, true, 500); // 输出：200 元定金预购, 得到 500 优惠券
order500(3, false, 500); // 输出：普通购买, 无优惠券
order500(3, false, 0); // 输出：手机库存不足

// 看不懂系列
var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log("500 元定金预购，得到 100 优惠券");
  } else {
    return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log("200 元定金预购，得到 50 优惠券");
  } else {
    return "nextSuccessor"; // 我不知道下一个节点是谁，反正把请求往后面传递
  }
};

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log("普通购买，无优惠券");
  } else {
    console.log("手机库存不足");
  }
};

// Chain.prototype.setNextSuccessor 指定在链中的下一个节点
// Chain.prototype.passRequest 传递请求给某个节点
var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) {
  return (this.successor = successor);
};

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);
  if (ret === "nextSuccessor") {
    return (
      this.successor &&
      this.successor.passRequest.apply(this.successor, arguments)
    );
  }
  return ret;
};

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

chainOrder500.passRequest(1, true, 500); // 输出：500 元定金预购，得到 100 优惠券
chainOrder500.passRequest(2, true, 500); // 输出：200 元定金预购，得到 50 优惠券
chainOrder500.passRequest(3, true, 500); // 输出：普通购买，无优惠券
chainOrder500.passRequest(1, false, 0); // 输出：手机库存不足

// 中介者模式： 中介者模式的作用就是解除对象与对象之间的紧耦合关系。增加一个中介者对象后，所有的
// 相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可
function Player(name, teamColor) {
  this.name = name; // 角色名字
  this.teamColor = teamColor; // 队伍颜色
  this.state = "alive"; // 玩家生存状态
}

Player.prototype.win = function () {
  console.log(this.name + " won ");
};

Player.prototype.lose = function () {
  console.log(this.name + " lost");
};

Player.prototype.die = function () {
  this.state = "dead";
  playerDirector.reciveMessage("playerDead", this); // 给中介者发送消息，玩家死亡
};

Player.prototype.remove = function () {
  playerDirector.reciveMessage("removePlayer", this); // 给中介者发送消息，移除一个玩家
};

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage("changeTeam", this, color); // 给中介者发送消息，玩家换队
};

var playerFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor); // 创造一个新的玩家对象
  playerDirector.reciveMessage("addPlayer", newPlayer); // 给中介者发送消息，新增玩家
  return newPlayer;
};

var playerDirector = (function () {
  var players = {}, // 保存所有玩家
    operations = {}; // 中介者可以执行的操作
  /****************新增一个玩家***************************/

  operations.addPlayer = function (player) {
    var teamColor = player.teamColor; // 玩家的队伍颜色
    players[teamColor] = players[teamColor] || []; // 如果该颜色的玩家还没有成立队伍，则新成立一个队伍;
    players[teamColor].push(player); // 添加玩家进队伍
  };
  /****************移除一个玩家***************************/

  operations.removePlayer = function (player) {
    var teamColor = player.teamColor, // 玩家的队伍颜色
      teamPlayers = players[teamColor] || []; // 该队伍所有成员
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      // 遍历删除

      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1);
      }
    }
  };
  /****************玩家换队***************************/

  operations.changeTeam = function (player, newTeamColor) {
    // 玩家换队
    operations.removePlayer(player); // 从原队伍中删除
    player.teamColor = newTeamColor; // 改变队伍颜色
    operations.addPlayer(player); // 增加到新队伍中
  };
  operations.playerDead = function (player) {
    // 玩家死亡
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor]; // 玩家所在队伍
    var all_dead = true;
    for (var i = 0, player; (player = teamPlayers[i++]); ) {
      if (player.state !== "dead") {
        all_dead = false;
        break;
      }
    }
    if (all_dead === true) {
      // 全部死亡
      for (var i = 0, player; (player = teamPlayers[i++]); ) {
        player.lose(); // 本队所有玩家 lose
      }
      for (var color in players) {
        if (color !== teamColor) {
          var teamPlayers = players[color]; // 其他队伍的玩家
          for (var i = 0, player; (player = teamPlayers[i++]); ) {
            player.win(); // 其他队伍所有玩家 win
          }
        }
      }
    }
  };
  var reciveMessage = function () {
    var message = Array.prototype.shift.call(arguments); // arguments 的第一个参数为消息名称
    operations[message].apply(this, arguments);
  };
  return {
    reciveMessage: reciveMessage,
  };
})();

// 红队：
var player1 = playerFactory("皮蛋", "red"),
  player2 = playerFactory("小乖", "red"),
  player3 = playerFactory("宝宝", "red"),
  player4 = playerFactory("小强", "red");

// 蓝队：
var player5 = playerFactory("黑妞", "blue"),
  player6 = playerFactory("葱头", "blue"),
  player7 = playerFactory("胖墩", "blue"),
  player8 = playerFactory("海盗", "blue");

player1.die();
player2.die();
player3.die();
player4.die();

// 假设皮蛋和小乖掉线，
player1.remove();
player2.remove();
player3.die();
player4.die();

// 假设皮蛋从红队叛变到蓝队，
player1.changeTeam("blue");
player2.die();
player3.die();
player4.die();

// 装饰者模式： 装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象 动态地 添加职责
var Plane = function () {};
Plane.prototype.fire = function () {
  console.log("发射普通子弹");
};

var MissileDecorator = function (plane) {
  this.plane = plane;
};
MissileDecorator.prototype.fire = function () {
  this.plane.fire();
  console.log("发射导弹");
};

var AtomDecorator = function (plane) {
  this.plane = plane;
};
AtomDecorator.prototype.fire = function () {
  this.plane.fire();
  console.log("发射原子弹");
};

var plane = new Plane();
plane = new MissileDecorator(plane);
plane = new AtomDecorator(plane);
plane.fire();
// 分别输出： 发射普通子弹、发射导弹、发射原子弹

var plane = {
  fire: function () {
    console.log("发射普通子弹");
  },
};

var missileDecorator = function () {
  console.log("发射导弹");
};

var atomDecorator = function () {
  console.log("发射原子弹");
};

var fire1 = plane.fire; // 通过保存原引用的方式 改写某个函数
plane.fire = function () {
  fire1();
  missileDecorator();
};

var fire2 = plane.fire;
plane.fire = function () {
  fire2();
  atomDecorator();
};
plane.fire();

// 状态模式
// var Light = function () {
//   this.state = "off"; // 给电灯设置初始状态 off
//   this.button = null; // 电灯开关按钮
// };
// // 初始化状态

// Light.prototype.init = function () {
//   var button = document.createElement("button"),
//     self = this;
//   button.innerHTML = "开关";
//   this.button = document.body.appendChild(button);
//   this.button.onclick = function () {
//     self.buttonWasPressed();
//   };
// };
// // 创建 button 并设置 button 按下时灯的状态

// Light.prototype.buttonWasPressed = function () {
//   if (this.state === "off") {
//     console.log("开灯");
//     this.state = "on";
//     this.button.innerHTML = "关灯";
//   } else if (this.state === "on") {
//     console.log("关灯");
//     this.state = "off";
//     this.button.innerHTML = "开灯";
//   }
// };
// var light = new Light();
// light.init();

// OffLightState：
var OffLightState = function (light) {
  this.light = light;
};
OffLightState.prototype.buttonWasPressed = function () {
  console.log("弱光"); // offLightState 对应的行为
  this.light.setState(this.light.weakLightState); // 切换状态到 weakLightState
};
// WeakLightState：
var WeakLightState = function (light) {
  this.light = light;
};
WeakLightState.prototype.buttonWasPressed = function () {
  console.log("强光"); // weakLightState 对应的行为
  this.light.setState(this.light.strongLightState); // 切换状态到 strongLightState
};
// StrongLightState：
var StrongLightState = function (light) {
  this.light = light;
};
StrongLightState.prototype.buttonWasPressed = function () {
  console.log("关灯"); // strongLightState 对应的行为
  this.light.setState(this.light.offLightState); // 切换状态到 offLightState
};

var Light = function () {
  this.offLightState = new OffLightState(this); // 这里 this 是 Light,  对应 this.light 相当于 Light
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement("button"),
    self = this;
  this.button = document.body.appendChild(button);
  this.button.innerHTML = "开关";
  this.currState = this.offLightState; // 设置当前状态（核心步骤，即将 状态机 委托给当前状态。。 ）
  this.button.onclick = function () {
    self.currState.buttonWasPressed(); // 当按钮按下时，执行 状态机 内部的方法 改变状态 。 this.offLightState.buttonWasPressed()
  };
};

Light.prototype.setState = function (newState) {
  this.currState = newState; // 状态对象可以通过这个方法来切换 light 对象的状态。
};

var light = new Light();
light.init();

// js 更轻便的方式
var Light = function () {
  this.currState = FSM.off; // 设置当前状态
  this.button = null;
};
Light.prototype.init = function () {
  var button = document.createElement("button"),
    self = this;
  button.innerHTML = "已关灯";
  this.button = document.body.appendChild(button);
  this.button.onclick = function () {
    self.currState.buttonWasPressed.call(self); // 把请求委托给 FSM 状态机
  };
};
var FSM = {
  off: {
    buttonWasPressed: function () {
      console.log("关灯");
      this.button.innerHTML = "下一次按我是开灯";
      this.currState = FSM.on;
    },
  },
  on: {
    buttonWasPressed: function () {
      console.log("开灯");
      this.button.innerHTML = "下一次按我是关灯";
      this.currState = FSM.off;
    },
  },
};
var light = new Light();
light.init();

// 状态模式的缺点是会在系统中定义许多状态类，编写 20 个状态类是一项枯燥乏味的工作，
// 而且系统中会因此而增加不少对象。另外，由于 逻辑分散 在状态类中，虽然避开了不受欢迎的条
// 件分支语句，但也造成了 逻辑分散 的问题，我们无法在一个地方就看出整个状态机的逻辑

// 适配器模式：创建一个适配器，将原接口 '转换为' 客户希望的另一个接口，客户只需要和 适配器 打交道
// 用适配器模式把旧接口 包装成 一个新的接口
var googleMap = {
  show: function () {
    console.log("开始渲染谷歌地图");
  },
};

var baiduMap = {
  display: function () {
    console.log("开始渲染百度地图");
  },
};

var baiduMapAdapter = {
  show: function () {
    return baiduMap.display();
  },
}; // 创建一个适配器，将原接口 '转换为' 客户希望的另一个接口

var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap);
renderMap(baiduMapAdapter);

// 例子2
var getGuangdongCity = function () {
  var guangdongCity = [
    {
      name: "shenzhen",
      id: 11,
    },
    {
      name: "guangzhou",
      id: 12,
    },
  ];
  return guangdongCity;
}; // 最初的数据格式 为一个数组

// var guangdongCity = {   新的数据格式 为一个对象
//   shenzhen: 11,
//   guangzhou: 12,
//   zhuhai: 13
//  };

var render = function (fn) {
  console.log("开始渲染广东省地图");
  document.write(JSON.stringify(fn()));
};

// render(getGuangdongCity)

var addressAdapter = function (oldAddressfn) {
  var address = {},
    oldAddress = oldAddressfn();
  for (var i = 0, c; (c = oldAddress[i++]); ) {
    address[c.name] = c.id;
  }
  return function () {
    return address;
  };
}; // 创建一个适配器，将原接口 '转换为' 客户希望的另一个接口

render(addressAdapter(getGuangdongCity));
