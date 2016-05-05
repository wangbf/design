var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/box/box-1-1.html');
var MainAction = require('../../actions/MainAction'),
	MainStore = require('../../store/MainStore');

/**
 * 宽度100%，左右等分的盒子
 * 盒子内有两个格子，格子中的果子要保证顺序
 * 借用BaseModel中定义的index属性，灵活实现
 * 放到第一个格子的里的果子，index为0(按照数组下标的习惯)
 * 现在不支持一个格子放两个果子，暂时没有时间实现
 * 如果要支持，可以把果子的index定义为"格子顺序-果子顺序"的组合
 * 如：第一个格子的第一个果子，index为0-0, 第二个果子，index为0-1
 */
var Box1_1 = Backbone.View.extend({
	tagName: 'div',
	className: 'wax100 ibox ui-draggable',
	template: _.template(template),
	initialize: function() {
	    //this.listenTo(this.model, 'change', this.render);
	    //this.listenTo(this.model, 'destroy', this.remove);
		this.subs = [];
		this.$cells = [];
	},
	render: function() {
		var self = this;
		this.$el.html(this.template());
		this.$cells = this.$('.row .ibox-content', this.$el);
		
		_.each(this.$cells, function(item, index) {
				$(item).sortable({
					opacity: .35,
					connectWith: '.ibox-content',
					receive: function() {
						var module = MainStore.getCurrentEditModule();
//						var moduleNum = $(this).data('moduleNum') || 0;
						module.set('pId', self.model.id);
						module.set('index', (index));
//						$(this).data('moduleNum', moduleNum + 1);
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
		'click .remove:first': '_handleRemove'
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

module.exports = Box1_1;
