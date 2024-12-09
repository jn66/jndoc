# 初识 Vue

  <img src="./images/1695089947298-161c1b47-eb86-42fb-b1f8-d6a4fcab8ee2.png" alt="image.png" style="zoom:30%;" />

    1.想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象；
    2.root容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法；
    3.root容器里的代码被称为【Vue模板】；
    4.Vue实例和容器是一一对应的；
    5.真实开发中只有一个Vue实例，并且会配合着组件一起使用；
    6.{{xxx}}中的xxx要写js表达式，且xxx可以自动读取到data中的所有属性；
    7.一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新；

    注意区分：js表达式 和 js代码(语句)
            1.表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方：
                        (1). a
                        (2). a+b
                        (3). demo(1)
                        (4). x === y ? 'a' : 'b'

            2.js代码(语句)
                        (1). if(){}
                        (2). for(){}

# Vue 模板语法有 2 大类：

    1.插值语法：
            功能：用于解析标签体内容。
            写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性。
    2.指令语法：
            功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）。
            举例：v-bind:href="xxx" 或  简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性。
            备注：Vue中有很多的指令，且形式都是：v-????，此处我们只是拿v-bind举个例子。

# Vue 中有 2 种数据绑定的方式：

    1.单向绑定(v-bind)：数据只能从data流向页面。
    2.双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data。
    备注：
            1.双向绑定一般都应用在表单类元素上（如：input、select等）
            2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值。

# data 与 el 的 2 种写法

    1.el有2种写法
                    (1).new Vue时候配置el属性。
                    (2).先创建Vue实例，随后再通过vm.$mount('#root')指定el的值。
    2.data有2种写法
                    (1).对象式
                    (2).函数式
                    如何选择：目前哪种写法都可以，以后学习到组件时，data必须使用函数式，否则会报错。
    3.一个重要的原则：
                    由Vue管理的函数，一定不要写箭头函数，一旦写了箭头函数，this就不再是Vue实例了。

            //data的第二种写法：函数式
    		data(){
    			console.log('@@@',this) //此处的this是Vue实例对象
    			return{
    				name:'尚硅谷'
    			}
    		}

# MVVM 模型

            1. M：模型(Model) ：data中的数据
            2. V：视图(View) ：模板代码
            3. VM：视图模型(ViewModel)：Vue实例

观察发现：
1.data 中所有的属性，最后都出现在了 vm 身上。
2.vm 身上所有的属性 及 Vue 原型上所有属性，在 Vue 模板中都可以直接使用。

# 数据代理

```javascript
let number = 18;
let person = {
  name: "张三",
  sex: "男",
};

Object.defineProperty(person, "age", {
  // value:18,
  // enumerable:true, //控制属性是否可以枚举，默认值是false
  // writable:true, //控制属性是否可以被修改，默认值是false，颜色在控制台变淡
  // configurable:true //控制属性是否可以被删除，默认值是false

  //先有number，之后number变，person不会变的，因为没执行。当有人读取person的age属性时，get函数(getter)就会被调用，且返回值就是age的值
  get() {
    console.log("有人读取age属性了");
    return number;
  },

  //当有人修改person的age属性时，set函数(setter)就会被调用，且会收到修改的具体值
  set(value) {
    console.log("有人修改了age属性，且值是", value);
    number = value;
  },
});

// console.log(Object.keys(person))

console.log(person);

//通过一个对象代理对另一个对象中属性的操作
let obj = { x: 100 };
let obj2 = { y: 200 };

Object.defineProperty(obj2, "x", {
  get() {
    return obj.x;
  },
  set(value) {
    obj.x = value;
  },
});
```

1.Vue 中的数据代理：
通过 vm 对象来代理 data 对象中属性的操作（读/写）

2.Vue 中数据代理的好处：
更加方便的操作 data 中的数据

3.基本原理：
通过 Object.defineProperty()把 data 对象中所有属性添加到 vm 上。
为每一个添加到 vm 上的属性，都指定一个 getter/setter。
在 getter/setter 内部去操作（读/写）data 中对应的属性。
\_data 里面不是数据代理 是数据劫持。

# 事件的基本使用：

1.使用 v-on:xxx 或 @xxx 绑定事件，其中 xxx 是事件名； 2.事件的回调需要配置在 methods 对象中，最终会在 vm 上；
3.methods 中配置的函数，不要用箭头函数！否则 this 就不是 vm 了；
4.methods 中配置的函数，都是被 Vue 所管理的函数，this 的指向是 vm 或 组件实例对象；
5.@click="demo" 和 @click="demo($event)" 效果一致，但后者可以传参；

