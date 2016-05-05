简介
============
可视化拖拽设计专题模板采用了模块化的开发方式，用webpack管理模块间依赖，用backbone.js做mvc，用eventemitter2做模块间解藕，用jquery ui的插件做拖拽。

*   webpack
	在市面上众多的模块管理工具，requirejs、seajs（京东在用）、kissy（淘宝的框架）、browserify、webpack等等，最终选择了webpack， 它简单好用，可以很方便的定义模块，并且不仅可以管理js，还可以管理css和图片文件，强大的插件体系也提供了很多强大的功能，并且同时支持cmd和amd规范。

	关于webpack更多的内容请参考官网http://webpack.github.io。

*   backbone
	组件化的框架非常丰富，avalong(老牌的mvvm框架)、angular(现在很火的mvvm框架)、vue.js(简单精巧的mvvm)、reactjs(一样很火的view层实现)、backbone(老牌的mvc框架)等。
	每个框架都能解决一些痛点，但考虑到浏览器兼容性、学习曲线、复杂性等问题，最终选择了backbone.js。backbone.js的文件很小，并且没有像其他框架一样应用了一些现代浏览器支持的js特性来实现对象的监听，对浏览器支持很好，上手很快，基本照着官网的帮助文档就能使用了。
	
	backbone的路由功能可以提供很好单页面应用的支持，对应奶牛端的应用场景可能很适合。

	同时引入backbone.layoutmanager做view的布局管理。

	关于backbone.js更多的内容请参考官网http://backbonejs.org和https://github.com/tbranyen/backbone.layoutmanager/wiki。

*	eventemitter2
	为了进行模块间的解耦，引入了eventemitter2库，这是一个nodejs的EventEmitter模块在浏览器端的实现，用来实现发布-订阅模式。
	关于eventemitter2的更多内容请参考https://github.com/asyncly/EventEmitter2。
	
* 	shim(js/lib/shim)
	es5-sham.min.js和es5-shim.min.js提供了一些ie浏览器中不支持的方法，

