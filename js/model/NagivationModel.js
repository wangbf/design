var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	MainConstants = require('constants/MainConstants');

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