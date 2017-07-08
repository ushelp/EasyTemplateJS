# EasyTemplateJS Express manual

Express's `res.render` support page rendering based on various template engines, just write the code and register the corresponding template engine with `app.engine`.

Pug and other template engine with a custom language, the need for high learning costs, and the need for internal transformation of the template template.

EasyTemplateJS is based on native HTML and JavaScript for template compilation and rendering. To maximize the advantages of EasyTemplateJS high performance, compact and easy to use.


## Express-quicker Quickly generate tools automatically

**It is recommended to use Express-quicker to create projects based directly on the EasyTemplateJS engine.**

[Express-quicker](https://github.com/ushelp/Express-quicker)
is a quick application to create Express application tool, based on quickstart help you automatically generate the project skeleton, built-in EasyTemplateJS engine and the development of common modules.

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



## Manual integration

If you need to integrate manually, please refer to the following steps.

#### 1. Installation EasyTemplateJS

```
npm install easytemplatejs –save
```

#### 2. Register the EasyTemplateJS Rendering Engine

Copy the code into `app.js` with the default template engine extension `.etj`.

- **app.js**

```JS
var fs = require('fs')   // this engine requires the fs module
var Et = require('easytemplatejs');
Et.enableScript = true; // enable <etj-script>
Et.enableStyle = true; // enable <etj-style>
var cache=true; // Whether to open the cache
var cacheTpl={}; // Cache data

// define the template engine
app.engine('etj', function (filePath, data, callback) {
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    var compiled;
    // Cache controller
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
app.set('views', './views') // specify the views directory
app.set('view engine', 'etj') // register the template engine
```

#### 3. Use

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
			<title>User</title>
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
	
	
#### 4. Enable embedded JavaScript and CSS

To enhance the functional experience of using templates in Express and other server-side Web application frameworks, EasyTemplateJS pioneered the provision of script scripts and style style sheet support for templates.

- **Script code support**

	Place the JavaScript code between the `<etj-script>` ... `</etj-script>` tags. **The statement must end with `;`.**
	
- **CSS code support**
		
	Place the CSS code between the `<etj-style>` ... `</etj-style>` tags.


```javascript
Et.enableScript = true; // enable <etj-script>
Et.enableStyle = true; // enable <etj-style>
```

## Documenation

[EasyTemplateJS English detailed documentation](readme_en.md)

[EasyTemplateJS 中文详细使用文档](readme_zh_CN.md)


## END
### [The official home page](http://www.easyproject.cn/easytemplate/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easytemplate/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.


### [官方主页](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。




Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")





We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")