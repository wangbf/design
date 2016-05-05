var Backbone = require('backbone');
var ProductItemTemplate = require('html!../../../templates/component/select-product-item.html'),
	CategoryItemTemplate = require('html!../../../templates/component/select-category-item.html');
var Product = require('../../model/ProductModel'),
	ModuleFactory = require('../ModuleFactory'),
	MainConstants = require('../../constants/MainConstants');

/**
 * 商品查询数据模型
 */
var ProductQueryModel = Backbone.Model.extend({
	defaults: function() {
		return {
			firstQuery: true,
			categoryId: null,
			pageNo: 1,
			productName: null
		};
	}
});

var productQueryModel = new ProductQueryModel;

/**
 * 商品列表view
 */
var ProductBoxView = Backbone.View.extend({
	manage: true,
	el: $('#product-box'),
	initialize: function() {
		var that = this;
	},
	_addAll: function(goodsList) {
		this.$('.msg').hide();
		var pageNo = this.$('.page').val();
		pageNo++;
		this.$('.page').val(pageNo);
		if (goodsList && goodsList.length > 0) {
			for (var i = 0; i < goodsList.length; i++) {
				var each = goodsList[i];
				if (0 != each.onsale) {
					continue;
				}
				var product = {
					title: each.name,
			        image: MainConstants.IMAGE_GOODS_ACCESS_SERVER + '/' + (each.bigUrl || each.photoUrl),
			        price: each.price,
			        actPrice: each.price ? each.price : 0,
			        fund: '${fund!\'0\'}',
			        productId: each.goodsId,
			        productPk: each.productPk,
			        detailUrl: MainConstants.URL_GOODS_DEATIL_PREFIX + '?memberId=${memberId}&productId=' + each.productId + '&productPk=' + each.productPk,
			        done: true,
			        hasAdd: false
				};
				var view = new ProductItemView({model: product});
			    $('#product-list').append(view.render().el);
			}
		} else {
			this.$('.msg').text('没有查询到商品。。。').show();
		}
    },
    loading: function() {
    	this.$('.msg').text('加载中。。。').show();
    }
});

/**
 * 卖家列表view
 */
var CategoryBoxView = Backbone.View.extend({
	el: $('#category-box'),
	initialize: function() {
		this.done = false;
		this.categoryList = [];
		this.setting = {
				view: {
					showIcon: false,
					dblClickExpand: false
				},
				callback: {
					onClick: function(event, treeId, treeNode) {
						productQueryModel.set({
							pageNo: 1, 
							categoryId: treeNode.id,
							categoryName: treeNode.name
						});
					}
				},
				data: {
					simpleData: {
						enable: true,
						idKey: 'id',
						pIdKey: 'pId',
						rootPId: -1
					}
				}
			};
	},
	_toggle: function() {
		var self = this;
		this.$el.toggleClass('active', function() {
			if (!self.done) {
				//手动添加一个根节点
				self.categoryList.push({name: '全部类别', id: -1, open: true});
				var tree = $.fn.zTree.init($('#categoryTree'), self.setting, self.categoryList);
				self.done = true;
			}
		});
	},
	_setData: function(categoryList) {
		this.categoryList = categoryList;
	}
});

/**
 * 选择商品整体view，包含商品列表view、商品类别view
 */
var SelectProductBoxView = Backbone.View.extend({
	el: $('#select-product-box'),
	events: {
		'click #btn-all-category': '_openCategory',
		'click #btn-query-product': '_queryProduct',
		'keypress #productName':  '_handleKeypress'
	},
	initialize: function() {
		var self = this;
		this.$productName = $('#productName');
		this.productBoxView = new ProductBoxView();
		this.categoryBoxView = new CategoryBoxView();
		this.listenTo(productQueryModel, 'change:categoryName', this._handleCategorySelected); //当productQueryModel的categoryName属性变化时，要做一些操作
	    $('#category-box .users-list').slimScroll({
	        height: '320px',
	        railOpacity: 0.4
	    });
	    
	    $('#small-chat').show().click(function () {
		    $(this).children().toggleClass('fa-comments').toggleClass('fa-remove');
		    self._toggle();
		});
	    
	    this.$('.content').slimScroll({
	        height: '234px',
	        railOpacity: 0.4
	    }).bind('slimscroll', function(e, pos) {
	        if ('bottom' == pos) {
	        	var pageNo = productQueryModel.get('pageNo');
	        	pageNo++;
	        	productQueryModel.set('pageNo', pageNo);
	        	self._load();
	        }
	    });
	},
	_openCategory: function(e) {
		$(e.target).children().toggleClass('fa-comments').toggleClass('fa-remove');
		this.categoryBoxView._toggle();
	},
	//选择了类别后，要隐藏掉类别box，并设置类别名称
	_handleCategorySelected: function() {
		this.productBoxView.$el.removeClass('active');
		this.categoryBoxView._toggle();
		this.$('.category-name').html(productQueryModel.get('categoryName'));
	},
	_queryProduct: function() {
		var productName = this.$productName.val();
		productQueryModel.set('productName', productName);
		productQueryModel.set('pageNo', 1);
		$('#product-list').empty();
		this._load();
	},
	/**
	 * 控制选择商品的box隐藏或者显示
	 * 同时，如果还没有触发第一次查询，就在打开时查询商品，以后再
	 * 显示该box时，就不再触发查询了
	 */
	_toggle: function() {
		this.$el.toggleClass('active');
		if (productQueryModel.get('firstQuery')) {
			this._load();
		}
	},
	_load: function(pageNo) {
		var self = this;
		pageNo = pageNo || 1;
		$.ajax({
			url: '/goods/seller/goods.vhtml',
			type: 'post',
			dataType: 'json',
			data: productQueryModel.toJSON(),
			beforeSend: function() {
				self.productBoxView.loading();
			},
			success: function(res) {
				productQueryModel.set('firstQuery', false);
				var arr = [];
				var goodsList = res.result.goodsList;
				var categoryList = res.result.categoryList;
				self.productBoxView._addAll(goodsList);
				self.categoryBoxView._setData(categoryList);
			}
		});
	},
	_handleKeypress: function(e) {
		if (e.keyCode != 13) return;
	    if (!this.$productName.val()) return;
	    this._queryProduct();
	}
});

/**
 * 商品列表项view
 */
var ProductItemView = Backbone.View.extend({
	tagName: 'div',
	className: 'feed-element ui-draggable',
	template: _.template(ProductItemTemplate),
	render: function() {
		this.$el.html(this.template(this.model));
		var that = this;
		this.$el.draggable({
			appendTo: 'body',
			start: function(e, t) {
				t.helper.width(200);
				t.helper.height(200);
			},
			scope: 'product',
			zIndex: 1000,
			helper: function() {
				that.model.done = true;
				var $helper = $('<img src="' + that.model.image + '" class="product-thumb"/>');
				$helper.data('model', that.model);
				return $helper;
			}
		});
	    return this;
	},
	clear: function() {
		this.model.destroy();
	},
	afterRender: function() {
		
	}
});

module.exports = SelectProductBoxView;