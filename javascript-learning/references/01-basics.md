# JavaScript 基础概念

> 目标：理解变量、数据类型和基本运算

---

## 1. 什么是 JavaScript？

JavaScript 是一种编程语言，用来让网页有交互能力。

- **HTML** = 网页的结构（骨架）
- **CSS** = 网页的样式（皮肤）
- **JavaScript** = 网页的行为（动作）

### 最简单的例子

```javascript
// 弹出一个提示框
alert("Hello, World!");
```

在浏览器控制台输入这行代码，按回车，你会看到一个弹窗。

---

## 2. 变量 - 存储数据的容器

变量就像是一个盒子，你可以把数据放进去，然后使用这个名字来引用它。

### 声明变量

```javascript
// 使用 let 声明变量（推荐）
let name = "小明";
let age = 18;

// 使用 const 声明常量（不能修改）
const PI = 3.14159;
```

### 变量命名规则

- 只能用字母、数字、下划线、$
- 不能以数字开头
- 区分大小写（`name` 和 `Name` 是不同的）
- 使用有意义的英文单词

```javascript
// ✅ 好的命名
let userName = "张三";
let studentAge = 20;

// ❌ 不好的命名
let x = "张三";        // 太模糊
let mingzi = "张三";   // 用拼音
let 1stName = "张三";  // 以数字开头（错误！）
```

---

## 3. 数据类型

JavaScript 中常见的数据类型：

### 字符串（String）- 文本

```javascript
let message = "Hello, World!";
let name = '小明';

// 字符串可以用单引号或双引号包裹
// 字符串拼接
let greeting = "你好, " + name;  // "你好, 小明"

// 模板字符串（更方便）
let greeting2 = `你好, ${name}`;  // "你好, 小明"
```

### 数字（Number）- 数值

```javascript
let age = 25;           // 整数
let price = 19.99;      // 小数
let negative = -10;     // 负数

// 数学运算
let sum = 10 + 5;       // 15
let difference = 10 - 5; // 5
let product = 10 * 5;   // 50
let quotient = 10 / 5;  // 2
let remainder = 10 % 3; // 1 (取余数)
```

### 布尔值（Boolean）- 真假

```javascript
let isStudent = true;
let isLoggedIn = false;
```

### 空值（Null / Undefined）

```javascript
let empty = null;           // 明确表示"没有值"
let notAssigned;            // undefined，表示"未定义"
console.log(notAssigned);   // 输出：undefined
```

---

## 4. 控制台输出

使用 `console.log()` 在控制台打印信息，这是调试代码最常用的方法。

```javascript
console.log("Hello, World!");
console.log(123);
console.log("我的名字是：" + name);

// 打印多个值
console.log("姓名:", name, "年龄:", age);
```

**如何打开控制台**：
1. 在网页上按 `F12`
2. 点击 "Console" 或 "控制台" 标签
3. 输入代码，按回车执行

---

## 5. 基础练习

### 练习 1：自我介绍

```javascript
let name = "你的名字";
let age = 20;
let hobby = "编程";

console.log("大家好！");
console.log("我叫" + name);
console.log("今年" + age + "岁");
console.log("我喜欢" + hobby);
```

### 练习 2：简单计算器

```javascript
let num1 = 15;
let num2 = 4;

console.log("加法:", num1 + num2);
console.log("减法:", num1 - num2);
console.log("乘法:", num1 * num2);
console.log("除法:", num1 / num2);
console.log("余数:", num1 % num2);
```

### 练习 3：温度转换

```javascript
// 摄氏度转华氏度
let celsius = 25;
let fahrenheit = (celsius * 9/5) + 32;

console.log(celsius + "°C = " + fahrenheit + "°F");
```

---

## 6. 常见错误

### 错误 1：变量未定义就用

```javascript
console.log(myVar);  // ❌ ReferenceError: myVar is not defined
let myVar = 10;
```

**解决**：先声明变量，再使用

### 错误 2：拼写错误

```javascript
let userName = "小明";
console.log(username);  // ❌ undefined（大小写不对）
```

**解决**：JavaScript 区分大小写，确保拼写一致

### 错误 3：字符串和数字混淆

```javascript
let num1 = "10";
let num2 = 5;
console.log(num1 + num2);  // "105" （字符串拼接，不是数学加法）
```

**解决**：确保进行数学运算的都是数字类型

---

## 7. 本阶段检查点

完成以下代码，确保理解每个概念：

```javascript
// 1. 声明变量存储你的姓名、年龄、城市
let myName = ???;
let myAge = ???;
let myCity = ???;

// 2. 用 console.log 输出一段自我介绍
console.log(???);

// 3. 计算你出生年份（假设今年是2024年）
let birthYear = ???;
console.log("我出生于" + birthYear + "年");

// 4. 计算圆的面积（半径为 5）
let radius = 5;
let area = ???;  // 公式：π * r * r
console.log("圆的面积是:" + area);
```

---

## 下一步

完成上述练习后，继续学习 [02-logic-control.md](02-logic-control.md) 了解条件判断和循环。
