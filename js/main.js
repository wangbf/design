var Main = {};
Main.designArea = null;

var Backbone = require('backbone');
var ModuleFactory = require('./modules/ModuleFactory'),
	MainStore = require('store/MainStore'),
	MainAction = require('actions/MainAction'),
	MainConstants = require('constants/MainConstants');
	BeanManager = require('./bean/BeanManager');
	
BeanManager.init();
var ModuleCollection = BeanManager.getModuleCollection(); 

$(function() {
	initCustomRequires();
	initWindow(); 
	initDesignArea();
	initLeftMenu();
});

function initCustomRequires() {	
	var GlobalSettingModal = require('modal/GlobalSettingModal'),
		SetLinkImageModal = require('modal/SetLinkImageModal'),
		UploadModal = require('modal/UploadModal'),
		SetNavBarModal = require('modal/SetNavBarModal'),
		SetLunboModal = require('modal/SetLunboModal'),
		SetBoxModal = require('modal/SetBoxModal');
	
	new GlobalSettingModal, 
		new SetLinkImageModal, 
		new UploadModal, 
		new SetNavBarModal, 
		new SetLunboModal,
		new SetBoxModal;
}

function initLeftMenu() {
	var LeftMenu = require('./modules/menu/LeftMenu');
	var layout = MainConstants.MENU.BOX;
	layout.subs.push(MainConstants.MENU.BOX100);
	layout.subs.push(MainConstants.MENU.BOX1260);
	layout.subs.push(MainConstants.MENU.BOX1_1);
	layout.subs.push(MainConstants.MENU.BOX4_8);
	layout.subs.push(MainConstants.MENU.BOX8_4);
	layout.subs.push(MainConstants.MENU.BOX1_1_1);
	layout.subs.push(MainConstants.MENU.BOX8_4_1_1);

	var component = MainConstants.MENU.COMPONENT;
	component.subs.push(MainConstants.MENU.COMPONENT_BANNER_IMAGE);
	component.subs.push(MainConstants.MENU.COMPONENT_LUNBO);
	component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP1);
	component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP2);
	component.subs.push(MainConstants.MENU.COMPONENT_PRODUCT_GROUP3);
	
	var template = MainConstants.MENU.TEMPLATE;
	template.subs.push(MainConstants.MENU.TEMPALTE_1);
	template.subs.push(MainConstants.MENU.TEMPALTE_2);
	
	var menus = [layout, component, template];
	new LeftMenu({model: {
		menus: menus
	}}).render();
}

/**
 * 初始化
 */
function initWindow() {
    if ($(this).width() < 769) {
        $('body').addClass('body-small');
    } else {
        $('body').removeClass('body-small');
    }

    // Full height of sidebar
    function fixHeight() {
        var heightWithoutNavbar = $('body > #wrapper').height() - 61;
        $('.sidebard-panel').css('min-height', heightWithoutNavbar + 'px');

        var navbarHeigh = $('nav.navbar-default').height();
        var wrapperHeigh = $('#page-wrapper').height();

        if (navbarHeigh > wrapperHeigh) {
            $('#page-wrapper').css('min-height', navbarHeigh + 'px');
        }

        if (navbarHeigh < wrapperHeigh) {
            $('#page-wrapper').css('min-height', $(window).height() + 'px');
        }

        if ($('body').hasClass('fixed-nav')) {
            $('#page-wrapper').css('min-height', $(window).height() - 60 + 'px');
        }

    }

    fixHeight();

    $(window).bind('load resize scroll', function () {
        if (!$('body').hasClass('body-small')) {
            fixHeight();
        }
    });
    
    // Minimalize menu when screen is less than 768px
    $(window).bind('resize', function () {
        if ($(this).width() < 769) {
            $('body').addClass('body-small');
        } else {
            $('body').removeClass('body-small');
        }
    });
}

/**
 * 初始化编辑区内的各种事件
 */
