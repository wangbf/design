
//各种常量
module.exports = {
	MODULE_FLAG_REMOVE: -1, //删除状态
	MODULE_FALG_ORGIN: 0, //初始状态
	IMAGE_ACCESS_SERVER: 'http://img.vinux.com', //图片访问服务器地址
	IMAGE_GOODS_ACCESS_SERVER: 'http://img.vinuxgoods.com',
	URL_GOODS_DEATIL_PREFIX: 'http://pcmall.vinuxpost.com/productDetail/goods',
	OPTIONS: {
		OPT_UPLOAD: {
			opt: 'upload',
			name: '上传',
			icon: 'btn-white fa-upload'
		},
		OPT_SETTING: {
			opt: 'setting',
			name: '设置',
			icon: 'btn-white fa-gear'
		},
		OPT_REMOVE: {
			opt: 'remove',
			name: '删除',
			icon: 'btn-danger fa-remove'
		},
		OPT_ADD: {
			opt: 'add',
			name: '添加',
			icon: 'btn-white fa-plus'
		}
	},
	MENU: {
		BOX: {
			name: '布局',
			type: 'layout',
			subs: []
		},
		BOX100: {
			type: 'box-100',
			name: '通栏(100%)',
			subs: []
		},
		BOX1260: {
			name: '通栏(1260px)',
			type: 'box-1260',
			subs: []
		},
		BOX1_1: {
			name: '二等分(100%)',
			type: 'box-1-1',
			subs: []
		},
		BOX4_8: {
			name: '左窄右宽(100%)',
			type: 'box-4-8',
			subs: []
		},
		BOX8_4: {
			name: '左宽右窄(100%)',
			type: 'box-8-4',
			subs: []
		},
		BOX1_1_1: {
			name: '三等分(100%)',
			type: 'box-1-1-1',
			subs: []
		},
		BOX8_4_1_1: {
			name: '混合1',
			type: 'box-8-4_1_1',
			subs: []
		},
		COMPONENT: {
			name: '组件',
			type: 'component',
			subs: []
		},
		COMPONENT_NAV_BAR: {
			name: '导航条',
			type: 'component-nav-bar'
		},
		COMPONENT_BANNER_IMAGE: {
			name: '广告图',
			type: 'component-banner-image'
		},
		COMPONENT_LUNBO: {
			name: '轮播图',
			type: 'component-lunbo'
		},
		COMPONENT_PRODUCT_GROUP1: {
			name: '图片+商品组合',
			type: 'component-product-group-1'
		},
		COMPONENT_PRODUCT_GROUP2: {
			name: '3行2列的商品组合',
			type: 'component-product-group-2'
		},
		COMPONENT_PRODUCT_GROUP3: {
			name: '3行3列的商品组合',
			type: 'component-product-group-3'
		},
		TEMPLATE: {
			name: '模板',
			type: 'template',
			subs: []
		},
		TEMPALTE_1: {
			name: '模板1',
			type: 'template-1'
		},
		TEMPALTE_2: {
			name: '模板2',
			type: 'template-2'
		}
	}
};