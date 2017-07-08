# EasyTemplateJS 模板引擎使用手册


**EasyTemplateJS（EasyTemplate JavaScript）是一款超高性能，小巧纯粹，功能全面的 JavaScript 模板引擎。并为 Node.js 和 Express 框架提供增强支持。**

JavaScript 模板引擎作为数据与界面分离工作中最重要一环。使用 JavaScript 模板函数能够避免在 JavaScript 中拼接 `HTML` 字符串带来的不便和低维护性的缺点，利用反向思路，在 `HTML` 中嵌入 JavaScript 脚本，就像利用 `JSP` 和 `ASP` 技术编程一样。EasyTemplate 能够提供超高性能的渲染引擎，在 JavaScript 中使用模板技术来简化操作，并增强程序设计的灵活性。

The latest version: `3.0.0-RELEASE`

 
## 特点

- 超高性能，预先静态编译，小巧，纯粹

- 灵活自定义

- 支持转义输出表达式

- 支持 out 输出

- 支持内嵌 JavaScript 脚本(`<etj-script>...</etj-script>`)和 CSS 样式脚本(`<etj-script>...</etj-script>`)

- 模块化支持：`CommonJS`, `AMD`, `CMD`, `Node.js`

- Node.js [Express 框架支持](doc/express_zh_CN.md)

- npm, Bower 支持
	

## Performance test comparison/性能测试对比 

从渲染性能上来说， **EasyTemplateJS** 和 artTemplate 都是使用预先静态编译原理，可以说已经接近的性能极限，是当前性能最高的模板引擎。一些较差的引擎不仅可能影响客户体验，还会会引起浏览器崩溃或异常终止，百度的引擎则性能较差，对浏览器渲染执行影响巨大。

![Performance test comparison](imgs/performance.png)


## 使用

### 1. 引入JS文件

- 下载安装
	
	```HTML
	<script type="text/javascript" src="easy.templatejs.min.js"></script>
	```

- 安装

	```BASH
	bower install easytemplatejs --save
	```
	
	```HTML
	<script src="bower_components/easytemplate/dist/easy.templatejs.min.js" type="text/javascript" charset="utf-8"></script>
	```
	
- Npm 安装

	```BASH
	npm install easytemplatejs
	```
	
	```JS
	var Et = require('easytemplatejs');
	```

### 2. TemplateJS 模板表达式

TemplateJS 支持三类模板表达式，表达式不允许嵌套或交叉:

1. **脚本表达式**

  `%{ JavaScript Script }%`： 执行任意的 JavaScript 代码（作用JSP的`<% %>`小脚本相同），JS脚本中的 `<`、`>` 等特殊符号，也可使用对应字符实体代替。
  
2. **输出表达式**

  `{=expression}`： 插入要输出的变量（作用与 JSP 的 `<%=expression%>` 相同）。

3. **转义输出表达式**
 
  `{-expression}`： 用法与`{expression}`相同，输出数据时会自动转义特殊字符为字符实体。
  

-  **为什么选择 `%{}%`， `{=}` 作为闭合标签？**

 EasyTemplateJS 没有选择常用的  `<%%>` 或 `${}` 作为模板引擎的默认闭合标签，因为在 `JSP`，`ASP` 等动态页面中，`<%%>`，`${}` 都本身是动态特殊标记，当在 `JSP` 页面定义模板标签时，会对 `JSP` 解析造成影响，导致编译错误。所以 EasyTemplate 选择了尽量不会与其他语言冲突的 `%{}%` `{=}`。

 尽管如此，但是如果您更喜欢使用 `<%%>` 或 `${}`，本身 EasyTemplate 模板标签是对外允许自定义的，您可以修改为 `<%%>`，以兼容你旧的模板代码。 (`参考 5. 模板表达式闭合标签自定义`)


### 3. 使用实例

EasyTemplateJS 向外暴露了一个名为**`Et`**的对象，用来完成模板操作。

```JS
// 1. 直接执行模板
var result = Et.template(tmplText, data);

// 2. 模板编译
var compiled = Et.template(tmplText);
// 编译后执行
var res2 = compiled(data);
var res3 = compiled(data2);
var res4 = compiled(data3);
```

- 模板基本示例

	```JS
	// Basic demo
	var compiled = Et.template("hello: {=name }, {-name}");
	var res = compiled({
		name: 'MoMo'
	});
	console.info(res); // hello: MoMo, MoMo
	
	// Special label, test escape
	var res2 = compiled({
		name: '<MoMo>'
	}); 
	console.info(res2); // hello: <MoMo>, &lt;MoMo&gt;
	
	
	// Test escape (Special label)
	var compiled2 = Et.template("<u>{- value }</u>");
	var res3 = compiled2({
		value: '<script>'
	});
	console.info(res3); // <u>&lt;script&gt;</u>


	var res4 = Et.template("%{ out('Hello: '+name); }%", {
		name: "JACK"
	});
	console.info(res4); //Hello: JACK
	```


