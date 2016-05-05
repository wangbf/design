var BeanManager = {};

BeanManager.init = function() {
	this.moduelCollection = require('../model/ModuleCollection');
};

BeanManager.getModuleCollection = function() {
	return this.moduelCollection;
};

module.exports = BeanManager;