function initDesignArea() {
	/**
	 * 编辑区，将组件拖拽到这里
	 */
	Main.designArea = Backbone.View.extend({
		el: $('#page-wrapper'),
		initialize: function() {
//			this.listenTo(ModuleCollection, 'add', this.addView);
//			this.listenTo(ModuleCollection, 'update', function() {alert('update')});
			this.listenTo(ModuleCollection, 'all', this.addAll);
			this.listenTo(ModuleCollection, 'reset', this.addAll);
		 	ModuleCollection.fetch();
		},
		addAll: function() {
			this.$el.empty();
			var that = this;
			_.each(ModuleCollection.getUnRemoves(), function(each) {
				that.addView(each);
			});
		},
		addView: function(each) {
			try {
				if (null == each.get('pId')) {
					var view = ModuleFactory.create(each.get('type'), each);
					this.$el.append(view.render().el);
				}
			} catch (e) {
				console.error(e);
			}
		},
		process: function(view, subs) {
			for (var i = 0; i < subs.length; i++) {
				var thisView = ModuleFactory.create(subs[i].get('type'), subs[i]);
				view._addView(thisView);
				var t = ModuleCollection.find({flag: MainConstants.MODULE_FALG_ORGIN, pId: subs[i].id});
				if (t && t.length > 0) {
					this.process(thisView, t);
				}
			}
		}
	});
	
	var MainView = new Main.designArea;
	 
	new Backbone.Layout({
		el: 'body',
		events: {
			'click #btn-preview': '_handlePreview',
			'click #btn-edit': '_handleEdit',
			'click #btn-publish': '_handlePublish',
			'click #btn-save': '_handleSave',
			'click #btn-clear': '_handleClear'
//			'click #btn-undo': '_handleUndo'
		},
		_handlePreview: function() {
			$('body').addClass('preview');
			$('#btn-clear').hide();
		},
		_handleEdit: function() {
			$('body').removeClass('preview');
			$('#btn-clear').show();
		},
		_handlePublish: function() {
			var self = this;
			if (!$('#page-wrapper').children().length > 0) {
				layer.open({
					title: false,
					closeBtn: false,
					shadeClose: true,
					shade: [0.5,'#000'],
					skin: 'layer-cancel',
					area: ['430px', ''],
					btn: ['我再想想', '是的，我要发布'], 
					content: ('<span class="z20 font-bold">您的页面是空的，确认要发布吗？</span>'),
					btn2: function submitYuyue() {
						self._doPublish();
					}
				});
			} else {
				self._doPublish();
			}
		},
		_doPublish: function() {
			toastr.remove();
			toastr.success('发布中。。。');
			$('#btn-publish').addClass('disabled').attr('disabled', true);
			var self = this;
			try {
				$('#publish-layout').html($('#page-wrapper').html());
				var t = $('#publish-layout').children();
				$('#publish-layout .wrapper').removeAttr('style');
				t.find('.ibox-header, .ibox-header-style-1, .removes, .ibox-operation').remove();
				$('#publish-layout .ibox').removeClass('ui-draggable').removeClass('ui-sortable-handle');
				$('#publish-layout .images-max').removeClass('ui-sortable-handle');
				$('#publish-layout .ibox-content').removeClass('ui-sortable').removeClass('ui-sortable-disabled');
				$('#publish-layout .dp-goodsList li').removeClass('ui-droppable');
				
				formatHtml = $('#publish-layout').html();
				
				toastr.remove();
				toastr.success('发布成功');
				$('#btn-publish').removeClass('disabled').attr('disabled', false);
			} catch (e) {
				toastr.remove();
				toastr.error('发布失败');
			}
		},
		_handleSave: function() {
			ModuleCollection.save();
		},
		_handleClear: function() {
			layer.open({
				title: false,
				closeBtn: false,
				shadeClose: true,
				shade: [0.5,'#000'],
				skin: 'layer-cancel',
				area: ['430px', ''],
				btn: ['我再想想', '是的，我要清空'], 
				content: ('<span class="z20 font-bold">确认清空所有组件吗？</span>'),
				btn2: function submitYuyue() {
					ModuleCollection.clear();
				}
			});
		},
		_handleUndo: function() {
			MainAction.undo();
		}
	});
	
	$('#page-wrapper').sortable({
		receive: function(event, ui) {
			var module = MainStore.getCurrentEditModule();
			MainAction.addModule(module);
		}
	});
	  
}