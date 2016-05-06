var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/box/box.html');
var MainAction = require('actions/MainAction'),
	MainStore = require('store/MainStore'),
	BeanManager = require('../../bean/BeanManager'),
	MainConstants = require('constants/MainConstants');

var ModuleFactory;
var ModuleCollection;
/**
 * 宽度100%的box
 */
var Box100 = Backbone.View.extend({
	tagName: 'div',
	className: 'wax100 ibox ui-draggable',
	template: _.template(template),
	initialize: function() {
//	    this.listenTo(this.model, 'change', this._renderStyle);
	    //this.listenTo(this.model, 'destroy', this.remove);
		this.subs = [];
		var self = this;
		MainStore.addBoxSetSuccessEventListener(function(data) {
			if (self.model.id == data.targetModule.id) {
				var setting = {
					style: {
						backgroundColor: data.color
					}
				};
				self.model.save(setting);
				Backbone.trigger('modules_update', self.model);
			}
		});
		ModuleFactory = require('../ModuleFactory');
		ModuleCollection = BeanManager.getModuleCollection();
	},
	render: function() {
		var self = this;
		this.$el.html(this.template(this.model.toJSON()));
//		this._renderStyle();
		this.$cells = this.$('.ibox-content:first', this.$el);
		_.each(this.$cells, function(item, index) {
			$(item).sortable({
				opacity: .35,
				connectWith: '.ibox-content',
				receive: function(event, ui) {
					var position = ui.helper.position();
					var module = MainStore.getCurrentEditModule();
					module.set('surface', position);
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
		
		var subs = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: this.model.id});
		for (var i = 0; i < subs.length; i++) {
			var index = subs[i].get('index');
			var content = $(this.$cells[index]);
			var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
			content.append(thisView.render().el);
			self._addListenToModule(subs[i]);
			content.sortable('disable');
		}
		return this;
	},
	_renderStyle: function() {
		this.model.get('style') && this.$el.css(this.model.get('style'));
	},
	events: {
		'click .setting': '_handleSetting',
		'click .remove:first': '_handleRemove'
	},
	_handleSetting: function() {
		//暂时不支持
//		var self = this;
//		MainAction.setBox({
//			id: self.model.id
//		});
	},
	_handleRemove: function() {
//		this.$el.remove();
		this.remove();
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

module.exports = Box100;
