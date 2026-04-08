# 逻辑控制 - 条件与循环

> 目标：掌握条件判断和循环，让程序能做出决策和重复执行

---

## 1. 条件判断 - if/else

程序需要根据不同的情况执行不同的代码。

### 基本语法

```javascript
let age = 18;

if (age >= 18) {
    console.log("你已经成年了");
} else {
    console.log("你还未成年");
}
```

### 比较运算符

| 运算符 | 含义 | 例子 | 结果 |
|--------|------|------|------|
| `==` | 等于 | `5 == 5` | true |
| `!=` | 不等于 | `5 != 3` | true |
| `>` | 大于 | `5 > 3` | true |
| `<` | 小于 | `5 < 3` | false |
| `>=` | 大于等于 | `5 >= 5` | true |
| `<=` | 小于等于 | `3 <= 5` | true |
| `===` | 严格等于（推荐） | `5 === "5"` | false |
| `!==` | 严格不等于 | `5 !== "5"` | true |

```javascript
// 比较示例
console.log(5 == "5");    // true （值相等）
console.log(5 === "5");   // false （类型不同：数字 vs 字符串）

// 推荐始终使用 === 和 !==
```

### 多条件判断 - if/else if/else

```javascript
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 80) {
    console.log("良好");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}
```

### 逻辑运算符

```javascript
// && 逻辑与（AND）- 两个条件都满足
let age = 25;
let hasID = true;

if (age >= 18 && hasID) {
    console.log("可以进入");
}

// || 逻辑或（OR）- 满足其中一个条件
let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("今天不用上班");
}

// ! 逻辑非（NOT）- 取反
let isRaining = false;

if (!isRaining) {
    console.log("今天不下雨，可以出门");
}
```

---

## 2. 三元运算符 - 简写 if/else

简单的条件判断可以用更简洁的写法：

```javascript
let age = 20;
let status = age >= 18 ? "成年人" : "未成年人";
console.log(status);  // "成年人"

// 等同于：
let status;
if (age >= 18) {
    status = "成年人";
} else {
    status = "未成年人";
}
```

---

## 3. switch 语句 - 多分支选择

当有多个固定的选项时，switch 比 if/else if 更清晰：

```javascript
let day = 3;
let dayName;

switch (day) {
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    default:
        dayName = "周末";
}

console.log(dayName);  // "星期三"
```

**注意**：每个 case 后面要加 `break`，否则会"穿透"到下一个 case。

---

## 4. 循环 - 重复执行代码

### for 循环 - 知道循环次数时使用

```javascript
// 打印 1 到 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}
// 输出: 1, 2, 3, 4, 5

// 循环结构解释
// for (初始化; 条件; 每次循环后执行) { 循环体 }
// let i = 1     - 从 1 开始
// i <= 5        - 只要 i 小于等于 5 就继续
// i++           - 每次循环 i 增加 1
```

### while 循环 - 不知道循环次数时使用

```javascript
// 当条件为 true 时一直循环
let count = 0;

while (count < 5) {
    console.log("计数:" + count);
    count++;
}
```

**小心**：如果条件永远为 true，会造成无限循环！

---

## 5. 数组基础

数组用于存储多个相关的数据。

### 创建和访问数组

```javascript
// 创建数组
let fruits = ["苹果", "香蕉", "橙子"];
let numbers = [10, 20, 30, 40, 50];

// 访问元素（索引从 0 开始）
console.log(fruits[0]);   // "苹果"
console.log(fruits[1]);   // "香蕉"

// 获取数组长度
console.log(fruits.length);  // 3

// 修改元素
fruits[1] = "葡萄";
console.log(fruits);  // ["苹果", "葡萄", "橙子"]

// 添加元素
fruits.push("西瓜");  // 在末尾添加
console.log(fruits);  // ["苹果", "葡萄", "橙子", "西瓜"]
```

### 遍历数组

```javascript
let scores = [85, 90, 78, 92, 88];

// 方法 1：使用 for 循环
for (let i = 0; i < scores.length; i++) {
    console.log("第" + (i + 1) + "个分数:" + scores[i]);
}

// 方法 2：使用 for...of（更简洁）
for (let score of scores) {
    console.log("分数:" + score);
}
```

### 常用数组方法

```javascript
let numbers = [3, 1, 4, 1, 5];

// push() - 末尾添加
numbers.push(9);  // [3, 1, 4, 1, 5, 9]

// pop() - 末尾删除
let last = numbers.pop();  // last = 9, numbers = [3, 1, 4, 1, 5]

// indexOf() - 查找元素位置
console.log(numbers.indexOf(4));  // 2
console.log(numbers.indexOf(100));  // -1 (不存在)

// includes() - 判断是否包含
console.log(numbers.includes(5));  // true

// join() - 数组转字符串
console.log(numbers.join(" - "));  // "3 - 1 - 4 - 1 - 5"
```

---

## 6. 综合练习

### 练习 1：成绩评级

```javascript
let score = 85;

if (score >= 90) {
    console.log("A - 优秀");
} else if (score >= 80) {
    console.log("B - 良好");
} else if (score >= 70) {
    console.log("C - 中等");
} else if (score >= 60) {
    console.log("D - 及格");
} else {
    console.log("F - 不及格");
}
```

### 练习 2：打印乘法表

```javascript
// 打印 5 的乘法表
let num = 5;

for (let i = 1; i <= 9; i++) {
    console.log(num + " × " + i + " = " + (num * i));
}
// 输出：
// 5 × 1 = 5
// 5 × 2 = 10
// ...
// 5 × 9 = 45
```

### 练习 3：计算平均分

```javascript
let scores = [85, 90, 78, 92, 88];
let sum = 0;

for (let score of scores) {
    sum = sum + score;
}

let average = sum / scores.length;
console.log("平均分:" + average);

// 判断及格
if (average >= 60) {
    console.log("及格");
} else {
    console.log("不及格");
}
```

### 练习 4：找出最大值

```javascript
let numbers = [23, 56, 12, 89, 34, 7];
let max = numbers[0];  // 假设第一个是最大值

for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] > max) {
        max = numbers[i];
    }
}

console.log("最大值是:" + max);  // 89
```

---

## 7. 本阶段检查点

```javascript
// 完成以下练习：

// 1. 写一个判断闰年的程序
// 规则：能被4整除但不能被100整除，或者能被400整除
let year = 2024;
// 你的代码...

// 2. 计算 1 到 100 的和
// 你的代码...

// 3. 给定数组，找出所有偶数
let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// 你的代码...

// 4. 判断数组是否包含特定元素
let fruits = ["苹果", "香蕉", "橙子"];
let target = "苹果";
// 你的代码...
```

---

## 下一步

完成上述练习后，继续学习 [03-functions.md](03-functions.md) 了解如何封装代码为函数。