- HTML 模板示例

	```HTML
	<!-- 普通模板 -->
	<script id="tmpl" type="text/tmpl">
		%{ for(var i in people){ }%
			<li>{=i} = {= people[i] }</li>
		%{ } }%
	</script>

	<!-- 使用HTML定义模板内容时，如果有<、>等特殊内容，可以使用对应字符实体代替 -->
	<script id="tmpl2" type="text/tmpl">
		%{ for(var i=0; i &lt; people.length; i++){ }%
			<li>{=i} = {= people[i] }</li>
		%{ } }%
	</script>

	<!-- 使用 out 输出 -->
	<script id="tmpl3" type="text/tmpl">
		%{ 
			for(var i=0; i < people.length; i++){ 
				out( "<li>"+i+ " = "+people[i]+ "</li> "); 
			} 
		}% 
	</script>
	
	
	<script type="text/javascript">
		//借助了jQuery
	    $(function(){
			<!-- 使用模板  -->
			// temp demo
			var tmpl = $("#tmpl").html();
			var res5 = Et.template(tmpl, {
				people: ['MoMo', 'Joy', 'Ray']
			});
			console.info(res5);
		
			// temp2 demo
			var tmpl2 = $("#tmpl2").html(); 
			var res6 = Et.template(tmpl2, {
				people: ['MoMo', 'Joy', 'Ray']
			});
			console.info(res6);
		
			// temp3 demo
			var tmpl3 = $("#tmpl3").html(); 
			var res7 = Et.template(tmpl3, {
				people: ['MoMo', 'Joy', 'Ray']
			});
			console.info(res7);
		});
	</script>
	```

	输出结果：
	
	```HTML
	<li>0 = MoMo</li>      
	<li>1 = Joy</li>    
	<li>2 = Ray</li>          
	```

### 4. 使用 out 输出信息

您也可以在JavaScript代码中使用 `out` 函数输出信息，这样不用断开您的代码块，有时候这会比使用  `{=name}` 更方便清晰。

```HTML
<!-- 使用 out 输出 -->
<script id="tmpl3" type="text/tmpl">
	%{ 
		for(var i=0; i < people.length; i++){ 
			// out function
			out( "<li>"+i+ " = "+people[i]+ "</li> "); 
		} 
	}% 
</script>
```

```JS
var res4 = Et.template("%{ out('Hello: '+name); }%", {
		name: "JACK"
	});
console.info(res4); //Hello: JACK
```


### 5. 模板表达式闭合标签自定义

由于某些模板定义和执行块在某些动态页面（`JSP`, `ASP`）中具有特殊涵义，所以在某些页面中使用模板符号会引起错误。EasyTemplate允许改变模板设置, 使用别的符号来嵌入代码。

> **为什么选择 %{}%， {=} 作为闭合标签？**
>
> EasyTemplateJS 没有选择常用的  `<%%>` 或 `${}` 作为模板引擎的默认闭合标签，因为在 `JSP`，`ASP` 等动态页面中，`<%%>`，`${}` 都本身是动态特殊标记，当在 `JSP` 页面定义模板标签时，会对 `JSP` 解析造成影响，导致编译错误。所以 EasyTemplate 选择了尽量不会与其他语言冲突的 `%{}%` `{=}`。
> 
> 尽管如此，但是如果您更喜欢使用 `<%%>` 或 `${}`，本身 EasyTemplate 模板标签是对外允许自定义的，您可以修改为 `<%%>`，以兼容你旧的模板代码。 

**注意：** 如果您绝对修改模板表达式的闭合标签，您需要小心检查您的定义逻辑是否合理。

`Et.tmplSettings` 默认配置：

```JS
Et.tmplSettings={
	// 脚本表达式开始结束标记%{ JS script }%
	scriptBegin:"%{",
	scriptEnd:"}%",
	// 输出表达式开始结束标记 {name}
	outBegin:"{=",
	outEnd:"}",
	// 转义输出表达式开始结束标记 {-name}
	escapeOutBegin:"{-",
	escapeOutEnd:"}"
}
```

重新定义示例：

```JS
// 修改脚本表达式开始结束标记
var userSettings=
{
	// 脚本表达式开始结束标记 <% JS script %>
	scriptBegin:"<%",
	scriptEnd:"%>",
	// 输出表达式开始结束标记 <%=name %>
	outBegin:"<%=",
	outEnd:"%>",
	// 转义输出表达式开始结束标记 <%-name %>
	escapeOutBegin:"<%-",
	escapeOutEnd:"%>"
}
```
 
```JS
// 全局修改
Et.tmplSettings=userSettings;

// 测试
console.info(
	Et.template(
		"hello: <%= name %>, <%- name %>",  // templateText
		{name: '<MoMo>'} // data
	)
);			
```

```JS
// 局部修改测试
console.info(
	Et.template(
		"hello: <%= name %>, <%- name %>",  // templateText
		{name: '<MoMo>'}, 					// data
		userSettings 						//settings
	)
);	
```


### 6. 如何使用全局或外部对象？

