var Backbone = require('backbone');
Backbone.$ = require('jquery');
var MainStore = require('../../store/MainStore'),
	MainConstants = require('../../constants/MainConstants');
	
$.fn._propAttr = $.fn.prop || $.fn.attr;

var LunboItemView = Backbone.View.extend({
	template: _.template('<a class="list-group-item">第<%=index%>张</a>'),
	initialize: function() {
		
	},
	render: function() {
		this.$el.html(this.template(this.model));
		return this;
	},
	events: {
		'click': '_handleClick'
	},
	_handleClick: function() {
		this.model.current = true;
		$('#modal-setting-carousel .list-group-item.active').removeClass('active');
		this.$('.list-group-item').addClass('active');
		Backbone.trigger('setLunbo_currentItemChanged', this.model);
	}
});

/**
 * 商品查询数据模型
 */
var ProductQueryModel = new Backbone.Model;

/**
 * 商品项
 */
var ProductItemView = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<span class="a"><a href="javascript:void(0);"><img src="<%=photoUrl%>"></a></span>' + 
            '<span class="b"><a href="javascript:void(0);"> <label><%=name%></label></a></span>' + 
            '<span class="c"><label class="c-1">￥<%=price%></label></span>'),
	render: function() {
		this.model.photoUrl = MainConstants.IMAGE_GOODS_ACCESS_SERVER + '/' + this.model.bigUrl || this.model.photoUrl;
		this.$el.html(this.template(this.model));
		return this;
	},
	events: {
		'click': '_handleClick'
	},
	_handleClick: function() {
		$('#edit-lunbo-item-area .product-list').find('.active').removeClass('active');
		this.$el.addClass('active');
		Backbone.trigger('set_lunbo_product_selected', this.model);
	}
});

/**
 * 商品查询参数
 */
var productQueryParams = {
	pageNo: 1,
	pageSize: 12,
	productName: ''
};

/**
 * 编辑区域
 */
var EditLunboItemView = Backbone.View.extend({
	el: '#edit-lunbo-item-area',
	initialize: function() {
		this.editImageArea = this.$('.edit-image');
		this.loaded = false;
		this.$loading = this.$('.loading');
		this.$productName = this.$('input[name=productName]');
		Backbone.on('setLunbo_currentItemChanged', this._setCurrentItem, this);
		var self = this;
		$('.edit-lunbo-item-link-product').on('shown.bs.tab', function (e) {
			if (!self.loaded) {
				self._loadProduct();
			}
		});
	},
	events: {
		'click .search': '_search',
		'keypress #set-lunbo-productname':  '_handleKeypress'
	},
	_setCurrentItem: function(item) {
		if (item.imageUrl) {
			this.$('.container img').attr('src', item.imageUrl);
		} else {
			this.$('.container img').attr('src', '');
		}
		
		if (item.link) {
			this.$('.link').val(item.link);
		} else {
			this.$('.link').val('');
		}
		
//		if (item.openInAnotherWindow) {
//			this.$('input[name=openMode]')._propAttr('checked', true);
//		} else {
//			this.$('input[name=openMode]')._propAttr('checked', false);
//		}
		
//		if (item.product) {
//			this.$productName.val(item.product.name)
//		} else {
//			this.$productName.val('')
//		}
		
	},
	_search: function() {
		productQueryParams.pageNo = 1;
		productQueryParams.productName = this.$productName.val();
		this._loadProduct();
	},
	_loadProduct: function(pageNo) {
		var self = this;
		this.$('.product-list').empty();
		$.ajax({
			url: '/goods/seller/goods.vhtml',
			type: 'post',
			dataType: 'json',
			data: productQueryParams,
			beforeSend: function() {
				self.$loading.show();
			},
			success: function(res) {
				var arr = [];
				var goodsList = res.result.goodsList;
				self._addProducts(goodsList);
				var pageInfo = res.result.pageInfo;
				if (pageInfo) {
					self._loadPagination(pageInfo.pageNo, pageInfo.pageSize, pageInfo.totalPage);
				}
			},
			complete: function() {
				self.$loading.hide();
			}
		});
	},
	_addProducts: function(goodsList) {
		if (goodsList && goodsList.length > 0) {
			this.loaded = true;
			for (var i = 0; i < goodsList.length; i++) {
				var each = goodsList[i];
				if (0 == each.onsale) {
					var productView = new ProductItemView({model: each});
					this.$('.product-list').append(productView.render().el);
				}
			}
		} else {
			this.$('.product-list').empty();
		}
	},
	_loadPagination: function(pageNo, pageSize, totalPage) {
		var self = this;
//		this.$('.pagination').pagination(pageNo, pageSize, totalPage, function(pageNo) {
//			self._loadProduct(pageNo);
//		});
		require(['../../widget/pagination/Pagination'], function(Pagination) {
			Pagination.init(self.$('.pagination'), {
				pageNo: pageNo,
				pageSize: pageSize,
				totalPage: totalPage,
				callback: function(pageNo) {
					productQueryParams.pageNo = pageNo;
					self._loadProduct(pageNo);
				}
			});
		});
	},
	_handleKeypress: function(e) {
		if (e.keyCode != 13) return;
	    if (!this.$productName.val()) return;
	    this._loadProduct();
	
	}
});

