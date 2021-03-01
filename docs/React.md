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
{数组} 会帮你遍历，  {对象}不会帮你便利，会提示不是节点。 {}里面只能写表达式
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
								下面这些都是表达式：左边定义个x= 能接到数值 就行
										(1). a
										(2). a+b
										(3). demo(1) 函数调用表达式，没数值也是undefined
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
							return <li key={index}>{item} 变量加括号，而且必须唯一的key属性</li>
						})
					}
				</ul>
			</div>
		)
		//2.渲染虚拟DOM到页面
		ReactDOM.render(VDOM,document.getElementById('test'))
	</script>
```


1.4.模块与组件、模块化与组件化的理解
1.4.1.模块
1.理解：向外提供特定功能的js程序, 一般就是一个js文件
2.为什么要拆成模块：随着业务逻辑增加，代码越来越多且复杂。
3.作用：复用js, 简化js的编写, 提高js运行效率
1.4.2.组件
1.理解：用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)
2.为什么要用组件： 一个界面的功能更复杂
3.作用：复用编码, 简化项目编码, 提高运行效率
1.4.3.模块化
当应用的js都以模块来编写的, 这个应用就是一个模块化的应用
1.4.4.组件化
当应用是以多组件的方式实现, 这个应用就是一个组件化的应用.

react插件安装，如果开发者模式，没打包，react插件图标右下角会有小图标

## 函数式组件

包含页面全部代码和资源的集合叫组件 有html css js 至少返回一个结构

```
1.创建函数式组件
function demo(){
	console.log(this); //此处的this是undefined，因为babel编译后开启了严格模式
	return <h2>我是用函数定义的组件 适用于简单组件的定义</h2>
}
2.渲染组件到页面  函数不能直接放页面 报错
ReactDOM.render(demo, document.getElementById('root'));
2.渲染组件到页面  demo不识别 首字母小写 html没demo元素 报错
ReactDOM.render(<demo/>, document.getElementById('root'));
2.渲染组件到页面  函数也得首字母大写 function Demo(){}  jsx规定，标签必须闭合
ReactDOM.render(<Demo></Demo>, document.getElementById('root'));
用React开发工具可以看见组件，定义好组件，写好标签，react帮你调用函数。函数里的this应该是window，但是这里是undefined
/* 
			执行了ReactDOM.render(<MyComponent/>.......之后，发生了什么？
					1.React解析组件标签，找到了MyComponent组件。
					2.发现组件是使用函数定义的，随后调用该函数，将返回的虚拟DOM转为真实DOM，随后呈现在页面中。中文通过jsx转换成unicode编码
		*/
```

复习类的基本知识

```
<script type="text/javascript" >
		/* 
			总结：
				1.类中的构造器不是必须要写的，要对实例进行一些初始化的操作，如添加指定属性时才写。
				2.如果A类继承了B类，且A类中写了构造器，那么A类构造器中的super是必须要调用的。
				3.类中所定义的方法，都放在了类的原型对象上，供实例去使用。
		*/
		//创建一个Person类
		class Person {
			//要接住new传递进来的参数，构造器方法，不写也可以，接不住传递进来的参数。
			constructor(name,age){
				//构造器中的this是谁？—— 类的实例对象，谁new的，this就是谁
				this.name = name
				this.age = age
			}
			//一般方法
			speak(){
				//speak方法放在了哪里？——类的**原型**对象上，供实例使用
				//通过Person实例调用speak时，speak中的this就是Person实例，谁new的，this就是谁
				console.log(`我叫${this.name}，我年龄是${this.age}`);
			}
		}

		//创建一个Student类，继承于Person类
		class Student extends Person {
			//不写构造器 也能接受参数，继承了Person了，如果多一些属性，就要写构造器。继承类的构造器里必须调用super。不写构造器就可以不写。
			constructor(name,age,grade){
				super(name,age) 把接到的共有的属性，用super给父类递过去。必须放所有人之前。放在最开始。
				this.grade = grade
				this.school = '尚硅谷'
			}
			//重写从父类继承过来的方法
			speak(){
				console.log(`我叫${this.name}，我年龄是${this.age},我读的是${this.grade}年级`);
				this.study()
			}
			study(){
				//study方法放在了哪里？——类的原型对象上，供实例使用
				//通过Student实例调用study时，study中的this就是Student实例
				console.log('我很努力的学习');
			}
		}
		
		class Car {
			constructor(name,price){
				this.name = name
				this.price = price
				// this.wheel = 4
			}
			//类中可以直接写赋值语句,如下代码的含义是：给Car的实例对象添加一个属性，名为a，值为1
			a = 1
			wheel = 4
			static demo = 100
		}
		const c1 = new Car('奔驰c63',199)
		console.log(c1); 这里输出的是Car{}  ｛｝是实例对象 前面Car是由他new出来的
		console.log(Car.demo);

		p1.speak.call({a:1,b:2}); //这时候speak中的this就是后面这个对象{}
	</script>
