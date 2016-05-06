var Backbone = require('backbone');
Backbone.$ = require('jquery');

/**
 * 全局设置弹出框，可用来全局设置背景色和高度
 */
var GlobalSettingModal = Backbone.View.extend({
	el: $('#modal-global-setting'),
	initialize: function() {
		this.colorInput = this.$el.find('input[name=color]');
	},
	events: {
		'click .btn-ok': 'handleOk'
	},
	show: function() {
		this.$el.modal('show');
	},
	handleOk: function() {
		var color = this.colorInput.val();
		$('#page-wrapper').css({
			backgroundColor: color
		});
		
		this.$el.modal('hide');
	}
});

module.exports = GlobalSettingModal;
