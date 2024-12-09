# AJAX的学习笔记
AJAX学习的笔记，主要环境为Node.js

## 概要

### Ajax简介

- Ajax全称为Asynchronous Javascript And XML，即异步JS和XML
- 通过Ajax可以在浏览器中向服务器发送异步请求，最大的优势：**无刷新获取数据**
- AJAX不是新的编程语言，而是一种将现有的标准组合在一起使用的新方式

### XML简介

- XML：可扩展标记语言
- XML：被设计用来传输和存储数据
- XML和HTML类似，不同点：HTML中都是预定义标签，XML中没有预定义标签，全是自定义标签，用来表示一些数据
- 现在已被JSON取代

### AJAX 的特点

#### AJAX的优点

* 可以无刷新页面与服务端进行通信
* 允许你根据用户事件来更新部分页面内容

#### AJAX 的缺点

* 没有浏览历史，不能回退
* 存在跨域问题（同源）
* SEO不友好（爬虫获取不到信息）


### HTTP协议请求报文与响应体

#### HTTP

HTTP（hypertext transport protocol）协议**超文本传输协议**，协议详细规定了浏览器和万维网服务器之间互相通信的规则

#### 请求报文

重点是格式与参数

```http
行	请求类型:GET/POST     路径URL  /s？ie=utf-8   协议版本HTTP/1.1
头 HOST: blog.sliber.cn
   Cookie: name=LMK
	Content-type: application/x-www-form-urlencoded
	Uer-Agent: chrom 83    
空行
体   username=admin&password=admin  如果是get请求，chrome里会变成 Query String Parameters
```

#### 响应报文

```
行	协议版本：HTTP/1.1    响应状态码200   响应字符串OK
头	Content-Type: text/html;charset=utf-8
	 Content-length: 2048
	 Content-encoding: gzip

空行
体    <html>-在chrome的reponse标签内
		<head>
		</head>
		<body>
			<h1>ajax学习</h1>
		</body>
	  </html>
```

## 服务器准备工作

```js
// 1. 引入express
const express = require('express');

//2. 创建应用对象
const app = express();

// 3. 创建路由规则
// request 是对请求报文的封装  response 是对响应报文的封装
app.get('/server',(request, response)=>{
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应
    response.send("HELLO GET");
});

//发送一个post请求，但是得把post改成all，才能接受所有类型的请求
app.all('/server',(request, response)=>{
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers','*');  
    //设置响应
    response.send("HELLO post");

});

//发送一个字符串格式的JSON
app.all('/json-server',(request, response)=>{
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //响应头
    response.setHeader('Access-Control-Allow-Headers','*'); 
    //响应一个数据
    const data ={
        name: 'johnny3'
    };
    //对对象进行字符串转换
    let str = JSON.stringify(data)
    //设置响应体
    response.send(str);

});

//发送一个延迟2秒响应的请求
app.all('/delay',(request, response)=>{
    //设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');

    //设置响应体
    setTimeout(()=>{
        response.send('延迟响应');
    },2000)
    
});

//同源策略  页面和服务在同一个源下。可以把静态index.html也放到这个服务器下
app.get('/home',(request, response)=>{
    response.sendFile(__dirname + '/index.html')
});

//jsonp 服务  script标签返回一个字符串不对，应该是js，发送jsonp
app.all('/jsonp', (request,response)=>{
    // response.send('console.log(123)');
    const data = {
        name :'this is json'
    }
    let str = JSON.stringify(data);

    response.end(`handle(${str})`);
})

//jsonp 服务 使用jquery script标签返回一个字符串不对，应该是js
app.all('/jq-jsonp', (request,response)=>{
    // response.send('console.log(123)');
    const data = {
        name :'this is json'
    }
    let str = JSON.stringify(data);
    //接收callback参数
    let cb =  request.query.callback;
    response.end(`${cb}(${str})`);
})

//4. 监听端口启动服务
app.listen(8001, ()=>{
    console.log("服务已经启动， 8001端口监听中.....");
})
```