# Vue 中的事件修饰符：

1.prevent：阻止默认事件（常用）；
2.stop：阻止事件冒泡（常用）；
3.once：事件只触发一次（常用）；
4.capture：使用事件的捕获模式；
5.self：只有 event.target 是当前操作的元素时才触发事件；
6.passive：事件的默认行为立即执行，无需等待事件回调执行完毕；

# 键盘事件

1.Vue 中常用的按键别名：
回车 => enter
删除 => delete (捕获“删除”和“退格”键)
退出 => esc
空格 => space
换行 => tab (特殊，必须配合 keydown 去使用,keyup 已经切换走了)
上 => up
下 => down
左 => left
右 => right

2.Vue 未提供别名的按键，可以使用按键原始的 key 值去绑定，但注意要转为 kebab-case（短横线命名）

3.系统修饰键（用法特殊）：ctrl、alt、shift、meta
(1).配合 keyup 使用：按下修饰键的同时，再按下其他键，随后释放其他键，事件才被触发。
(2).配合 keydown 使用：正常触发事件。

4.也可以使用 keyCode 去指定具体的按键（不推荐）

5.Vue.config.keyCodes.自定义键名 = 键码，可以去定制按键别名

# 计算属性：

1.定义：要用的属性不存在，要通过已有属性计算得来。不能是别的地方的变量。 2.原理：底层借助了 Objcet.defineproperty 方法提供的 getter 和 setter。
3.get 函数什么时候执行？
(1).初次读取时会执行一次。
(2).当依赖的数据发生改变时会被再次调用。 4.优势：与 methods 实现相比，内部有缓存机制（复用），效率更高，调试方便。 5.备注： 1.计算属性最终会出现在 vm 上，直接读取使用即可。别.get 2.如果计算属性要被修改，那必须写 set 函数去响应修改，且 set 中要引起计算时依赖的数据发生改变。

# 深度监视：

    (1).Vue中的watch默认不监测对象内部值的改变（一层）。
    (2).配置deep:true可以监测对象内部值改变（多层）。

备注：
(1).Vue 自身可以监测对象内部值的改变，但 Vue 提供的 watch 默认不可以！
(2).使用 watch 时根据数据的具体结构，决定是否采用深度监视。

    //监视多级结构中某个属性的变化
    /* 'numbers.a':{
        handler(){
            console.log('a被改变了')
        }
    } */
    //监视多级结构中所有属性的变化。vue能在模板检测到改变。但是默认不在watch中检测内部数值
    numbers:{
        deep:true,
        handler(){
            console.log('numbers改变了')
        }
    }

# computed 和 watch 之间的区别：

    1.computed能完成的功能，watch都可以完成。
    2.watch能完成的功能，computed不一定能完成，例如：watch可以进行异步操作。

两个重要的小原则： 1.所被 Vue 管理的函数，最好写成普通函数，这样 this 的指向才是 vm 或 组件实例对象。 2.所有不被 Vue 所管理的函数（定时器的回调函数、ajax 的回调函数等、Promise 的回调函数），最好写成箭头函数，
这样 this 的指向才是 vm 或 组件实例对象。

# 绑定样式：

1. class 样式
   写法:class="xxx" xxx 可以是字符串、对象、数组。
   字符串写法适用于：类名不确定，要动态获取。
   数组写法适用于：要绑定多个样式，个数不确定，名字也不确定。
   对象写法适用于：要绑定多个样式，个数确定，名字也确定，但不确定用不用。
2. style 样式
   :style="{fontSize: xxx}"其中 xxx 是动态值。
   :style="[a,b]"其中 a、b 是样式对象。

# 条件渲染：

    1.v-if
                写法：
                        (1).v-if="表达式"
                        (2).v-else-if="表达式"
                        (3).v-else="表达式"
                适用于：切换频率较低的场景。
                特点：不展示的DOM元素直接被移除。
                注意：v-if可以和:v-else-if、v-else一起使用，但要求结构不能被“打断”。

    2.v-show
                写法：v-show="表达式"
                适用于：切换频率较高的场景。
                特点：不展示的DOM元素未被移除，仅仅是使用样式隐藏掉

    3.备注：使用v-if的时，元素可能无法获取到，而使用v-show一定可以获取到。

