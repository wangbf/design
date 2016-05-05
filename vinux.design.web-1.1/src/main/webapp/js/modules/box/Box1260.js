var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/box/box.html');
var MainAction = require('../../actions/MainAction'),
	MainStore = require('../../store/MainStore');

/**
 * 宽度100%的box
 */
var Box1260 = Backbone.View.extend({
	tagName: 'div',
	className: 'w1260 ibox ui-draggable',
	template: _.template(template),
	initialize: function() {
	    //this.listenTo(this.model, 'change', this.render);
	    //this.listenTo(this.model, 'destroy', this.remove);
		this.subs = [];
	},
	render: function() {
		var self = this;
		this.$el.html(this.template(this.model.toJSON()));
		this.$cells = this.$('.ibox-content:first', this.$el);
		
		_.each(this.$cells, function(item, index) {
			$(item).sortable({
				opacity: .35,
				connectWith: '.ibox-content',
				receive: function() {
					var module = MainStore.getCurrentEditModule();
//					var moduleNum = $(this).data('moduleNum') || 0;
					module.set('pId', self.model.id);
					module.set('index', (index));
//					$(this).data('moduleNum', moduleNum + 1);
					MainAction.addModule(module);
					self._addListenToModule(module);
					$(this).sortable('disable');
				}
			});
		});
		
		for (var i = 0; i < this.subs.length; i++) {
			var model = this.subs[i].model;
			var index = model.get('index');
			var content = $(this.$cells[index]);
			content.append(this.subs[i].render().el);
			self._addListenToModule(model);
			content.sortable('disable');
		}
		return this;
	},
	events: {
		'click .setting': '_handleSetting',
		'click .remove:first': '_handleRemove'
	},
	_handleSetting: function() {
		//参考Box100.js
	},
	_handleRemove: function() {
		this.$el.remove();
		MainAction.removeModule(this.model.id);
	},
	_addView: function(mm) {
		this.subs.push(mm);
	},
	_addListenToModule: function(module) {
		var self = this;
		this.listenTo(module, 'change:flag', function() {
			$(self.$cells[module.get('index')]).sortable('enable');
		});
	}
});

module.exports = Box1260;