准备一段html
```html
<button>点击get请求</button>
<button>点击post请求</button>
<button>点击json请求</button>
<button>点击延迟响应请求</button>
<button>取消请求</button>
<div id="result">
</div>
```
## Ajax原生GET请求
```js
   btn.onclick = function(){
      //1.创建对象
      const xhr =  new XMLHttpRequest();
      //2.初始化 设置请求方法和url  这里可以写get参数
      xhr.open('GET','http://127.0.0.1:8001/server?a=100&b=200&c=300');
      //3.发送
      xhr.send();
      //4.事件绑定 处理服务的返回的结果
      /*
            on：when：当...时候
            readystate： 是XHR对象中的一个属性，表示状态：
                        0（未初始化） 
                        1（open方法调用完毕） 
                        2（send方法调用完毕） 
                        3（服务端返回部分结果）
                        4（服务端返回所有结果）
            change：改变
      */
      xhr.onreadystatechange = function(){
         //作判断，是4(服务端返回了所有的结果)才处理数据
         if(xhr.readyState === 4 ){
            //判断响应状态码：200 404 403 401 500
            //2XX 都是成功
            if(xhr.status >= 200 && xhr.status < 300){
               //处理服务端响应结果： 行 头  空行（咱不管） 体
               //1. 处理响应行
               console.log(xhr.status);  //状态码
               console.log(xhr.statusText); //状态字符串
               //2. 所有响应头
               console.log(xhr.getAllResponseHeaders);
               //3. 响应体
               console.log(xhr.response);
               result.innerHTML = xhr.response;
            }
         }
      }
```

古老的代码使用onreadystatechange 现代代码使用onload ，加载完，查看状态，不是200就报错。

```js
// 4. 当接收到响应后，将调用此函数
xhr.onload = function() {
  if (xhr.status != 200) { // 分析响应的 HTTP 状态
    alert(`Error ${xhr.status}: ${xhr.statusText}`); // 例如 404: Not Found
  } else { // 显示结果
    alert(`Done, got ${xhr.response.length} bytes`); // response 是服务器响应
  }
};
```



## Ajax原生POST请求

```js
   btn2.onclick = function(){
      //1.创建对象
      const xhr =  new XMLHttpRequest();
      //2.初始化 设置请求类型与URL
      xhr.open('POST','http://127.0.0.1:8001/server');

      // 设置请求头   设置请求体Content-Type 类型的
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      // 设置自定义的头
      xhr.setRequestHeader('name','gogo')

      //3.发送 POST请求体  a:100&b:200 写法很多任何格式，可以自行约定
      xhr.send('a=100&b=200&c=300');
      
      //4.事件绑定 处理服务的返回的结果
      xhr.onreadystatechange = function(){
            //作判断，是4(服务端返回了所有的结果)才处理数据
            if(xhr.readyState === 4 ){
               //判断响应状态码：200 404 403 401 500 2XX 都是成功
               if(xhr.status >= 200 && xhr.status < 300){
                  //处理服务端响应结果： 行 头  空行（咱不管） 体
                  //1. 处理响应行
                  console.log(xhr.status);  //状态码
                  console.log(xhr.statusText); //状态字符串
                  //2. 所有响应头
                  console.log(xhr.getAllResponseHeaders);
                  //3. 响应体
                  console.log(xhr.response);
                  result.innerHTML = xhr.response;
               }
            }
      }

   }
```

```js
// 案例2，这里本来是post，但是未来让自定义响应头生效，需要改成all
app.all('/server', (request, response) => {
    //设置响应头  设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //响应头  允许自定义响应头
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应体
    response.send('HELLO AJAX - 3');
});
```





## Ajax原生json请求

