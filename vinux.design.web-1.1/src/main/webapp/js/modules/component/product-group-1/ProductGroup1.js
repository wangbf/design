var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../../templates/component/product-group-1/product-group-1.html'),
	productComponentTemplate = require('html!../../../../templates/component/product-group-1/product-1.html');
var ProductModel = require('../../../model/ProductModel'),
    MainStore = require('../../../store/MainStore'),
    MainAction = require('../../../actions/MainAction'),
    MainConstants = require('../../../constants/MainConstants');

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
