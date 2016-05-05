var Backbone = require('backbone');
Backbone.$ = require('jquery');
var MainStore = require('../../store/MainStore');

/**
 * 通栏图片设置弹框
 */
var SetImageModal = Backbone.View.extend({
	el: $('#modal-setting-image-all'),
	initialize: function() {
		this.heightInput = this.$el.find('input[name=height]');
	},
	events: {
		'click .btn-ok': 'handleOk'
	},
	_show: function(model) {
//		this.model = model;
		$('#modal-setting-image-all').modal('show');
	},
	handleOk: function() {
		var height = this.heightInput.val();
		MainStore.emitLinkImageSetSuccessEvent({
			height: height
		});
		this.$el.modal('hide');
		//   margin-top   margin-bottom
	}
});

module.exports = SetImageModal;