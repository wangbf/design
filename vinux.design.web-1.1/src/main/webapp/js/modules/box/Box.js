var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!templates/box/box.html');
var MainAction = require('actions/MainAction'),
	MainStore = require('store/MainStore'),
	BeanManager = require('../../bean/BeanManager'),
	MainConstants = require('constants/MainConstants');

var ModuleFactory;
var ModuleCollection;

/**
 * 通用box
 * 现有所有的box都用这一个view创建
 * 
 * 格子中的组件要保证顺序
 * 借用BaseModel中定义的index属性，灵活实现
 * 放到第一个格子的里的组件，index为0(按照数组下标的习惯)
 * 现在不支持一个格子放两个组件，暂时没有时间实现
 * 如果要支持，可以把组件的index定义为"格子顺序-组件顺序"的组合
 * 如：第一个格子的第一个组件，index为0-0, 第二个组件，index为0-1
 */
var Box = Backbone.View.extend({
	tagName: 'div',
	className: 'ibox ui-draggable',
	template: _.template(template),
	initialize: function() {
		this.listenTo(this.model, 'change', this._renderStyle);
		this.subs = [];
		this.$cells = [];
		var self = this;
		MainStore.addBoxSetSuccessEventListener(function(data) {
			if (self.model.id == data.targetModuleId) {
				var setting = {
						style: {
							height: data.height
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
		var type = this.model.get('type');
		switch(type) {
			case 'box-1260':
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('w1260');
				var temp = require('html!templates/box/box.html')
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.ibox-content:first', this.$el);
				break;
			case 'box-1-1':
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box-1-1.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.row .ibox-content', this.$el);
				break;
			case 'box-4-8':
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box-4-8.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.row .ibox-content', this.$el);
				break;
			case 'box-8-4':
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box-8-4.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.row .ibox-content', this.$el);
				break;
			case 'box-1-1-1':
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box-1-1-1.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.row .ibox-content', this.$el);
				break;
			case 'box-8-4_1_1':
				var height = this.model.get('style').height || 500;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box-8-4_1_1.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.row .ibox-content', this.$el);
				break;
			default: 
				var height = this.model.get('style').height || 160;
				this.model.set('style', {
					height: height
				});
				this.$el.addClass('wax100');
				var temp = require('html!templates/box/box.html');
				this.$el.html(_.template(temp)(this.model.toJSON()));
				this.$cells = this.$('.ibox-content:first', this.$el);
				break;
		}
		
		_.each(this.$cells, function(item, index) {
			$(item).sortable({
				opacity: .35,
				connectWith: '.ibox-content',
				receive: function() {
					var module = MainStore.getCurrentEditModule();
					var view = ModuleFactory.create(module.get('type'), module);
					$(this).find('.ui-draggable-dragging').remove();
					$(this).append(view.render($(this)).el);
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
			content.append(thisView.render(content).el);
			self._addListenToModule(subs[i]);
			content.sortable('disable');
		}
		
		this._renderStyle();
		return this;
	},
	_renderStyle: function() {
//		this.model.get('style') && this.$('.ibox-content:first').css(this.model.get('style'));
	},
	events: {
		'click .ibox-header:first .setting': '_handleSetting',
		'click .ibox-header:first .remove': '_handleRemove'
	},
	_handleSetting: function() {
		var self = this;
		MainAction.setBox({
			id: self.model.id,
			height: self.model.get('style').height
		});
	},
	_handleRemove: function() {
		MainAction.removeModule(this.model.id);
		this.remove();
	},
	_addView: function(mm) {
		this.subs.push(mm);
	},
	_addListenToModule: function(module) {
		var self = this;
		this.listenTo(module, 'change:flag', function() {
			console.log('module flag changed: ' + module.get('flag') + ', index: ' + module.get('index'));
			$(self.$cells[module.get('index')]).sortable('enable');
		});
	}
});

module.exports = Box;