```

如果组件有状态，有state，就是复杂组件。没有状态，没有state，就是简单组件。组件-状态-驱动-页面
state在实例对象上。

 三大核心属性1: 组件实例对象上的 state
2.2.1. 效果

class定义的组件才能有实例，才能state。

需求: 定义一个展示天气信息的组件
1.默认展示天气炎热 或 凉爽
2.点击文字切换天气

2.2.2. 理解
1.state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
2.2.3. 强烈注意
1.组件中render方法中的this为组件实例对象
2.组件自定义的方法中this为undefined，如何解决？
a)强制绑定this: 通过函数对象的bind()
b)箭头函数
3.状态数据，不能直接修改或更新

原生绑定事件3种方式，在react里推荐第三种
```
<body>
	<button id="btn1">按钮1</button>
	<button id="btn2">按钮2</button>
	<button onclick="demo()">按钮3</button>

	<script type="text/javascript" >
		const btn1 = document.getElementById('btn1')
		btn1.addEventListener('click',()=>{
			alert('按钮1被点击了')
		})

		const btn2 = document.getElementById('btn2')
		btn2.onclick = ()=>{
			alert('按钮2被点击了')
		}

		function demo(){
			alert('按钮3被点击了')
		}

	</script>
</body>
```

this小例子
```
<script type="text/javascript" >
	class Person {
		constructor(name,age){
			this.name = name
			this.age = age
		}
		study(){
			//study方法放在了哪里？——类的原型对象上，供实例使用
			//通过Person实例调用study时，study中的this就是Person实例
			console.log(this);
		}
	}

	const p1 = new Person('tom',18)
	p1.study() //通过实例调用study方法
	const x = p1.study
	x() //这里没通过实例调用，这是直接调用，类中定义的局部方法，都开启了局部严格模式。所以是undefined 不是window

</script>
```

理解复杂的过程
```
<script type="text/babel">
	//1.创建组件
	class Weather extends React.Component{
		
		//构造器调用几次？ ———— 1次  想要用state，初始化操作，必须构造器。
		//props收到什么，取决于new的时候传的啥。而且这个new不是我自己new的，是react帮我new的。
		constructor(props){
			console.log('constructor');
			super(props) //this 的操作都要放后面。
			//初始化状态，不能直接 = true， 还可能有别的数据，所以用对象。空值建议写{} 组件实例身上放东西
			this.state = {isHot:false,wind:'微风'}
			//解决changeWeather中this指向问题,  
			// 实例没有，找到了原型上的changeWeather，把这个函数放到实例自身。调用的时候，调用挂在实例自身上的。
			// .bind 返回的是新函数，改好this了，不会执行。
			this.changeWeather = this.changeWeather.bind(this)
		}

		//render调用几次？ ———— 1+n次 1是初始化的那次 n是状态更新的次数
		render(){
			//render的this就是实例对象
			console.log('render');
			//读取状态 得把isHost 放到状态里，然后读出来，进行判断。不能写onclick. onCLick = "demo()" 不能是字符串，是函数。onClick="demo()"; 还没点，就提示执行了
			//new 实例的时候，调用render，要把demo函数调用的返回值赋值到onClick 返回值是undefined。加括号调用了。底层忽略了报错。
			// onClick={demo} 等点的时候，帮你调用。 
			const {isHot,wind} = this.state
			return <h1 id="title" onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
		}

		//changeWeather调用几次？ ———— 点几次调几次
		//function changeWeather(){} 删掉function 才能把外面的函数拿进来
		changeWeather(){
			//changeWeather放在哪里？ ———— Weather的原型对象上，供实例使用
			//通过Weather的实例调用changeWeahter时候，this就是Weather的实例对象。不需要that了。
			//但是h1上点击不能 onClick={changeWeather} 找不到
			//如果在别的函数调用，得实例化。this.changeWeather()
			//由于changeWeather是作为onClick的回调，所以不是通过实例调用的，是直接调用
			//类中的方法默认开启了局部的严格模式，所以changeWeather中的this为undefined
			//onClick={this.changeWeather} 没有new实例。所以是undefined。点击的时候，直接从堆里调用函数，不是实例调用。
			//这里this拿到实例对象，就能解决。
			console.log('changeWeather');
			//获取原来的isHot值
			const isHot = this.state.isHot
			//严重注意：状态必须通过setState进行更新,且更新是一种合并，不是替换。setState是React类上的方法。
			this.setState({isHot:!isHot})
			console.log(this);

			//严重注意：状态(state)不可直接更改，下面这行就是直接更改！！！
			//this.state.isHot = !isHot //这是错误的写法
		}
	}
	//2.渲染组件到页面
	ReactDOM.render(<Weather/>,document.getElementById('test'))
	

	function demo(){
		console.log('此处修改isHot的数值 这里拿不到state this.state 这里是this在严格模式下是undefined  不严格是window')
		//这里碰不到实例对象，实例在react上，帮你new的。
		//我在外侧第一行 let = that
		//在构造器中 constructor (){that = this}
		console.log(that.state.isHot); //就可以找到实例对象
		//这部分太繁琐。还要在外面写
	}
	// 可以用获取元素id绑定事件的方式1， title.onclick 但是不推荐 都是document，原生的方法避免。就渲染用一次就可以。
	// const title = document.getElementById('title');
	// title.addEventListener('click',()=>{
	// 	console.log('标题点击')
	// })

	const w = new Weather()
	w.changeWeather() //自己掉就是weather的实例对象。this就没问题
