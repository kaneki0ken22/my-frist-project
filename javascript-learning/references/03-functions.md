# 函数 - 代码的封装与复用

> 目标：学会将代码封装成函数，理解参数和返回值

---

## 1. 什么是函数？

函数是一段**可重复使用的代码块**，用于完成特定任务。

### 生活中的比喻

- 函数就像**食谱**：定义了做一道菜的步骤，每次想做这道菜时，只需要"调用"这个食谱
- 函数就像**工具**：比如一个计算器，输入数字，得到结果

---

## 2. 函数的基本语法

### 声明函数

```javascript
// 基本结构
function 函数名(参数) {
    // 函数体：要执行的代码
    return 返回值;  // 可选
}

// 例子：打招呼函数
function sayHello() {
    console.log("你好！");
}

// 调用函数
sayHello();  // 输出：你好！
sayHello();  // 可以多次调用
```

### 带参数的函数

```javascript
// 参数让函数更灵活
function greet(name) {
    console.log("你好, " + name + "!");
}

greet("小明");  // 输出：你好, 小明!
greet("小红");  // 输出：你好, 小红!

// 多个参数
function add(a, b) {
    console.log(a + " + " + b + " = " + (a + b));
}

add(3, 5);   // 输出：3 + 5 = 8
add(10, 20); // 输出：10 + 20 = 30
```

### 带返回值的函数

```javascript
// return 将结果传回调用处
function sum(a, b) {
    return a + b;
}

let result = sum(10, 20);
console.log(result);  // 30

// 返回值可以直接使用
console.log(sum(5, 3) * 2);  // 16
```

**重要区别**：
- `console.log()` 只是**打印**到控制台
- `return` 是将值**返回**给调用者，可以保存或进一步使用

---

## 3. 函数声明的三种方式

### 方式 1：函数声明（最常用）

```javascript
function multiply(a, b) {
    return a * b;
}
```

### 方式 2：函数表达式

```javascript
const divide = function(a, b) {
    return a / b;
};

console.log(divide(10, 2));  // 5
```

### 方式 3：箭头函数（现代 JavaScript）

```javascript
// 简单写法
const square = (x) => {
    return x * x;
};

// 更简化的写法（只有一条语句时）
const square = x => x * x;

console.log(square(5));  // 25

// 多个参数需要括号
const add = (a, b) => a + b;
console.log(add(3, 7));  // 10
```

---

## 4. 参数详解

### 默认参数

```javascript
function greet(name = "访客") {
    console.log("你好, " + name);
}

greet("小明");  // 你好, 小明
greet();       // 你好, 访客（使用默认值）
```

### 参数数量不固定

```javascript
function sumAll(...numbers) {
    let total = 0;
    for (let num of numbers) {
        total += num;
    }
    return total;
}

console.log(sumAll(1, 2, 3));      // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15
```

---

## 5. 函数的作用域

**作用域**决定变量在哪里可以被访问。

```javascript
// 全局变量 - 任何地方都能访问
let globalVar = "我是全局变量";

function test() {
    // 局部变量 - 只在函数内部能访问
    let localVar = "我是局部变量";
    
    console.log(globalVar);  // ✅ 可以访问
    console.log(localVar);   // ✅ 可以访问
}

test();
console.log(globalVar);  // ✅ 可以访问
console.log(localVar);   // ❌ 错误！localVar 未定义
```

### 变量的生命周期

```javascript
function counter() {
    let count = 0;  // 每次调用都会重新创建
    count++;
    console.log(count);
}

counter();  // 1
counter();  // 1（不是2，因为每次调用都重新初始化）
```

---

## 6. 实用函数示例

### 计算圆的面积

```javascript
function circleArea(radius) {
    return 3.14159 * radius * radius;
}

console.log(circleArea(5));   // 78.53975
console.log(circleArea(10));  // 314.159
```

### 判断是否为偶数

```javascript
function isEven(number) {
    return number % 2 === 0;
}

console.log(isEven(4));  // true
console.log(isEven(7));  // false
```

### 计算数组平均值

```javascript
function average(numbers) {
    let sum = 0;
    for (let num of numbers) {
        sum += num;
    }
    return sum / numbers.length;
}

let scores = [85, 90, 78, 92, 88];
console.log(average(scores));  // 86.6
```

### 查找数组中的最大值

```javascript
function findMax(numbers) {
    let max = numbers[0];
    for (let i = 1; i < numbers.length; i++) {
        if (numbers[i] > max) {
            max = numbers[i];
        }
    }
    return max;
}

console.log(findMax([3, 1, 4, 1, 5, 9, 2, 6]));  // 9
```

---

## 7. 函数的组合使用

```javascript
// 获取成绩等级
function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
}

// 判断及格
function isPassing(score) {
    return score >= 60;
}

// 分析成绩
function analyzeScore(score) {
    let grade = getGrade(score);
    let passed = isPassing(score) ? "及格" : "不及格";
    
    return `分数: ${score}, 等级: ${grade}, ${passed}`;
}

console.log(analyzeScore(85));  // 分数: 85, 等级: B, 及格
console.log(analyzeScore(55));  // 分数: 55, 等级: F, 不及格
```

---

## 8. 综合练习

### 练习 1：温度转换函数

```javascript
// 摄氏度转华氏度
function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

// 华氏度转摄氏度
function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

console.log(celsiusToFahrenheit(25));    // 77
console.log(fahrenheitToCelsius(77));    // 25
```

### 练习 2：阶乘函数

```javascript
// 计算 n! = n × (n-1) × (n-2) × ... × 1
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

console.log(factorial(5));  // 120 (5×4×3×2×1)
```

### 练习 3：判断素数

```javascript
function isPrime(number) {
    if (number <= 1) return false;
    
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;  // 能被整除，不是素数
        }
    }
    
    return true;
}

console.log(isPrime(7));   // true
console.log(isPrime(10));  // false
```

---

## 9. 本阶段检查点

```javascript
// 完成以下函数：

// 1. 计算矩形面积
function rectangleArea(width, height) {
    // 你的代码
}

// 2. 判断年份是否为闰年
function isLeapYear(year) {
    // 你的代码
}

// 3. 返回两个数中较大的那个
function max(a, b) {
    // 你的代码
}

// 4. 计算数组中所有偶数的和
function sumOfEvens(numbers) {
    // 你的代码
}

// 5. 反转字符串
function reverseString(str) {
    // 你的代码（提示：可以使用字符串分割成数组，反转数组，再拼接）
}

// 测试
console.log(rectangleArea(5, 3));      // 15
console.log(isLeapYear(2024));          // true
console.log(max(10, 5));                // 10
console.log(sumOfEvens([1,2,3,4,5,6])); // 12
console.log(reverseString("hello"));    // "olleh"
```

---

## 下一步

完成上述练习后，继续学习 [04-dom-basics.md](04-dom-basics.md) 了解如何操作网页元素。
