var Backbone = require('backbone');
Backbone.$ = require('jquery');
var template = require('html!../../../templates/component/image-component.html');

/**
 * 暂时无用
 */
var ImageComponent = Backbone.View.extend({
	manage: true,
	template: _.template(template),
	initialize: function() {
	    //this.listenTo(this.model, 'change', this.render);
	    //this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function() {
	    this.$el.html(this.template());
	    return this;
	},
	toggleDone: function() {
	    this.model.toggle();
	},
	events: {
		  'click .remove': 'handleRemove'
	},
	handleSetting: function() {
	  	var url = $('.imageUrl', this.$el).val();
	  	$('.banner', this.$el).css({
	  		backgroundImage: 'url("' + url + '")'
	  	});
	},
	handleRemove: function() {
	    this.$el.remove();
	}
});

module.exports = ImageComponent;
