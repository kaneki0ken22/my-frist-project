# DOM 操作基础

> 目标：学会获取和修改网页元素，让网页"动起来"

---

## 1. 什么是 DOM？

**DOM（Document Object Model）** 是浏览器将 HTML 文档转换为 JavaScript 可操作对象的方式。

简单理解：**DOM 就是网页的 JavaScript 表示**，你可以通过 JavaScript 来读取和修改网页内容。

```
HTML 文件          DOM（JavaScript 可操作）
---------          -----------------------
<div id="box">  →  {
  Hello          →    id: "box",
</div>           →    textContent: "Hello"
                   }
```

---

## 2. 获取元素

### 通过 ID 获取（最常用）

```html
<!-- HTML -->
<div id="message">你好，世界！</div>
```

```javascript
// JavaScript
let element = document.getElementById("message");
console.log(element);  // <div id="message">你好，世界！</div>
```

### 通过标签名获取

```javascript
// 获取所有 <p> 元素
let paragraphs = document.getElementsByTagName("p");
console.log(paragraphs[0]);  // 第一个 <p> 元素
```

### 通过类名获取

```javascript
// 获取所有 class="highlight" 的元素
let highlights = document.getElementsByClassName("highlight");
```

### 使用 querySelector（更灵活）

```javascript
// 通过 CSS 选择器获取单个元素
let box = document.querySelector("#box");        // ID 选择器
let item = document.querySelector(".item");      // 类选择器
let firstLink = document.querySelector("a");     // 标签选择器

// 获取所有匹配的元素
let allItems = document.querySelectorAll(".item");
```

---

## 3. 修改元素内容

### textContent - 纯文本

```javascript
let title = document.getElementById("title");
title.textContent = "新的标题";
```

### innerHTML - HTML 内容（慎用）

```javascript
let box = document.getElementById("box");
box.innerHTML = "<strong>加粗文字</strong>";
```

**注意**：innerHTML 会解析 HTML 标签，有安全风险，用户输入的内容不要用 innerHTML。

---

## 4. 修改元素样式

```javascript
let box = document.getElementById("box");

// 直接修改样式
box.style.color = "red";
box.style.backgroundColor = "yellow";  // CSS 中的 background-color
box.style.fontSize = "20px";
box.style.padding = "10px";

// 注意：CSS 属性名用驼峰命名法
// background-color → backgroundColor
// font-size → fontSize
```

### 添加/删除类名（推荐方式）

```html
<!-- HTML -->
<style>
    .highlight {
        background-color: yellow;
        font-weight: bold;
    }
    .hidden {
        display: none;
    }
</style>
<div id="text">一段文字</div>
```

```javascript
let text = document.getElementById("text");

// 添加类名
text.classList.add("highlight");

// 删除类名
text.classList.remove("highlight");

// 切换类名（有则删除，无则添加）
text.classList.toggle("hidden");

// 检查是否有某个类名
if (text.classList.contains("highlight")) {
    console.log("有高亮样式");
}
```

---

## 5. 事件监听 - 响应用户操作

### 什么是事件？

事件是用户在网页上的操作：点击、输入、鼠标移动等。

### 添加点击事件

```html
<button id="btn">点击我</button>
<p id="result"></p>
```

```javascript
let button = document.getElementById("btn");
let result = document.getElementById("result");

// 添加点击事件监听器
button.addEventListener("click", function() {
    result.textContent = "按钮被点击了！";
});
```

### 常用事件类型

| 事件 | 说明 | 使用场景 |
|------|------|---------|
| `click` | 点击 | 按钮、链接 |
| `dblclick` | 双击 | 特殊操作 |
| `mouseenter` | 鼠标进入 | 悬停效果 |
| `mouseleave` | 鼠标离开 | 悬停结束 |
| `input` | 输入内容变化 | 实时搜索、验证 |
| `change` | 值改变并失去焦点 | 表单验证 |
| `submit` | 表单提交 | 表单处理 |
| `keydown` | 按下键盘 | 快捷键 |

