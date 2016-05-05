var MainStore = require('../store/MainStore');

var MainAction = {};

var Commands = [];
Commands.current = null;

MainAction.setLinkImage = function(module) {
	MainStore.emitSetLinkImageCmd(module);
};

MainAction.uploadImage = function(module) {
	MainStore.emitUploadImageCmd(module);
};

MainAction.removeModule = function(_id) {
	MainStore.emitRemoveModuleCmd(_id);
};

MainAction.addModule = function(mm) {
	MainStore.emitAddModuleCmd(mm);
//	var AddModuleCommand = require('../cmd/AddModuleCommand');
//	var cmd = new AddModuleCommand(mm);
//	cmd.excute();
//	Commands.push(cmd);
};

/**
 * 设置导航条
 */
MainAction.setNavBar = function(targetModule) {
	MainStore.emitSetNavBarCmd(targetModule);
};

/**
 * 设置轮播图
 */
MainAction.setCarousel = function(module) {
	MainStore.emitSetLunboCmd(module);
};

MainAction.setBox = function(module) {
	MainStore.emitSetBoxCmd(module);
};

MainAction.undo = function() {
	if (!Commands.current) {
		var index = Commands.length - 1;
		var cmd = Commands[index];
		if (cmd) {
			cmd.undo();
		}
		Commands.current = index;
	} else {
		var cmd = Commands[Commands.current - 1];
		if (cmd) {
			cmd.undo();
		}
	}
};

module.exports = MainAction;