var EventEmitter = require('../lib/EventEmitter2/eventemitter2');

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