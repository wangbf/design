var Backbone = require('backbone');
Backbone.$ = require('jquery');
var MainStore = require('../../store/MainStore');

var reg = {
	url: "^(http|https)\\:\\/\\/[a-z0-9\\-\\.]+\\.[a-z]{2,3}(:[a-z0-9]*)?\\/?([a-z0-9\\-\\._\\:\\?\\,\\'\\/\\\\\\+&amp;%\\$#\\=~])*$"
};

/**
 * 带链接图片的设置弹框
 */
var SetLinkImageModal = Backbone.View.extend({
	el: $('#modal-setting-link-image'),
	initialize: function() {
		this.$link = this.$el.find('input[name=link]');
		this.$height = this.$el.find('input[name=height]');
		this.$openMode= this.$('select[name=openMode]');
		var that = this;
		MainStore.addSetLinkImageCmdHandler(function(data) {
			that._show(data);
		});
	},
	events: {
		'click .btn-ok': 'handleOk'
	},
	_show: function(module) {
		var self = this;
		this.targetModule = module;
		if (!module.height) {
			this.$('.set-height').hide();
		} else {
			this.$('.set-height').show();
			this.$height.val(module.height);
		}
		this.$link.val(module.link);
		this.$openMode.val(module.openInAnotherWindow ? '0' : '1');
		this.$el.modal('show');
		require('../../widget/errortip/ErrorTip');
		this.$('form').validationEngine({
			showPrompts: false,
			scroll: false
		});
		
		this.$('form').bind('jqv.field.result', function(event, field, isError, promptText) {
			if (isError) {
				$(field).errorTip(promptText);
			}
		});
	},
	handleOk: function() {
		var link = this.$link.val();
		var height = this.$height.val();
		var openInAnotherWindow = 0 == this.$openMode.val() ? true : false;
		var that = this;
		
		if (this.$('form').validationEngine('validate')) {
			MainStore.emitLinkImageSetSuccessEvent({
				link: link,
				height: height,
				openInAnotherWindow: openInAnotherWindow,
				targetModule: that.targetModule
			});
			this.$el.modal('hide');
		}
	}
});

module.exports = SetLinkImageModal;