# v-for 指令:

            1.用于展示列表数据
            2.语法：v-for="(item, index) in xxx" :key="yyy"
            3.可遍历：数组、对象、字符串（用的很少）、指定次数（用的很少 (number,index) of 5  ）

# key

面试题：react、vue 中的 key 有什么作用？（key 的内部原理）
key 看不见，如果选别的属性 :a=123 是能看见的，vue 内部使用。隐藏了。
如果没有写 key，vue 用 index 帮你补充 key。

        1. 虚拟DOM中key的作用：
                        key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】,
                        随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

        2.对比规则：
                    (1).旧虚拟DOM中找到了与新虚拟DOM相同的key：
                                ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
                                ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。

                    (2).旧虚拟DOM中未找到与新虚拟DOM相同的key
                                创建新的真实DOM，随后渲染到到页面。

        3. 用index作为key可能会引发的问题：
                            1. 若对数据进行：逆序添加、逆序删除等破坏顺序操作:
                                            会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

                            2. 如果结构中还包含输入类的DOM：
                                            会产生错误DOM更新 ==> 界面有问题。

        4. 开发中如何选择key?:
                            1.最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值。
                            2.如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，
                                使用index作为key是没有问题的。

列表过滤

persons:[
{id:'001',name:'马冬梅',age:19,sex:'女'},
{id:'002',name:'周冬雨',age:20,sex:'女'},
{id:'003',name:'周杰伦',age:21,sex:'男'},
{id:'004',name:'温兆伦',age:22,sex:'男'}
]

computed:{
filPerons(){
// 返回要返回的数值
return this.persons.filter((p)=>{
return p.name.indexOf(this.keyWord) !== -1
})
}
}

                先通过v-model设定一个keyword，然后计算出来persons的数组中能找到的过滤出来 返回这个数组，再把结果返回。

列表排序
new Vue({
el:'#root',
data:{
keyWord:'',
sortType:0, //0 原顺序 1 降序 2 升序
persons:[
{id:'001',name:'马冬梅',age:30,sex:'女'},
{id:'002',name:'周冬雨',age:31,sex:'女'},
{id:'003',name:'周杰伦',age:18,sex:'男'},
{id:'004',name:'温兆伦',age:19,sex:'男'}
]
},
computed:{
filPerons(){
const arr = this.persons.filter((p)=>{
return p.name.indexOf(this.keyWord) !== -1
})
//判断一下是否需要排序
if(this.sortType){
arr.sort((p1,p2)=>{
return this.sortType === 1 ? p2.age-p1.age : p1.age-p2.age
})
}
return arr
}
}
})

更新时候遇到的问题
updateMei(){
// this.persons[0].name = '马老师' //奏效
// this.persons[0].age = 50 //奏效
// this.persons[0].sex = '男' //奏效
// this.persons[0] = {id:'001',name:'马老师',age:50,sex:'男'} //不奏效，数据变了，vue 没监测到。先点开发工具不变，后点开发现变了。
this.persons.splice(0,1,{id:'001',name:'马老师',age:50,sex:'男'})
}

先加工 data 加工就能做响应式 页面才能跟着变，然后把 vm.\_data = data

模拟一个数据检测

```javascript
let data = {
  name: "尚硅谷",
  address: "北京",
};

//创建一个监视的实例对象，用于监视data中属性的变化
const obs = new Observer(data);
console.log(obs);

//准备一个vm实例对象
let vm = {};
vm._data = data = obs;

function Observer(obj) {
  //汇总对象中所有的属性形成一个数组
  const keys = Object.keys(obj);
  //遍历
  keys.forEach((k) => {
    Object.defineProperty(this, k, {
      get() {
        return obj[k]; //不能只能返回数组，否则会循环递归
      },
      set(val) {
        console.log(`${k}被改了，我要去解析模板，生成虚拟DOM.....我要开始忙了`);
        obj[k] = val;
      },
    });
  });
}
```

vue.set 的使用，追加一个新元素，要响应

```javascript
methods: {
   addSex(){
       // Vue.set(this.student,'sex','男')  Vue是set  vm是$set  也能写._data.student
       // 只能给data里面的某一个对象追加，不能给data追加。除非再套一层
       this.$set(this.student,'sex','男')
   }
}
```

Vue 监视数据的原理：

1. vue 会监视 data 中所有层次的数据。

