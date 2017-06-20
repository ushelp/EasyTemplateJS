# EasyTemplateJS Express 使用手册

Express 的 `res.render` 支持基于各种模板引擎进行页面渲染，只需要编写相应代码,通过 `app.engine` 注册相应模板引擎即可。

Pug 等模板引擎带有自定义语言，需要高昂的学习成本，并且引擎内部需要对模板进行转换。

而 EasyTemplateJS 直接基于原生 HTML 和 JavaScript 进行模板编译和渲染。能更大限度发挥 EasyTemplateJS 高性能，小巧并简单易用的优势。


## 使用步骤

### 1. 安装 EasyTemplateJS

```
npm install easytemplatejs –save
```

### 2. 注册 EasyTemplateJS 渲染引擎

将代码复制到 `app.js` 中，默认模板引擎扩展名为 `.etj`。

- **app.js**

```JS
var fs = require('fs') 
var Et = require('easytemplatejs');
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

### 3. 使用

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

## 文档

[EasyTemplateJS 中文详细使用文档](doc/readme_zh_CN.md)

[EasyTemplateJS English detailed documentation](doc/readme_en.md)


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
