# EasyTemplateJS Express 使用手册

Express 的 `res.render` 支持基于各种模板引擎进行页面渲染，只需要编写相应代码,通过 `app.engine` 注册相应模板引擎即可。

Pug 等模板引擎带有自定义语言，需要高昂的学习成本，并且引擎内部需要对模板进行转换。

而 EasyTemplateJS 直接基于原生 HTML 和 JavaScript 进行模板编译和渲染。能更大限度发挥 EasyTemplateJS 高性能，小巧并简单易用的优势。

## Express-quicker 快速自动生成工具

**推荐使用 Express-quicker 创建基于 EasyTemplateJS 引擎的项目。**

[Express-quicker](https://github.com/ushelp/Express-quicker)
是一个创建 Express 应用快速生成工具，能基于 quickstart 帮你自动生成项目骨架，内置了 EasyTemplateJS 引擎和开发常用模块。

```sh
npm install express-quicker -g
```

- [Express-quickstart](https://github.com/ushelp/Express-quickstart)

	```sh
	equicker [app-name]
	```
	
	
	```sh
	.
	├── app.js
	├── package.json
	├── public
	│   ├── img
	│   ├── js
	│   └── css
	│       └── style.css
	│   └── favicon.ico
	│   └── upload.html
	├── routes
	│   ├── index.js
	│   └── users.js
	├── uploads
	└── views
	    ├── error.etj
	    ├── index.etj
	    └── users.etj
	```
- [Express-quickstart-emp](https://github.com/ushelp/Express-quickstart-emp)

	```sh
	equicker -t emp [app-name]
	```
	
	```sh
	.
	├── app.js
	├── package.json
	├── entiy
	│   ├── Dept.js
	│   ├── Emp.js
	│   └── User.js
	├── filter
	│   └── user-filter.js
	├── public
	│   ├── img
	│   ├── js
	│   └── css
	│       └── style.css
	│   └── favicon.ico
	│   └── upload.html
	├── routes
	│   ├── depts.js
	│   ├── emps.js
	│   ├── index.js
	│   └── users.js
	├── service
	│   ├── dept-service.js
	│   ├── emp-service.js
	│   └── users-service.js
	├── uploads
	└── views
		├── admin
		│   └── admin.etj
		├── dept
		│   └── list.etj	
		├── emp
		│   └── list.etj
	    ├── error.etj
	    └── index.etj
	```


## 手动集成

如果您需要手动集成，请参考如下步骤。

#### 1. 安装 EasyTemplateJS

```
npm install easytemplatejs –save
```

#### 2. 注册 EasyTemplateJS 渲染引擎

将代码复制到 `app.js` 中，默认模板引擎扩展名为 `.etj`。

- **app.js**

```JS
var fs = require('fs') 
var Et = require('easytemplatejs');
Et.enableScript = true; // enable <etj-script>
Et.enableStyle = true; // enable <etj-style>
var cache=true; // 是否开启缓存
var cacheTpl={}; // 缓存集合
// 定义模板引擎
app.engine('etj', function (filePath, data, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    var compiled;
    // 缓存控制
    if(cache){
	    if(!cacheTpl[filePath]){
	    	cacheTpl[filePath]=Et.template(content);
	    }
	    compiled=cacheTpl[filePath];
    }else{
    	template(content);
    }
    var rendered = compiled(data);
    return callback(null, rendered)
  })
})
app.set('views', './views') // 视图目录
app.set('view engine', 'etj') // 注册模板引擎
```

#### 3. 使用

- **app.js**

	```JS
	app.get('/index',function(req, res){
		res.render('index', {name:"Jay"});
	})
	
	app.get('/users',function(req, res){
		res.render('users', {
			list:[
				{name:"Jay", sex:'M'},
				{name:"Rose", sex:'F'},
				{name:"Anna ", sex:'F'}
			]
		});
	})
	``` 

- **view/index.etj**

	```HTML
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title>Index</title>
		</head>
		<body>
			<h1>Hello {name}!</h1>
		</body>
	</html>
	```

- **view/users.etj**

	```HTML
	<!DOCTYPE HTML>
	<html>
		<head>
			<title>用户</title>
		</head>
		<body>
			<h1>Users</h1>
			<ul>
			%{
				for(var i=0;i<list.length;i++){
					out('<li>'+list[i].name+", "+list[i].sex+'</li>');	
				}
			}%
			</ul>
		</body>
	</html>
	```

#### 4. 开启内嵌 Script 和 CSS 支持

为了增强在 Express 等服务端 Web 应用框架中使用模板的功能体验，EasyTemplateJS 开创性的为模板提供了 script 脚本和 style 样式表支持。

- **Script 代码支持**

	将 JavaScript 代码放在 `<etj-script>` ... `</etj-script>` 标签之间。 **语句必须使用 `;` 结尾。**
	
- **CSS 代码支持**
		
	将 CSS 代码放在 `<etj-style>` ... `</etj-style>` 标签之间。

```javascript
Et.enableScript = true; // enable <etj-script>
Et.enableStyle = true; // enable <etj-style>
```

## 文档

[EasyTemplateJS 中文详细使用文档](readme_zh_CN.md)

[EasyTemplateJS English detailed documentation](readme_en.md)


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