2. 如何监测对象中的数据？
   通过 setter 实现监视，且要在 new Vue 时就传入要监测的数据。
   (1).对象中后追加的属性，Vue 默认不做响应式处理
   (2).如需给后添加的属性做响应式，请使用如下 API：
   Vue.set(target，propertyName/index，value) 或
   vm.$set(target，propertyName/index，value)

3. 如何监测数组中的数据？  
    通过包裹数组更新元素的方法实现，本质就是做了两件事：
   (1).调用原生对应的方法对数组进行更新。
   (2).重新解析模板，进而更新页面。

4.在 Vue 修改数组中的某个元素一定要用如下方法：数组没有 get 和 set，不能用索引更改，这些方法被 vue 管理，被 vue 重写了。沿着原型找，先找到 vue 在原型上写的 push 1.使用这些 API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
2.Vue.set() 或 vm.$set() 用这个可以用各数 Vue.set(vm.\_data.student.hobby,1,'aaa')

特别注意：Vue.set() 和 vm.$set() 不能给 vm 或 vm 的根数据对象 添加属性！！！
给数组加的对象也是响应式的
data 被数据劫持，增加了 get 和 set
-->

# 收集表单数据：

若：<input type="text"/>，则 v-model 收集的是 value 值，用户输入的就是 value 值。
若：<input type="radio"/>，则 v-model 收集的是 value 值，且要给标签配置 value 值。
若：<input type="checkbox"/> 1.没有配置 input 的 value 属性，那么收集的就是 checked（勾选 or 未勾选，是布尔值） 2.配置 input 的 value 属性:
(1)v-model 的初始值是非数组，那么收集的就是 checked（勾选 or 未勾选，是布尔值）
(2)v-model 的初始值是数组，那么收集的的就是 value 组成的数组
备注：v-model 的三个修饰符：
lazy：失去焦点再收集数据
number：输入字符串转为有效的数字
trim：输入首尾空格过滤

# 过滤器：

    定义：对要显示的数据进行特定格式化后再显示（适用于一些简单逻辑的处理）。
    语法：
            1.注册过滤器：Vue.filter(name,callback) 或 new Vue{filters:{}}
            2.使用过滤器：{{ xxx | 过滤器名}}  或  v-bind:属性 = "xxx | 过滤器名"
    备注：
            1.过滤器也可以接收额外参数、多个过滤器也可以串联
            2.并没有改变原本的数据, 是产生新的对应的数据

# 内置指令

我们学过的指令：
v-bind : 单向绑定解析表达式, 可简写为 :xxx
v-model : 双向数据绑定
v-for : 遍历数组/对象/字符串
v-on : 绑定事件监听, 可简写为@
v-if : 条件渲染（动态控制节点是否存存在）
v-else : 条件渲染（动态控制节点是否存存在）
v-show : 条件渲染 (动态控制节点是否展示)
v-text 指令： 1.作用：向其所在的节点中渲染文本内容。 2.与插值语法的区别：v-text 会替换掉节点中的内容，{{xx}}则不会。

v-html 指令： 1.作用：向指定节点中渲染包含 html 结构的内容。 2.与插值语法的区别：
(1).v-html 会替换掉节点中所有的内容，{{xx}}则不会。
(2).v-html 可以识别 html 结构。 3.严重注意：v-html 有安全性问题！！！！
(1).在网站上动态渲染任意 HTML 是非常危险的，容易导致 XSS 攻击。
(2).一定要在可信的内容上使用 v-html，永不要用在用户提交的内容上！

v-cloak 指令（没有值）： 1.本质是一个特殊属性，Vue 实例创建完毕并接管容器后，会删掉 v-cloak 属性。 2.使用 css 配合 v-cloak 可以解决网速慢时页面展示出{{xxx}}的问题。

        script标签 放前面阻塞全部，放后面只阻塞后面，但是模板的{{}}会出现在页面中，所以要放后面，然后给root里面的一个标签加上 v-cloak  然后[v-clock]{display:none;}

v-once 指令：
1.v-once 所在节点在初次动态渲染后，就视为静态内容了。 2.以后数据的改变不会引起 v-once 所在结构的更新，可以用于优化性能。

v-pre 指令： 1.跳过其所在节点的编译过程。 2.可利用它跳过：没有使用指令语法、没有使用插值语法的节点，会加快编译。

# 自定义指令

