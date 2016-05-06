var Backbone = require('backbone');
Backbone.$ = require('jquery');
var MainStore = require('../../store/MainStore');

var SetBoxModal = Backbone.View.extend({
	el: $('#modal-set-box'),
	initialize: function() {
//		this.colorInput = this.$el.find('input[name=color]');
		this.heightInput = this.$el.find('input[name=height]');
		var self = this;
		MainStore.addSetBoxCmdHandler(function(data) {
			self._show(data);
		})
	},
	events: {
		'click .btn-ok': '_handleOk'
	},
	_show: function(module) {
		var self = this;
		this.targetModuleId = module.id;
		this.heightInput.val(module.height);
		this.$el.modal('show');
	},
	_handleOk: function() {
		var self = this;
//		var color = this.colorInput.val();
		var height = this.heightInput.val();
		MainStore.emitBoxSetSuccessEvent({
			height: height,
			targetModuleId: self.targetModuleId
		});
		this.$el.modal('hide');
	}
});

module.exports = SetBoxModal;