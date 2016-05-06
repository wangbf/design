/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);

/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({}[chunkId]||chunkId) + ".bundle.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://design.vinuxpost.com/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Main = {};
	Main.designArea = null;

	var Backbone = __webpack_require__(1);
	var ModuleFactory = __webpack_require__(2),
		MainStore = __webpack_require__(6),
		MainAction = __webpack_require__(8),
		MainConstants = __webpack_require__(11);
		BeanManager = __webpack_require__(19);
		
	BeanManager.init();
	var ModuleCollection = BeanManager.getModuleCollection(); 

	$(function() {
		initCustomRequires();
		initWindow(); 
		initDesignArea();
		initLeftMenu();
	});

	function initCustomRequires() {	
		var GlobalSettingModal = __webpack_require__(48),
			SetLinkImageModal = __webpack_require__(49),
			UploadModal = __webpack_require__(54),
			SetNavBarModal = __webpack_require__(55),
			SetLunboModal = __webpack_require__(57),
			SetBoxModal = __webpack_require__(59);
		
		new GlobalSettingModal, 
			new SetLinkImageModal, 
			new UploadModal, 
			new SetNavBarModal, 
			new SetLunboModal,
			new SetBoxModal;
	}

	function initLeftMenu() {
		var LeftMenu = __webpack_require__(63);
		var layout = MainConstants.MENU.BOX;
		layout.subs.push(MainConstants.MENU.BOX100);
		layout.subs.push(MainConstants.MENU.BOX1260);
		layout.subs.push(MainConstants.MENU.BOX1_1);
		layout.subs.push(MainConstants.MENU.BOX4_8);
		layout.subs.push(MainConstants.MENU.BOX8_4);
		layout.subs.push(MainConstants.MENU.BOX1_1_1);
		layout.subs.push(MainConstants.MENU.BOX8_4_1_1);

		var component = MainConstants.MENU.COMPONENT;
		component.subs.push(MainConstants.MENU.COMPONENT_BANNER_IMAGE);
		component.subs.push(MainConstants.MENU.COMPONENT_LUNBO);
		component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP1);
		component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP2);
		component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP3);
		
		var template = MainConstants.MENU.TEMPLATE;
		template.subs.push(MainConstants.MENU.TEMPALTE_1);
		template.subs.push(MainConstants.MENU.TEMPALTE_2);
		
		var menus = [layout, component, template];
		new LeftMenu({model: {
			menus: menus
		}}).render();
	}

	/**
	 * 初始化
	 */
	function initWindow() {
	    if ($(this).width() < 769) {
	        $('body').addClass('body-small');
	    } else {
	        $('body').removeClass('body-small');
	    }

	    // Full height of sidebar
	    function fixHeight() {
	        var heightWithoutNavbar = $('body > #wrapper').height() - 61;
	        $('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');

	        var navbarHeigh = $('nav.navbar-default').height();
	        var wrapperHeigh = $('#page-wrapper').height();

	        if (navbarHeigh > wrapperHeigh) {
	            $('#page-wrapper').css('min-height', navbarHeigh + 'px');
	        }

	        if (navbarHeigh < wrapperHeigh) {
	            $('#page-wrapper').css('min-height', $(window).height() + 'px');
	        }

	        if ($('body').hasClass('fixed-nav')) {
	            $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
	        }

	    }

	    fixHeight();

	    $(window).bind('load resize scroll', function () {
	        if (!$('body').hasClass('body-small')) {
	            fixHeight();
	        }
	    });
	    
	    // Minimalize menu when screen is less than 768px
	    $(window).bind('resize', function () {
	        if ($(this).width() < 769) {
	            $('body').addClass('body-small');
	        } else {
	            $('body').removeClass('body-small');
	        }
	    });
	}

	/**
	 * 初始化编辑区内的各种事件
	 */
	function initDesignArea() {
		/**
		 * 编辑区，将组件拖拽到这里
		 */
		Main.designArea = Backbone.View.extend({
			el: $('#page-wrapper'),
			initialize: function() {
	//			this.listenTo(ModuleCollection, 'add', this.addView);
	//			this.listenTo(ModuleCollection, 'update', function() {alert('update')});
				this.listenTo(ModuleCollection, 'all', this.addAll);
				this.listenTo(ModuleCollection, 'reset', this.addAll);
			 	ModuleCollection.fetch();
			},
			addAll: function() {
				this.$el.empty();
				var that = this;
				_.each(ModuleCollection.getUnRemoves(), function(each) {
					that.addView(each);
				});
			},
			addView: function(each) {
				try {
					if (null == each.get('pId')) {
						var view = ModuleFactory.create(each.get('type'), each);
						this.$el.append(view.render().el);
					}
				} catch (e) {
					console.error(e);
				}
			},
			process: function(view, subs) {
				for (var i = 0; i < subs.length; i++) {
					var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
					view._addView(thisView);
					var t = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: subs[i].id});
					if (t && t.length > 0) {
						this.process(thisView, t);
					}
				}
			}
		});
		
		var MainView = new Main.designArea;
		 
		new Backbone.Layout({
			el: 'body',
			events: {
				'click #btn-preview': '_handlePreview',
				'click #btn-edit': '_handleEdit',
				'click #btn-publish': '_handlePublish',
				'click #btn-save': '_handleSave',
				'click #btn-clear': '_handleClear'
	//			'click #btn-undo': '_handleUndo'
			},
			_handlePreview: function() {
				$('body').addClass('preview');
				$('#btn-clear').hide();
			},
			_handleEdit: function() {
				$('body').removeClass('preview');
				$('#btn-clear').show();
			},
			_handlePublish: function() {
				var self = this;
				if (!$('#page-wrapper').children().length > 0) {
					layer.open({
						title: false,
						closeBtn: false,
						shadeClose: true,
						shade: [0.5,'#000'],
						skin: 'layer-cancel',
						area: ['430px', ''],
						btn: ['我再想想', '是的，我要发布'], 
						content: ('<span class="z20 font-bold">您的页面是空的，确认要发布吗？</span>'),
						btn2: function submitYuyue() {
							self._doPublish();
						}
					});
				} else {
					self._doPublish();
				}
			},
			_doPublish: function() {
				toastr.remove();
				toastr.success('发布中。。。');
				$('#btn-publish').addClass('disabled').attr('disabled', true);
				var self = this;
				try {
					$('#publish-layout').html($('#page-wrapper').html());
					var t = $('#publish-layout').children();
					$('#publish-layout .wrapper').removeAttr('style');
					t.find('.ibox-header, .ibox-header-style-1, .removes, .ibox-operation').remove();
					$('#publish-layout .ibox').removeClass('ui-draggable').removeClass('ui-sortable-handle');
					$('#publish-layout .images-max').removeClass('ui-sortable-handle');
					$('#publish-layout .ibox-content').removeClass('ui-sortable').removeClass('ui-sortable-disabled');
					$('#publish-layout .dp-goodsList li').removeClass('ui-droppable');
					
					formatHtml = $('#publish-layout').html();
					toastr.remove();
					toastr.success('发布成功');
					$('#btn-publish').removeClass('disabled').attr('disabled', false);
				} catch (e) {
					toastr.remove();
					toastr.error('发布失败');
				}
			},
			_handleSave: function() {
				ModuleCollection.save();
			},
			_handleClear: function() {
				layer.open({
					title: false,
					closeBtn: false,
					shadeClose: true,
					shade: [0.5,'#000'],
					skin: 'layer-cancel',
					area: ['430px', ''],
					btn: ['我再想想', '是的，我要清空'], 
					content: ('<span class="z20 font-bold">确认清空所有组件吗？</span>'),
					btn2: function submitYuyue() {
						ModuleCollection.clear();
					}
				});
			},
			_handleUndo: function() {
				MainAction.undo();
			}
		});
		
		$('#page-wrapper').sortable({
			receive: function(event, ui) {
				var module = MainStore.getCurrentEditModule();
				MainAction.addModule(module);
			}
		});
		  
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = Backbone;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var BannerImage = __webpack_require__(3), 
		ImageModel = __webpack_require__(9),
		ProductModel = __webpack_require__(12),
		NavigationModel = __webpack_require__(13),
		BaseModel = __webpack_require__(10),
		BoxModel = __webpack_require__(14),
		NavigationBar = __webpack_require__(15),
		Box = __webpack_require__(17),
		LunboModel = __webpack_require__(26),
		LunboComponent = __webpack_require__(27),
		ProductsGroupModel = __webpack_require__(34),
		ProductGroup1 = __webpack_require__(35),
		ProductGroup2 = __webpack_require__(38),
		ProductGroup3 = __webpack_require__(41),
		Template = __webpack_require__(44),
		TemplateModel = __webpack_require__(45),
		BeanManager = __webpack_require__(19);

	/**
	 * 组件工厂对象
	 */
	var ModuleFactory = {};

	/**
	 * 根据组件类型和模型创建组件
	 * 其中，各种组件类型都是约定好的，有的一次产生单个组件，有的一次产生一组组件
	 * type: 组件类型
	 * model: 组件的模型，可以是单个模型，也可以是模型数组
	 */
	ModuleFactory.create = function(type, model) {
		switch (type) {
			case 'component-banner-image':
				if (!model) {
					model = new ImageModel({type: type});
				}
				return new BannerImage({
					model : model
				});
			case 'component-nav-bar':
				if (!model) {
					model = new NavigationModel({type: type});
				}
				return new NavigationBar({
					model : model
				});
			case 'component-lunbo':
				if (!model) {
					model = new LunboModel({type: type});
				}
				return new LunboComponent({
					model : model
				});
			case 'component-product-group-1':
				if (!model) {
					model = new ProductsGroupModel({type: type});
					var products = _.map(new Array(8), function() {
						return new ProductModel().toJSON();
					});
					model.set('products', products);
				}
				return new ProductGroup1({
					model : model
				});
			case 'component-product-group-2':
				if (!model) {
					model = new ProductsGroupModel({type: type});
					var products = _.map(new Array(6), function() {
						return new ProductModel().toJSON();
					});
					model.set('products', products);
				}
				return new ProductGroup2({
					model : model
				});
			case 'component-product-group-3':
				if (!model) {
					model = new ProductsGroupModel({type: type});
					var products = _.map(new Array(9), function() {
						return new ProductModel().toJSON();
					});
					model.set('products', products);
				}
				return new ProductGroup3({
					model : model
				});
			case 'template-1':
				//暂时提供两种模板，每种模板都有预定义的数据模板，在数据模板中，<%=id1%>这样的写法是为了字符串替换，
				//模型之间是通过id来确定嵌套关系的，所以初始化时就要生成一个id，这里用underscore的template方法替换字符串
				if (!model) {
					var data = __webpack_require__(46);
					var dataStr = _.template(data);
					var id = tools.guid();
					dataStr = dataStr({
						id1: id,
						id2: tools.guid(),
						id3: tools.guid(),
						id4: tools.guid(),
						id5: tools.guid(),
						id6: tools.guid(),
						id7: tools.guid(),
						id8: tools.guid(),
						id9: tools.guid()
					})
					ModuleCollection = BeanManager.getModuleCollection();
					ModuleCollection.add(JSON.parse(dataStr));
					
					model = ModuleCollection.get(id);
				}
				return new Template({model: model});
			case 'template-2':
				if (!model) {
					var data = __webpack_require__(47);
					var dataStr = _.template(data);
					var id = tools.guid();
					dataStr = dataStr({
						id1: id,
						id2: tools.guid(),
						id3: tools.guid(),
						id4: tools.guid(),
						id5: tools.guid(),
						id6: tools.guid(),
						id7: tools.guid(),
						id8: tools.guid(),
						id9: tools.guid(),
						id10: tools.guid(),
						id11: tools.guid(),
						id12: tools.guid(),
						id13: tools.guid(),
						id14: tools.guid(),
						id15: tools.guid(),
						id16: tools.guid(),
						id17: tools.guid()
					});
					ModuleCollection = BeanManager.getModuleCollection();
					ModuleCollection.add(JSON.parse(dataStr));
					
					model = ModuleCollection.get(id);
				}
				return new Template({model: model});
			default:
				if (!model) {
					model = new BoxModel({type: type});
				}
				return new Box({model: model});
		}
	};

	ModuleFactory._isModel = function(model) {
		return model instanceof Backbone.Model
	}

	module.exports = ModuleFactory;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(5);
	var MainStore = __webpack_require__(6),
		MainAction = __webpack_require__(8);

	/**
	 * 通栏布局的图片组件
	 */
	var BannerImage = Backbone.View.extend({
		tagName: 'div',
		className: 'images-max',
		template: _.template(template),
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			var that = this;
			MainStore.addImageUploadSuccessListener(function(data) {
				var imageUrl = data.imageUrl;
				if (that.model.id == data.targetModule.id) {
					var setting = {
							style: {
								height: data.height
							},
							_url: data.imageUrl
						};
					that.model.save(setting);
					Backbone.trigger('modules_update', that.model);
				} 
			});
			MainStore.addLinkImageSetSuccessListener(function(data) {
				if (that.model.id == data.targetModule.id) {
					var setting = {
						style: {
							height: data.height
						},
						link: data.link,
						openInAnotherWindow: data.openInAnotherWindow
					};
					that.model.save(setting);
					Backbone.trigger('modules_update', that.model);
				} 
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		toggleDone: function() {
			this.model.toggle();
		},
		events: {
		  	'click .remove': '_handleRemove',
		  	'click .setting': '_handleSetting',
		  	'click .upload': '_handleUpload'
		},
		_handleSetting: function() {
			var self = this;
			var style = this.model.get('style');
			MainAction.setLinkImage({
				id: self.model.id,
				height: style.height,
				link: self.model.get('link'),
				openInAnotherWindow: self.model.get('openInAnotherWindow')
			});
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleUpload: function() {
			var self = this;
			var style = this.model.get('style');
			MainAction.uploadImage({
				id: self.model.id,
				height: style.height,
				width: style.width
			});
		}
	});

	module.exports = BannerImage;


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header-style-1\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t  <button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"images-max-content banner-image\" style=\"background-repeat:no-repeat; background-position:top; background-color:#fff; height: <%=style.height%>px\">\r\n\t<a <%if (link) {%>href=\"<%=link%>\"<%}%> target=\"<%if (openInAnotherWindow) {%>_blank<%} else {%>_self<%}%>\">\r\n\t<%if (_url) {%>\r\n\t\t<image src=\"<%=_url%>\" height=\"<%=style.height%>px\" width=\"100%\"/>\t\r\n\t<% } %>\r\n\t</a>\r\n</div>\r\n";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(7);

	/**
	 * 引入EventEmitter库，实现pub/sub模式进行解耦
	 * 通过MainStore发布的消息包含两种:名利(cmd)、事件(event)
	 * 每个消息都要提供发布和注册监听方法
	 * 对于事件，提供注册监听方法，对于命令，提供注册handler方法
	 * 注册的监听和handler类型必须是函数
	 */
	var MainStore = new EventEmitter();

	MainStore.setMaxListeners(20);

	/**
	 * 保存最近执行的5个命令，用于“撤销”和“还原”操作，暂时还没有实现
	 */
	MainStore.COMMANDS = {};

	MainStore.CURRENT_EDIT_MODULE = null; //当前正在编辑的组件

	MainStore.setCurrentEditModule = function(module) {
		MainStore.CURRENT_EDIT_MODULE = module;
	};

	MainStore.getCurrentEditModule = function() {
		return MainStore.CURRENT_EDIT_MODULE;
	};

	/**
	 * 发布"删除组件命令"，需要提供待删除组件的id
	 */
	MainStore.emitRemoveModuleCmd = function(_id) {
		this.emit('cmd_remove_module', _id);
	};

	/**
	 * 注册"删除组件命令"的handler，目前只有一个地方注册了这个handler：../model/ModuleCollection
	 */
	MainStore.addRemoveModuleCmdHandler = function(callback) {
		this.on('cmd_remove_module', callback);
	};

	/**
	 * 发布“增加组件命令”
	 */
	MainStore.emitAddModuleCmd = function(module) {
		this.emit('cmd_add_module', module);
	};

	/**
	 * 注册"增加组件命令"的handler，目前只有一个地方注册了这个handler：../model/ModuleCollection
	 */
	MainStore.addAddModuleCmdHandler = function(callback) {
		this.on('cmd_add_module', callback);
	};

	MainStore.supportstorage = function() {
		if (typeof window.localStorage == 'object') 
			return true;
		else
			return false;		
	};

	/**
	 * 发布“设置链接图命令”，参数是当前设置的组件
	 */
	MainStore.emitSetLinkImageCmd = function(module) {
		this.emit('cmd_set_link_image', module);
	};

	/**
	 * 注册“设置链接图命令”handler
	 */
	MainStore.addSetLinkImageCmdHandler = function(callback) {
		this.on('cmd_set_link_image', callback);
	};

	/**
	 * 发布“设置链接图成功事件”
	 * 消息体包含以下数据:
	 * 	link：图片的链接（不是图片地址，而是点击图片时跳转的链接），height：图片高度
	 * 	targetModel: 目标组件，即当前正在设置的组件，targetModel包含一个固定的属性：id，其他属性自行定义
	 * 示例数据:	
	 * data: {
	  			link: 'http://www.baidu.com',
				height: '140',
				targetModule: {
					id: '23232xdfsdf-3434323',
					region: 'top'
				}
	 * 
	 * 	}
	 */
	MainStore.emitLinkImageSetSuccessEvent = function(data) {
		this.emit('event_link_image_set_success', data);
	};

	/**
	 * 添加“链接图设置成功事件”监听，在图片组件里注册该监听
	 */
	MainStore.addLinkImageSetSuccessListener = function(callback) {
		this.on('event_link_image_set_success', callback);
	};

	/**
	 * 发布“图片上传成功事件”， 消息体包含以下数据：
	 * 	fileName: 图片文件名, width： 图片宽度， height： 图片高度
	 * 	targetModel: 目标组件，即当前正在设置的组件，targetModel包含一个固定的属性：id，其他属性自行定义
	 * 示例数据:
	 * data: {
	 * 		fileName: '1458546484003.png', 
	 * 		width: '1000', 
	 * 		height: '100', 
	 * 		targetModule: {
	 * 			id: '23232xdfsdf-3434323',
				region: 'top'
	 * 		}
	 * }
	 */
	MainStore.emitImageUploadSuccess = function(data) {
		this.emit('event_image_upload_success', data);
	};

	/**
	 * 添加“图片上传成功事件”的监听
	 */
	MainStore.addImageUploadSuccessListener = function(callback) {
		this.on('event_image_upload_success', callback);
	};

	/**
	 * 发布“上传图片命令”，“上传图片组件”会监听这个命令来打开弹出框
	 * 示例数据：
	 * {
	 * 		id: '23232xdfsdf-3434323',
			region: 'top'
	 * }
	 */
	MainStore.emitUploadImageCmd = function(targetModule) {
		this.emit('cmd_upload_image', targetModule);
	};

	/**
	 * 添加“上传图片命令”handler
	 */
	MainStore.addUploadImageCmdHandler = function(callback) {
		this.on('cmd_upload_image', callback);
	};

	/**
	 * 发布“设置导航条”命令，items为导航条包含的导航项
	 */
	MainStore.emitSetNavBarCmd = function(targetModule) {
		this.emit('cmd_set_nav_bar', targetModule);
	};

	/**
	 * 添加“设置导航条”命令的handler
	 */
	MainStore.addSetNavBarCmdHandler = function(callback) {
		this.on('cmd_set_nav_bar', callback);
	};

	/**
	 * 发布"导航条设置完成事件"，items为设置后的新的导航项
	 */
	MainStore.emitNavBarSetFinished = function(items) {
		this.emit('event_nav_bar_set_finished', items);
	};

	/**
	 * 添加"导航条设置完成事件"的监听，由“导航条组件”自己添加监听
	 */
	MainStore.addNavBarSetFinishedEventListener = function(callback) {
		this.on('event_nav_bar_set_finished', callback);
	};

	/**
	 * 发布"设置轮播图"命令
	 */
	MainStore.emitSetLunboCmd = function(module) {
		this.emit('cmd_set_carousel', module);
	};

	/**
	 * 添加"设置轮播图"命令的handler
	 */
	MainStore.addSetLunboCmdHandler = function(callback) {
		this.on('cmd_set_carousel', callback);
	};

	/**
	 * 发布"轮播图设置完成事件"，items为设置后的新的导航项
	 */
	MainStore.emitLunboSetFinished = function(module) {
		this.emit('event_lunbo_set_finished', module);
	};

	/**
	 * 添加"轮播图设置完成事件"的监听，由“导航条组件”自己添加监听
	 */
	MainStore.addLunboSetFinishedEventListener = function(callback) {
		this.on('event_lunbo_set_finished', callback);
	};

	/**
	 * 发布“商品选择完成事件”，在向“商品组合”组件里拖拽商品完成时触发
	 */
	MainStore.emitProductSelectedEvent = function(module, product) {
		this.emit('event_product_selected_event', module, product);
	};

	MainStore.addProductSelectedEventListener = function(callback) {
		this.on('event_product_selected_event', callback);
	};

	/**
	 * 设置布局
	 */
	MainStore.emitSetBoxCmd = function(module) {
		this.emit('cmd_set_box', module);
	};

	MainStore.addSetBoxCmdHandler = function(callback) {
		this.on('cmd_set_box', callback);
	};

	MainStore.emitBoxSetSuccessEvent = function(data) {
		this.emit('event_box_set_finished', data);
	};

	MainStore.addBoxSetSuccessEventListener = function(callback) {
		this.on('event_box_set_finished', callback);
	};

	module.exports = MainStore;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * EventEmitter2
	 * https://github.com/hij1nx/EventEmitter2
	 *
	 * Copyright (c) 2013 hij1nx
	 * Licensed under the MIT license.
	 */
	;!function(undefined) {

	  var isArray = Array.isArray ? Array.isArray : function _isArray(obj) {
	    return Object.prototype.toString.call(obj) === "[object Array]";
	  };
	  var defaultMaxListeners = 10;

	  function init() {
	    this._events = {};
	    if (this._conf) {
	      configure.call(this, this._conf);
	    }
	  }

	  function configure(conf) {
	    if (conf) {

	      this._conf = conf;

	      conf.delimiter && (this.delimiter = conf.delimiter);
	      conf.maxListeners && (this._events.maxListeners = conf.maxListeners);
	      conf.wildcard && (this.wildcard = conf.wildcard);
	      conf.newListener && (this.newListener = conf.newListener);

	      if (this.wildcard) {
	        this.listenerTree = {};
	      }
	    }
	  }

	  function EventEmitter(conf) {
	    this._events = {};
	    this.newListener = false;
	    configure.call(this, conf);
	  }

	  //
	  // Attention, function return type now is array, always !
	  // It has zero elements if no any matches found and one or more
	  // elements (leafs) if there are matches
	  //
	  function searchListenerTree(handlers, type, tree, i) {
	    if (!tree) {
	      return [];
	    }
	    var listeners=[], leaf, len, branch, xTree, xxTree, isolatedBranch, endReached,
	        typeLength = type.length, currentType = type[i], nextType = type[i+1];
	    if (i === typeLength && tree._listeners) {
	      //
	      // If at the end of the event(s) list and the tree has listeners
	      // invoke those listeners.
	      //
	      if (typeof tree._listeners === 'function') {
	        handlers && handlers.push(tree._listeners);
	        return [tree];
	      } else {
	        for (leaf = 0, len = tree._listeners.length; leaf < len; leaf++) {
	          handlers && handlers.push(tree._listeners[leaf]);
	        }
	        return [tree];
	      }
	    }

	    if ((currentType === '*' || currentType === '**') || tree[currentType]) {
	      //
	      // If the event emitted is '*' at this part
	      // or there is a concrete match at this patch
	      //
	      if (currentType === '*') {
	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+1));
	          }
	        }
	        return listeners;
	      } else if(currentType === '**') {
	        endReached = (i+1 === typeLength || (i+2 === typeLength && nextType === '*'));
	        if(endReached && tree._listeners) {
	          // The next element has a _listeners, add it to the handlers.
	          listeners = listeners.concat(searchListenerTree(handlers, type, tree, typeLength));
	        }

	        for (branch in tree) {
	          if (branch !== '_listeners' && tree.hasOwnProperty(branch)) {
	            if(branch === '*' || branch === '**') {
	              if(tree[branch]._listeners && !endReached) {
	                listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], typeLength));
	              }
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            } else if(branch === nextType) {
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i+2));
	            } else {
	              // No match on this one, shift into the tree but not in the type array.
	              listeners = listeners.concat(searchListenerTree(handlers, type, tree[branch], i));
	            }
	          }
	        }
	        return listeners;
	      }

	      listeners = listeners.concat(searchListenerTree(handlers, type, tree[currentType], i+1));
	    }

	    xTree = tree['*'];
	    if (xTree) {
	      //
	      // If the listener tree will allow any match for this part,
	      // then recursively explore all branches of the tree
	      //
	      searchListenerTree(handlers, type, xTree, i+1);
	    }

	    xxTree = tree['**'];
	    if(xxTree) {
	      if(i < typeLength) {
	        if(xxTree._listeners) {
	          // If we have a listener on a '**', it will catch all, so add its handler.
	          searchListenerTree(handlers, type, xxTree, typeLength);
	        }

	        // Build arrays of matching next branches and others.
	        for(branch in xxTree) {
	          if(branch !== '_listeners' && xxTree.hasOwnProperty(branch)) {
	            if(branch === nextType) {
	              // We know the next element will match, so jump twice.
	              searchListenerTree(handlers, type, xxTree[branch], i+2);
	            } else if(branch === currentType) {
	              // Current node matches, move into the tree.
	              searchListenerTree(handlers, type, xxTree[branch], i+1);
	            } else {
	              isolatedBranch = {};
	              isolatedBranch[branch] = xxTree[branch];
	              searchListenerTree(handlers, type, { '**': isolatedBranch }, i+1);
	            }
	          }
	        }
	      } else if(xxTree._listeners) {
	        // We have reached the end and still on a '**'
	        searchListenerTree(handlers, type, xxTree, typeLength);
	      } else if(xxTree['*'] && xxTree['*']._listeners) {
	        searchListenerTree(handlers, type, xxTree['*'], typeLength);
	      }
	    }

	    return listeners;
	  }

	  function growListenerTree(type, listener) {

	    type = typeof type === 'string' ? type.split(this.delimiter) : type.slice();

	    //
	    // Looks for two consecutive '**', if so, don't add the event at all.
	    //
	    for(var i = 0, len = type.length; i+1 < len; i++) {
	      if(type[i] === '**' && type[i+1] === '**') {
	        return;
	      }
	    }

	    var tree = this.listenerTree;
	    var name = type.shift();

	    while (name) {

	      if (!tree[name]) {
	        tree[name] = {};
	      }

	      tree = tree[name];

	      if (type.length === 0) {

	        if (!tree._listeners) {
	          tree._listeners = listener;
	        }
	        else if(typeof tree._listeners === 'function') {
	          tree._listeners = [tree._listeners, listener];
	        }
	        else if (isArray(tree._listeners)) {

	          tree._listeners.push(listener);

	          if (!tree._listeners.warned) {

	            var m = defaultMaxListeners;

	            if (typeof this._events.maxListeners !== 'undefined') {
	              m = this._events.maxListeners;
	            }

	            if (m > 0 && tree._listeners.length > m) {

	              tree._listeners.warned = true;
	              console.error('(node) warning: possible EventEmitter memory ' +
	                            'leak detected. %d listeners added. ' +
	                            'Use emitter.setMaxListeners() to increase limit.',
	                            tree._listeners.length);
	              if(console.trace){
	                console.trace();
	              }
	            }
	          }
	        }
	        return true;
	      }
	      name = type.shift();
	    }
	    return true;
	  }

	  // By default EventEmitters will print a warning if more than
	  // 10 listeners are added to it. This is a useful default which
	  // helps finding memory leaks.
	  //
	  // Obviously not all Emitters should be limited to 10. This function allows
	  // that to be increased. Set to zero for unlimited.

	  EventEmitter.prototype.delimiter = '.';

	  EventEmitter.prototype.setMaxListeners = function(n) {
	    this._events || init.call(this);
	    this._events.maxListeners = n;
	    if (!this._conf) this._conf = {};
	    this._conf.maxListeners = n;
	  };

	  EventEmitter.prototype.event = '';

	  EventEmitter.prototype.once = function(event, fn) {
	    this.many(event, 1, fn);
	    return this;
	  };

	  EventEmitter.prototype.many = function(event, ttl, fn) {
	    var self = this;

	    if (typeof fn !== 'function') {
	      throw new Error('many only accepts instances of Function');
	    }

	    function listener() {
	      if (--ttl === 0) {
	        self.off(event, listener);
	      }
	      fn.apply(this, arguments);
	    }

	    listener._origin = fn;

	    this.on(event, listener);

	    return self;
	  };

	  EventEmitter.prototype.emit = function() {

	    this._events || init.call(this);

	    var type = arguments[0];

	    if (type === 'newListener' && !this.newListener) {
	      if (!this._events.newListener) { return false; }
	    }

	    // Loop through the *_all* functions and invoke them.
	    if (this._all) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	      for (i = 0, l = this._all.length; i < l; i++) {
	        this.event = type;
	        this._all[i].apply(this, args);
	      }
	    }

	    // If there is no 'error' event listener then throw.
	    if (type === 'error') {

	      if (!this._all &&
	        !this._events.error &&
	        !(this.wildcard && this.listenerTree.error)) {

	        if (arguments[1] instanceof Error) {
	          throw arguments[1]; // Unhandled 'error' event
	        } else {
	          throw new Error("Uncaught, unspecified 'error' event.");
	        }
	        return false;
	      }
	    }

	    var handler;

	    if(this.wildcard) {
	      handler = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handler, ns, this.listenerTree, 0);
	    }
	    else {
	      handler = this._events[type];
	    }

	    if (typeof handler === 'function') {
	      this.event = type;
	      if (arguments.length === 1) {
	        handler.call(this);
	      }
	      else if (arguments.length > 1)
	        switch (arguments.length) {
	          case 2:
	            handler.call(this, arguments[1]);
	            break;
	          case 3:
	            handler.call(this, arguments[1], arguments[2]);
	            break;
	          // slower
	          default:
	            var l = arguments.length;
	            var args = new Array(l - 1);
	            for (var i = 1; i < l; i++) args[i - 1] = arguments[i];
	            handler.apply(this, args);
	        }
	      return true;
	    }
	    else if (handler) {
	      var l = arguments.length;
	      var args = new Array(l - 1);
	      for (var i = 1; i < l; i++) args[i - 1] = arguments[i];

	      var listeners = handler.slice();
	      for (var i = 0, l = listeners.length; i < l; i++) {
	        this.event = type;
	        listeners[i].apply(this, args);
	      }
	      return (listeners.length > 0) || !!this._all;
	    }
	    else {
	      return !!this._all;
	    }

	  };

	  EventEmitter.prototype.on = function(type, listener) {

	    if (typeof type === 'function') {
	      this.onAny(type);
	      return this;
	    }

	    if (typeof listener !== 'function') {
	      throw new Error('on only accepts instances of Function');
	    }
	    this._events || init.call(this);

	    // To avoid recursion in the case that type == "newListeners"! Before
	    // adding it to the listeners, first emit "newListeners".
	    this.emit('newListener', type, listener);

	    if(this.wildcard) {
	      growListenerTree.call(this, type, listener);
	      return this;
	    }

	    if (!this._events[type]) {
	      // Optimize the case of one listener. Don't need the extra array object.
	      this._events[type] = listener;
	    }
	    else if(typeof this._events[type] === 'function') {
	      // Adding the second element, need to change to array.
	      this._events[type] = [this._events[type], listener];
	    }
	    else if (isArray(this._events[type])) {
	      // If we've already got an array, just append.
	      this._events[type].push(listener);

	      // Check for listener leak
	      if (!this._events[type].warned) {

	        var m = defaultMaxListeners;

	        if (typeof this._events.maxListeners !== 'undefined') {
	          m = this._events.maxListeners;
	        }

	        if (m > 0 && this._events[type].length > m) {

	          this._events[type].warned = true;
	          console.error('(node) warning: possible EventEmitter memory ' +
	                        'leak detected. %d listeners added. ' +
	                        'Use emitter.setMaxListeners() to increase limit.',
	                        this._events[type].length);
	          if(console.trace){
	            console.trace();
	          }
	        }
	      }
	    }
	    return this;
	  };

	  EventEmitter.prototype.onAny = function(fn) {

	    if (typeof fn !== 'function') {
	      throw new Error('onAny only accepts instances of Function');
	    }

	    if(!this._all) {
	      this._all = [];
	    }

	    // Add the function to the event listener collection.
	    this._all.push(fn);
	    return this;
	  };

	  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	  EventEmitter.prototype.off = function(type, listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('removeListener only takes instances of Function');
	    }

	    var handlers,leafs=[];

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);
	    }
	    else {
	      // does not use listeners(), so no side effect of creating _events[type]
	      if (!this._events[type]) return this;
	      handlers = this._events[type];
	      leafs.push({_listeners:handlers});
	    }

	    for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	      var leaf = leafs[iLeaf];
	      handlers = leaf._listeners;
	      if (isArray(handlers)) {

	        var position = -1;

	        for (var i = 0, length = handlers.length; i < length; i++) {
	          if (handlers[i] === listener ||
	            (handlers[i].listener && handlers[i].listener === listener) ||
	            (handlers[i]._origin && handlers[i]._origin === listener)) {
	            position = i;
	            break;
	          }
	        }

	        if (position < 0) {
	          continue;
	        }

	        if(this.wildcard) {
	          leaf._listeners.splice(position, 1);
	        }
	        else {
	          this._events[type].splice(position, 1);
	        }

	        if (handlers.length === 0) {
	          if(this.wildcard) {
	            delete leaf._listeners;
	          }
	          else {
	            delete this._events[type];
	          }
	        }
	        return this;
	      }
	      else if (handlers === listener ||
	        (handlers.listener && handlers.listener === listener) ||
	        (handlers._origin && handlers._origin === listener)) {
	        if(this.wildcard) {
	          delete leaf._listeners;
	        }
	        else {
	          delete this._events[type];
	        }
	      }
	    }

	    function recursivelyGarbageCollect(root) {
	      if (root === undefined) {
	        return;
	      }
	      var keys = Object.keys(root);
	      for (var i in keys) {
	        var key = keys[i];
	        var obj = root[key];
	        if ((obj instanceof Function) || (typeof obj !== "object"))
	          continue;
	        if (Object.keys(obj).length > 0) {
	          recursivelyGarbageCollect(root[key]);
	        }
	        if (Object.keys(obj).length === 0) {
	          delete root[key];
	        }
	      }
	    }
	    recursivelyGarbageCollect(this.listenerTree);

	    return this;
	  };

	  EventEmitter.prototype.offAny = function(fn) {
	    var i = 0, l = 0, fns;
	    if (fn && this._all && this._all.length > 0) {
	      fns = this._all;
	      for(i = 0, l = fns.length; i < l; i++) {
	        if(fn === fns[i]) {
	          fns.splice(i, 1);
	          return this;
	        }
	      }
	    } else {
	      this._all = [];
	    }
	    return this;
	  };

	  EventEmitter.prototype.removeListener = EventEmitter.prototype.off;

	  EventEmitter.prototype.removeAllListeners = function(type) {
	    if (arguments.length === 0) {
	      !this._events || init.call(this);
	      return this;
	    }

	    if(this.wildcard) {
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      var leafs = searchListenerTree.call(this, null, ns, this.listenerTree, 0);

	      for (var iLeaf=0; iLeaf<leafs.length; iLeaf++) {
	        var leaf = leafs[iLeaf];
	        leaf._listeners = null;
	      }
	    }
	    else {
	      if (!this._events || !this._events[type]) return this;
	      this._events[type] = null;
	    }
	    return this;
	  };

	  EventEmitter.prototype.listeners = function(type) {
	    if(this.wildcard) {
	      var handlers = [];
	      var ns = typeof type === 'string' ? type.split(this.delimiter) : type.slice();
	      searchListenerTree.call(this, handlers, ns, this.listenerTree, 0);
	      return handlers;
	    }

	    this._events || init.call(this);

	    if (!this._events[type]) this._events[type] = [];
	    if (!isArray(this._events[type])) {
	      this._events[type] = [this._events[type]];
	    }
	    return this._events[type];
	  };

	  EventEmitter.prototype.listenersAny = function() {

	    if(this._all) {
	      return this._all;
	    }
	    else {
	      return [];
	    }

	  };

	  if (true) {
	     // AMD. Register as an anonymous module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return EventEmitter;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    // CommonJS
	    exports.EventEmitter2 = EventEmitter;
	  }
	  else {
	    // Browser global.
	    window.EventEmitter2 = EventEmitter;
	  }
	}();


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var MainStore = __webpack_require__(6);

	var MainAction = {};

	var Commands = [];
	Commands.current = null;

	MainAction.setLinkImage = function(module) {
		MainStore.emitSetLinkImageCmd(module);
	};

	MainAction.uploadImage = function(module) {
		MainStore.emitUploadImageCmd(module);
	};

	MainAction.removeModule = function(_id) {
		MainStore.emitRemoveModuleCmd(_id);
	};

	MainAction.addModule = function(mm) {
		MainStore.emitAddModuleCmd(mm);
	//	var AddModuleCommand = require('../cmd/AddModuleCommand');
	//	var cmd = new AddModuleCommand(mm);
	//	cmd.excute();
	//	Commands.push(cmd);
	};

	/**
	 * 设置导航条
	 */
	MainAction.setNavBar = function(targetModule) {
		MainStore.emitSetNavBarCmd(targetModule);
	};

	/**
	 * 设置轮播图
	 */
	MainAction.setCarousel = function(module) {
		MainStore.emitSetLunboCmd(module);
	};

	MainAction.setBox = function(module) {
		MainStore.emitSetBoxCmd(module);
	};

	MainAction.undo = function() {
		if (!Commands.current) {
			var index = Commands.length - 1;
			var cmd = Commands[index];
			if (cmd) {
				cmd.undo();
			}
			Commands.current = index;
		} else {
			var cmd = Commands[Commands.current - 1];
			if (cmd) {
				cmd.undo();
			}
		}
	};

	module.exports = MainAction;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		MainConstants = __webpack_require__(11);

	/**
	 * 图片模型，用来描述一个图片所涉及的所有属性
	 */
	var ImageModel = BaseModel.extend({
		initialize: function() {
			this.set({
				done: false,
				_url: null,
		  	  	link: null,
		  	  	width: null,
		  	  	height: null,
		  	  	style: {
		  	  		height: '100'
		  	  	},
		  	  	openInAnotherWindow: false, //是否在新窗口中打开
		  	  	options: [MainConstants.OPTIONS.OPT_UPLOAD, MainConstants.OPTIONS.OPT_SETTING, MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = ImageModel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);

	/**
	 * 组件模型，用来描述一个组件，包括普通的模块和布局
	 * 所有的组件对应的模型都继承自该模型
	 */
	var BaseModel = Backbone.Model.extend({
		defaults: function() {
	      return {
	    	  _id: null, 
	    	  vId: null, //模型对应的视图id
	    	  type: null, //模型的类型
	    	  pId: null, //上级组件id
	    	  index: 0, //位置，暂时还没有使用到
	    	  flag: 0, //状态标记，初始为0，删除为-1
	    	  style: null, //json对象，用来描述额外的、个性的样式，如width, height, margin等等, 参考jquery的css方法
	    	  options: [] //组件的操作项
	      };
	    }
	});

	module.exports = BaseModel;

/***/ },
/* 11 */
/***/ function(module, exports) {

	
	//各种常量
	module.exports = {
		MODULE_FLAG_REMOVE: -1, //删除状态
		MODULE_FALG_ORGIN: 0, //初始状态
		IMAGE_ACCESS_SERVER: 'http://img.vinux.com', //图片访问服务器地址
		IMAGE_GOODS_ACCESS_SERVER: 'http://img.vinuxgoods.com',
		URL_GOODS_DEATIL_PREFIX: 'http://pcmall.vinuxpost.com/productDetail/goods',
		OPTIONS: {
			OPT_UPLOAD: {
				opt: 'upload',
				name: '上传',
				icon: 'btn-white fa-upload'
			},
			OPT_SETTING: {
				opt: 'setting',
				name: '设置',
				icon: 'btn-white fa-gear'
			},
			OPT_REMOVE: {
				opt: 'remove',
				name: '删除',
				icon: 'btn-danger fa-remove'
			},
			OPT_ADD: {
				opt: 'add',
				name: '添加',
				icon: 'btn-white fa-plus'
			}
		},
		MENU: {
			BOX: {
				name: '布局',
				type: 'layout',
				subs: []
			},
			BOX100: {
				type: 'box-100',
				name: '通栏(100%)',
				subs: []
			},
			BOX1260: {
				name: '通栏(1260px)',
				type: 'box-1260',
				subs: []
			},
			BOX1_1: {
				name: '二等分(100%)',
				type: 'box-1-1',
				subs: []
			},
			BOX4_8: {
				name: '左窄右宽(100%)',
				type: 'box-4-8',
				subs: []
			},
			BOX8_4: {
				name: '左宽右窄(100%)',
				type: 'box-8-4',
				subs: []
			},
			BOX1_1_1: {
				name: '三等分(100%)',
				type: 'box-1-1-1',
				subs: []
			},
			BOX8_4_1_1: {
				name: '混合1',
				type: 'box-8-4_1_1',
				subs: []
			},
			COMPONENT: {
				name: '组件',
				type: 'component',
				subs: []
			},
			COMPONENT_NAV_BAR: {
				name: '导航条',
				type: 'component-nav-bar'
			},
			COMPONENT_BANNER_IMAGE: {
				name: '广告图',
				type: 'component-banner-image'
			},
			COMPONENT_LUNBO: {
				name: '轮播图',
				type: 'component-lunbo'
			},
			COMPONENT_PRODUCT_GROUP1: {
				name: '图片+商品组合',
				type: 'component-product-group-1'
			},
			COMPONENT_PRODUCT_GROUP2: {
				name: '3行2列的商品组合',
				type: 'component-product-group-2'
			},
			COMPONENT_PRODUCT_GROUP3: {
				name: '3行3列的商品组合',
				type: 'component-product-group-3'
			},
			TEMPLATE: {
				name: '模板',
				type: 'template',
				subs: []
			},
			TEMPALTE_1: {
				name: '模板1',
				type: 'template-1'
			},
			TEMPALTE_2: {
				name: '模板2',
				type: 'template-2'
			}
		}
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);

	/**
	 * 商品模型，用来描述商品设计的所有属性
	 */
	var ProductModel = Backbone.Model.extend({
		defaults: function() {
	      return {
	        title: null, //商品标题
	        image: null, //商品图片
	        price: null, //商品价格
	        actPrice: null, //商品实际价格
	        fund: null, //商品的比例
	        productId: null, //商品id
	        productPk: null, //商品sku
	        memberId: null, //商品入住的社区id
	        detailUrl: null, //商品详情页面url
	        index: 0
	      };
	    }
	});

	module.exports = ProductModel;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		MainConstants = __webpack_require__(11);

	/**
	 * 图片模型，用来描述一个图片所涉及的所有属性
	 * 其中items表示导航条中的项
	 */
	var NavigationModel = BaseModel.extend({
		initialize: function() {
			this.set({
				items: [{
					name: '首页', //导航项名称
					link: '', //地址
					openInAnotherWindow: false, //是否在新窗口中打开
					active: true //是否激活状态
				}, {
					name: '商品列表',
					link: '',
					openInAnotherWindow: true,
					active: false
				}],
			  	options: [MainConstants.OPTIONS.OPT_SETTINGS, MainConstants.OPTIONS.OPT_ADD, MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = NavigationModel;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		MainConstants = __webpack_require__(11);

	/**
	 * 布局模型
	 */
	var BoxModel = BaseModel.extend({
		initialize: function() {
			this.set({
				style: { },
		  	  	options: [MainConstants.OPTIONS.OPT_SETTING, MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = BoxModel;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(16);
	var MainAction = __webpack_require__(8),
		MainStore = __webpack_require__(6);

	/**
	 * 导航项，暂时还没有考虑二级下拉的情况
	 */
	var NavigationItemView = Backbone.View.extend({
		tagName: 'li',
		template: _.template('<li><a href="<%if (link) {%> <%= link%> <%} else {%>javascript:void(0);<%}%>" target="<%if (openInAnotherWindow) {%>_blank<%} else {%>_self<%}%>"><%= name%></a></li> '),
		render: function() {
			this.$el.html(this.template(this.model));
			if (this.model.active) {
				this.$el.addClass('selected');
			}
			return this;
		}
	});

	var MAX_ITEMS_LENGTH = 10;

	/**
	 * 导航条组件
	 * 一个导航条由若干个项组成，每个项分别包含名称、地址、打开方式等属性
	 * 对应的model为 ../../model/NavigationModel
	 * 一级导航项的数量暂时设为10个
	 */
	var NavigationBar = Backbone.View.extend({
		tagName: 'div',
		className: 'images-max',
		template: _.template(template),
		initialize: function() {
			var self = this;
			MainStore.addNavBarSetFinishedEventListener(function(module) {
				if (self.model.id == module.id) {
					self._update(module.items);
				}
			});
			this.listenTo(this.model, 'update', this.render);
		},
		events: {
			'click .setting': '_handleSetting',
			'click .remove:first': '_handleRemove',
			'click .add': '_handleAdd'
		},
		render: function() {
			this.$el.html(this.template());
			var items = this.model.get('items');
			if (items && items.length > 0) {
				for (var i = 0; i < items.length; i++) {
					var itemView = 	new NavigationItemView({model: items[i]});
					this.$('.dp-nav').append(itemView.render().el);
				}
			}
			return this;
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleSetting: function() {
			//这里有一个问题，在设置导航项时，model的items属性的值在回调_update方法前就已经被修改了
			var self = this;
			MainAction.setNavBar({
				id: self.model.id,
				items: self.model.get('items')
			});
	//		MainAction.setNavBar(this.model.get('items'));
		},
		_update: function(items) {
			this.model.save({items: items});
			//如果model中的某个属性是个json数组，这个数组发生改变时，backbone监测不到，无法自动触发change事件
			//所以这里手动触发一次update事件，同时触发一个全局的更新事件
			this.model.trigger('update');
			Backbone.trigger('modules_update', this.model);
		},
		_handleAdd: function() {
			var items = this.model.get('items');
			if(items && items.length >= MAX_ITEMS_LENGTH) {
				toastr.remove();
				toastr.error('您最多可以添加的导航数量是' + MAX_ITEMS_LENGTH + '个！');
				return;
			}
			var item = {
				name: '新菜单',
				link: null,
				openInAnotherWindow: false,
				active: false
			};
			
			items.push(item);
			this._update(items);
			this.model.save({items: items});
			Backbone.trigger('modules_update');
		}
	});

	module.exports = NavigationBar;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header-style-1\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"images-max-content\" style=\"background-color:#9b0127;\" data-type=\"component-nav-bar\">\r\n     \t<div class=\"dp-nav-con  w1200  h40 m-style\">\r\n             <ul class=\"dp-nav\">\r\n             </ul>\r\n        </div>\r\n</div>\r\n";

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(18);
	var MainAction = __webpack_require__(8),
		MainStore = __webpack_require__(6),
		BeanManager = __webpack_require__(19),
		MainConstants = __webpack_require__(11);

	var ModuleFactory;
	var ModuleCollection;

	/**
	 * 通用box
	 * 现有所有的box都用这一个view创建
	 * 
	 * 格子中的组件要保证顺序
	 * 借用BaseModel中定义的index属性，灵活实现
	 * 放到第一个格子的里的组件，index为0(按照数组下标的习惯)
	 * 现在不支持一个格子放两个组件，暂时没有时间实现
	 * 如果要支持，可以把组件的index定义为"格子顺序-组件顺序"的组合
	 * 如：第一个格子的第一个组件，index为0-0, 第二个组件，index为0-1
	 */
	var Box = Backbone.View.extend({
		tagName: 'div',
		className: 'ibox ui-draggable',
		template: _.template(template),
		initialize: function() {
			this.listenTo(this.model, 'change', this._renderStyle);
			this.subs = [];
			this.$cells = [];
			var self = this;
			MainStore.addBoxSetSuccessEventListener(function(data) {
				if (self.model.id == data.targetModuleId) {
					var setting = {
							style: {
								height: data.height
							}
					};
					self.model.save(setting);
					Backbone.trigger('modules_update', self.model);
				}
			});
			ModuleFactory = __webpack_require__(2);
			ModuleCollection = BeanManager.getModuleCollection();
		},
		render: function() {
			var self = this;
			var type = this.model.get('type');
			switch(type) {
				case 'box-1260':
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('w1260');
					var temp = __webpack_require__(18)
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.ibox-content:first', this.$el);
					break;
				case 'box-1-1':
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(21);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.row .ibox-content', this.$el);
					break;
				case 'box-4-8':
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(22);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.row .ibox-content', this.$el);
					break;
				case 'box-8-4':
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(23);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.row .ibox-content', this.$el);
					break;
				case 'box-1-1-1':
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(24);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.row .ibox-content', this.$el);
					break;
				case 'box-8-4_1_1':
					var height = this.model.get('style').height || 500;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(25);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.row .ibox-content', this.$el);
					break;
				default: 
					var height = this.model.get('style').height || 160;
					this.model.set('style', {
						height: height
					});
					this.$el.addClass('wax100');
					var temp = __webpack_require__(18);
					this.$el.html(_.template(temp)(this.model.toJSON()));
					this.$cells = this.$('.ibox-content:first', this.$el);
					break;
			}
			
			_.each(this.$cells, function(item, index) {
				$(item).sortable({
					opacity: .35,
					connectWith: '.ibox-content',
					receive: function() {
						var module = MainStore.getCurrentEditModule();
						var view = ModuleFactory.create(module.get('type'), module);
						$(this).find('.ui-draggable-dragging').remove();
						$(this).append(view.render($(this)).el);
	//					var moduleNum = $(this).data('moduleNum') || 0;
						module.set('pId', self.model.id);
						module.set('index', (index));
	//					$(this).data('moduleNum', moduleNum + 1);
						MainAction.addModule(module);
						self._addListenToModule(module);
						$(this).sortable('disable');
					}
				});
			});
			
			var subs = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: this.model.id});
			for (var i = 0; i < subs.length; i++) {
				var index = subs[i].get('index');
				var content = $(this.$cells[index]);
				var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
				content.append(thisView.render(content).el);
				self._addListenToModule(subs[i]);
				content.sortable('disable');
			}
			
			this._renderStyle();
			return this;
		},
		_renderStyle: function() {
	//		this.model.get('style') && this.$('.ibox-content:first').css(this.model.get('style'));
		},
		events: {
			'click .ibox-header:first .setting': '_handleSetting',
			'click .ibox-header:first .remove': '_handleRemove'
		},
		_handleSetting: function() {
			var self = this;
			MainAction.setBox({
				id: self.model.id,
				height: self.model.get('style').height
			});
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_addView: function(mm) {
			this.subs.push(mm);
		},
		_addListenToModule: function(module) {
			var self = this;
			this.listenTo(module, 'change:flag', function() {
				console.log('module flag changed: ' + module.get('flag') + ', index: ' + module.get('index'));
				$(self.$cells[module.get('index')]).sortable('enable');
			});
		}
	});

	module.exports = Box;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" >\r\n\t\r\n</div>\r\n";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var BeanManager = {};

	BeanManager.init = function() {
		this.moduelCollection = __webpack_require__(20);
	};

	BeanManager.getModuleCollection = function() {
		return this.moduelCollection;
	};

	module.exports = BeanManager;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		MainStore = __webpack_require__(6),
		MainConstants = __webpack_require__(11);
	var ModuleFactory = __webpack_require__(2),
		MainAction = __webpack_require__(8),
		NavigationModel = __webpack_require__(13);

	/**
	 * 模块列表，存放拖放过去的各种组件，包括布局和功能模块
	 */
	var ModuleCollection = Backbone.Collection.extend({
		model: BaseModel,
		localStorage: new Backbone.LocalStorage('modules'),
		initialize: function() {
			var self = this;
			MainStore.addRemoveModuleCmdHandler(function(_id) {
				self.removeById(_id);
			});
			
			MainStore.addAddModuleCmdHandler(function(mm) {
				self.create(mm, {
					success: function(model, resp, c) {
						Backbone.trigger('modules_update');
					}
				});
			});

			/**
			 * 这个update事件比较恶心
			 * 当调用create方法创建model时，会马上触发update事件，而此时model还没有生成id
			 * 保存的组件没有id，就无法确定父子关系，所以在create的success回调函数里边手动触发
			 * 一个自定义的事件
			 */
	//		this.listenTo(this, 'update', function() {
	//			self.save();
	//		})
			
			Backbone.on('modules_remove modules_update', function(module) {
				//this.save();
			}, this);
	//		
		},
		//暂时无用
		addModule: function(module) {
			this.create(module, {
				success: function(model, resp, c) {
					Backbone.trigger('modules_update');
				}
			});
		},
		//通过id删除，该操作并不会真正的删除，只会待删除的组件标记为“删除状态”
		removeById: function(_id) {
			var that = this;
			var module = this.get(_id);
			if (module) {
				try {
					this._remove(module);
					Backbone.trigger('modules_remove');
	//				this.trigger('reset');
				} catch (e) {
					console.error(e);
				}
			}
		},
		//删除模块，如果有子级模块就级联删除
		_remove: function(module) {
			try {
				var that = this;
	//		this.trigger('reset')
				var subs = this.find({
					pId: module.id
				});
				if (subs && subs.length > 0) {
					for (var i = 0;i < subs.length; i++) {
						that._remove(subs[i]);
					}
				}
				module.save({flag: MainConstants.MODULE_FLAG_REMOVE});
			} catch (e) {
				console.error(e);
				throw e;
			}
		},
		//获取非“删除状态”的组件
		getUnRemoves: function() {
			return this.filter(function(each) {
				return each.get('flag') != MainConstants.MODULE_FLAG_REMOVE;
			});
	//		return this.where({flag: MainConstants.MODULE_FALG_ORGIN});
		},
		//基础查询
		find: function(params) {
			return this.where(params);
		},
		//通过id查找
		getModuleById: function(id) {
			return this.get(id);
		},
		//清空
		clear: function() {
	//		_.invoke(this.models, 'destroy');
			this.reset([]);
			Backbone.trigger('modules_remove');
	//		this.trigger('update');
		},
		
		/**
		 * 每个店铺提供默认的导航条组件，并且不提供删除功能
		 * 暂时没有使用到
		 * @deprecated
		 */
		_initNav: function() {
			try {
				var module = new BaseModel({
					type: 'box-100',
					flag: 'no-remove'
				});
				MainAction.addModule(module);
				var navbar = new NavigationModel({type: 'component-nav-bar'});
				navbar.set('pId', module.id);
				MainAction.addModule(navbar);
				this.trigger('reset');
			} catch (e) {
				console.error(e);
			}
			
		},
		save: function() {
			var self = this;
	//		this.pageModel.data = JSON.stringify(this.toJSON());
			var unRemoves = _.map(this.getUnRemoves(), function(each) {
				return each.toJSON();
			});
			this.pageModel.data = JSON.stringify(unRemoves);
			var page = this.pageModel;
			$.ajax({
				url: '/main/page/' + page.id + '/data.vhtml',
				type: 'post',
				data: page,
				dataType: 'json',
				success: function(res) {
					if (200 == res.status) {
						toastr.remove();
						toastr.success('已自动保存');
					}
				}
			});
		}
	});

	module.exports = new ModuleCollection;

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n    <%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" style=\"height: <%=style.height%>px\">\r\n\t<div class=\"row\" style=\"height: 100%\">\r\n\t\t<div class=\"col-lg-6\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-6\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n     <%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" style=\"height: <%=style.height%>px\">\r\n\t<div class=\"row\" style=\"height: 100%\">\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-8\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n     <%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" style=\"height: <%=style.height%>px\">\r\n\t<div class=\"row\" style=\"height: 100%\">\r\n\t\t<div class=\"col-lg-8\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n    <%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" style=\"height: <%=style.height%>px\">\r\n\t<div class=\"row\" style=\"height: 100%\">\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\"> \r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header\">\r\n    <%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"ibox-content\" style=\"height: <%=style.height%>px\">\r\n\t<div class=\"row\" style=\"height: 100%\">\r\n\t\t<div class=\"col-lg-8\" style=\"height: 100%\">\r\n\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t<div class=\"col-lg-4\" style=\"height: 100%\">\r\n\t\t\t<div class=\"row\" style=\"height: 50%\">\r\n\t\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"row\" style=\"height: 50%\">\r\n\t\t\t\t<div class=\"ibox\" style=\"height: 100%\">\r\n\t\t\t\t\t<div class=\"ibox-content\" style=\"height: 100%\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		MainConstants = __webpack_require__(11);

	/**
	 * 轮播图模型
	 */
	var LunboModel = BaseModel.extend({
		initialize: function() {
			this.set({
				items: [{
					imageUrl: '',
					link: null, //地址
					product: {},
					openInAnotherWindow: false //是否在新窗口中打开
				}, {
					imageUrl: '',
					link: null,
					product: {},
					openInAnotherWindow: true
				}, {
					imageUrl: '',
					link: null,
					product: {},
					openInAnotherWindow: true
				}],
				options: [MainConstants.OPTIONS.OPT_SETTING, MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = LunboModel;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(28);
	var MainStore = __webpack_require__(6),
		MainAction = __webpack_require__(8);

	/**
	 * 轮播图组件
	 */
	var LunboComponent = Backbone.View.extend({
		tagName: 'div',
		className: 'images-max',
		template: _.template(template),
		initialize: function() {
			this.listenTo(this.model, 'itemsChange', this.render);
			var self = this;
			MainStore.addLunboSetFinishedEventListener(function(module) {
				if (module.id == self.model.id) {
					self._update(module);
				}
			});
		},
		events: {
			'click .setting': '_handleSetting',
			'click .remove': '_handleRemove',
			'click .lunbo .bd a': '_handleClick'
		},
		render: function() {
			var json = this.model.toJSON();
			json.targetId = this.cid;
			this.$el.html(this.template(json));
			var self = this;
			__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(29)]; (function(Lunbo) {
				Lunbo.init(self.$('.lunbo'));
				self.$el.height('100%');
				self.$('.images-max-content').height('100%');
				self.$('.lunbo').height('100%');
				self.$('.lunbo .bd').height('100%');
				self.$('.lunbo .bd ul').height('100%');
				self.$('.lunbo .bd ul li').height('100%');
			}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			return this;
		},
		_handleSetting: function() {
			MainAction.setCarousel(this.model);
		},
		_update: function(module) {
			if (module) {
				var items = module.get('items');
				this.model.save({items: items});
				//如果model中的某个属性是个json数组，这个数组发生改变时，backbone监测不到，无法自动触发change事件
				//所以这里手动触发一次自定义的事件
				this.model.trigger('itemsChange');
				Backbone.trigger('modules_update', this.model);
			}
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleClick: function(e) {
			e.preventDefault(); 
			toastr.remove();
			toastr.warning('在这里不能访问商品详情哦');
		}
	});

	module.exports = LunboComponent;

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header-style-1\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"images-max-content \">\r\n   \t<div class=\"lunbo\">\r\n\t\t  <div class=\"bd\">\r\n\t\t\t\t<ul>\r\n\t\t\t\t  \t<%if (items) {%>\r\n\t            \t\t<%for (var i = 0; i < items.length; i++) {%>\r\n\t            \t\t\t<li style=\"background:#B8CED1 center 0 no-repeat; <%if (items[i].imageUrl) {%>background-image: url(<%=items[i].imageUrl%>)<%}%>\">\r\n\t            \t\t\t\t<a <% if (items[i].link) { %> href=\"<%=items[i].link%>\" <%}%> target=\"_blank\"></a>\r\n\t            \t\t\t</li>\r\n\t          \t\t\t<% } %>\r\n\t       \t\t\t<% } %>\r\n\t\t\t\t</ul>\r\n\t\t  </div>\r\n\t\t  <div class=\"hd\">\r\n\t\t\t<ul></ul>\r\n\t\t  </div>\r\n\t</div>\r\n</div>\r\n";

/***/ },
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10),
		ImageModel = __webpack_require__(9),
		ProductModel = __webpack_require__(12);
		MainConstants = __webpack_require__(11);
	/**
	 * 商品组合模型，对应商品组合组件../modules/comonent/GoodsGroup.js
	 */
	var ProductGroupModel = BaseModel.extend({
		initialize: function() {
			this.set({
				top: new ImageModel().set('height', 100),
				left: new ImageModel(),
				products: [],
				options: [MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = ProductGroupModel;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(36),
		productComponentTemplate = __webpack_require__(37);
	var ProductModel = __webpack_require__(12),
	    MainStore = __webpack_require__(6),
	    MainAction = __webpack_require__(8),
	    MainConstants = __webpack_require__(11);

	/**
	 * 商品组件，每个商品组件包括固定的图片、标题、价格、实际价格、国二比例
	 * 每个组件都包含一个“删除”操作，点击删除，不会将该组件删除，只会重新渲染该组件
	 * 商品组件的具体内容由“选择商品组件#./SelectProduct.js”拖拽而来
	 */
	var ProductComponent = Backbone.View.extend({
		tagName: 'li',
		template: _.template(productComponentTemplate),
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			var self = this;
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			'click .remove:first': 'handleRemove'
		},
		toggleDone: function() {
			this.model.toggle();
		},
		handleRemove: function(e) {
			e.preventDefault();
			this.model.set('done', false);
		}
	});

	/**
	 * 商品组合，一种组合组件，由头部的通栏图片、底部的左窄右宽布局的组件组成
	 */
	var ProductGroup1 = Backbone.View.extend({
		tagName: 'div',
		className: 'floor-1',
		template: _.template(template),
		initialize: function() {
			var self = this;
			MainStore.addProductSelectedEventListener(function(module, product) {
				if (self.model.id == module.id) {
					self._updateProduct(product);
				}
			});
			this.listenTo(this.model, 'change:top', this.render);
			this.listenTo(this.model, 'change:left', this.render);
			MainStore.addImageUploadSuccessListener(function(data) {
	//			var imageUrl = MainConstants.IMAGE_ACCESS_SERVER + '/image/accessImg/vinuxmedia/' + data.fileName + '/' + data.width + '/' + data.height + '.vhtml'
				var imageUrl = data.imageUrl;
				if (self.model.id == data.targetModule.id) {
					if ('left' == data.targetModule.region) {
						var left = self.model.get('left');
						left._url = imageUrl;
						self.model.save({left: left});
						self.model.trigger('change:left');
					} else {
						var top = self.model.get('top');
						top._url = imageUrl;
						self.model.save({top: top});
						self.model.trigger('change:top');
					}
	//				self.model.trigger('update');
					Backbone.trigger('modules_update', this.model);
				} 
			});
			
			MainStore.addLinkImageSetSuccessListener(function(data) {
				if (self.model.id == data.targetModule.id) {
					if ('left' == data.targetModule.region) {
						var left = self.model.get('left');
						left.link = data.link;
						left.height = data.height;
						left.openInAnotherWindow = data.openInAnotherWindow;
						self.model.save({left: left});
						self.model.trigger('change:left');
					} else {
						var top = self.model.get('top');
						top.link = data.link;
						top.height = data.height;
						top.openInAnotherWindow = data.openInAnotherWindow;
						self.model.save({top: top});
						self.model.trigger('change:left');
					}
					Backbone.trigger('modules_update', self.model);
				} 
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$products = this.$('.b');
			this._initProducts();
			return this;
		},
		events: {
			'click .setting-top': '_handleSettingTop',
			'click .upload-top': '_handleUploadTop',
			'click .setting-left': '_handleSettingLeft',
			'click .upload-left': '_handleUploadLeft',
			'click .remove': '_handleRemove',
			'click .sale-products-img,.sale-title': '_handleClickProduct'
		},
		append: function(type, model, view) {
		  if ('component-banner-image' == type) {
			  this.setView('.component-banner-image', view);
		  } else if ('component-fix-image' == type) {
			  this.setView('.component-fix-image', view);
		  } else {
			  this.removeView('.component-product-group');//先移除默认的商品组
			  this.setViews({
				  '.component-product-group': view
			  });
		  }
		},
		_initProducts: function() {
			var products = this.model.get('products');
			for (var i = 0; i < products.length; i++) {
				var product = new ProductModel(products[i]);
				product.set('index', i);
				var productView = new ProductComponent({model: product});
				this.$products.append(productView.render().el);
				(function(module, view) {
					view.$el.droppable({
						  hoverClass: 'drop-hover',
						  scope: 'product',
						  drop: function(event, ui) {
							  var model = ui.helper.data('model');
							  var index = view.model.get('index');
							  model.index = index;
							  model.image = model.image  + '?imageView2/2/w/161';
							  view.model.set(model);
							  MainStore.emitProductSelectedEvent(module, view.model);
						  }
					});
				})(this.model, productView);
			}
		},
		_updateProduct: function(product) {
			var index = product.get('index') || 0;
			var products = this.model.get('products');
			products[index] = product.toJSON();
			this.model.save({products: products});
			Backbone.trigger('modules_update', this.model);
		},
		_handleSettingTop: function() {
			var self = this;
			MainAction.setLinkImage({
				id: self.model.id,
				height: self.model.get('top').height,
				link: self.model.get('top').link,
				openInAnotherWindow: self.model.get('top').openInAnotherWindow,
				region: 'top'
			});
		},
		_handleUploadTop: function() {
			var self = this;
			MainAction.uploadImage({
				id: self.model.id,
				region: 'top',
				width: 1260,
				height: 100
			});
		},
		_handleSettingLeft: function() {
			var self = this;
			MainAction.setLinkImage({
				id: self.model.id,
				link: self.model.get('left').link,
				openInAnotherWindow: self.model.get('left').openInAnotherWindow,
				region: 'left'
			});
		},
		_handleUploadLeft: function() {
			var self = this;
			MainAction.uploadImage({
				id: self.model.id,
				region: 'left',
				width: 292,
				height: 586
			});
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleClickProduct: function(e) {
			e.preventDefault(); 
			toastr.remove();
			toastr.warning('在这里不能访问商品详情哦');
		}
	});

	module.exports = ProductGroup1;


/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<!--begin 组合顶部的图片 -->\r\n<div class=\"ibox-header-style-1\">\r\n\t<button class=\"btn btn-white btn-xs fa fa-upload upload-top\" type=\"button\">上传</button>\r\n\t<button class=\"btn btn-white btn-xs fa fa-gear setting-top\" type=\"button\">设置</button>\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"floor-1-title h100 boder-style-1\" style=\" background-repeat:no-repeat; background-position:top;\">\r\n\t<a <%if (top.link) {%>href=\"<%=top.link%>\"<%}%>target=\"<%if (top.openInAnotherWindow) {%>_blank<%} else {%>_self<%}%>\">\r\n\t<%if (top._url) {%>\r\n\t\t<image src=\"<%=top._url%>\" height=\"<%=top.height%>px\" width=\"100%\"/>\t\r\n\t<% } %>\r\n\t</a>\r\n\t\r\n</div>\r\n<!-- end -->\r\n<div class=\"w1200 m-style\">\r\n\t<!-- begin 中部 -->\r\n\t<div class=\"floor-1-content\">\r\n\t\t<div class=\"por\">\r\n\t\t\t<!-- begin 中部左侧图片 -->\r\n\t\t\t<div class=\"a\">\r\n\t\t\t\t<div class=\"ibox-operation\">\r\n\t\t\t\t\t<button class=\"btn btn-white btn-xs layer-demolist-s1 fa fa-upload upload-left\" type=\"button\">\r\n\t\t\t\t\t\t上传\r\n\t\t\t\t\t</button>\r\n\t\t\t\t\t<button class=\"btn btn-white btn-xs layer-demolist-s1 fa fa-gear setting-left\" type=\"button\">\r\n\t\t\t\t\t\t设置\r\n\t\t\t\t\t</button>\r\n\t\t\t\t</div>\r\n\t\t\t\t<a class=\"img-bg-1 link-image\" target=\"<%if (left.openInAnotherWindow) {%>_blank<%} else {%>_self<%}%>\" <%if(left.link){%>href=\"<%=left.link%>\"<%}%>class=\"img-bg-1\" style=\"<%if (left._url) {%>background-image: url(<%=left._url%>);<%}%>\"></a>\r\n\t\t\t</div>\r\n\t\t\t<!-- end -->\r\n\t\t\t<!-- begin 中部右侧的商品 -->\r\n\t\t\t\r\n\t\t\t\t<ul class=\"b\">\r\n\t\t\t\t\t\r\n\t\t\t\t</ul>\r\n\t\t\t\r\n\t\t\t<!-- end -->\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n";

/***/ },
/* 37 */
/***/ function(module, exports) {

	module.exports = "\t<% if (null != productId) { %>\r\n\t\t<a target=\"_blank\" <%if (detailUrl) {%>href=\"<%= detailUrl %>\"<%}%> class=\"sale-products-img\">\r\n\t\t\t<img src=\"<%= image %>\" />\r\n\t\t\t<!-- \r\n\t\t\t<div class=\"removes\">\r\n\t\t\t\t<button class=\"btn btn-white btn-xs remove\" type=\"button\"><i class=\"fa fa-times\"></i> 删除</button>\r\n\t\t\t</div>\r\n\t\t\t -->\r\n\t\t\t<div class=\"discount\"> \r\n\t\t\t\t<span class=\"dt-a\"><%= fund %></span>\r\n\t\t\t\t<i class=\"dt-b\"></i>\r\n\t\t\t</div>\r\n\t\t</a> \r\n\t\t<a target=\"_blank\" <%if (detailUrl) {%>href=\"<%= detailUrl %>\"<%}%> class=\"sale-title\"><%= title %></a>\r\n\t\t<p class=\"sale-price\">\r\n\t\t\t<span class=\"price-a\">\r\n\t\t\t\t<strong>￥<%= actPrice %></strong>\r\n\t\t\t\t<!-- \r\n\t\t\t\t<label>￥0</label>\r\n\t\t\t\t -->\r\n\t\t\t</span> \r\n\t\t</p>\r\n\t<% } else { %>\r\n\t\t<a href=\"javascript:void(0);\" class=\"sale-products-img\">\r\n\t\t\t<img src=\"http://design.vinuxpost.com/images/design/blank.jpg\" />\r\n\t\t</a> \r\n\t\t<a href=\"\" class=\"sale-title\">空</a>\r\n\t\t<p class=\"sale-price\">\r\n\t\t\t<span class=\"price-a\"> \r\n\t\t\t\t<strong>￥0</strong> \r\n\t\t\t\t<!-- \r\n\t\t\t\t<label>￥0</label>\r\n\t\t\t\t -->\r\n\t\t\t</span>\r\n\t\t</p>\r\n\t<% } %>\r\n";

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(39),
		productComponentTemplate = __webpack_require__(40);
	var ProductModel = __webpack_require__(12),
	    MainStore = __webpack_require__(6),
	    MainAction = __webpack_require__(8);

	/**
	 * 商品组件，每个商品组件包括固定的图片、标题、价格、实际价格、国二比例
	 * 每个组件都包含一个“删除”操作，点击删除，不会将该组件删除，只会重新渲染该组件
	 * 商品组件的具体内容由“选择商品组件#./SelectProduct.js”拖拽而来
	 */
	var ProductComponent = Backbone.View.extend({
		tagName: 'li',
		template: _.template(productComponentTemplate),
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			'click .remove:first': 'handleRemove'
		},
		toggleDone: function() {
			this.model.toggle();
		},
		handleRemove: function(e) {
			e.preventDefault();
			this.model.set('done', false);
		}
		
	});

	/**
	 * 商品组合，一种组合组件，由头部的通栏图片、底部的左窄右宽布局的组件组成
	 */
	var ProductGroup2 = Backbone.View.extend({
		tagName: 'div',
		className: 'images-max',
		template: _.template(template),
		initialize: function() {
			var self = this;
			MainStore.addProductSelectedEventListener(function(module, product) {
				if (self.model.id == module.id) {
					self._updateProduct(product);
				}
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$products = this.$('.dp-goodsList');
			this._initProducts();
			return this;
		},
		events: {
			'click .remove': '_handleRemove',
			'click a': '_handleClickProduct'
		},
		_initProducts: function() {
			var products = this.model.get('products');
			for (var i = 0; i < products.length; i++) {
				var product = new ProductModel(products[i]);
				product.set('index', i);
				var productView = new ProductComponent({model: product});
				this.$products.append(productView.render().el);
				(function(module, view) {
					view.$el.droppable({
						  hoverClass: 'drop-hover',
						  scope: 'product',
						  drop: function(event, ui) {
							  var model = ui.helper.data('model');
							  var index = view.model.get('index');
							  model.index = index;
							  model.image = model.image  + '?imageView2/2/w/350';
							  view.model.set(model);
							  MainStore.emitProductSelectedEvent(module, view.model);
						  }
					});
				})(this.model, productView);
			}
		},
		_updateProduct: function(product) {
			var index = product.get('index') || 0;
			var products = this.model.get('products');
			products[index] = product.toJSON();
			this.model.save({products: products});
			Backbone.trigger('modules_update', this.model);
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleClickProduct: function(e) {
			e.preventDefault(); 
			toastr.remove();
			toastr.warning('在这里不能访问商品详情哦');
		}
	});

	module.exports = ProductGroup2;


/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header-style-1\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"images-max-content\">\r\n      \t<div class=\"w1200  m-style\">\r\n              <ul class=\"dp-goodsList\">\r\n                                    \r\n              </ul>\r\n         </div>\r\n</div>\r\n";

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<% if (null != productId) { %>\r\n\t<a target=\"_blank\" href=\"<%= detailUrl %>\">\r\n\t\t<span class=\"a\"><img src=\"<%= image %>\" ></span>\r\n\t\t<span class=\"b\"></span>\r\n\t\t<span class=\"c m10top\"><%= title %></span>\r\n\t\t<span class=\"d\">￥<%= actPrice %></span>\r\n\t\t<a target=\"_blank\" href=\"<%= detailUrl %>\" class=\"e m10top\" >立即购买></a>\r\n\t</a>\r\n<% } else {%>\r\n\t<span class=\"a\"><img src=\"http://design.vinuxpost.com/images/design/blank.jpg\" ></span>\r\n\t<span class=\"b\"></span>\r\n\t<span class=\"c m10top\">空</span>\r\n\t<span class=\"d\">￥0.00</span>\r\n\t<a href=\"javascript:void(0);\" class=\"e m10top\" >立即购买></a>\r\n<%}%>\r\n";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(42),
		productComponentTemplate = __webpack_require__(43);
	var ProductModel = __webpack_require__(12),
	    MainStore = __webpack_require__(6),
	    MainAction = __webpack_require__(8);

	/**
	 * 商品组件，每个商品组件包括固定的图片、标题、价格、实际价格、国二比例
	 * 每个组件都包含一个“删除”操作，点击删除，不会将该组件删除，只会重新渲染该组件
	 * 商品组件的具体内容由“选择商品组件#./SelectProduct.js”拖拽而来
	 */
	var ProductComponent = Backbone.View.extend({
		tagName: 'li',
		template: _.template(productComponentTemplate),
		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		events: {
			'click .remove:first': 'handleRemove'
		},
		toggleDone: function() {
			this.model.toggle();
		},
		handleRemove: function(e) {
			e.preventDefault();
			this.model.set('done', false);
		}
		
	});

	/**
	 * 商品组合，一种组合组件，由头部的通栏图片、底部的左窄右宽布局的组件组成
	 */
	var ProductGroup3 = Backbone.View.extend({
		tagName: 'div',
		className: 'images-max',
		template: _.template(template),
		initialize: function() {
			var self = this;
			MainStore.addProductSelectedEventListener(function(module, product) {
				if (self.model.id == module.id) {
					self._updateProduct(product);
				}
			});
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$products = this.$('.dp-goodsList');
			this._initProducts();
			return this;
		},
		events: {
			'click .remove': '_handleRemove',
			'click a': '_handleClickProduct'
		},
		_initProducts: function() {
			var products = this.model.get('products');
			for (var i = 0; i < products.length; i++) {
				var product = new ProductModel(products[i]);
				product.set('index', i);
				var productView = new ProductComponent({model: product});
				this.$products.append(productView.render().el);
				(function(module, view) {
					view.$el.droppable({
						  hoverClass: 'drop-hover',
						  scope: 'product',
						  drop: function(event, ui) {
							  var model = ui.helper.data('model');
							  var index = view.model.get('index');
							  model.index = index;
							  model.image = model.image  + '?imageView2/2/w/350';
							  view.model.set(model);
							  MainStore.emitProductSelectedEvent(module, view.model);
						  }
					});
				})(this.model, productView);
			}
		},
		_updateProduct: function(product) {
			var index = product.get('index') || 0;
			var products = this.model.get('products');
			products[index] = product.toJSON();
			this.model.save({products: products});
			Backbone.trigger('modules_update', this.model);
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		},
		_handleClickProduct: function(e) {
			e.preventDefault(); 
			toastr.remove();
			toastr.warning('在这里不能访问商品详情哦');
		}
	});

	module.exports = ProductGroup3;


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ibox-header-style-1\">\r\n\t<%if (options) {%>\r\n\t\t<%for (var i = 0; i < options.length; i++) {%>\r\n\t\t\t<button class=\"fa btn btn-xs <%=options[i].icon%> <%=options[i].opt%>\" type=\"button\"><%=options[i].name%></button>\r\n\t\t<%}%>\r\n\t<%}%>\r\n</div>\r\n<div class=\"images-max-content\">\r\n     \t<div class=\"w1200  m-style\">\r\n             <ul class=\"dp-goodsList dp-goodsList2\">\r\n                 \r\n                 \r\n             </ul>\r\n        </div>\r\n</div>\r\n";

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<% if (null != productId) { %>\r\n\t<a target=\"_blank\" href=\"<%= detailUrl %>\">\r\n\t\t<span class=\"a\"><img src=\"<%= image %>\" ></span>\r\n\t\t<span class=\"b m10top\"></span>\r\n\t\t<span class=\"c m10top\"><%= title %></span>\r\n\t\t<span class=\"d\">￥<%= actPrice %></span>\r\n\t\t<a target=\"_blank\" href=\"<%= detailUrl %>\" class=\"e m10top\" >立即购买></a>\r\n\t</a>\r\n<% } else {%>\r\n\t<span class=\"a\"><img src=\"http://design.vinuxpost.com/images/design/blank.jpg\" ></span>\r\n\t<span class=\"b m10top\"></span>\r\n\t<span class=\"c m10top\">空</span>\r\n\t<span class=\"d\">￥0.00</span>\r\n\t<a href=\"javascript:void(0);\" class=\"e m10top\" >立即购买></a>\r\n<%}%>\r\n";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(18);
	var MainAction = __webpack_require__(8),
		MainStore = __webpack_require__(6),
		BeanManager = __webpack_require__(19),
		MainConstants = __webpack_require__(11);

	var BaseModel = __webpack_require__(10),
		ImageModel = __webpack_require__(9);
	var ModuleFactory;
	var ModuleCollection;

	/**
	 * 模板组件
	 * 模板组件一个大的框子，里面预先定义了一些组件，构成了一个组件的组合
	 * 模板的框子是一个宽度100%的布局
	 */
	var Template = Backbone.View.extend({
		tagName: 'div',
		className: 'wax100 ibox ui-draggable',
		template: _.template(template),
		initialize: function() {
			this.subs = [];
			this.$cells = [];
			ModuleFactory = __webpack_require__(2);
			ModuleCollection = BeanManager.getModuleCollection();
		},
		events: {
			'click .remove:first': '_handleRemove'
		},
		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$cells = this.$('.ibox-content:first', this.$el);
	//		this.$cells.css({padding: '0'});
			//渲染子级
			var subs = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: this.model.id});
			for (var i = 0; i < subs.length; i++) {
				var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
				var index = subs[i].get('index');
				var content = $(this.$cells[index]);
				content.append(thisView.render().el);
			}
			
			return this;
		},
		_addView: function(mm) {
			this.subs.push(mm);
		},
		_handleRemove: function() {
			MainAction.removeModule(this.model.id);
			this.remove();
		}
	});

	module.exports = Template;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	var BaseModel = __webpack_require__(10);
		MainConstants = __webpack_require__(11);
	/**
	 * 图片模型，用来描述一个图片所涉及的所有属性
	 */
	var TemplateModel = BaseModel.extend({
		initialize: function() {
			this.set({
		  	  	options: [MainConstants.OPTIONS.OPT_REMOVE]
			});
		}
	});

	module.exports = TemplateModel;

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "[{\r\n\t\"type\": \"template-1\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": null,\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 3095,\r\n\t\t\"padding\": 0\r\n\t},\r\n\t\"options\": [{\r\n\t\t\"opt\": \"remove\",\r\n\t\t\"name\": \"删除\",\r\n\t\t\"icon\": \"btn-danger fa-remove\"\r\n\t}],\r\n\t\"id\": \"<%=id1%>\"\r\n}, {\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 500\r\n\t},\r\n\t\"id\": \"<%=id2%>\"\r\n},\r\n{\r\n\t\"type\": \"component-lunbo\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id2%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"items\": [{\r\n\t\t\"imageUrl\": \"\",\r\n\t\t\"link\": \"\",\r\n\t\t\"product\": {\r\n\t\t\t\r\n\t\t},\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t{\r\n\t\t\"imageUrl\": \"\",\r\n\t\t\"link\": \"\",\r\n\t\t\"product\": {\r\n\t\t\t\r\n\t\t},\r\n\t\t\"openInAnotherWindow\": true\r\n\t},\r\n\t{\r\n\t\t\"imageUrl\": \"\",\r\n\t\t\"link\": \"\",\r\n\t\t\"product\": {\r\n\t\t\t\r\n\t\t},\r\n\t\t\"openInAnotherWindow\": true\r\n\t}],\r\n\t\"options\": [{\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id3%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {},\r\n\t\"id\": \"<%=id4%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id4%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 100\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 100,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id5%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 1624\r\n\t},\r\n\t\"id\": \"<%=id6%>\"\r\n},\r\n{\r\n\t\"type\": \"component-product-group-3\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id6%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"top\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": 100,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"left\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": null,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"products\": [{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t}],\r\n\t\"id\": \"<%=id7%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 745\r\n\t},\r\n\t\"id\": \"<%=id8%>\"\r\n},\r\n{\r\n\t\"type\": \"component-product-group-1\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id8%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"top\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": 100,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"left\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": null,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"products\": [{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t}],\r\n\t\"id\": \"<%=id9%>\"\r\n}]";

/***/ },
/* 47 */
/***/ function(module, exports) {

	module.exports = "[{\r\n\t\"type\": \"template-2\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": null,\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 4878\r\n\t\t\"padding\": 0\r\n\t},\r\n\t\"options\": [{\r\n\t\t\"opt\": \"remove\",\r\n\t\t\"name\": \"删除\",\r\n\t\t\"icon\": \"btn-danger fa-remove\"\r\n\t}],\r\n\t\"id\": \"<%=id1%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id2%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id2%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 269,\r\n\t\t\"width\": 1032\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 269,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id3%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id4%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id4%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 140,\r\n\t\t\"width\": 1242\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 140,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id5%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id6%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id6%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 366,\r\n\t\t\"width\": 1233\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 366,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id7%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id8%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id8%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 459,\r\n\t\t\"width\": 1235\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 459,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id9%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id10%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id10%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 127,\r\n\t\t\"width\": 1240\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 127,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id11%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id12%>\"\r\n},\r\n{\r\n\t\"type\": \"component-product-group-2\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id12%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"top\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": {\r\n\t\t\t\"height\": 100\r\n\t\t},\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": 100,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"left\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": null,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"products\": [{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t}],\r\n\t\"id\": \"<%=id13%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id14%>\"\r\n},\r\n{\r\n\t\"type\": \"component-banner-image\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id14%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": {\r\n\t\t\"height\": 127,\r\n\t\t\"width\": 1240\r\n\t},\r\n\t\"done\": false,\r\n\t\"_url\": null,\r\n\t\"link\": null,\r\n\t\"width\": null,\r\n\t\"height\": 127,\r\n\t\"openInAnotherWindow\": false,\r\n\t\"options\": [{\r\n\t\t\"opt\": \"upload\",\r\n\t\t\"name\": \"上传\",\r\n\t\t\"icon\": \"btn-white fa-upload\"\r\n\t}, {\r\n\t\t\"opt\": \"setting\",\r\n\t\t\"name\": \"设置\",\r\n\t\t\"icon\": \"btn-white fa-gear\"\r\n\t}],\r\n\t\"id\": \"<%=id15%>\"\r\n},\r\n{\r\n\t\"type\": \"box-100\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id1%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"id\": \"<%=id16%>\"\r\n},\r\n{\r\n\t\"type\": \"component-product-group-3\",\r\n\t\"_id\": null,\r\n\t\"vId\": null,\r\n\t\"pId\": \"<%=id16%>\",\r\n\t\"index\": 0,\r\n\t\"flag\": 0,\r\n\t\"style\": null,\r\n\t\"top\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": 100,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"left\": {\r\n\t\t\"_id\": null,\r\n\t\t\"vId\": null,\r\n\t\t\"type\": null,\r\n\t\t\"pId\": null,\r\n\t\t\"index\": 0,\r\n\t\t\"flag\": 0,\r\n\t\t\"style\": null,\r\n\t\t\"done\": false,\r\n\t\t\"_url\": null,\r\n\t\t\"link\": null,\r\n\t\t\"width\": null,\r\n\t\t\"height\": null,\r\n\t\t\"openInAnotherWindow\": false\r\n\t},\r\n\t\"products\": [{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t},\r\n\t{\r\n\t\t\"title\": null,\r\n\t\t\"image\": null,\r\n\t\t\"price\": null,\r\n\t\t\"actPrice\": null,\r\n\t\t\"fund\": null,\r\n\t\t\"productId\": null,\r\n\t\t\"productPk\": null,\r\n\t\t\"memberId\": null,\r\n\t\t\"detailUrl\": null,\r\n\t\t\"index\": 0\r\n\t}],\r\n\t\"id\": \"<%=id17%>\"\r\n}]";

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);

	/**
	 * 全局设置弹出框，可用来全局设置背景色和高度
	 */
	var GlobalSettingModal = Backbone.View.extend({
		el: $('#modal-global-setting'),
		initialize: function() {
			this.colorInput = this.$el.find('input[name=color]');
		},
		events: {
			'click .btn-ok': 'handleOk'
		},
		show: function() {
			this.$el.modal('show');
		},
		handleOk: function() {
			var color = this.colorInput.val();
			$('#page-wrapper').css({
				backgroundColor: color
			});
			
			this.$el.modal('hide');
		}
	});

	module.exports = GlobalSettingModal;


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var MainStore = __webpack_require__(6);

	var reg = {
		url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"
	};

	/**
	 * 带链接图片的设置弹框
	 */
	var SetLinkImageModal = Backbone.View.extend({
		el: $('#modal-setting-link-image'),
		initialize: function() {
			this.$link = this.$el.find('input[name=link]');
			this.$height = this.$el.find('input[name=height]');
			this.$openMode= this.$('select[name=openMode]');
			var that = this;
			MainStore.addSetLinkImageCmdHandler(function(data) {
				that._show(data);
			});
		},
		events: {
			'click .btn-ok': 'handleOk'
		},
		_show: function(module) {
			var self = this;
			this.targetModule = module;
			if (!module.height) {
				this.$('.set-height').hide();
			} else {
				this.$('.set-height').show();
				this.$height.val(module.height);
			}
			this.$link.val(module.link);
			this.$openMode.val(module.openInAnotherWindow ? '0' : '1');
			this.$el.modal('show');
			__webpack_require__(50);
			this.$('form').validationEngine({
				showPrompts: false,
				scroll: false
			});
			
			this.$('form').bind('jqv.field.result', function(event, field, isError, promptText) {
				if (isError) {
					$(field).errorTip(promptText);
				}
			});
		},
		handleOk: function() {
			var link = this.$link.val();
			var height = this.$height.val();
			var openInAnotherWindow = 0 == this.$openMode.val() ? true : false;
			var that = this;
			
			if (this.$('form').validationEngine('validate')) {
				MainStore.emitLinkImageSetSuccessEvent({
					link: link,
					height: height,
					openInAnotherWindow: openInAnotherWindow,
					targetModule: that.targetModule
				});
				this.$el.modal('hide');
			}
		}
	});

	module.exports = SetLinkImageModal;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 错误提示插件
	 * 用于表单验证时提示错误
	 * 该插件依赖于Follow插件来定位提示信息的位置
	 * $input.errorTip('aaaa')
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		__webpack_require__(51),
		__webpack_require__(52);
	    var d = "ui_tips",
	    e = d + "_";
	    $.fn.errorTip = function(msg, options) {
	        var defaults = {
	            unique: !0,
	            align: "center",
	            onShow: $.noop,
	            onHide: $.noop
	        },
	        opts = $.extend({}, defaults, options || {});
	        return $.isFunction(msg) && (msg = msg()), "string" != typeof msg ? this: $(this).each(function(index, item) {
	            if (! (1 == opts.unique && index > 0)) {
	                var $tip, $msg, $arrow, $target = $(this);
	                if (1 == opts.unique && window.errorTip) {
	                	$tip = errorTip.data("trigger", $target);
	                } else if (0 == opts.unique && $target.data("errorTip")) {
	                	$tip = $target.data("errorTip");
	                } else {
	                	$tip = $('<div class="' + e + "x " + e + 'error"></div>').html('<span class="' + e + 'before"></span><i class="' + e + 'after"></i>'),
	                    $(document.body).append($tip.append($msg).append($arrow)),
	                    1 == opts.unique ? window.errorTip = $tip.data("trigger", $target) : $target.data("errorTip", $tip);
	                    var fun_resize = function() {
	                        "none" != $tip.css("display") && ($tip.hide(), opts.onHide.call(($tip.data("trigger") || $target).removeClass("error"), $tip))
	                    };
	                    $(document).bind({
	                        keydown: function(event) {
	                            16 != event.keyCode && 17 != event.keyCode && fun_resize()
	                        },
	                        mousedown: function(event) {
	                            var b = document.activeElement,
	                            c = $tip.data("trigger"),
	                            d = event.target;
	                            b && c && b == d && b == c.get(0) || fun_resize()
	                        }
	                    }),
	                    $(window).bind({
	                        resize: fun_resize
	                    })
	                }
	                $tip.show(),
	                $msg = $tip.find("span"),
	                $arrow = $tip.find("i"),
	                $msg.html(msg);
	                var left = 0;
	                "left" == opts.align ? left = -.5 * $msg.width() + parseInt($msg.css("padding-left")) || 0 : "right" == opts.align ? left = .5 * $msg.width() - parseInt($msg.css("padding-right")) || 0 : "number" == typeof opts.align && (left = opts.align),
	                $arrow.css({
	                    left: left
	                }),
	                $tip.follow($target, {
	                    align: opts.align,
	                    position: "5-7",
	                    edgeAdjust: !1
	                });
	                var zIndex = 1 * $tip.css("zIndex") || 19,
	                nZindex = zIndex;
	                $("body").children().each(function() {
	                    var a;
	                    0 == $(this).hasClass(d) && (a = 1 * $(this).css("zIndex")) && (nZindex = Math.max(a, nZindex))
	                }),
	                nZindex > zIndex && $tip.css("zIndex", nZindex + 1),
	                opts.onShow.call($target.addClass("error valided"), $tip)
	            }
	        })
	    };
	    var ErrorTip = function(a, b, c) {
	        return a.errorTip(b, c),
	        this.el = {
	            trigger: a
	        },
	        this.cl = d,
	        this
	    };
	    return ErrorTip
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 定位插件
	 * 用于元素跟随
	 * $tip.follow(target)
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	    $.fn.follow = function(target, options) {
	        var defaults = {
	            offsets: {
	                x: 0,
	                y: 0
	            },
	            position: "4-1",
	            edgeAdjust: !0
	        },
	        opts = $.extend({}, defaults, options || {});
	        return $(this).each(function() {
	            var self = $(this);
	            if (0 != target.length) {
	                var offset, left, top, realLeft, i, outerHeight = 0,
	                outerWidth = 0,
	                height = self.data("height"),
	                width = self.data("width"),
	                scrollTop = $(window).scrollTop(),
	                scrollLeft = $(window).scrollLeft(),
	                offsetX = parseInt(opts.offsets.x, 10) || 0,
	                offsetY = parseInt(opts.offsets.y, 10) || 0;
	                this.cacheData,
	                height || (height = self.outerHeight()),
	                width || (width = self.outerWidth()),
	                offset = target.offset(),
	                outerHeight = target.outerHeight(),
	                outerWidth = target.outerWidth(),
	                left = offset.left,
	                top = offset.top;
	                var r, s = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
	                position = opts.position,
	                u = !1;
	                $.each(s,
	                function(a, b) {
	                    return b === position ? void(u = !0) : void 0
	                }),
	                u || (position = c.position);
	                var v = function(a) {
	                    var b = "bottom";
	                    switch (a) {
		                    case "1-4":
		                    case "5-7":
		                    case "2-3":
		                        b = "top";
		                        break;
		                    case "2-1":
		                    case "6-8":
		                    case "3-4":
		                        b = "right";
		                        break;
		                    case "1-2":
		                    case "8-6":
		                    case "4-3":
		                        b = "left";
		                        break;
		                    case "4-1":
		                    case "7-5":
		                    case "3-2":
		                        b = "bottom"
	                    }
	                    return b
	                },
	                w = function(a) {
	                    return "5-7" === a || "6-8" === a || "8-6" === a || "7-5" === a ? !0 : !1
	                },
	                x = function(a) {
	                    var b = 0,
	                    c = 0;
	                    if ("right" === a) {
	                        if (c = left + outerWidth + width + offsetX, c > $(window).width()) return ! 1
	                    } else if ("bottom" === a) {
	                        if (b = top + outerHeight + height + offsetY, b > scrollTop + $(window).height()) return ! 1
	                    } else if ("top" === a) {
	                        if (b = height + offsetY, b > top - scrollTop) return ! 1
	                    } else if ("left" === a && (c = width + offsetX, c > left)) return ! 1;
	                    return ! 0
	                };
	                r = v(position),
	                opts.edgeAdjust && (x(r) ? !
	                function() {
	                    if (!w(position)) {
	                        var a, b = {
	                            top: {
	                                right: "2-3",
	                                left: "1-4"
	                            },
	                            right: {
	                                top: "2-1",
	                                bottom: "3-4"
	                            },
	                            bottom: {
	                                right: "3-2",
	                                left: "4-1"
	                            },
	                            left: {
	                                top: "1-2",
	                                bottom: "4-3"
	                            }
	                        },
	                        c = b[r];
	                        if (c) for (a in c) x(a) || (position = c[a])
	                    }
	                } () : !
	                function() {
	                    if (w(position)) {
	                        var a = {
	                            "5-7": "7-5",
	                            "7-5": "5-7",
	                            "6-8": "8-6",
	                            "8-6": "6-8"
	                        };
	                        position = a[position]
	                    } else {
	                        var b = {
	                            top: {
	                                left: "3-2",
	                                right: "4-1"
	                            },
	                            right: {
	                                bottom: "1-2",
	                                top: "4-3"
	                            },
	                            bottom: {
	                                left: "2-3",
	                                right: "1-4"
	                            },
	                            left: {
	                                bottom: "2-1",
	                                top: "3-4"
	                            }
	                        },
	                        c = b[r],
	                        d = [];
	                        for (name in c) d.push(name);
	                        position = x(d[0]) || !x(d[1]) ? c[d[0]] : c[d[1]]
	                    }
	                } ());
	                var realPosition = v(position),
	                p0 = position.split("-")[0];
	                switch (realPosition) {
		                case "top":
		                    realTop = top - height,
		                    realLeft = "1" == p0 ? left: "5" === p0 ? left - (width - outerWidth) / 2 : left - (width - outerWidth);
		                    break;
		                case "right":
		                	realLeft = left + outerWidth,
		                	realTop = "2" == p0 ? top: "6" === p0 ? top - (height - outerHeight) / 2 : top - (height - outerHeight);
		                    break;
		                case "bottom":
		                	realTop = top + outerHeight,
		                    realLeft = "4" == p0 ? left: "7" === p0 ? left - (width - outerWidth) / 2 : left - (width - outerWidth);
		                    break;
		                case "left":
		                	realLeft = left - width,
		                	realTop = "2" == p0 ? top: "6" === p0 ? top - (width - outerWidth) / 2 : top - (height - outerHeight)
	                }
	                if (opts.edgeAdjust && w(position)) {
	                    var windowWidth = $(window).width(),
	                    windowHeight = $(window).height();
	                    "7-5" == position || "5-7" == position ? .5 * windowWidth > realLeft - scrollLeft ? 0 > realLeft - scrollLeft && (realLeft = scrollLeft) : realLeft - scrollLeft + width > windowWidth && (realLeft = windowWidth + scrollLeft - width) : .5 * windowHeight > realTop - scrollTop ? 0 > realTop - scrollTop && (realTop = scrollTop) : realTop - scrollTop + height > windowHeight && (realTop = windowHeight + scrollTop - height)
	                }
	                "top" == realPosition || "left" == realPosition ? (realLeft -= offsetX, realTop -= offsetY) : (realLeft += offsetX, realTop += offsetY),
	                self.css({
	                    position: "absolute",
	                    left: Math.round(realLeft),
	                    top: Math.round(realTop)
	                }).attr("data-align", position)
	            }
	        })
	    };
	    var f = function(a, b, c) {
	        b.follow(a, c)
	    };
	    return f.prototype.hide = function() {
	        target.remove()
	    },
	    f
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(53);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./tips.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./tips.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".ui_tips[data-title] {\r\n\tposition: relative;\r\n\toverflow: visible;\r\n}\r\n\r\n.ui_tips[data-title]::before,\r\n.ui_tips[data-title]::after {\r\n  position: absolute;\r\n  left: 50%;\r\n  pointer-events: none;\r\n  -webkit-transform: translateX(-50%);\r\n  -ms-transform: translateX(-50%);\r\n  transform: translateX(-50%);\r\n  visibility: hidden; \r\n}\r\n.ui_tips[data-title]::before {\r\n  content: attr(data-title);\r\n  top: -42px;\r\n  max-width: 250px;\r\n  padding: 6px 10px;\r\n  line-height: 18px;\r\n  border-radius: 3px;\r\n  background-color: #373c42;\r\n  text-align: left;\r\n  color: #fff;\r\n  font-size: 12px;\r\n  font-style: normal;\r\n  font-family: 'microsoft yahei';\r\n  white-space: nowrap;\r\n}\r\n.ui_tips[data-title]::after {\r\n  content: '';\r\n  width: 0;\r\n  height: 0;\r\n  overflow: hidden;\r\n  border: 6px solid transparent;\r\n  border-top-color: #373c42;\r\n  top: -12px;\r\n}\r\n.ui_tips[data-title]:hover::before,\r\n.ui_tips[data-title]:hover::after {\r\n  -webkit-transition: visibility .1s .1s;\r\n  transition: visibility .1s .1s;\r\n  visibility: visible;\r\n}\r\n\r\n/* 下面是 IE7 IE8 玩耍的代码 */\r\n.ui_tips .ui_tips_before,\r\n.ui_tips .ui_tips_after {\r\n  display: none;\r\n  position: absolute;\r\n  left: 50%; \r\n  white-space: nowrap;\r\n}\r\n.ui_tips_before {\r\n  top: -42px;\r\n  max-width: 250px;\r\n  padding: 6px 10px;\r\n  line-height: 18px;\r\n  border-radius: 3px;\r\n  background-color: #373c42;\r\n  color: #fff;\r\n  font-size: 12px;\r\n  font-style: normal;\r\n  text-align: left;\r\n  font-family: 'microsoft yahei';\r\n}\r\n.ui_tips_after {\r\n  width: 0;\r\n  height: 0;\r\n  overflow: hidden;\r\n  border: 6px solid transparent;\r\n  border-top-color: #373c42;\r\n  top: -12px;\r\n}\r\n.ui_tips:hover .ui_tips_before,\r\n.ui_tips:hover .ui_tips_after {\r\n  display: block;\r\n}\r\n\r\n/* 下面是JS创建的tips效果 */\r\n.ui_tips_x {\r\n\ttext-align: center;\r\n\tposition: absolute;\r\n\tz-index: 99;\r\n}\r\n.ui_tips_x .ui_tips_before {\r\n\tdisplay: block;\r\n}\r\n.ui_tips_x .ui_tips_after {\r\n\tdisplay: block;\r\n\t*display: inline-block;\r\n\tmargin: auto;\r\n\tposition: relative;\r\n\ttop: 0;\r\n\tleft: 0;\r\n}\r\n\r\n/* 右侧展示的tips效果 */\r\n.ui_tips_rotate {\r\n  margin-left: 10px;\r\n}\r\n.ui_tips_rotate .ui_tips_before {\r\n  max-width: 600px;\r\n}\r\n.ui_tips_rotate .ui_tips_after {\r\n  border-color: transparent #373c42 transparent transparent;\r\n  position: absolute;\r\n  left: -12px; top: 50%;\r\n  margin-top: -6px;\r\n}\r\n\r\n/* 错误提示的tips效果 */\r\n.ui_tips_error:not(.none) {\r\n  -webkit-animation: fadeIn .2s, falldown .2s;\r\n  animation: fadeIn .2s, falldown .2s;\r\n}\r\n.ui_tips_error .ui_tips_before {\r\n  background-color: #f4615c;\r\n}\r\n.ui_tips_error .ui_tips_after {\r\n  border-top-color: #f4615c;\r\n}\r\n\r\n", ""]);

	// exports


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var MainStore = __webpack_require__(6),
		MainConstants = __webpack_require__(11);

	/**
	 * 上传文件的弹出框，现有所有的图片上传都会打开这个弹出框，在这里处理上传
	 * 在调用show方法时，可以传入一些参数：
	 * width：建议上传的图片的宽度
	 * height： 建议上传的图片的高度
	 */
	var UploadModal = Backbone.View.extend({
		el: $('#modal-upload-image'),
		initialize: function() {
			var me = this;
			MainStore.addUploadImageCmdHandler(function(vm) {
				me._show(vm);
			});
			var ratio = window.devicePixelRatio || 1,
			// 缩略图大小
	        	thumbnailWidth = 100 * ratio,
	        	thumbnailHeight = 100 * ratio;
			
			this.$el.on('hidden.bs.modal', function() {
				me.$('.file-item').remove();
				me.$('.tip').html('').parent().removeClass('has-error');
				me.uploader.destroy();
			});
			
			this.$el.on('show.bs.modal', function() {
				if (me.targetModule.height && me.targetModule.width)
					me.$('.tip').text('建议尺寸：'+ me.targetModule.width + '*' + me.targetModule.height);
				
				me.uploader = VUpload.create({
					pick: me.$('.filePicker'),
					auto: false
				});
				
				me.uploader.on('uploadSuccess', function(file, response) {
					if (200 != response.status) {
						toastr.error(response.message);
						$('#'+ file.id).remove();
						return;
					}
					toastr.success('上传成功');
					$('#'+ file.id).remove();
					var imageUrl = MainConstants.IMAGE_ACCESS_SERVER + '/vinuxmedia/' + response.result.fileName;
					MainStore.emitImageUploadSuccess({imageUrl: imageUrl, fileName: response.result.fileName, width: file._info.width, height: file._info.height, targetModule: me.targetModule});
					me.close();
				});
				
				//后面新加入的文件要替换掉原来的，始终保存只有一个文件
				me.uploader.on('beforeFileQueued', function(file) {
					var files = me.uploader.getFiles();
					if (files.length > 0) {
						for (var i = 0; i < files.length; i++) {
							me.uploader.removeFile(files[i].id)
						}
					}
				});
				
				me.uploader.on('fileQueued', function(file) {
					me.$('.tip').html('');
					var $li = me.$('.filePicker').next('.file-item'),
						$img = $li.find('img');
					if (!$img.length) {
						$li = $(
								'<div id="' + file.id + '" class="file-item thumbnail">' +
								'<img>' +
								'<div class="info"></div>' +
								'</div>'
						),
						$img = $li.find('img'),
						$fileName = $li.find('.info');
						me.$('.filePicker').after( $li );
					}

					me.uploader.makeThumb(file, function(error, src) {
				        if ( error ) {
				            $img.replaceWith('<span>不能预览</span>');
				            return;
				        }

				        $img.attr( 'src', src );
				        $fileName.text(file.name)
				    }, thumbnailWidth, thumbnailHeight);
				});
				
				me.uploader.on('uploadStart', function(file) {
					var $msg = $('<div class="msg"></div').text('上传中。。。');
					$( '#'+file.id ).append($msg);
				});
				
				me.uploader.on('uploadError', function(file) {
					$('#'+ file.id).remove();
					toastr.error('上传失败');
				});
				
	//			me.uploader.on('uploadProgress', function(file, percentage) {
	//				  var $li =  $(window.CURRENT_EDIT).find('.progress');
	//				  if (!$li.length) {
	//					  $li = $('<div class="progress progress-striped active"></div>').appendTo($(window.CURRENT_EDIT));
	//				  }
	//				  var $percent = $li.find('.progress-bar');
	//				  if ( !$percent.length ) {
	//					  $percent = $('<div class="progress-bar" role="progressbar" style="width: 0%">' +
	//					          '</div><div class="progress-upload">加载中请稍候...</div>').appendTo($li);
	//				  }
	//				  $percent.css( 'width', percentage * 100 + '%' );
	//			  });
			});
		},
		events: {
			'click .btn-ok': 'handleOk'
		},
		/**
		 * 打开弹出框
		 * data：{
		 * 	modelId: 
		 *  xxxx： 
		 * }
		 */
		_show: function(data) {
			this.targetModule = data;
			this.$el.modal('show');
		},
		close: function() {
			this.$el.modal('hide');
		},
		handleOk: function() {
			if (!this.uploader.getFiles().length > 0) {
				this.$('.tip').html('请选择一张图片').parent().addClass('has-error');
				return;
			}
			this.uploader.upload();
		}
	});

	module.exports = UploadModal;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(56);
	var MainStore = __webpack_require__(6);

	/**
	 * 设置项，每一条对应一个菜单项
	 * 其中，用 0 表示"新窗口打开", 1表示"当前窗口打开"
	 */
	var SettingItemView = Backbone.View.extend({
		tagName: 'tr',
		template: _.template(template),
		render: function() {
			this.$el.html(this.template(this.model));
			this.$name = this.$('input[name=name]');
			this.$link = this.$('input[name=link]');
			this.$openMode = this.$('select[name=openMode]');
			this.$active = this.$('input[name=active]');
			return this;
		},
		events: {
			'blur input[name=name]'     	: '_updateName',
			'blur input[name=link]'			: '_updateLink',
			'change select[name=openMode]'	: '_updateOpenMode',
			'change input[name=active]'     : '_updateActiveState',
			'click .remove'					: '_handleRemove'
		},
		_updateName: function() {
			this.model.name = this.$name.val();
		},
		_updateLink: function() {
			this.model.link = this.$link.val();
		},
		_updateOpenMode: function() {
			this.model.openInAnotherWindow = 0 == this.$openMode.val() ? true : false;
		},
		_updateActiveState: function() {
			this.model.active = 'on' == this.$active.val() ? true : false;
			Backbone.trigger('setNavBar_activeStateChanged', this.model);
		},
		_handleRemove: function() {
			this.model.flag = -1;
			this.$el.remove();
		}
	});

	/**
	 * 设置导航条的弹出框
	 * 可以设置导航名称、地址、打开方式、排序等
	 */
	var SetNavBarComponent = Backbone.View.extend({
		el: '#modal-setting-nav-bar',
		initialize: function() {
			var that = this;
			MainStore.addSetNavBarCmdHandler(function(targetModule) {
				that._show(targetModule);
			});
			Backbone.on('setNavBar_activeStateChanged', this._onActiveStateChanged, this);
		},
		events: {
			'click .btn-ok': 'handleOk'
		},
		_show: function(targetModule) {
			this.targetModule = targetModule;
			this.$el.modal('show');
			this.$('tbody').empty();
			this.targetItems = this.targetModule.items;
			for (var i = 0; i < this.targetItems.length; i++) {
				var model = this.targetItems[i];
				model.index = (i + 1);
				var itemView = new SettingItemView({model: model});
				this.$('tbody').append(itemView.render().el);
			}
		},
		handleOk: function() {
			var newItems = _.filter(this.targetItems, function(each) {
				return -1 != each.flag;
			});
			this.targetModule.items = newItems;
			MainStore.emitNavBarSetFinished(this.targetModule);
			this.$el.modal('hide');
		},
		//默认选中状态的导航项只能有一个，当其中一个设置为默认选中时，要把其他导航项的active属性设置为false
		_onActiveStateChanged: function(item) {
			var items = this.targetItems;
			for (var i = 0; i < items.length; i++) {
				if (item != items[i]) {
					items[i].active = false;
				}
			}
		}
	});

	module.exports = SetNavBarComponent;

/***/ },
/* 56 */
/***/ function(module, exports) {

	module.exports = "<td><input type=\"text\" class=\"form-control edit\" name=\"name\" value=\"<%= name%>\" maxlength=\"10\"/></td>\r\n<td>\r\n\t<input type=\"text\" class=\"form-control edit\" name=\"link\" value=\"<%= link%>\"/>\r\n</td>\r\n<td>\r\n\t<select class=\"form-control\" name=\"openMode\">\r\n\t\t<%if (openInAnotherWindow) {%>\r\n\t\t\t<option value=\"0\" selected=\"selected\">新窗口打开</option>\r\n\t  \t\t<option value=\"1\">当前窗口打开</option>\r\n\t\t<%} else {%>\r\n\t\t\t<option value=\"0\">新窗口打开</option>\r\n\t \t \t<option value=\"1\" selected=\"selected\">当前窗口打开</option>\r\n\t\t<%}%>\r\n\t  \r\n\t</select>\r\n</td>\r\n<td>\r\n\t<input type=\"radio\" name=\"active\" <%if (active) {%> checked=\"checked\" <%}%>/> \r\n</td>\r\n<td>\r\n\t <span class=\"btn btn-white btn-xs remove\" type=\"button\"><i class=\"fa fa-times\"></i></span>\r\n</td>";

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var MainStore = __webpack_require__(6),
		MainConstants = __webpack_require__(11);
		
	$.fn._propAttr = $.fn.prop || $.fn.attr;

	var LunboItemView = Backbone.View.extend({
		template: _.template('<a class="list-group-item">第<%=index%>张</a>'),
		initialize: function() {
			
		},
		render: function() {
			this.$el.html(this.template(this.model));
			return this;
		},
		events: {
			'click': '_handleClick'
		},
		_handleClick: function() {
			this.model.current = true;
			$('#modal-setting-carousel .list-group-item.active').removeClass('active');
			this.$('.list-group-item').addClass('active');
			Backbone.trigger('setLunbo_currentItemChanged', this.model);
		}
	});

	/**
	 * 商品查询数据模型
	 */
	var ProductQueryModel = new Backbone.Model;

	/**
	 * 商品项
	 */
	var ProductItemView = Backbone.View.extend({
		tagName: 'li',
		template: _.template('<span class="a"><a href="javascript:void(0);"><img src="<%=photoUrl%>"></a></span>' + 
	            '<span class="b"><a href="javascript:void(0);"> <label><%=name%></label></a></span>' + 
	            '<span class="c"><label class="c-1">￥<%=price%></label></span>'),
		render: function() {
			this.model.photoUrl = MainConstants.IMAGE_GOODS_ACCESS_SERVER + '/' + this.model.bigUrl || this.model.photoUrl;
			this.$el.html(this.template(this.model));
			return this;
		},
		events: {
			'click': '_handleClick'
		},
		_handleClick: function() {
			$('#edit-lunbo-item-area .product-list').find('.active').removeClass('active');
			this.$el.addClass('active');
			Backbone.trigger('set_lunbo_product_selected', this.model);
		}
	});

	/**
	 * 商品查询参数
	 */
	var productQueryParams = {
		pageNo: 1,
		pageSize: 12,
		productName: ''
	};

	/**
	 * 编辑区域
	 */
	var EditLunboItemView = Backbone.View.extend({
		el: '#edit-lunbo-item-area',
		initialize: function() {
			this.editImageArea = this.$('.edit-image');
			this.loaded = false;
			this.$loading = this.$('.loading');
			this.$productName = this.$('input[name=productName]');
			Backbone.on('setLunbo_currentItemChanged', this._setCurrentItem, this);
			var self = this;
			$('.edit-lunbo-item-link-product').on('shown.bs.tab', function (e) {
				if (!self.loaded) {
					self._loadProduct();
				}
			});
		},
		events: {
			'click .search': '_search',
			'keypress #set-lunbo-productname':  '_handleKeypress'
		},
		_setCurrentItem: function(item) {
			if (item.imageUrl) {
				this.$('.container img').attr('src', item.imageUrl);
			} else {
				this.$('.container img').attr('src', '');
			}
			
			if (item.link) {
				this.$('.link').val(item.link);
			} else {
				this.$('.link').val('');
			}
			
	//		if (item.openInAnotherWindow) {
	//			this.$('input[name=openMode]')._propAttr('checked', true);
	//		} else {
	//			this.$('input[name=openMode]')._propAttr('checked', false);
	//		}
			
	//		if (item.product) {
	//			this.$productName.val(item.product.name)
	//		} else {
	//			this.$productName.val('')
	//		}
			
		},
		_search: function() {
			productQueryParams.pageNo = 1;
			productQueryParams.productName = this.$productName.val();
			this._loadProduct();
		},
		_loadProduct: function(pageNo) {
			var self = this;
			this.$('.product-list').empty();
			$.ajax({
				url: '/goods/seller/goods.vhtml',
				type: 'post',
				dataType: 'json',
				data: productQueryParams,
				beforeSend: function() {
					self.$loading.show();
				},
				success: function(res) {
					var arr = [];
					var goodsList = res.result.goodsList;
					self._addProducts(goodsList);
					var pageInfo = res.result.pageInfo;
					if (pageInfo) {
						self._loadPagination(pageInfo.pageNo, pageInfo.pageSize, pageInfo.totalPage);
					}
				},
				complete: function() {
					self.$loading.hide();
				}
			});
		},
		_addProducts: function(goodsList) {
			if (goodsList && goodsList.length > 0) {
				this.loaded = true;
				for (var i = 0; i < goodsList.length; i++) {
					var each = goodsList[i];
					if (0 == each.onsale) {
						var productView = new ProductItemView({model: each});
						this.$('.product-list').append(productView.render().el);
					}
				}
			} else {
				this.$('.product-list').empty();
			}
		},
		_loadPagination: function(pageNo, pageSize, totalPage) {
			var self = this;
	//		this.$('.pagination').pagination(pageNo, pageSize, totalPage, function(pageNo) {
	//			self._loadProduct(pageNo);
	//		});
			__webpack_require__.e/* require */(2, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(58)]; (function(Pagination) {
				Pagination.init(self.$('.pagination'), {
					pageNo: pageNo,
					pageSize: pageSize,
					totalPage: totalPage,
					callback: function(pageNo) {
						productQueryParams.pageNo = pageNo;
						self._loadProduct(pageNo);
					}
				});
			}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
		},
		_handleKeypress: function(e) {
			if (e.keyCode != 13) return;
		    if (!this.$productName.val()) return;
		    this._loadProduct();
		
		}
	});

	/**
	 * 设置轮播图组件
	 * 可以添加、上传图片、编辑文字、设置链接、设置背景等
	 * 
	 */
	var SetLunboModal = Backbone.View.extend({
		el: '#modal-setting-carousel',
		initialize: function() {
			var self = this;
			this.MAX_ITEMS_LENGTH = 5;
			this.editLunboItemView = new EditLunboItemView();
			this.$link = this.$('.link');
			this.$openMode = this.$('input[name=openMode]');
			MainStore.addSetLunboCmdHandler(function(model) {
				self._show(model);
			});
			
			Backbone.on('setLunbo_currentItemChanged', this._setCurrentItem, this);
			
			Backbone.on('set_lunbo_product_selected', this._setItemUrl, this);
			
			this.$el.on('hidden.bs.modal', function() {
				self.uploader.destroy();
			});
			
			this.$el.on('show.bs.modal', function() {
				if (self.option)
					self.$el.find('.tip').text('建议尺寸：'+ self.option.width + '*' + self.option.height);
				
				self.uploader = VUpload.create({
					pick: self.$('.filePicker'),
					auto: true
				});
				
				self.uploader.on('uploadSuccess', function(file, response) {
					if (200 != response.status) {
						toastr.error(response.message);
						return;
					}
					toastr.remove();
					toastr.success('上传成功');
					var imageUrl = MainConstants.IMAGE_ACCESS_SERVER + '/vinuxmedia/' + response.result.fileName;
	//				self.$('.container img').css({
	//					backgroundImage: 'url(' + imageUrl + ')'
	//				});
					self.$('.container img').attr('src', imageUrl);
					self.currentItem.imageUrl = imageUrl;
				});
				
				self.uploader.on('uploadStart', function(file) {
					toastr.info('上传中...');
				});
				
				self.uploader.on('uploadError', function(file) {
					toastr.error('上传失败');
				});
				
			});
			
		},
		events: {
			'click .btn-ok': '_handleOk',
			'click .btn-add': '_handleAdd',
			'blur .link': '_handleLink',
			'change input[name=openMode]': '_handleOpenMode'
		},
		_show: function(module) {
			this.targetModule = module;
			this.$('.lunbo-items').empty();
			this.$el.modal('show');
			this._addItems();
		},
		_handleOk: function() {
			this.$el.modal('hide');
			MainStore.emitLunboSetFinished(this.targetModule);
		},
		_handleAdd: function() {
			var items = this.targetModule.get('items');
			if (items && items.length >= this.MAX_ITEMS_LENGTH) {
				toastr.remove();
				toastr.error('您最多可以添加的轮播图数量是' + this.MAX_ITEMS_LENGTH + '个！');
				return;
			}
			var item = {
				imageUrl: '',
				link: '', //地址
				openInAnotherWindow: false,
				index: (items.length + 1)
			};
			items.push(item);
			var itemView = new LunboItemView({model: item});
			this.$('.lunbo-items').append(itemView.render().el);
			this.targetModule.set('items', items);
		},
		_addItems: function() {
			var self = this;
			var items = this.targetModule.get('items');
			var firstItemView;
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				item.index = (i + 1);
				var itemView = new LunboItemView({model: item});
				self.$('.lunbo-items').append(itemView.render().el);
				if (0 == i) {
					firstItemView = itemView;
				}
			}
			firstItemView.$el.trigger('click');
		},
		_setCurrentItem: function(item) {
			this.currentItem = item;
		},
		_setItemUrl: function(product) {
			var link = MainConstants.URL_GOODS_DEATIL_PREFIX + '?memberId=${memberId}&productId=' + product.productId + '&productPk=' + product.productPk;
			this.currentItem.link = link;
			var p = this.currentItem.product || {};
			p.productId = product.productId;
			p.productPk = product.productPk;
			p.name = product.name;
			this.currentItem.product = p;
		},
		_handleLink: function() {
			var link = this.$link.val();
			this.currentItem.link = link;
		},
		_handleOpenMode: function() {
			console.log(this.$openMode.val());
			this.currentItem.openInAnotherWindow = 'on' == this.$openMode.val() ? true : false;
		}
	});

	module.exports = SetLunboModal;

/***/ },
/* 58 */,
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var MainStore = __webpack_require__(6);

	var SetBoxModal = Backbone.View.extend({
		el: $('#modal-set-box'),
		initialize: function() {
	//		this.colorInput = this.$el.find('input[name=color]');
			this.heightInput = this.$el.find('input[name=height]');
			var self = this;
			MainStore.addSetBoxCmdHandler(function(data) {
				self._show(data);
			})
		},
		events: {
			'click .btn-ok': '_handleOk'
		},
		_show: function(module) {
			var self = this;
			this.targetModuleId = module.id;
			this.heightInput.val(module.height);
			this.$el.modal('show');
		},
		_handleOk: function() {
			var self = this;
	//		var color = this.colorInput.val();
			var height = this.heightInput.val();
			MainStore.emitBoxSetSuccessEvent({
				height: height,
				targetModuleId: self.targetModuleId
			});
			this.$el.modal('hide');
		}
	});

	module.exports = SetBoxModal;

/***/ },
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var Backbone = __webpack_require__(1);
	Backbone.$ = __webpack_require__(4);
	var template = __webpack_require__(64),
		ModuleFactory = __webpack_require__(2),
		MainStore = __webpack_require__(6);

	var LeftMenu = Backbone.View.extend({
		el: $('#side-menu'),
		template: _.template(template),
		render: function() {
			this.$el.append(this.template(this.model));
			this.$('.panel-item-layout').draggable({
				connectToSortable: '#page-wrapper',
				helper: function() {
					var type = $(this).data('type');
					var view = ModuleFactory.create(type);
					MainStore.setCurrentEditModule(view.model);
					return view.render().el;
				},
				handle: '.drag',
				drag: function(e, t) {
					t.helper.width(400);
				},
				stop: function(e, t) {
					t.helper.height('');
					t.helper.width('');
				}
			});
			
			this.$('.panel-item-template').draggable({
				connectToSortable: '#page-wrapper',
				helper: function() {
					var type = $(this).data('type');
					var view = ModuleFactory.create(type);
					MainStore.setCurrentEditModule(view.model)
					return view.render().el;
				},
				handle: ".drag",
				drag: function(e, t) {
					t.helper.width(400);
				},
				stop: function(e, t) {
					t.helper.height('');
					t.helper.width('');
				}
			});

			this.$('.panel-item-component').draggable({
			    connectToSortable: '.ibox-content',
			    helper: function() {
			    	var type = $(this).data('type');
			    	var view = ModuleFactory.create(type);
			    	MainStore.setCurrentEditModule(view.model);
	//		    	return view.render().el;
			    	return '<div>' + $(this).text() + '</div>';
			    },
			    handle: '.drag',
				drag: function(e, t) {
	//				t.helper.width('auto')
				},
				stop: function(e, t) {
					t.helper.height('');
					t.helper.width('');
				}
			});
			
			this.$el.metisMenu();
			this.$('li').has('ul').children('a').off('click');
		}
	});

	module.exports = LeftMenu;

/***/ },
/* 64 */
/***/ function(module, exports) {

	module.exports = "<%for (var i = 0; i < menus.length; i++) {%>\r\n\t<li> \r\n\t\t<a href=\"javascript: void(0);\"><i class=\"fa fa-th-large z16\"></i> <span class=\"nav-label\"><%=menus[i].name%></span></a>\r\n\t\t<ul class=\"nav nav-second-level\">\r\n\t\t\t<%var subs = menus[i].subs;%>\r\n\t\t\t<%for (var j = 0; j < subs.length; j++) {%>\r\n\t\t\t\t<li class=\"panel-item-<%=menus[i].type%> ui-draggable\" data-type=\"<%=subs[j].type%>\">\r\n\t\t\t\t\t\t<a class=\"drag\"><%=subs[j].name%></a>\r\n\t\t\t\t</li>\r\n\t\t\t<%}%>\r\n\t\t</ul>\r\n\t</li>\r\n<%}%>";

/***/ }
/******/ ]);