# EasyTemplateJS

**EasyTemplateJS（EasyTemplate JavaScript）是一款超高性能，小巧纯粹，功能全面的 JavaScript 模板引擎。并为 Node.js 和 Express 框架提供增强支持。**

**EasyTemplateJS(EasyTemplate JavaScript) is an ultra-high performance, compact, full-featured JavaScript template engine. And provides enhanced support for Node.js and Express frameworks.**

The latest version: `3.0.0-RELEASE`

## Feature/特点

- **中文**

	- 超高性能，预先静态编译，小巧，纯粹
	
	- 灵活自定义
	
	- 支持转义输出表达式
	
	- 支持 out 输出
	
	- 支持内嵌 JavaScript 脚本(`<etj-script>...</etj-script>`)和 CSS 样式脚本(`<etj-script>...</etj-script>`)
	
	- 模块化支持：`CommonJS`, `AMD`, `CMD`, `Node.js`
	
	- Node.js [Express 框架支持](doc/express_zh_CN.md)
	
	- npm, Bower 支持


- **English**

	- Ultra-high performance, pre-static compilation, small, pure
	
	- Flexible customization
	
	- Escape output expressions are supported
	
	- Support out output
	
	- Support embedded JavaScript (`<etj-script>...</etj-script>`) and CSS(`<etj-script>...</etj-script>`)
	
	- Module support:`CommonJS`, `AMD`, `CMD`, `Node.js`

	- Node.js [Express Web Framework support](doc/express_en.md)
	
	- npm, Bower support

## Performance test comparison/性能测试对比

从渲染性能上来说， **EasyTemplateJS** 和 artTemplate 都是使用预先静态编译原理，可以说已经接近的性能极限，是当前性能最高的模板引擎。一些较差的引擎不仅可能影响客户体验，还会会引起浏览器崩溃或异常终止，百度的引擎则性能较差，对浏览器渲染执行影响巨大。

From the rendering performance, **EasyTemplate** and artTemplate are using pre-static compilation principle, can be said to have close to the performance limit, is the highest performance of the template engine. Some poor engine may not only affect the customer experience, but also cause the browser to crash or abnormal termination, Baidu engine performance is poor, the implementation of the browser rendering a huge impact. 

![Performance test comparison](doc/imgs/performance.png)


## Installation/安装

- Download install/下载安装
	
	```HTML
	<script type="text/javascript" src="easy.templatejs.min.js"></script>
	```

- Bower install/Bower 安装

	```BASH
	bower install easytemplatejs --save
	```
	
	```HTML
	<script src="bower_components/easytemplate/dist/easy.templatejs.min.js" type="text/javascript" charset="utf-8"></script>
	```
	
- Npm install/Npm 安装

	```BASH
	npm install easytemplatejs
	```
	
	```JS
	var Et = require('easytemplatejs');
	```


## Use document/使用文档

### 中文

[中文详细使用文档](doc/readme_zh_CN.md)

[Express 使用文档](doc/express_zh_CN.md)

[官方主页](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp '官方主页')

[留言评论](http://www.easyproject.cn/easytemplate/zh-cn/index.jsp#donation '留言评论')

如果您有更好意见，建议或想法，请联系我。

### English

[English detailed documentation](doc/readme_en.md)

[Express documentation](doc/express_en.md)

[The official home page](http://www.easyproject.cn/easytemplate/en/index.jsp 'The official home page')

[Comments](http://www.easyproject.cn/easytemplate/en/index.jsp#donation 'Comments')

If you have more comments, suggestions or ideas, please contact me.

## End

Email：<inthinkcolor@gmail.com>

[http://www.easyproject.cn](http://www.easyproject.cn "EasyProject Home")


**支付宝钱包扫一扫捐助：**

我们相信，每个人的点滴贡献，都将是推动产生更多、更好免费开源产品的一大步。

**感谢慷慨捐助，以支持服务器运行和鼓励更多社区成员。**

<img alt="支付宝钱包扫一扫捐助" src="http://www.easyproject.cn/images/s.png"  title="支付宝钱包扫一扫捐助"  height="256" width="256"></img>



We believe that the contribution of each bit by bit, will be driven to produce more and better free and open source products a big step.

**Thank you donation to support the server running and encourage more community members.**

[![PayPal](http://www.easyproject.cn/images/paypaldonation5.jpg)](https://www.paypal.me/easyproject/10 "Make payments with PayPal - it's fast, free and secure!")