```js
   btn3.onclick = function(){
      //1.创建对象
      const xhr =  new XMLHttpRequest();

      // 设置响应体数据类型 自动转换 字符串格式的json为真正的json
      xhr.responseType = "json";
      //2.初始化 设置请求类型与URL  增加时间戳 解决IE缓存问题
      xhr.open('GET','http://127.0.0.1:8001/json-server?t='+Date.now());

      //3.发送 POST请求体  a:100&b:200 写法很多任何格式
      xhr.send();
      
      //4.事件绑定 处理服务的返回的结果
      xhr.onreadystatechange = function(){
            //作判断，是4(服务端返回了所有的结果)才处理数据
            if(xhr.readyState === 4 ){
               //判断响应状态码：200 404 403 401 500  2XX 都是成功
               if(xhr.status >= 200 && xhr.status < 300){
                  //手动对字符串进行转换
               //    let data = JSON.parse(xhr.response);
               //    console.log(data);
               //    result.innerHTML = data.name;
               //自动转换
               console.log(xhr.response);
               result.innerHTML = xhr.response.name;
               }
            }
      }
   }
```
nodemon 可以重启动node服务

## Ajax原生中断发送请求和错误处理

```js
let xhr = null;  //中断的响应核发起的，需要使用同一个xhr。
let isSending = false; //是否正在发送Ajax请求

btn4.onclick = function(){
   if(isSending) xhr.abort();  //如果正在发送请求，就取消这个请求，发送一个新的。
   //1.创建对象
   xhr =  new XMLHttpRequest();
   //修改标识变量的数值
   isSending = true;

   //2.初始化 设置请求类型与URL  增加时间戳 解决IE缓存问题
   xhr.open('GET','http://127.0.0.1:8001/delay');
   // 超时设置
   xhr.timeout=3000;
   // 超时回调 
   xhr.ontimeout = function(){
         alert('网络异常')
   }

   //网络异常回调  可以在chrome中设置成脱机
   xhr.onerror =function(){
         alert('网络有问题')
   }
   //3.发送 POST请求体  a:100&b:200 写法很多任何格式
   xhr.send();

   //4.事件绑定 处理服务的返回的结果
   xhr.onreadystatechange = function(){
         //作判断，是4(服务端返回了所有的结果)才处理数据
         if(xhr.readyState === 4 ){
            isSending = false; //发送完了

            //判断响应状态码：200 404 403 401 500  2XX 都是成功
            if(xhr.status >= 200 && xhr.status < 300){
               console.log(xhr.response);
               result.innerHTML = xhr.response;
            }
         }
   }
}
btn5.onclick = function(){
   //1.创建对象
   xhr.abort();
}
```

取消重复发送请求

```js
//获取元素对象
        const btns = document.querySelectorAll('button');
        let x = null;
        //标识变量
        let isSending = false; // 是否正在发送AJAX请求

        btns[0].onclick = function(){
            //判断标识变量
            if(isSending) x.abort();// 如果正在发送, 则取消该请求, 创建一个新的请求
            x = new XMLHttpRequest();
            //修改 标识变量的值
            isSending = true;
            x.open("GET",'http://127.0.0.1:8000/delay');
            x.send();
            x.onreadystatechange = function(){
                if(x.readyState === 4){
                    //修改标识变量
                    isSending = false;
                }
            }
        }

        // abort
        btns[1].onclick = function(){
            x.abort();
        }
```



## jQuery发送GET POST json jsonp请求

```js
$('button').eq(0).click(function(){
   $.get('http://127.0.0.1:8001/server', {a:100,b:200}, function(data){
      console.log(data);
   })
})
$('button').eq(1).click(function(){
   $.post('http://127.0.0.1:8001/server', {a:100,b:200}, function(data){
      console.log(data);
   })
})
//第三个参数会把服务端返回的字符串格式形式的json转换成真正的json
$('button').eq(2).click(function(){
   $.get('http://127.0.0.1:8001/json-server', {a:100,b:200}, function(data){
      console.log(data);
   },'json')
})

//对象写法
$('button').eq(3).click(function(){
   $.ajax({
      url: 'http://127.0.0.1:8001/json-server',
      data:{a:100,b:200},
      type: 'GET',
      dataType: 'json',
      success: function(data){
            console.log(data);
      },
      error: function(){
            console.log('错了');
      },
      //超时时间
      timeout: 1000,
      //头信息
      headers:{
            c:300
      }
   })
})
//发送jsonp
$('button').eq(4).click(function(){
   $.getJSON('http://127.0.0.1:8001/jq-jsonp?callback=?',function(data){
      console.log(data);
   })
})
```