</script>
```


简写
```
<script type="text/babel">
		//1.创建组件
		class Weather extends React.Component{
			//初始化状态  给Weather的实例对象添加一个属性，名为state，值为{}s
			state = {isHot:false,wind:'微风'}

			render(){
				const {isHot,wind} = this.state
				return <h1 onClick={this.changeWeather}>今天天气很{isHot ? '炎热' : '凉爽'}，{wind}</h1>
			}

			//不用箭头函数,放在原型对象上.自定义方法————要用赋值语句的形式+箭头函数
			//chuangWeather =function(){} 赋值语句,给Weather的实例对象添加一个属性，名为chuangWeather，值为函数
			//这样changeWeather就放在实例自身上了. 原型上就没了changeWeather
			// 箭头函数没自己的this, 找外层函数的this, 就是自己的this 外层
			//console.log(this)这不能写函数 
			// 自定义方法, 要用赋值语句的形式  +  箭头函数.
			changeWeather = ()=>{
				//看看自己的this是谁, 是weather的实例对象.
				const isHot = this.state.isHot
				this.setState({isHot:!isHot})
			}

			demo1(){
				//自定义方法，基本上都是事件的回调，不会在外面weather.demo1()调用
				//自定义方法特别多，得在constructor写很多方法 bind(this)
			}
		}
		//2.渲染组件到页面
		ReactDOM.render(<Weather/>,document.getElementById('test'))
				
	</script>
```
2.2.2. 理解
1.state是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
2.组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)
2.2.3. 强烈注意
1.组件中render方法中的this为组件实例对象
2.组件自定义的方法中this为undefined，如何解决？
a)强制绑定this: 通过函数对象的bind()
b)箭头函数  赋值语句
3.状态数据，不能直接修改或更新

2.3.2. 理解
1.每个组件对象都会有props(properties的简写)属性
2.组件标签的所有属性都保存在props中
2.3.3. 作用
1.通过标签属性从组件外向组件内传递变化的数据
2.注意: 组件内部不要修改props数据


复习展开运算符
```
<script type="text/javascript" >
	let arr1 = [1,3,5,7,9]
	let arr2 = [2,4,6,8,10]
	console.log(...arr1); //展开一个数组
	let arr3 = [...arr1,...arr2]//连接数组
	
	//在函数中使用  接到一个数组
	function sum(...numbers){
		return numbers.reduce((preValue,currentValue)=>{
			return preValue + currentValue
		})
	}
	console.log(sum(1,2,3,4));

	//构造字面量对象时使用展开语法  没有迭代器
	let person = {name:'tom',age:18}
	let person2 = {...person}  如果是花括号,就是复制,外面是() 就不行
	//console.log(...person); //报错，展开运算符不能展开对象
	person.name = 'jerry'
	console.log(person2);
	console.log(person);

	//合并
	let person3 = {...person,name:'jack',address:"地球"}
	console.log(person3);
	
</script>
```

props 的使用
```
<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this); 这里不能用state 提前准备好数据,才这样,想从外部
			const {name,age,sex} = this.props
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//渲染组件到页面  只管传递标签属性, props收集  "19"引号里的是字符串.19+1 = 191,. 删掉''就报错了.key = value
	//这么写就什么也不是. 想传递数值的19. js的里面,得用js的东西{19}
	//容易让别人犯错,别人不知道到底是啥类型. 如果性别不传, 想传递默认属性.不传姓名不行.
	ReactDOM.render(<Person name="jerry" age={19}  sex="男"/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p); ...运算符,对象不加{}不能使用,不能让你随意使用, 只能在标签属性传递. 这里不会输出任何内容.   这样太复杂了,信息特别多, 可以批量传进去. 这是语法糖. 展开运算符不能展开对象
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	// {里面有js表达式} , 原生{} 是一个定义.  真正的js就是...p 理论上不能, 是react帮忙实现的.
	// 批量传递标签属性 person的标签属性 = 传递props
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))
</script>
```

Props的类型限制
```
<!-- 引入prop-types，用于对组件标签属性进行限制 全局多了对象 PropTypes -->
<script type="text/javascript" src="../js/prop-types.js"></script>

