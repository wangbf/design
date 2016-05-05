webpackJsonp([1],{

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * 轮播图插件，依赖jquery.SuperSlide.js
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		__webpack_require__(30);
		$.fn.lunbo = function(options) {
			return $(this).each(function(index, target) {
				$(target).slide({
					titCell: $('.hd ul', $(target)),
					mainCell: self.$('.bd ul', $(target)),
					effect: 'fold',
					autoPlay: true,
					autoPage: true,
					trigger: 'click',
					interTime: 4500
				});
	        });
		} 
		
	    return {
	        init: function(target, options) {
	        	target = target || $('.lunbo');
	        	target.lunbo(options)
	        }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))



/***/ },

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(33)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./lunbo1.css", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./lunbo1.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(32)();
	// imports


	// module
	exports.push([module.id, ".lunbo { width: 100%; position: relative; background: #000; z-index: 1; }\r\n.lunbo .bd { margin: 0 auto; position: relative; z-index: 0; overflow: hidden; }\r\n.lunbo .bd ul { width: 100% !important; }\r\n.lunbo .bd li { width: 100% !important; overflow: hidden; text-align: center; background-position: top; }\r\n.lunbo .bd li a { display: block; }\r\n.lunbo .hd { width: 100%; position: absolute; z-index: 1;bottom: 20px; height: 30px; line-height: 30px; }\r\n.lunbo .hd ul { width: 100%; position: absolute; left: 50%; padding: 0px}\r\n.lunbo .hd ul li { cursor: pointer; display: inline-block; *display:inline;\r\nzoom: 1; width: 13px; height: 13px; margin: 1px; margin-right: 5px; overflow: hidden; background: #fff; line-height: 999px; border-radius: 30px; }\r\n.lunbo .hd ul .on { background: #fdc2ab; }\r\n.lunbo .hd .as { width: 191px; height: 419px; float: right; background: #FFF; border: 1px solid #e6e6e6; }\r\n.lunbo .next { left: auto; right: 15%; background-position: -6px -137px; }\r\n", ""]);

	// exports


/***/ }

});