### 事件示例：输入框实时显示

```html
<input type="text" id="inputBox" placeholder="输入文字">
<p>你输入的是：<span id="output"></span></p>
```

```javascript
let inputBox = document.getElementById("inputBox");
let output = document.getElementById("output");

inputBox.addEventListener("input", function() {
    output.textContent = inputBox.value;
});
```

### 事件示例：计数器

```html
<button id="decrease">-</button>
<span id="count">0</span>
<button id="increase">+</button>
```

```javascript
let count = 0;
let countDisplay = document.getElementById("count");
let decreaseBtn = document.getElementById("decrease");
let increaseBtn = document.getElementById("increase");

decreaseBtn.addEventListener("click", function() {
    count--;
    countDisplay.textContent = count;
});

increaseBtn.addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
});
```

---

## 6. 创建和删除元素

### 创建新元素

```javascript
// 创建一个新的 <p> 元素
let newParagraph = document.createElement("p");
newParagraph.textContent = "这是新创建的段落";

// 添加到页面中
document.body.appendChild(newParagraph);

// 或者添加到特定元素中
let container = document.getElementById("container");
container.appendChild(newParagraph);
```

### 删除元素

```javascript
let element = document.getElementById("toDelete");
element.remove();  // 删除自己

// 或者
let parent = element.parentNode;
parent.removeChild(element);
```

---

## 7. 完整示例：待办事项添加功能

```html
<!DOCTYPE html>
<html>
<head>
    <title>Todo List</title>
</head>
<body>
    <h1>待办事项</h1>
    <input type="text" id="todoInput" placeholder="输入待办事项">
    <button id="addBtn">添加</button>
    <ul id="todoList"></ul>

    <script>
        let input = document.getElementById("todoInput");
        let addBtn = document.getElementById("addBtn");
        let list = document.getElementById("todoList");

        addBtn.addEventListener("click", function() {
            let text = input.value;
            
            if (text === "") {
                alert("请输入内容！");
                return;
            }
            
            // 创建新的列表项
            let li = document.createElement("li");
            li.textContent = text;
            
            // 添加到列表
            list.appendChild(li);
            
            // 清空输入框
            input.value = "";
        });
    </script>
</body>
</html>
```

---

## 8. 常见错误

### 错误 1：脚本在元素之前执行

```html
<script>
    // ❌ 错误：此时元素还不存在
    let box = document.getElementById("box");
</script>
<div id="box"></div>  <!-- 元素在脚本后面 -->
```

**解决**：将脚本放在 `</body>` 之前，或使用 `DOMContentLoaded` 事件

```javascript
document.addEventListener("DOMContentLoaded", function() {
    // DOM 加载完成后执行
    let box = document.getElementById("box");
});
```

### 错误 2：获取不到元素

```javascript
// ❌ 拼写错误或选择器写错
let box = document.getElementById("box");  // HTML 中是 id="Box"（大小写不同）
```

### 错误 3：修改样式不生效

```javascript
// ❌ 错误：CSS 属性名写法不对
box.style.background-color = "red";  // 语法错误

// ✅ 正确：使用驼峰命名
box.style.backgroundColor = "red";
```

---

## 9. 本阶段检查点

```html
<!DOCTYPE html>
<html>
<body>
    <h1 id="title">标题</h1>
    <input type="text" id="nameInput" placeholder="输入名字">
    <button id="greetBtn">打招呼</button>
    <p id="greeting"></p>

    <script>
        // 完成以下功能：
        
        // 1. 点击按钮时，获取输入框的值
        // 2. 在 greeting 段落中显示 "你好, [输入的名字]!"
        // 3. 同时将标题改为 "欢迎"
        // 4. 如果输入为空，显示提示 "请输入名字"
        
        // 你的代码...
    </script>
</body>
</html>
```

---

## 下一步

完成 DOM 基础后，使用 [项目模板](../assets/mini-projects/) 练习完整的项目开发。
