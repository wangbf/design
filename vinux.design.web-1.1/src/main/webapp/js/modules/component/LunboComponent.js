var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/component/lunbo1.html');
var MainStore = require('../../store/MainStore'),
	MainAction = require('../../actions/MainAction');

/**
 * 轮播图组件
 */
var LunboComponent = Backbone.View.extend({
	tagName: 'div',
	className: 'images-max',
	template: _.template(template),
	initialize: function() {
		this.listenTo(this.model, 'itemsChange', this.render);
		var self = this;
		MainStore.addLunboSetFinishedEventListener(function(module) {
			if (module.id == self.model.id) {
				self._update(module);
			}
		});
	},
	events: {
		'click .setting': '_handleSetting',
		'click .remove': '_handleRemove',
		'click .lunbo .bd a': '_handleClick'
	},
	render: function() {
		var json = this.model.toJSON();
		json.targetId = this.cid;
		this.$el.html(this.template(json));
		var self = this;
		require(['../../widget/lunbo/Lunbo1'], function(Lunbo) {
			Lunbo.init(self.$('.lunbo'));
			self.$el.height('100%');
			self.$('.images-max-content').height('100%');
			self.$('.lunbo').height('100%');
			self.$('.lunbo .bd').height('100%');
			self.$('.lunbo .bd ul').height('100%');
			self.$('.lunbo .bd ul li').height('100%');
		});
		return this;
	},
	_handleSetting: function() {
		MainAction.setCarousel(this.model);
	},
	_update: function(module) {
		if (module) {
			var items = module.get('items');
			this.model.save({items: items});
			//如果model中的某个属性是个json数组，这个数组发生改变时，backbone监测不到，无法自动触发change事件
			//所以这里手动触发一次自定义的事件
			this.model.trigger('itemsChange');
			Backbone.trigger('modules_update', this.model);
		}
	},
	_handleRemove: function() {
		MainAction.removeModule(this.model.id);
		this.remove();
	},
	_handleClick: function(e) {
		e.preventDefault(); 
		toastr.remove();
		toastr.warning('在这里不能访问商品详情哦');
	}
});

module.exports = LunboComponent;