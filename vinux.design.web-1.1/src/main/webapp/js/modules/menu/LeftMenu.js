var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!templates/leftmenu/leftmenu.html'),
	ModuleFactory = require('../ModuleFactory'),
	MainStore = require('store/MainStore');

var LeftMenu = Backbone.View.extend({
	el: $('#side-menu'),
	template: _.template(template),
	render: function() {
		this.$el.append(this.template(this.model));
		this.$('.panel-item-layout').draggable({
			connectToSortable: '#page-wrapper',
			helper: function() {
				var type = $(this).data('type');
				var view = ModuleFactory.create(type);
				MainStore.setCurrentEditModule(view.model);
				return view.render().el;
			},
			handle: '.drag',
			drag: function(e, t) {
				t.helper.width(400);
			},
			stop: function(e, t) {
				t.helper.height('');
				t.helper.width('');
			}
		});
		
		this.$('.panel-item-template').draggable({
			connectToSortable: '#page-wrapper',
			helper: function() {
				var type = $(this).data('type');
				var view = ModuleFactory.create(type);
				MainStore.setCurrentEditModule(view.model)
				return view.render().el;
			},
			handle: ".drag",
			drag: function(e, t) {
				t.helper.width(400);
			},
			stop: function(e, t) {
				t.helper.height('');
				t.helper.width('');
			}
		});

		this.$('.panel-item-component').draggable({
		    connectToSortable: '.ibox-content',
		    helper: function() {
		    	var type = $(this).data('type');
		    	var view = ModuleFactory.create(type);
		    	MainStore.setCurrentEditModule(view.model);
//		    	return view.render().el;
		    	return '<div>' + $(this).text() + '</div>';
		    },
		    handle: '.drag',
			drag: function(e, t) {
//				t.helper.width('auto')
			},
			stop: function(e, t) {
				t.helper.height('');
				t.helper.width('');
			}
		});
		
		this.$el.metisMenu();
		this.$('li').has('ul').children('a').off('click');
	}
});

module.exports = LeftMenu;