<script type="text/babel">
	//创建组件
	class Person extends React.Component{
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的 , 往里面传之前就改, 直接改props不行的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}
	//给组件自身添加属性, 进行一些限制.对标签属性进行类型、必要性的限制 string小写. 两个propTypes 不一样
	// 15版本有, 16之后就没了,得引入新的.  想让这部分去类的里面.
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串  改成小写不冲突
		age:PropTypes.number,//限制age为数值
		speak:PropTypes.func,//限制speak为函数 func单词  , function是关键字, 冲突了
	}
	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name={100} speak={speak}/>,document.getElementById('test1'))
	ReactDOM.render(<Person name="tom" age={18} sex="女"/>,document.getElementById('test2'))

	const p = {name:'老刘',age:18,sex:'女'}
	// console.log('@',...p);
	// ReactDOM.render(<Person name={p.name} age={p.age} sex={p.sex}/>,document.getElementById('test3'))
	ReactDOM.render(<Person {...p}/>,document.getElementById('test3'))

	function speak(){
		console.log('我说话了');
	}
</script>
```

自身加,静态的
```
<script type="text/babel">
	//创建组件
	class Person extends React.Component{

		constructor(props){
			//不接props 不写super 也可以. 构造器是否接收props，是否传递给super，取决于：是否希望在构造器中通过this访问props
			// console.log(props);
			super(props)
			console.log('constructor',this.props);  //输出实例自身的props, 不接住constructor(), 也不传super()  在构造器中 无法通过this.props 获取到数值的 
			// 1通过给this.state 赋值对象,初始化内部的state   this.state 使用.  可以省略
			// 2为事件处理绑定实例   this.weateh.bind(this)   可以省略
		}

		//对标签属性进行类型、必要性的限制  本身加.
		static propTypes = {
			name:PropTypes.string.isRequired, //限制name必传，且为字符串
			sex:PropTypes.string,//限制sex为字符串
			age:PropTypes.number,//限制age为数值
		}

		//指定默认标签属性值
		static defaultProps = {
			sex:'男',//sex默认值为男
			age:18 //age默认值为18
		}
		
		render(){
			// console.log(this);
			const {name,age,sex} = this.props
			//props是只读的
			//this.props.name = 'jack' //此行代码会报错，因为props是只读的
			return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age+1}</li>
				</ul>
			)
		}
	}

	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```

函数方式组件
```
<script type="text/babel">
	//创建组件  函数能接收参数 没runder  没status  函数这没this  不是 this.props. react帮助收集成对象了.
	// 函数式组件只能props,不能 state, 不能refs
	function Person (props){
		const {name,age,sex} = props
		return (
				<ul>
					<li>姓名：{name}</li>
					<li>性别：{sex}</li>
					<li>年龄：{age}</li>
				</ul>
			)
	}
	Person.propTypes = {
		name:PropTypes.string.isRequired, //限制name必传，且为字符串
		sex:PropTypes.string,//限制sex为字符串
		age:PropTypes.number,//限制age为数值
	}

	//指定默认标签属性值
	Person.defaultProps = {
		sex:'男',//sex默认值为男
		age:18 //age默认值为18
	}
	//渲染组件到页面
	ReactDOM.render(<Person name="jerry"/>,document.getElementById('test1'))
