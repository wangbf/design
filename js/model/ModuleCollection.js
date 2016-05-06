var Backbone = require('backbone');
var BaseModel = require('./BaseModel'),
	MainStore = require('../store/MainStore'),
	MainConstants = require('../constants/MainConstants');
var ModuleFactory = require('../modules/ModuleFactory'),
	MainAction = require('../actions/MainAction'),
	NavigationModel = require('./NagivationModel');

/**
 * 模块列表，存放拖放过去的各种组件，包括布局和功能模块
 */
var ModuleCollection = Backbone.Collection.extend({
	model: BaseModel,
	localStorage: new Backbone.LocalStorage('modules'),
	initialize: function() {
		var self = this;
		MainStore.addRemoveModuleCmdHandler(function(_id) {
			self.removeById(_id);
		});
		
		MainStore.addAddModuleCmdHandler(function(mm) {
			self.create(mm, {
				success: function(model, resp, c) {
					Backbone.trigger('modules_update');
				}
			});
		});

		/**
		 * 这个update事件比较恶心
		 * 当调用create方法创建model时，会马上触发update事件，而此时model还没有生成id
		 * 保存的组件没有id，就无法确定父子关系，所以在create的success回调函数里边手动触发
		 * 一个自定义的事件
		 */
//		this.listenTo(this, 'update', function() {
//			self.save();
//		})
		
		Backbone.on('modules_remove modules_update', function(module) {
			//this.save();
		}, this);
//		
	},
	//暂时无用
	addModule: function(module) {
		this.create(module, {
			success: function(model, resp, c) {
				Backbone.trigger('modules_update');
			}
		});
	},
	//通过id删除，该操作并不会真正的删除，只会待删除的组件标记为“删除状态”
	removeById: function(_id) {
		var that = this;
		var module = this.get(_id);
		if (module) {
			try {
				this._remove(module);
				Backbone.trigger('modules_remove');
//				this.trigger('reset');
			} catch (e) {
				console.error(e);
			}
		}
	},
	//删除模块，如果有子级模块就级联删除
	_remove: function(module) {
		try {
			var that = this;
//		this.trigger('reset')
			var subs = this.find({
				pId: module.id
			});
			if (subs && subs.length > 0) {
				for (var i = 0;i < subs.length; i++) {
					that._remove(subs[i]);
				}
			}
			module.save({flag: MainConstants.MODULE_FLAG_REMOVE});
		} catch (e) {
			console.error(e);
			throw e;
		}
	},
	//获取非“删除状态”的组件
	getUnRemoves: function() {
		return this.filter(function(each) {
			return each.get('flag') != MainConstants.MODULE_FLAG_REMOVE;
		});
//		return this.where({flag: MainConstants.MODULE_FALG_ORGIN});
	},
	//基础查询
	find: function(params) {
		return this.where(params);
	},
	//通过id查找
	getModuleById: function(id) {
		return this.get(id);
	},
	//清空
	clear: function() {
//		_.invoke(this.models, 'destroy');
		this.reset([]);
		Backbone.trigger('modules_remove');
//		this.trigger('update');
	},
	
	/**
	 * 每个店铺提供默认的导航条组件，并且不提供删除功能
	 * 暂时没有使用到
	 * @deprecated
	 */
	_initNav: function() {
		try {
			var module = new BaseModel({
				type: 'box-100',
				flag: 'no-remove'
			});
			MainAction.addModule(module);
			var navbar = new NavigationModel({type: 'component-nav-bar'});
			navbar.set('pId', module.id);
			MainAction.addModule(navbar);
			this.trigger('reset');
		} catch (e) {
			console.error(e);
		}
		
	},
	save: function() {
		var self = this;
//		this.pageModel.data = JSON.stringify(this.toJSON());
		var unRemoves = _.map(this.getUnRemoves(), function(each) {
			return each.toJSON();
		});
		this.pageModel.data = JSON.stringify(unRemoves);
		var page = this.pageModel;
		$.ajax({
			url: '/main/page/' + page.id + '/data.vhtml',
			type: 'post',
			data: page,
			dataType: 'json',
			success: function(res) {
				if (200 == res.status) {
					toastr.remove();
					toastr.success('已自动保存');
				}
			}
		});
	}
});

module.exports = new ModuleCollection;