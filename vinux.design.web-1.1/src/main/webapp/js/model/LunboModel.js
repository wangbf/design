var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	MainConstants = require('constants/MainConstants');

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