编译
============
*	安装nodejs运行环境
	官网下载(https://nodejs.org/en/download/)nodejs安装文件进行安装，下载最新的稳定版本就可以。
	关于nodejs环境的配置和npm模块管理需要有一些了解(https://www.npmjs.com/)。
	
	建议安装完成后，将npm的镜像切换到淘宝的，这样安装npm模块会比较快，在这里http://npm.taobao.org/获取帮助。
	
*	安装依赖的模块
	打开命令行，进入webapp目录，运行
	npm install 
	npm会根据package.json的配置下载依赖的模块，会自动在webapp下创建node_modules目录并下载到这里。
这个目录不用提交(因为比较大)。

*	编译
	命令行进入webapp目录，运行
	webpack --watch
	该命令会读取webpack.config.js并编译静态文件，自动在js目录下创建assets目录，并将项目中定义的模块编译到
index.bundle.js中。

	*注意，webpack --watch命令会持续监听webapp目录，发现静态文件修改，就自动编译，只有编译过（webpack自己组织代码的方式）才会在页面中生效。
	*页面中引入的js只有一个，即：index.bundle.js，该文件包含所有除jquery等公共js库之外的所有js代码。
	*node_modules目录下的文件，不需要提交(文件太多)，这是webpack在编译过程中需要依赖的，运行只引入index.bundle.js就可以了。

各模块说明
============
	js代码全部在js/design目录下，css、images、ftl文件页都分别在各自目录的design目录下。
	
*	component
	/js/modules/component目录下存放的是可供拖拽的组件，包括通栏广告图、楼层、右下角的商品选择组件、各类对话框等。
	以BannerImage.js为例，BannerImage.js是一个通栏的广告图，它需要被放置在一个已经存在的布局内，该组件包含了设置、上传两个操作，点击这两个按钮将弹出对应的对话框。
	以BannerImage组件对应的html模板是：/templates/component/banner-image.html，对应的模型/js/design/modules/model/ImageModel.js。
	一个完整的组件包括view、model、template，view接受model参数，并根据model加载template来渲染成html代码，controller层的代码可以定义的view里，在view里，可以添加对model的监听，当model的属性值发生改变时，view自动重新渲染html；当然model不是必须的，但强烈建议每一个新添加的view都对应一个model。

*	box
	/js/modules/box目录下存放的是布局文件，我们的页面上的组件都有放置在一个布局内，即先有一个框子，然后向框子里放东西。
	目前的布局只定义了两种：LayoutBanner(通栏的布局)和Layout1200(1200宽度的布局)，这两种其实属于同一类，只是宽度不同，可以丰富其他种类的布局，比如2等分布局、3等分布局、左宽右窄布局等，甚至可以组合起来如：

			-------------------------------------------------
			|                                               |
			|                                               |
			------------------------------------------------|
			|            |         |          |             |
			|            |         |          |             |
			|            |----------------------------------- 
			|            |         |          |             |
			|            |         |          |             |
	       -------------------------------------------------

    建议提供这样定义好的组合布局，/js/modules/component/ProductGroup1.js组件其实就是一个这样定义好的布局。

    具体的布局要根据实际需要灵活定义，但是建议不需给用户提供太大的灵活性。

*	templates
	/templates/目录下存放的是组件对应的模板文件，backbone强依赖Underscore，Underscore是一个功能强大js库，其中使用最多的就是template方法，backbone使用它渲染html代码。模板语法很简单，有一些类似jsp标签的语法。
	更多内容请参考http://underscorejs.org/#template

工作原理
============
* 抽象
	每一个组件都一一对应一个模型，利用backbone的model对象，定义出能够描述出每一个组件和布局的BaseModel对象，BaseModel包含以下属性：
		vId: 模型对应的视图id
		type: 对应的组件类型，如box-100(宽度100%的布局)、box-1-1-1(1:1:1的三等分布局)、component-lunbo(轮播图)
		pId: 上级模型id，用来确定组件间的嵌套
		index: 用来确定组件的顺序
		flag: 状态标记，初始为0，删除为-1
		style: json对象，用来描述额外的、个性的样式，如width, height, margin等等, 参考jquery的css方法
	该模型作为所有模型的父对象，其他模型如ImageModel、LunboModel都继承自该模型，按照需要各自定义自己的个性的属性。
	通过这个模型，能够描述出一个渲染出一个组件需要的基本元素。
* 保存
	在拖拽的过程中，每一个操作都是自动保存的，新拖拽过来的组件，将其对应的模型添加到ModuleCollection中，在ModuleCollection中自动保存，保存额数据就是一个json数组
数组内的元素就是上面定义的模型。
* 加载
	打开设计页面时，会按照顺序，先初始化菜单、初始化编辑区、加载页面数据(json数组)、渲染组件。
	在Main.designArea视图里(暂时定义在main.js里)，监听ModuleCollection的reset事件选择组件，遍历ModuleCollection，根据每一个元素调用ModuleFactory.create方法
创建视图，如果当前元素有子级元素，递归创建视图，添加到父级视图里，直到所有的子元素都创建完成，然后添加到Main.designArea视图里。

插件
============
	在js/widget目录下是封装好的一些插件，目前使用中的有lunbo、pagination、errortip、follow。
	插件的定义遵循amd规范，使用define关键字定义模块，参考地址：http://webpack.github.io/docs/amd.html
	

待解决的问题
============
	因功力有限，一些地方解决的不是很理想，代码也有不合理的地方，模块的划分可能也有问题，轻喷。
*	一个布局内放置多个组件
*   布局之间的顺序不能调整
*	没有撤销、还原的操作
*  	设置功能提供的不够丰富，没有提供全局、布局级的背景设置
*	代码的安排、初始化的流程等还需要继续完善
* 	组件的更新控制的不够细致

推荐阅读
============
https://github.com/jashkenas/backbone/wiki/Backbone%2C-The-Primer
http://underscorejs.org/#template