由于 EasyTemplateJS 是一个 JS 跨平台的模板引擎，在浏览器环境和桌面环境下都可以使用，所以对于并未直接对全局对象进行管理。

使用时可以根据需要直接传入：

```JS
var res = Et.template(tmpl, {
	'people': ['MoMo', 'Joy', 'Ray'],
	'console': window.console,
	'window': window,
	'alert': alert 
});
```

### 7. 内嵌 JavaScript 和 CSS

为了增强在 Express 等服务端 Web 应用框架中使用模板的功能体验，EasyTemplateJS 开创性的为模板提供了 script 脚本和 style 样式表支持。

- **启用脚本和 CSS 支持**

	默认脚本和样式支持是关闭的，可根据需要手动开启。

	```javascript
	Et.enableScript = true; // enable <etj-script>
	Et.enableStyle = true; // enable <etj-style>
	```

- **Script 代码支持**

	将 JavaScript 代码放在 `<etj-script>` ... `</etj-script>` 标签之间。 **语句必须使用 `;` 结尾。**
	
- **CSS 代码支持**
		
	将 CSS 代码放在 `<etj-style>` ... `</etj-style>` 标签之间。

- **示例**

	```HTML
	<etj-script>
		function test(){
			var num=100
			console.info('test execute...')
		}
		test()
		var r2=document.getElementById('res2');
		r2.innerHTML='<h3>etj-script</h3>'
		r2.className="blue";
		// use data 
		var t='{=title}';
		console.info(t);
	</etj-script>
	
	
	<etj-style>
		#res3{
			color:Red;
			/*use data*/
			font-size:{=textSize}px;
		}
		.blue{color:blue; }
	</etj-style>
	
	%{ 
		console.info('Global'); 
		<!--alert('Global');-->
		for(var i in people){ }%
		<li>{i} = 
			{ people[i] } 
		</li>
	%{ } }%
	```


## API

`Et` 暴露了有限的几个 API:

- 核心函数

	```JS
	/**
	 * 模板引擎编译核心函数
	 * @param {String} tmplText 模板代码
	 * @param {Object} data 模板数据；可选
	 * @param {Et.tmplSettings} settings 引擎动态控制参数；可选
	 * @return {String|function} 如果 data 不为空，则返回 String 渲染结果；否则，返回一个编译后的 function 渲染函数
	 */
	Et.template(tmplText, data, settings);
	```

- 模板闭合标签自定义(`5. 模板表达式闭合标签自定义`)

	```JS
	Et.tmplSettings ={...}
	```
  
- 将字符串中的特殊字符转义为字符实体，并返回

	```JS
	/**
	 * 将字符串中的特殊字符转义为字符实体，并返回
	 * @param {String} text 字符串
	 * @return {String} 转意后的字符串
	 */
	Et.escape(text);
	```  

- escape的反向操作函数，将字符串中的字符实体转移为字符，并返回

	```JS
	/**
	 * escape的反向操作函数，将字符串中的字符实体转移为字符，并返回
	 * @param {text} string 字符串
	 * @return {String} 转意后的字符串
	 */
	Et.unescape(text);
	``` 
  
- 遍历集合或对象
	
	```JS
	/**
	 * 遍历集合或对象。
	 * @param {Object} obj 要遍历的集合或对象
	 * @param {function} iterator 迭代函数，包括值、索引、集合对象三个参数
	 * @param {Object} context 将iterator绑定到context上执行，可用来向iteraotr传递一些其他元素
	 */
	 Et.each(list, iterator, [context]);
	```

- 将 `Et` 引用的对象还原为原始对象，并返回 `Et` 对象。

	```JS
	/**
	 * 排除冲突
	 * @return {Et} Et 对象
	 */
	Et.noConflict();
	```
   

## 模块化支持

- AMD Example
	```JS
	require.config({
		// 指定模块id 和其对应文件的相对路径
		paths: {
			Et: "js/easy.templatejs.min-2.1.0"
		}
	});

	require(["Et"], function(Et) {
		// Basic demo
		var compiled = Et.template("hello: { name }, {-name}");
		var res = compiled({
			name: 'MoMo'
		});
		var res2 = compiled({
			name: '<MoMo>'
		}); // Special label, test escape
		
		console.info(res);
		console.info(res2);
	});
	```

## 在 Express 框架中使用 EasyTemplateJS 

- 手动集成

	[Express 使用文档](express_zh_CN.md)

- 基于 EasyTemplateJS 引擎的 Express 应用快速生成工具

	[Express-quicker](https://github.com/ushelp/Express-quicker)



## 结束

### [官方主页](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。

### [The official home page](http://www.easyproject.cn/easytemplate/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easytemplate/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.



Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")



**支付宝钱包扫一扫捐助：**

我们相信，每个人的点滴贡献，都将是推动产生更多、更好免费开源产品的一大步。

**感谢慷慨捐助，以支持服务器运行和鼓励更多社区成员。**

<img alt="支付宝钱包扫一扫捐助" src="http://www.easyproject.cn/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>



We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")
