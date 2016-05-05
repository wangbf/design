var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!templates/box/box.html');
var MainAction = require('actions/MainAction'),
	MainStore = require('store/MainStore'),
	BeanManager = require('../../bean/BeanManager'),
	MainConstants = require('constants/MainConstants');

var BaseModel = require('../../model/BaseModel'),
	ImageModel = require('../../model/ImageModel');
var ModuleFactory;
var ModuleCollection;

/**
 * 模板组件
 * 模板组件一个大的框子，里面预先定义了一些组件，构成了一个组件的组合
 * 模板的框子是一个宽度100%的布局
 */
var Template = Backbone.View.extend({
	tagName: 'div',
	className: 'wax100 ibox ui-draggable',
	template: _.template(template),
	initialize: function() {
		this.subs = [];
		this.$cells = [];
		ModuleFactory = require('../ModuleFactory');
		ModuleCollection = BeanManager.getModuleCollection();
	},
	events: {
		'click .remove:first': '_handleRemove'
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$cells = this.$('.ibox-content:first', this.$el);
//		this.$cells.css({padding: '0'});
		//渲染子级
		var subs = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: this.model.id});
		for (var i = 0; i < subs.length; i++) {
			var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
			var index = subs[i].get('index');
			var content = $(this.$cells[index]);
			content.append(thisView.render().el);
		}
		
		return this;
	},
	_addView: function(mm) {
		this.subs.push(mm);
	},
	_handleRemove: function() {
		MainAction.removeModule(this.model.id);
		this.remove();
	}
});

module.exports = Template;