
var BeanManager = require('../bean/BeanManager');

function AddModuleCommand(module) {
	this.module = module;
};

AddModuleCommand.prototype.excute = function() {
	BeanManager.getModuleCollection().addModule(this.module);
};

AddModuleCommand.prototype.undo = function() {
	BeanManager.getModuleCollection().removeById(this.module.get('id'));
	
};

module.exports = AddModuleCommand;
	
	
