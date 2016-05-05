var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	MainConstants = require('constants/MainConstants');

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