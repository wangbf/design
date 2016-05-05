var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	ImageModel = require('./ImageModel'),
	ProductModel = require('./ProductModel');
	MainConstants = require('constants/MainConstants');
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