var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/component/setting-nav-bar-item.html');
var MainStore = require('../../store/MainStore');

/**
 * 设置项，每一条对应一个菜单项
 * 其中，用 0 表示"新窗口打开", 1表示"当前窗口打开"
 */
var SettingItemView = Backbone.View.extend({
	tagName: 'tr',
	template: _.template(template),
	render: function() {
		this.$el.html(this.template(this.model));
		this.$name = this.$('input[name=name]');
		this.$link = this.$('input[name=link]');
		this.$openMode = this.$('select[name=openMode]');
		this.$active = this.$('input[name=active]');
		return this;
	},
	events: {
		'blur input[name=name]'     	: '_updateName',
		'blur input[name=link]'			: '_updateLink',
		'change select[name=openMode]'	: '_updateOpenMode',
		'change input[name=active]'     : '_updateActiveState',
		'click .remove'					: '_handleRemove'
	},
	_updateName: function() {
		this.model.name = this.$name.val();
	},
	_updateLink: function() {
		this.model.link = this.$link.val();
	},
	_updateOpenMode: function() {
		this.model.openInAnotherWindow = 0 == this.$openMode.val() ? true : false;
	},
	_updateActiveState: function() {
		this.model.active = 'on' == this.$active.val() ? true : false;
		Backbone.trigger('setNavBar_activeStateChanged', this.model);
	},
	_handleRemove: function() {
		this.model.flag = -1;
		this.$el.remove();
	}
});

/**
 * 设置导航条的弹出框
 * 可以设置导航名称、地址、打开方式、排序等
 */
var SetNavBarComponent = Backbone.View.extend({
	el: '#modal-setting-nav-bar',
	initialize: function() {
		var that = this;
		MainStore.addSetNavBarCmdHandler(function(targetModule) {
			that._show(targetModule);
		});
		Backbone.on('setNavBar_activeStateChanged', this._onActiveStateChanged, this);
	},
	events: {
		'click .btn-ok': 'handleOk'
	},
	_show: function(targetModule) {
		this.targetModule = targetModule;
		this.$el.modal('show');
		this.$('tbody').empty();
		this.targetItems = this.targetModule.items;
		for (var i = 0; i < this.targetItems.length; i++) {
			var model = this.targetItems[i];
			model.index = (i + 1);
			var itemView = new SettingItemView({model: model});
			this.$('tbody').append(itemView.render().el);
		}
	},
	handleOk: function() {
		var newItems = _.filter(this.targetItems, function(each) {
			return -1 != each.flag;
		});
		this.targetModule.items = newItems;
		MainStore.emitNavBarSetFinished(this.targetModule);
		this.$el.modal('hide');
	},
	//默认选中状态的导航项只能有一个，当其中一个设置为默认选中时，要把其他导航项的active属性设置为false
	_onActiveStateChanged: function(item) {
		var items = this.targetItems;
		for (var i = 0; i < items.length; i++) {
			if (item != items[i]) {
				items[i].active = false;
			}
		}
	}
});

module.exports = SetNavBarComponent;