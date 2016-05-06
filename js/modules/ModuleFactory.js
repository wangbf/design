var BannerImage = require('./component/BannerImage'), 
	ImageModel = require('../model/ImageModel'),
	ProductModel = require('../model/ProductModel'),
	NavigationModel = require('../model/NagivationModel'),
	BaseModel = require('../model/BaseModel'),
	BoxModel = require('../model/BoxModel'),
	NavigationBar = require('./component/NavigationBar'),
	Box = require('./box/Box'),
	LunboModel = require('../model/LunboModel'),
	LunboComponent = require('./component/LunboComponent'),
	ProductsGroupModel = require('../model/ProductsGroupModel'),
	ProductGroup1 = require('./component/product-group-1/ProductGroup1'),
	ProductGroup2 = require('./component/product-group-2/ProductGroup2'),
	ProductGroup3 = require('./component/product-group-3/ProductGroup3'),
	Template = require('./template/Template'),
	TemplateModel = require('../model/TemplateModel'),
	BeanManager = require('../bean/BeanManager');

/**
 * 组件工厂对象
 */
var ModuleFactory = {};

/**
 * 根据组件类型和模型创建组件
 * 其中，各种组件类型都是约定好的，有的一次产生单个组件，有的一次产生一组组件
 * type: 组件类型
 * model: 组件的模型，可以是单个模型，也可以是模型数组
 */
ModuleFactory.create = function(type, model) {
	switch (type) {
		case 'component-banner-image':
			if (!model) {
				model = new ImageModel({type: type});
			}
			return new BannerImage({
				model : model
			});
		case 'component-nav-bar':
			if (!model) {
				model = new NavigationModel({type: type});
			}
			return new NavigationBar({
				model : model
			});
		case 'component-lunbo':
			if (!model) {
				model = new LunboModel({type: type});
			}
			return new LunboComponent({
				model : model
			});
		case 'component-product-group-1':
			if (!model) {
				model = new ProductsGroupModel({type: type});
				var products = _.map(new Array(8), function() {
					return new ProductModel().toJSON();
				});
				model.set('products', products);
			}
			return new ProductGroup1({
				model : model
			});
		case 'component-product-group-2':
			if (!model) {
				model = new ProductsGroupModel({type: type});
				var products = _.map(new Array(6), function() {
					return new ProductModel().toJSON();
				});
				model.set('products', products);
			}
			return new ProductGroup2({
				model : model
			});
		case 'component-product-group-3':
			if (!model) {
				model = new ProductsGroupModel({type: type});
				var products = _.map(new Array(9), function() {
					return new ProductModel().toJSON();
				});
				model.set('products', products);
			}
			return new ProductGroup3({
				model : model
			});
		case 'template-1':
			//暂时提供两种模板，每种模板都有预定义的数据模板，在数据模板中，<%=id1%>这样的写法是为了字符串替换，
			//模型之间是通过id来确定嵌套关系的，所以初始化时就要生成一个id，这里用underscore的template方法替换字符串
			if (!model) {
				var data = require('html!./template/Template1.json');
				var dataStr = _.template(data);
				var id = tools.guid();
				dataStr = dataStr({
					id1: id,
					id2: tools.guid(),
					id3: tools.guid(),
					id4: tools.guid(),
					id5: tools.guid(),
					id6: tools.guid(),
					id7: tools.guid(),
					id8: tools.guid(),
					id9: tools.guid()
				})
				ModuleCollection = BeanManager.getModuleCollection();
				ModuleCollection.add(JSON.parse(dataStr));
				
				model = ModuleCollection.get(id);
			}
			return new Template({model: model});
		case 'template-2':
			if (!model) {
				var data = require('html!./template/Template2.json');
				var dataStr = _.template(data);
				var id = tools.guid();
				dataStr = dataStr({
					id1: id,
					id2: tools.guid(),
					id3: tools.guid(),
					id4: tools.guid(),
					id5: tools.guid(),
					id6: tools.guid(),
					id7: tools.guid(),
					id8: tools.guid(),
					id9: tools.guid(),
					id10: tools.guid(),
					id11: tools.guid(),
					id12: tools.guid(),
					id13: tools.guid(),
					id14: tools.guid(),
					id15: tools.guid(),
					id16: tools.guid(),
					id17: tools.guid()
				});
				ModuleCollection = BeanManager.getModuleCollection();
				ModuleCollection.add(JSON.parse(dataStr));
				
				model = ModuleCollection.get(id);
			}
			return new Template({model: model});
		default:
			if (!model) {
				model = new BoxModel({type: type});
			}
			return new Box({model: model});
	}
};

ModuleFactory._isModel = function(model) {
	return model instanceof Backbone.Model
}

module.exports = ModuleFactory;
