var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!templates/component/banner-image.html');
var MainStore = require('store/MainStore'),
	MainAction = require('actions/MainAction');

/**
 * 通栏布局的图片组件
 */
var BannerImage = Backbone.View.extend({
	tagName: 'div',
	className: 'images-max',
	template: _.template(template),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		var that = this;
		MainStore.addImageUploadSuccessListener(function(data) {
			var imageUrl = data.imageUrl;
			if (that.model.id == data.targetModule.id) {
				var setting = {
						style: {
							height: data.height
						},
						_url: data.imageUrl
					};
				that.model.save(setting);
				Backbone.trigger('modules_update', that.model);
			} 
		});
		MainStore.addLinkImageSetSuccessListener(function(data) {
			if (that.model.id == data.targetModule.id) {
				var setting = {
					style: {
						height: data.height
					},
					link: data.link,
					openInAnotherWindow: data.openInAnotherWindow
				};
				that.model.save(setting);
				Backbone.trigger('modules_update', that.model);
			} 
		});
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	toggleDone: function() {
		this.model.toggle();
	},
	events: {
	  	'click .remove': '_handleRemove',
	  	'click .setting': '_handleSetting',
	  	'click .upload': '_handleUpload'
	},
	_handleSetting: function() {
		var self = this;
		var style = this.model.get('style');
		MainAction.setLinkImage({
			id: self.model.id,
			height: style.height,
			link: self.model.get('link'),
			openInAnotherWindow: self.model.get('openInAnotherWindow')
		});
	},
	_handleRemove: function() {
		MainAction.removeModule(this.model.id);
		this.remove();
	},
	_handleUpload: function() {
		var self = this;
		var style = this.model.get('style');
		MainAction.uploadImage({
			id: self.model.id,
			height: style.height,
			width: style.width
		});
	}
});

module.exports = BannerImage;
