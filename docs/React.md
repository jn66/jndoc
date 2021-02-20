# React 教程

## 第一章 React入门

用户构建用户界面的JavaScript库

开发一个产品的流程，React只管第三部
1.发送请求获取数据 -> 不管
2.处理数据（过滤，整理格式）-> 不管
3.操作DOM呈现页面 -> React 操作

1.定义：React是一个将数据渲染为HTML视图的开源JavaScript库。

2.谁开发的？
由Facebook开发，且开源。近10年陈酿，React正在被腾讯、阿里等一线大厂广泛使用。

3.为什么要学？

* 原生JavaScript操作DOM繁琐、效率低（**DOM-API操作UI**）。例子：document.getElementById('app'); 用Jquery仅仅是代码量少，效率还是低。
* 使用JavaScript直接操作DOM，浏览器会进行大量的**重绘重排**。
* 原生JavaScript没有组件化、模块化的编码方案，代码复用率低。

以上都是因为原生开发的痛点。

4.React特点

* 采用组件化模式、声明式编码，提高开发效率以及组件复用率。(命令式编程：获取-改变颜色，少做任何一部都不行；声明：你应该是蓝色的。)
* 在React Native中，可以使用React语法进行移动端开发。
* 使用虚拟DOM + 优秀的Diffing算法，尽量减少与真实DOM的交互。(以前两个数据，增加一个，需要重新遍历，重新覆盖追加到dom。)

5.React高效原因

* 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
* DOM Diffing算法, 最小化页面重绘。

## 第一课

babel: es6转es5， jsx转js

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>hello_react</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react 核心库 有先后顺序 全局有React对象  -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 扩展库 引入react-dom，用于支持react操作DOM 全局有ReactDom对象-->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js 浏览器端的babel 浏览器翻译 不能在真实开发中用-->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" > /* 此处一定要写babel 表示写的是jsx，让babel翻译 */
		//1.创建虚拟DOM
		const VDOM = <h1>Hello,React</h1> /* 因为是JSX 此处一定不要写引号，因为不是字符串 */
		//2.渲染虚拟DOM到页面 ， 别引入jQuery #test。 写第二句替换前一句，这是替换的动作。  
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
</html>
```

## 虚拟DOM的两种创建方式

使用JSX创建虚拟DOM
const VDOM = <h1 id="title">Hello,React</h1>

使用JS创建
不用引入babel,script标签上也不用写  text/babel了, 浏览器的Babel把JSX翻译成如下样子，JSX就是语法糖。

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>2_使用js创建虚拟DOM</title>
</head>
<body>
	<!-- 准备好一个“容器” -->
	<div id="test"></div>

	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>

	<script type="text/javascript" > 
		//1.创建虚拟DOM  document.createElement 创建真实dom  React.createElement(标签名，标签属性，标签内容)
		const VDOM = React.createElement('h1',{id:'title'},React.createElement('span',{},'Hello,React'))
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
</body>
</html>
```

加括号缩进一下
```
const VDOM = (
    <h1>Hello,React</h1>
)
```

## 虚拟DOM和真实DOM
```
const VDOM = (  /* 此处一定不要写引号，因为不是字符串 */
			<h1 id="title">
				<span>Hello,React</span>
			</h1>
		)
const TDOM = document.getElementById('demo')
console.log('虚拟DOM',VDOM);
console.log('真实DOM',TDOM);

// console.log(typeof VDOM);
// console.log(VDOM instanceof Object);
```
虚拟DOM就是个对象Object

关于虚拟DOM：
1.本质是Object类型的对象（一般对象）
2.虚拟DOM比较“轻”，真实DOM比较“重”，因为虚拟DOM是React内部在用，无需真实DOM上那么多的属性。
3.虚拟DOM最终会被React转化为真实DOM，呈现在页面上。

JSX

1.全称:  JavaScript XML
2.react定义的一种类似于XML的JS扩展语法: JS + XML本质是React.createElement(component, props, ...children)方法的语法糖
3.作用: 用来简化创建虚拟DOM 
1)写法：var ele = <h1>Hello JSX!</h1>
2)注意1：它不是字符串, 也不是HTML/XML标签
3)注意2：它最终产生的就是一个JS对象
4.标签名任意: HTML标签或其它标签
5.标签属性任意: HTML标签属性或其它
6.基本语法规则
1)遇到 <开头的代码, 以标签的语法解析: html同名标签转换为html同名元素, 其它标签需要特别解析
2)遇到以 { 开头的代码，以JS语法解析: 标签中的js表达式必须用{ }包含
7.babel.js的作用
1)浏览器不能直接解析JSX代码, 需要babel转译为纯JS的代码才能运行
2)只要用了JSX，都要加上type="text/babel", 声明需要babel来处理

小案例
```
<script type="text/babel" >
		const myId = 'aTgUiGu'
		const myData = 'HeLlo,rEaCt'

		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h2 className="title" id={myId.toLowerCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<h2 className="title" id={myId.toUpperCase()}>
					<span style={{color:'white',fontSize:'29px'}}>{myData.toLowerCase()}</span>
				</h2>
				<input type="text"/>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))

		/* 
				jsx语法规则：
						1.定义虚拟DOM时，不要写引号。
						2.标签中混入JS表达式时要用{}。
						3.样式的类名指定不要用class，要用className。
						4.内联样式，要用style={{key:'value'}}的形式去写。加引号是自己写，不加引号是寻找变量。fontSize驼峰形式。
						5.只有一个根标签
						6.标签必须闭合 <input />
						7.标签首字母
								(1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
								(2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。

		 */
	</script>
```

## 小练习
{数组} 会帮你遍历，  {对象}不会帮你便利，不是节点。 {}里面只能写表达式
```
<!-- 准备好一个“容器” -->
	<div id="test"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel" >
		/* 
			一定注意区分：【js语句(代码)】与【js表达式】
					1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
								下面这些都是表达式：
										(1). a
										(2). a+b
										(3). demo(1)
										(4). arr.map() 
										(5). function test () {}
					2.语句(代码)：
								下面这些都是语句(代码)：
										(1).if(){}
										(2).for(){}
										(3).switch(){case:xxxx}
		
	 */
		//模拟一些数据
		const data = ['Angular','React','Vue']
		//1.创建虚拟DOM
		const VDOM = (
			<div>
				<h1>前端js框架列表</h1>
				<ul>
					{
						data.map((item,index)=>{
							return <li key={index}>{item}</li>
						})
					}
				</ul>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```