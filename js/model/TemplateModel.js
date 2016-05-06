var Backbone = require('backbone');
var BaseModel = require('./BaseModel');
	MainConstants = require('constants/MainConstants');
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