需求 1：定义一个 v-big 指令，和 v-text 功能类似，但会把绑定的数值放大 10 倍。
需求 2：定义一个 v-fbind 指令，和 v-bind 功能类似，但可以让其所绑定的 input 元素默认获取焦点。
自定义指令总结：
一、定义语法：
(1).局部指令：
new Vue({ new Vue({
directives:{指令名:配置对象} 或 directives{指令名:回调函数}
}) })
(2).全局指令：
Vue.directive(指令名,配置对象) 或 Vue.directive(指令名,回调函数)

        二、配置对象中常用的3个回调：
                    (1).bind：指令与元素成功绑定时调用。还没放入页面，获取焦点后失效。
                    (2).inserted：指令所在元素被插入页面时调用。
                    (3).update：指令所在模板结构被重新解析时调用。

        三、备注：
                    1.指令定义时不加v-，但使用时要加v-；
                    2.指令名如果是多个单词，要使用kebab-case命名方式，不要用camelCase命名。


    例子：

```javascript
new Vue({
    el:'#root',
    data:{
        name:'尚硅谷',
        n:1
    },
    directives:{
        //big函数何时会被调用？1.指令与元素成功绑定时（一上来）。2.指令所在的模板被重新解析时。
        /* 'big-number'(element,binding){
            // console.log('big')
            element.innerText = binding.value * 10
        }, */
        big(element,binding){
            // element instanceof HTMLElement 是元素节点
            console.log('big',this) //注意此处的this是window； 不靠返回值
            // console.log('big')
            element.innerText = binding.value * 10
        },
        fbind:{
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
                element.value = binding.value
            },
            //指令所在元素被插入页面时  需要拿到父元素。
            inserted(element,binding){
                element.focus()
            },
            //指令所在的模板被重新解析时
            update(element,binding){
                element.value = binding.value
            }
        }
    }
})



<!-- 回顾一个dom操作。 先获取焦点，再放进去，焦点还是没获取 -->
		<script type="text/javascript" >
			const btn = document.getElementById('btn')
			btn.onclick = ()=>{
				const input = document.createElement('input')

				input.className = 'demo'
				input.value = 99
				input.onclick = ()=>{alert(1)}

				document.body.appendChild(input)

				input.focus()
				// input.parentElement.style.backgroundColor = 'skyblue'
				console.log(input.parentElement)

			}
		</script>

```

# 生命周期：

    1.又名：生命周期回调函数、生命周期函数、生命周期钩子。
    2.是什么：Vue在关键时刻帮我们调用的一些特殊名称的函数。
    3.生命周期函数的名字不可更改，但函数的具体内容是程序员根据需求编写的。
    4.生命周期函数中的this指向是vm 或 组件实例对象。

    //通过外部的定时器实现（不推荐） 尽量内部消化。
    /* setInterval(() => {
        vm.opacity -= 0.01
        if(vm.opacity <= 0) vm.opacity = 1
    },16) */

<!-- vm.$mount("#root") 调用了 才有后面的操作，可以在控制台调用，就会调用后面的函数。 -->