## Axios 发送各类请求
```js
const btns  = document.querySelectorAll('button');
btns[0].onclick = function(){
   axios.get('http://127.0.0.1:8001/json-server',{
      //url 参数
      params:{id:1},
      headers:{name:'go'},
   }).then( value => {
      console.log(value)
   })
}
btns[1].onclick = function(){
   axios.post('http://127.0.0.1:8001/server',{username:'admin'},{
      //请求行
      params:{id:1},
      //请求头
      headers:{name:'go'},
   }).then( value => {
      console.log(value)
   })
}
btns[2].onclick = function(){
   axios({
      //请求方法
      method:'POST',
      url:'http://127.0.0.1:8001/server',
      //url参数
      params: {
         ip:10
      },
      // 头信息
      headers: {
         a:100
      },
      //请求体
      data: {
         username: 'myname'
      }
   }).then(response => {
      console.log(response);
   })
}
```

## fetch发送

```js
btns[3].onclick =  function(){
   fetch('http://127.0.0.1:8001/json-server?vip=10', {
      //请求方法
      method:'POST',
      //请求头
      headers: {
            name: 'lucy'
      },
      //请求体
      body:'username=admin&pwd=123'
   }).then(response=> {
      //return response.text();
      return response.json();
   }).then(response => {
      console.log(response)
   })
}
```

## jsonp 简化版案例
app.js
```js
const data = {
    name:'哈哈'
};

handle(data);
```
正常脚本
```html
<script src="./app.js"></script>
<script>
    function handle(data){
        const resulte = document.getElementById('result');
        resulte.innerHTML = data.name;
    }
    
</script>
```

## json 正常版案例
服务端
```js
//jsonp 服务  script标签返回一个字符串不对，应该是js，发送jsonp
app.all('/jsonp', (request,response)=>{
    // response.send('console.log(123)');
    const data = {
        name :'this is json'
    }
    let str = JSON.stringify(data);

    response.end(`handle(${str})`);
})
```

```js
// 获取数据
function handle(data){
   console.log(data);
}
//创建script标签
const script =  document.createElement('script');
//设置标签src属性
script.src = 'http://127.0.0.1:8000/jsonp'
//将script插入文档中
document.body.appendChild(script);
```
## 第三章： 跨域

### 3.1 同源策略

同源策略（Same-Origin Policy）最早由 Netscape 公司提出，是浏览器的一种安全策略。

 同源：协议、域名、端口号 必须完全相同

违背同源策略就是跨域

### 3.2 如何解决跨域

#### 3.2.1 JSONP

1. JSONP是什么

   JSONP (JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持get请求

2. JSONP 怎么工作的？

   在网页有一些标签天生具有跨域能力，比如：img, link, iframe, script

   JSONP就是利用**script**标签的跨域能力来发送请求的

3. JSONP的使用

   - 动态的创建一个script标签

   ```js
   var script = document.createElement("script");
   ```

   - 设置script的src，设置回调函数

   ~~~js
   script.src = "http://locallhost:3000/textAJAX?callback=abc"
   ~~~

   

### 3.2.2 CORS

推荐阅读：

- http://www.ruanyifeng.com/blog/2016/04/cors.html
- https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

1. CORS是什么？

   CORS (Cross-Origin Resource Sharing), 跨域资源共享。CORS 是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 get 和 post 等请求。跨域资源共享标准新增了一组 HTTP  首部字段（响应头），允许服务器声明哪些源站通过浏览器有权限访问哪些资源

2. CORS怎么工作的？

   CORS 是通过设置一个响应头来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。



