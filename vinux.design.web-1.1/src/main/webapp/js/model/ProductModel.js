var Backbone = require('backbone');

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