```js
new Vue({
  el: "#root",
  // template:`
  // 	<div>  不能用template作为跟标签 必须有一个跟标签 vue3 可以用firgmenet
  // 		<h2>当前的n值是：{{n}} 这么写没提示 不太舒服。用template 就没div的root里了  就完全替换了。 </h2>
  // 		<button @click="add">点我n+1</button>
  // 	</div>
  // `,
  data: {
    n: 1,
  },
  methods: {
    add() {
      console.log("add");
      this.n++;
    },
    bye() {
      console.log("bye");
      this.$destroy();
      // 大多数情况不要自杀 最好用子组件
    },
  },
  watch: {
    n() {
      console.log("n变了");
    },
  },
  beforeCreate() {
    console.log("beforeCreate");
    debugger;
    // 分析到这  这没_data  没 methods，在数据监测和数据代理创建之前
    // id root 也属于模版  最外层也能绑定:数据
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
    // 未经解析的dom，已经解析完了，还在内存中。
    // 不要这里操作dom 因为之后要把虚拟转换的真实dom插入页面
  },
  mounted() {
    console.log("mounted");
    //经过编辑的dom，所有的dom操作都有效，但是在vue中尽可能避免
  },
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
    // 这里假如调用一下 add() , n++执行了， 但是销毁了，不触发更新了。
  },
  destroyed() {
    console.log("destroyed");
    // 销毁了 ，工作成果还在，页面上的东西也在。事件监听器也不在了。。
    // 但是事件的回调还在，原生的dom事件还在。移除了自定义事件。
    // 用this.id 存定时器的timer，然后按钮清除定时器的 this.timer
  },
});
```

常用的生命周期钩子：
1.mounted: 发送 ajax 请求、启动定时器、绑定自定义事件、订阅消息等【初始化操作】。
2.beforeDestroy: 清除定时器、解绑自定义事件、取消订阅消息等【收尾工作】。

关于销毁 Vue 实例 1.销毁后借助 Vue 开发者工具看不到任何信息。 2.销毁后自定义事件会失效，但原生 DOM 事件依然有效。 3.一般不会在 beforeDestroy 操作数据，因为即便操作数据，也不会再触发更新流程了。

# 非单文件组件

Vue 中使用组件的三大步骤：
一、定义组件(创建组件)
二、注册组件
三、使用组件(写组件标签)

一、如何定义一个组件？
使用 Vue.extend(options)创建，其中 options 和 new Vue(options)时传入的那个 options 几乎一样，但也有点区别；
区别如下：
1.el 不要写，为什么？ ——— 最终所有的组件都要经过一个 vm 的管理，由 vm 中的 el 决定服务哪个容器。
2.data 必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。
备注：使用 template 可以配置组件结构。

二、如何注册组件？ 1.局部注册：靠 new Vue 的时候传入 components 选项 2.全局注册：靠 Vue.component('组件名',组件)

三、编写组件标签：
<school></school>

//第一步：创建 hello 组件
const hello = Vue.extend({
template:`
				<div>	
					<h2>你好啊！{{name}}</h2>
				</div>
			`,
data(){
return {
name:'Tom'
}
}
})

        //第二步：全局注册组件
    	Vue.component('hello',hello)

        //创建vm
    	new Vue({
    		el:'#root',
    		data:{
    			msg:'你好啊！'
    		},
    		//第二步：注册组件（局部注册）
    		components:{
    			school,
    			student
    		}
    	})

几个注意点： 1.关于组件名:
一个单词组成：
第一种写法(首字母小写)：school
第二种写法(首字母大写)：School
多个单词组成：
第一种写法(kebab-case 命名)：my-school
第二种写法(CamelCase 命名)：MySchool (需要 Vue 脚手架支持)
备注：
(1).组件名尽可能回避 HTML 中已有的元素名称，例如：h2、H2 都不行。
(2).可以使用 name 配置项指定组件在开发者工具中呈现的名字。

    2.关于组件标签:
                第一种写法：<school></school>
                第二种写法：<school/>
                备注：不用使用脚手架时，<school/>会导致后续组件不能渲染。

    3.一个简写方式：
                const school = Vue.extend(options) 可简写为：const school = options

组件里面可以套组件

# vue component

关于 VueComponent：
1.school 组件本质是一个名为 VueComponent 的构造函数，且不是程序员定义的，是 Vue.extend 生成的。

    2.我们只需要写<school/>或<school></school>，Vue解析时会帮我们创建school组件的实例对象，
        即Vue帮我们执行的：new VueComponent(options)。

    3.特别注意：每次调用Vue.extend，返回的都是一个全新的VueComponent！！！！

    4.关于this指向：
            (1).组件配置中：
                        data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】。
            (2).new Vue(options)配置中：
                        data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】。

    5.VueComponent的实例对象，以后简称vc（也可称之为：组件实例对象）。没有el，data是函数
        Vue的实例对象，以后简称vm。  有el，data是对象或者函数

# 重要关系

1.一个重要的内置关系：VueComponent.prototype.**proto** === Vue.prototype 2.为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue 原型上的属性、方法。

/_
关于不同版本的 Vue：
1.vue.js 与 vue.runtime.xxx.js 的区别：
(1).vue.js 是完整版的 Vue，包含：核心功能+模板解析器。
(2).vue.runtime.xxx.js 是运行版的 Vue，只包含：核心功能；没有模板解析器。 2.因为 vue.runtime.xxx.js 没有模板解析器，所以不能使用 template 配置项，需要使用
render 函数接收到的 createElement 函数去指定具体内容。
_/

//创建 Vue 实例对象---vm
new Vue({
el:'#app',
//render 函数完成了这个功能：将 App 组件放入容器中 这就是个 createElement，相当于 react 不支持 jsx 的。
render: h => h(App),
// render:q=> q('h1','你好啊')

    // template:`<h1>你好啊</h1>`,
    // components:{App},

})

##　 ref

<button ref="btn" @click="showDOM">点我输出上方的 DOM 元素</button>
console.log(this.$refs.btn) //真实 DOM 元素

<School ref="sch"/>
console.log(this.$refs.sch) //School组件的实例对象（vc）

## 声明接受参数

//简单声明接收
// props:['name','age','sex']

//接收的同时对数据进行类型限制
/_ props:{
name:String,
age:Number,
sex:String
} _/

//接收的同时对数据：进行类型限制+默认值的指定+必要性的限制
props:{
name:{
type:String, //name 的类型是字符串
required:true, //name 是必要的
},
age:{
type:Number,
default:99 //默认值
},
sex:{
type:String,
required:true
}
}

# mixin 用法 可以理解 include

先在根目录新建一个 mixin.js 文件

```
export const hunhe = {
	methods: {
		showName(){
			alert(this.name)
		}
	},
	mounted() {
		console.log('你好啊！')
	},
}
```

局部引用
// import {hunhe,hunhe2} from '../mixin'

    export default {
    	name:'Student',
    	data() {
    		return {
    			name:'张三',
    			sex:'男'
    		}
    	},
    	// mixins:[hunhe,hunhe2]
    }

全局引用 main.js
import {hunhe,hunhe2} from './mixin'

Vue.mixin(hunhe)
Vue.mixin(hunhe2)

# 插件

新建一个 plugin.js 的文件
export default {
install(Vue,x,y,z){
console.log(x,y,z)
//全局过滤器
Vue.filter('mySlice',function(value){
return value.slice(0,4)
})

    	//定义全局指令
    	Vue.directive('fbind',{
    		//指令与元素成功绑定时（一上来）
    		bind(element,binding){
    			element.value = binding.value
    		},
    		//指令所在元素被插入页面时
    		inserted(element,binding){
    			element.focus()
    		},
    		//指令所在的模板被重新解析时
    		update(element,binding){
    			element.value = binding.value
    		}
    	})

    	//定义混入
    	Vue.mixin({
    		data() {
    			return {
    				x:100,
    				y:200
    			}
    		},
    	})

    	//给Vue原型上添加一个方法（vm和vc就都能用了）
    	Vue.prototype.hello = ()=>{alert('你好啊')}
    }

}

main.js

//引入插件
import plugins from './plugins'

//应用（使用）插件
Vue.use(plugins,1,2,3)

# scoped

当前页面样式生效

```
<style scoped>
```

浏览器本地存储
localStorage.setItem('msg','hello!!!')
localStorage.getItem('msg')
localStorage.removeItem('msg2')
localStorage.clear()

想要保存到本地，不用给每个事件设定。用 watch 解决。
watch: {
todos:{
deep:true, 打了勾勾得深度监视
handler(value){
localStorage.setItem('todos',JSON.stringify(value))
}
}
},

初始化
//由于 todos 是 MyHeader 组件和 MyFooter 组件都在使用，所以放在 App 中.取不出得给空数组。（状态提升）
todos:JSON.parse(localStorage.getItem('todos')) || []

把传统模式改成自定义组件。
父组件- : abc = abc 换成 @abc = abc 不需要传进去了 绑定到一个地方就行。
子组件　 props 删掉，不需要从父组件接受了。
执行的时候也不能直接用 abc 了，要 this.$emit('abc',数据)

全局事件总线
window 上加个变量，不妥当
vm 上源码加肯定不妥当

Vue.prototype.x = {a:1,b:2} vue 原型上都能看见。

组件实例对象可以调用$on $emit 是因为他们在 vue 的原型对象上 vue.prototype.

弄个假的
const Demo = Vue.extend({})
const d =new Demo()
Vue.prototype.x = d

this.x.$on
实例对象上可以向上找，找到$on

也可以在 vm 上用。
//创建 vm
new Vue({
el:'#app',
render: h => h(App),
beforeCreate() {
Vue.prototype.$bus = this //安装全局事件总线
},
})

不用，得解绑。。

触发实践显示是 root，应该就是事件总线

可以做 asset 放 css，然后 js 用 import 引入，但是会引入相关的字体文件，没有的话，就不行。

也可以放到 public 文件夹下，然后做 html 页面中引入。然后用<%%>路径