/**
 * 设置轮播图组件
 * 可以添加、上传图片、编辑文字、设置链接、设置背景等
 * 
 */
var SetLunboModal = Backbone.View.extend({
	el: '#modal-setting-carousel',
	initialize: function() {
		var self = this;
		this.MAX_ITEMS_LENGTH = 5;
		this.editLunboItemView = new EditLunboItemView();
		this.$link = this.$('.link');
		this.$openMode = this.$('input[name=openMode]');
		MainStore.addSetLunboCmdHandler(function(model) {
			self._show(model);
		});
		
		Backbone.on('setLunbo_currentItemChanged', this._setCurrentItem, this);
		
		Backbone.on('set_lunbo_product_selected', this._setItemUrl, this);
		
		this.$el.on('hidden.bs.modal', function() {
			self.uploader.destroy();
		});
		
		this.$el.on('show.bs.modal', function() {
			if (self.option)
				self.$el.find('.tip').text('建议尺寸：'+ self.option.width + '*' + self.option.height);
			
			self.uploader = VUpload.create({
				pick: self.$('.filePicker'),
				auto: true
			});
			
			self.uploader.on('uploadSuccess', function(file, response) {
				if (200 != response.status) {
					toastr.error(response.message);
					return;
				}
				toastr.remove();
				toastr.success('上传成功');
				var imageUrl = MainConstants.IMAGE_ACCESS_SERVER + '/vinuxmedia/' + response.result.fileName;
//				self.$('.container img').css({
//					backgroundImage: 'url(' + imageUrl + ')'
//				});
				self.$('.container img').attr('src', imageUrl);
				self.currentItem.imageUrl = imageUrl;
			});
			
			self.uploader.on('uploadStart', function(file) {
				toastr.info('上传中...');
			});
			
			self.uploader.on('uploadError', function(file) {
				toastr.error('上传失败');
			});
			
		});
		
	},
	events: {
		'click .btn-ok': '_handleOk',
		'click .btn-add': '_handleAdd',
		'blur .link': '_handleLink',
		'change input[name=openMode]': '_handleOpenMode'
	},
	_show: function(module) {
		this.targetModule = module;
		this.$('.lunbo-items').empty();
		this.$el.modal('show');
		this._addItems();
	},
	_handleOk: function() {
		this.$el.modal('hide');
		MainStore.emitLunboSetFinished(this.targetModule);
	},
	_handleAdd: function() {
		var items = this.targetModule.get('items');
		if (items && items.length >= this.MAX_ITEMS_LENGTH) {
			toastr.remove();
			toastr.error('您最多可以添加的轮播图数量是' + this.MAX_ITEMS_LENGTH + '个！');
			return;
		}
		var item = {
			imageUrl: '',
			link: '', //地址
			openInAnotherWindow: false,
			index: (items.length + 1)
		};
		items.push(item);
		var itemView = new LunboItemView({model: item});
		this.$('.lunbo-items').append(itemView.render().el);
		this.targetModule.set('items', items);
	},
	_addItems: function() {
		var self = this;
		var items = this.targetModule.get('items');
		var firstItemView;
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			item.index = (i + 1);
			var itemView = new LunboItemView({model: item});
			self.$('.lunbo-items').append(itemView.render().el);
			if (0 == i) {
				firstItemView = itemView;
			}
		}
		firstItemView.$el.trigger('click');
	},
	_setCurrentItem: function(item) {
		this.currentItem = item;
	},
	_setItemUrl: function(product) {
		var link = MainConstants.URL_GOODS_DEATIL_PREFIX + '?memberId=${memberId}&productId=' + product.productId + '&productPk=' + product.productPk;
		this.currentItem.link = link;
		var p = this.currentItem.product || {};
		p.productId = product.productId;
		p.productPk = product.productPk;
		p.name = product.name;
		this.currentItem.product = p;
	},
	_handleLink: function() {
		var link = this.$link.val();
		this.currentItem.link = link;
	},
	_handleOpenMode: function() {
		console.log(this.$openMode.val());
		this.currentItem.openInAnotherWindow = 'on' == this.$openMode.val() ? true : false;
	}
});

module.exports = SetLunboModal;