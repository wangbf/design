var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../../templates/component/product-group-3/product-group-3.html'),
	productComponentTemplate = require('html!../../../../templates/component/product-group-3/product-3.html');
var ProductModel = require('../../../model/ProductModel'),
    MainStore = require('../../../store/MainStore'),
    MainAction = require('../../../actions/MainAction');

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