</script>
```


组件内的标签可以定义ref属性来标识自己 和id 类似.

标签里是ref,  属性是refs
字符串形式的ref  ref="XXX"
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this.refs
			//拿到的不是虚拟dom,而是这个虚拟dom转成真实dom的节点.
			//const input = Document.getElementById('input1') 可以,虚拟dom最终都要去真实dom.不行
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this.refs
			alert(input2.value)
		}
		render(){
			return(
				<div>
					<input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

字符串形式的ref,存在一些效率问题.

回调形式的ref
```
<script type="text/babel">
	//创建组件
	//回调函数参数就是 ref当前所在的节点. 触发函数的执行. 当前的节点传进去. 箭头函数this是实例对象<div class=""></div>
	// 挂在实例上.  currentNode  从实例自身取, 别从 this.refs取.
	class Demo extends React.Component{
		//展示左侧输入框的数据
		showData = ()=>{
			const {input1} = this
			alert(input1.value)
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			const {input2} = this
			alert(input2.value)
		}
		render(){
			return(
				<div>
					<input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

回调执行效率问题
```
<script type="text/babel">
	//创建组件  回调ref中回调执行次数的问题, 直接函数丢在这,就是内联函数
	// 重新render的时候,切换天气的是时候 回调函数会执行两次. 一次是null
	// 第二次清空了之前的. 释放之前的, 传真正的节点. 定义成class的绑定函数可以避免解决问题.
	class Demo extends React.Component{

		state = {isHot:false}

		showInfo = ()=>{
			const {input1} = this
			alert(input1.value)
		}

		changeWeather = ()=>{
			//获取原来的状态
			const {isHot} = this.state
			//更新状态
			this.setState({isHot:!isHot})
		}

		saveInput = (c)=>{
			this.input1 = c;
			console.log('@',c);
		}

		render(){
			const {isHot} = this.state
			return(
				<div>
					<h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
					{/*注释奇怪 <input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
					<input ref={this.saveInput} type="text"/><br/><br/>
					<button onClick={this.showInfo}>点我提示输入的数据</button>
					<button onClick={this.changeWeather}>点我切换天气</button>
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo/>,document.getElementById('test'))
</script>
```

createRef的使用
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		/* 
			React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
			创建一个容器,挂在实例自身上
			*/
		myRef = React.createRef()
		myRef2 = React.createRef()
		//展示左侧输入框的数据
		showData = ()=>{
			alert(this.myRef.current.value);
		}
		//展示右侧输入框的数据
		showData2 = ()=>{
			alert(this.myRef2.current.value);
		}
		render(){
			return(
				<div>
					<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

## 事件处理
```
<script type="text/babel">
	//创建组件
	class Demo extends React.Component{
		/* 
			(1).通过onXxx属性指定事件处理函数(注意大小写)
					a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性
					b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效
			(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref
			*/
		//创建ref容器
		myRef = React.createRef()
		myRef2 = React.createRef()

		//展示左侧输入框的数据
		showData = (event)=>{
			console.log(event.target);
			alert(this.myRef.current.value);
		}

		//展示右侧输入框的数据
		showData2 = (event)=>{
			alert(event.target.value);
		}

		render(){
			return(
				<div>
					<input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
					<button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
					<input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
				</div>
			)
		}
	}
	//渲染组件到页面
	ReactDOM.render(<Demo a="1" b="2"/>,document.getElementById('test'))
</script>
```

## 收集表单信息  
受控组件  输入类的dom, 能把数据维护到状态里, 用的时候, 从状态取出来.
```
<script type="text/babel">
	//创建组件
	class Login extends React.Component{

		//初始化状态, 没初始化不太好.
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存用户名到状态中
		saveUsername = (event)=>{
			this.setState({username:event.target.value})
		}

		//保存密码到状态中
		savePassword = (event)=>{
			this.setState({password:event.target.value})
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}

		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={this.saveUsername} type="text" name="username"/>
					密码：<input onChange={this.savePassword} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```
非受控组件, 表单输入类dom数值, 现用现取, 就是非受控组件.

```
<!-- 准备好一个“容器” -->
	<div id="test"></div>
	
	<!-- 引入react核心库 -->
	<script type="text/javascript" src="../js/react.development.js"></script>
	<!-- 引入react-dom，用于支持react操作DOM -->
	<script type="text/javascript" src="../js/react-dom.development.js"></script>
	<!-- 引入babel，用于将jsx转为js -->
	<script type="text/javascript" src="../js/babel.min.js"></script>

	<script type="text/babel">
		//创建组件
		class Login extends React.Component{
			handleSubmit = (event)=>{
				event.preventDefault() //阻止表单提交
				const {username,password} = this
				alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
			}
			render(){
				return(
					<form onSubmit={this.handleSubmit}>
						用户名：<input ref={c => this.username = c} type="text" name="username"/>
						密码：<input ref={c => this.password = c} type="password" name="password"/>
						<button>登录</button>
					</form>
				)
			}
		}
		//渲染组件
		ReactDOM.render(<Login/>,document.getElementById('test'))
	</script>
```



复习对象的知识 中括号
```
<script type="text/javascript" >
	let a = 'name'

	let obj = {} // {name:'tom'}
	obj[a] = 'tom'
	console.log(obj);
	
</script>
```

高阶函数 函数柯里化
```
<script type="text/babel">
	//#region 
			/* 
				高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。
								1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。
								2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。
								常见的高阶函数有：Promise、setTimeout、arr.map()等等

				函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 
					function sum(a){
						return(b)=>{
							return (c)=>{
								return a+b+c
							}
						}
					}
					function(a){
						return (b)=>{
							return (c)=>{
								return a+b+c
							}
						}
					}
					sum(1)(2)(3)
				*/
	//#endregion
	//创建组件
	class Login extends React.Component{
		//初始化状态
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存表单数据到状态中 , 真正的回调,要传event. 不加中括号, 就是一个新的key dataType
		// 不加中括号 相当于'dataType'  这个就是高阶函数
		saveFormData = (dataType)=>{
			return (event)=>{
				this.setState({[dataType]:event.target.value})
			}
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}
		//这里加括号, 就是调用返回值的结果给onChange, 如果返回值是箭头函数,就能继续调用.
		// 必须把函数作为onChange作为回调
		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
					密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```

不用柯里化实现
```
<script type="text/babel">
	//创建组件
	class Login extends React.Component{
		//初始化状态
		state = {
			username:'', //用户名
			password:'' //密码
		}

		//保存表单数据到状态中
		saveFormData = (dataType,event)=>{
			this.setState({[dataType]:event.target.value})
		}

		//表单提交的回调
		handleSubmit = (event)=>{
			event.preventDefault() //阻止表单提交
			const {username,password} = this.state
			alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
		}
		render(){
			return(
				<form onSubmit={this.handleSubmit}>
					用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
					密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
					<button>登录</button>
				</form>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Login/>,document.getElementById('test'))
</script>
```

## 组件生命周期
导入
```
<script type="text/babel">
	//创建组件
	//生命周期回调函数 <=> 生命周期钩子函数 <=> 生命周期函数 <=> 生命周期钩子
	class Life extends React.Component{

		state = {opacity:1}

		death = ()=>{
			//卸载组件
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//组件挂完毕 里面的this没问题 实例调用的
		componentDidMount(){
			console.log('componentDidMount');
			this.timer = setInterval(() => {
				//获取原状态
				let {opacity} = this.state
				//减小0.1
				opacity -= 0.1
				if(opacity <= 0) opacity = 1
				//设置新的透明度
				this.setState({opacity})
			}, 200);
		}

		//组件将要卸载
		componentWillUnmount(){
			//清除定时器
			clearInterval(this.timer)
		}

		//初始化渲染、状态更新之后  不能再下面写定时器,会无限递归. 1+ n次 定时器r修改状态, 会执行
		// 可以写一个按钮,让定时器开始.
		// 需要一个时间点
		render(){
			console.log('render');
			return(
				<div>
					<h2 style={{opacity:this.state.opacity}}>React学不会怎么办？</h2>
					<button onClick={this.death}>不活了</button>
				</div>
			)
		}
	}
	//渲染组件
	ReactDOM.render(<Life/>,document.getElementById('test'))
</script>
```


旧版本的生命周期

```
<script type="text/babel">
	/* 
			1. 初始化阶段: 由ReactDOM.render()触发---初次渲染
								1.	constructor()
								2.	componentWillMount()
								3.	render()
								4.	componentDidMount() =====> 常用
												一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
			2. 更新阶段: 由组件内部this.setSate()或父组件render触发
								1.	shouldComponentUpdate()
								2.	componentWillUpdate()
								3.	render() =====> 必须使用的一个
								4.	componentDidUpdate()
			3. 卸载组件: 由ReactDOM.unmountComponentAtNode()触发
								1.	componentWillUnmount()  =====> 常用
												一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息
	*/
	//创建组件
	class Count extends React.Component{

		//构造器
		constructor(props){
			console.log('Count---constructor');
			super(props)
			//初始化状态  写外侧也没问题 
			this.state = {count:0}
		}

		//加1按钮的回调
		add = ()=>{
			//获取原状态
			const {count} = this.state
			//更新状态
			this.setState({count:count+1})
		}

		//卸载组件按钮的回调
		death = ()=>{
			ReactDOM.unmountComponentAtNode(document.getElementById('test'))
		}

		//强制更新按钮的回调, 数据没变 就强行更新, 没阀门控制.
		force = ()=>{
			this.forceUpdate()
		}

		//组件将要挂载的钩子
		componentWillMount(){
			console.log('Count---componentWillMount');
		}

		//组件挂载完毕的钩子
		componentDidMount(){
			console.log('Count---componentDidMount');
		}

		//组件将要卸载的钩子
		componentWillUnmount(){
			console.log('Count---componentWillUnmount');
		}

		//控制组件更新的“阀门” 组件是否应该被更新 不写永远返回true
		shouldComponentUpdate(){
			console.log('Count---shouldComponentUpdate');
			return true
		}

		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('Count---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('Count---componentDidUpdate');
		}

		render(){
			console.log('Count---render');
			const {count} = this.state
			return(
				<div>
					<h2>当前求和为：{count}</h2>
					<button onClick={this.add}>点我+1</button>
					<button onClick={this.death}>卸载组件</button>
					<button onClick={this.force}>不更改任何状态中的数据，强制更新一下</button>
				</div>
			)
		}
	}
	
	//父组件A
	class A extends React.Component{
		//初始化状态
		state = {carName:'奔驰'}

		changeCar = ()=>{
			this.setState({carName:'奥拓'})
		}

		render(){
			return(
				<div>
					<div>我是A组件</div>
					<button onClick={this.changeCar}>换车</button>
					<B carName={this.state.carName}/>
				</div>
			)
		}
	}
	
	//子组件B
	class B extends React.Component{
		//组件将要接收新的props的钩子 第一次传的不算 第二次算
		componentWillReceiveProps(props){
			console.log('B---componentWillReceiveProps',props);
		}

		//控制组件更新的“阀门”
		shouldComponentUpdate(){
			console.log('B---shouldComponentUpdate');
			return true
		}
		//组件将要更新的钩子
		componentWillUpdate(){
			console.log('B---componentWillUpdate');
		}

		//组件更新完毕的钩子
		componentDidUpdate(){
			console.log('B---componentDidUpdate');
		}

		render(){
			console.log('B---render');
			return(
				<div>我是B组件，接收到的车是:{this.props.carName}</div>
			)
		}
	}
	
	//渲染组件
	ReactDOM.render(<A/>,document.getElementById('test'))
</script>
```

## 4_getSnapShotBeforeUpdate的使用场景
```
<script type="text/babel">
	class NewsList extends React.Component{

		state = {newsArr:[]}

		componentDidMount(){
			setInterval(() => {
				//获取原状态
				const {newsArr} = this.state
				//模拟一条新闻
				const news = '新闻'+ (newsArr.length+1)
				//更新状态
				this.setState({newsArr:[news,...newsArr]})
			}, 1000);
		}

		getSnapshotBeforeUpdate(){
			return this.refs.list.scrollHeight
		}

		//上一个传过来的height
		componentDidUpdate(preProps,preState,height){
			this.refs.list.scrollTop += this.refs.list.scrollHeight - height
		}

		render(){
			return(
				<div className="list" ref="list">
					{
						this.state.newsArr.map((n,index)=>{
							return <div key={index} className="news">{n}</div>
						})
					}
				</div>
			)
		}
	}
	ReactDOM.render(<NewsList/>,document.getElementById('test'))
</script>
```
## Dom的Diffing算法

最小力度是节点  input里面输入点东西, 时间更新不会丢
span里面的东西也不会丢 对比很多层
```
<script type="text/babel">
	class Time extends React.Component {
		state = {date: new Date()}

		componentDidMount () {
			setInterval(() => {
				this.setState({
					date: new Date()
				})
			}, 1000)
		}

		render () {
			return (
				<div>
					<h1>hello</h1>
					<input type="text"/>
					<span>
						现在是：{this.state.date.toTimeString()}
						<input type="text"/>
					</span>
				</div>
			)
		}
	}

	ReactDOM.render(<Time/>,document.getElementById('test'))
</script>
```

/*
   经典面试题:
      1). react/vue中的key有什么作用？（key的内部原理是什么？）
      2). 为什么遍历列表时，key最好不要用index?
      
			1. 虚拟DOM中key的作用：
					1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用。

					2). 详细的说: 当状态中的数据发生变化时，react会根据【新数据】生成【新的虚拟DOM】, 
												随后React进行【新虚拟DOM】与【旧虚拟DOM】的diff比较，比较规则如下：

									a. 旧虚拟DOM中找到了与新虚拟DOM相同的key：
												(1).若虚拟DOM中内容没变, 直接使用之前的真实DOM
												(2).若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM

									b. 旧虚拟DOM中未找到与新虚拟DOM相同的key
												根据数据创建新的真实DOM，随后渲染到到页面
									
			2. 用index作为key可能会引发的问题：
								1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
												会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

								2. 如果结构中还包含输入类的DOM：
												会产生错误DOM更新 ==> 界面有问题。
												
								3. 注意！如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，
									仅用于渲染列表用于展示，使用index作为key是没有问题的。
					
			3. 开发中如何选择key?:
								1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
								2.如果确定只是简单的展示数据，用index也是可以的。
   */
	
	/* 
		慢动作回放----使用index索引值作为key

			初始数据：
					{id:1,name:'小张',age:18},
					{id:2,name:'小李',age:19},
			初始的虚拟DOM：
					<li key=0>小张---18<input type="text"/></li>
					<li key=1>小李---19<input type="text"/></li>

			更新后的数据：
					{id:3,name:'小王',age:20},
					{id:1,name:'小张',age:18},
					{id:2,name:'小李',age:19},
			更新数据后的虚拟DOM：
					<li key=0>小王---20<input type="text"/></li>
					<li key=1>小张---18<input type="text"/></li>
					<li key=2>小李---19<input type="text"/></li>

	-----------------------------------------------------------------

	慢动作回放----使用id唯一标识作为key

			初始数据：
					{id:1,name:'小张',age:18},
					{id:2,name:'小李',age:19},
			初始的虚拟DOM：
					<li key=1>小张---18<input type="text"/></li>
					<li key=2>小李---19<input type="text"/></li>

			更新后的数据：
					{id:3,name:'小王',age:20},
					{id:1,name:'小张',age:18},
					{id:2,name:'小李',age:19},
			更新数据后的虚拟DOM：
					<li key=3>小王---20<input type="text"/></li>
					<li key=1>小张---18<input type="text"/></li>
					<li key=2>小李---19<input type="text"/></li>


	 */


## react应用(基于react脚手架)

快速创建基于react的模板项目, 包含了所有需要的配置(语法检查,jsx编译,devServer)
下载好了相关的依赖
可以直接运行简单的效果
react提供了创建react项目的脚手架 react+webpack+es6+eslint
开发特点是模块化,组件化,工程话

3.1.2. 创建项目并启动
第一步，全局安装：npm i -g create-react-app
第二步，切换到想创项目的目录，使用命令：create-react-app hello-react
第三步，进入项目文件夹：cd hello-react
第四步，启动项目：npm start


```public文件
<!DOCTYPE html>
<html lang="en">
  <head>
		<meta charset="utf-8" />
		<!-- %PUBLIC_URL%代表public文件夹的路径  ./也可以相对路径-->
		<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
		<!-- 开启理想视口，用于做移动端网页的适配 -->
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!-- 用于配置浏览器页签+地址栏的颜色(仅支持安卓手机浏览器) 兼容性不好-->
    <meta name="theme-color" content="red" />
    <meta
      name="description"
      content="Web site created using create-react-app"
		/>
		<!-- 用于指定网页添加到手机主屏幕后的图标 -->
		<link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
		<!-- 应用加壳时的配置文件 配置权限 名字 图标-->
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>React App</title>
  </head>
  <body>
		<!-- 若llq不支持js则展示标签中的内容 -->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```


root上只有一个app组件
src里的app.css可以在public/css 中, 用app.html link标签引入.

<React.StrictMode><App/></React.StrictMode>  检查app里面和子组件是否合理.用着用着不让用了.比如ref

reportWebVitals 文件记录页面性能.
setupTest.js 组件整体测试

index.html  App.js   index.js 是必须的.
先去index.js 引入核心库dom 样式  组件, 渲染了app, 自动去public, index.html找root.
App组件,展示样式.


jsx 后缀是组件
引入组件 js 或者  jsx都可以不写后缀

如果文件夹内的组件名称叫 index.jsx 
引入的时候, 可以不写文件名称. 都叫index, 没法区分.

### 样式的组件化

不用组件样式的class写一样.后引入的样式覆盖前面的.
样式在组件引入 
import './index.css'

index.module.css 样式名称改变
引入的时候 import hello from './index.css'
样式保存在hello中
 className = {hello.title} 不过这样就麻烦了.

 代码片段.
 ES7 React/Redux  插件


 uuid 
 nanoid 生成唯一id

 拆完组件不会命名，是因为不合理

### 功能界面组件化编码流程
 1.拆分组建，拆分界面，抽取组件
 2.实现静态组件，使用组件实现静态页面效果
 3.实现动态组件
   动态显示初始化数据 数据类型 名称 保存在哪个组件
   交互(从绑定事件监听开始) 


   如何静态转react， class= 换成 className = 
   style的驼峰

通过父组件管理所有状态。
```
<input type="text" type="checkbox" defaultChecked={true} /> 
```
第一次选中，后续可修改，不然就不可以修改了。

todoList案例相关知识点
	1.拆分组件、实现静态组件，注意：className、style的写法
	2.动态初始化列表，如何确定将数据放在哪个组件的state中？
				——某个组件使用：放在其自身的state中
				——某些组件使用：放在他们共同的父组件state中（官方称此操作为：状态提升）
	3.关于父子之间通信：
			1.【父组件】给【子组件】传递数据：通过props传递
			2.【子组件】给【父组件】传递数据：通过props传递，要求父提前给子传递一个函数
	4.注意defaultChecked 和 checked的区别，类似的还有：defaultValue 和 value
	5.状态在哪里，操作状态的方法就在哪里