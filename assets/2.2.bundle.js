webpackJsonp([2],{

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
		var defaultOptions = {
				pageNo: 1,
				pageSize: 10,
				totalPage: 0,
				callback: function() {}
		}
		$.fn.pagination = function(options) {
			return $(this).each(function() {
				options = options || {};
				options = $.extend(defaultOptions, options)
				var p = $(this);
				var pageHtml = "";
				if (options.pageNo > 1) {
					if(options.pageNo> 5 ) {
						pageHtml += '<a href="javascript:;">首页</a>';
					}
					pageHtml += '<a href="javascript:;" p="'+(options.pageNo - 1)+'" class="dp-zhuanti-fenye-left disabled"></a>'
				}
				
				for (var i = (options.pageNo - 2 <= 0 ? 1 : options.pageNo - 2), no = 1; i <= options.totalPage && no <6; i++, no++) {
					if (options.pageNo == i) {
						pageHtml += '<a href="javascript:;" class="current">' + i + '</a>';
					}else{
						pageHtml += '<a href="javascript:;" p="' + i + '">' +  i + '</a>'
					}
				}
				if(options.pageNo < options.totalPage){
					pageHtml += '<a href="javascript:;" p="'+(new Number(options.pageNo) + 1)+'" class="dp-zhuanti-fenye-right"></a>';
				}
				p.html(pageHtml);
					p.find("a[p]").bind("click",
			            function() {
			                var i = $(this).attr("p");
			                options.callback(new Number(i));
			        });
			})
			
		};
		
	    return {
	        init: function(target, options) {
	        	target = target || $('.pagination');
	        	target.pagination(options)
	        }
	    }
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }

});