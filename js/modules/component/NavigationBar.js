var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/component/navigation-bar.html');
var MainAction = require('../../actions/MainAction'),
	MainStore = require('../../store/MainStore');

/**
 * 导航项，暂时还没有考虑二级下拉的情况
 */
var NavigationItemView = Backbone.View.extend({
	tagName: 'li',
	template: _.template('<li><a href="<%if (link) {%> <%= link%> <%} else {%>javascript:void(0);<%}%>" target="<%if (openInAnotherWindow) {%>_blank<%} else {%>_self<%}%>"><%= name%></a></li> '),
	render: function() {
		this.$el.html(this.template(this.model));
		if (this.model.active) {
			this.$el.addClass('selected');
		}
		return this;
	}
});

var MAX_ITEMS_LENGTH = 10;

/**
 * 导航条组件
 * 一个导航条由若干个项组成，每个项分别包含名称、地址、打开方式等属性
 * 对应的model为 ../../model/NavigationModel
 * 一级导航项的数量暂时设为10个
 */
var NavigationBar = Backbone.View.extend({
	tagName: 'div',
	className: 'images-max',
	template: _.template(template),
	initialize: function() {
		var self = this;
		MainStore.addNavBarSetFinishedEventListener(function(module) {
			if (self.model.id == module.id) {
				self._update(module.items);
			}
		});
		this.listenTo(this.model, 'update', this.render);
	},
	events: {
		'click .setting': '_handleSetting',
		'click .remove:first': '_handleRemove',
		'click .add': '_handleAdd'
	},
	render: function() {
		this.$el.html(this.template());
		var items = this.model.get('items');
		if (items && items.length > 0) {
			for (var i = 0; i < items.length; i++) {
				var itemView = 	new NavigationItemView({model: items[i]});
				this.$('.dp-nav').append(itemView.render().el);
			}
		}
		return this;
	},
	_handleRemove: function() {
		MainAction.removeModule(this.model.id);
		this.remove();
	},
	_handleSetting: function() {
		//这里有一个问题，在设置导航项时，model的items属性的值在回调_update方法前就已经被修改了
		var self = this;
		MainAction.setNavBar({
			id: self.model.id,
			items: self.model.get('items')
		});
//		MainAction.setNavBar(this.model.get('items'));
	},
	_update: function(items) {
		this.model.save({items: items});
		//如果model中的某个属性是个json数组，这个数组发生改变时，backbone监测不到，无法自动触发change事件
		//所以这里手动触发一次update事件，同时触发一个全局的更新事件
		this.model.trigger('update');
		Backbone.trigger('modules_update', this.model);
	},
	_handleAdd: function() {
		var items = this.model.get('items');
		if(items && items.length >= MAX_ITEMS_LENGTH) {
			toastr.remove();
			toastr.error('您最多可以添加的导航数量是' + MAX_ITEMS_LENGTH + '个！');
			return;
		}
		var item = {
			name: '新菜单',
			link: null,
			openInAnotherWindow: false,
			active: false
		};
		
		items.push(item);
		this._update(items);
		this.model.save({items: items});
		Backbone.trigger('modules_update');
	}
});

module.exports = NavigationBar;