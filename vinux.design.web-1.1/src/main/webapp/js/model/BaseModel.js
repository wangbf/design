var Backbone = require('backbone');

/**
 * 组件模型，用来描述一个组件，包括普通的模块和布局
 * 所有的组件对应的模型都继承自该模型
 */
var BaseModel = Backbone.Model.extend({
	defaults: function() {
      return {
    	  _id: null, 
    	  vId: null, //模型对应的视图id
    	  type: null, //模型的类型
    	  pId: null, //上级组件id
    	  index: 0, //位置，暂时还没有使用到
    	  flag: 0, //状态标记，初始为0，删除为-1
    	  style: null, //json对象，用来描述额外的、个性的样式，如width, height, margin等等, 参考jquery的css方法
    	  options: [] //组件的操作项
      };
    }
});

module.exports = BaseModel;