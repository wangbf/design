var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	MainConstants = require('constants/MainConstants');

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