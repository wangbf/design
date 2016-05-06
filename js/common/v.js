/**
*
* 一些公共方法
*
* @author  zhou-baicheng
*/


(function(w,$){
	
	
	
	
	
//	$.get("",{},function(result){
//		
//		if(C.islogin(result,619)){
//			
//			
//		}
//		
//	});
	
	
	
	var C = C || {};
	
	/**
	 * ajax 在原有基础上省略一些参数
	 */
	C.ajax = function(option) {
		var def = {
			type: "post",
			data: {},
			async:true,
			dataType: "json",
			before: function() {},
			error: function(e){alert(e.message)}
		};
		var opts = $.extend(def, option);
		burl = ((opts.url.indexOf("?") == -1) ? "?": "&") + "_rnd=" + new Date().getTime();
		$.ajax({
			type: opts.type,
			url: opts.url + burl,
			data: opts.data,
			dataType: opts.dataType,
			beforeSend: opts.before,
			success: opts.success,
			async:opts.async,
			error:opts.error
		});
	},
	
	
	/**
	 * 判断是否登录
	 */
	C.islogin = function(result,assId){
		if(result && result.login_status == 300){
				vinuxGlobalCall.settings = {
					return_url: V.domain.url +'/open/member/login.vhtml?url=' + window.location.href //登陆成功后iframe刷新的地址
				};
				vinuxGlobalCall.login(assId || 619);
		}else{
			return !0 ;
		}
		
	}
	
	C.Utils = {
			mypostion : function (o) {
				var width = $(window).width();
				var height = $(window).height();
				var divW = $(o).outerWidth();
				var divH = $(o).outerHeight();
				var left = (width - divW) / 2 + $(window).scrollLeft();
				var top = (height - divH) / 2 + $(window).scrollTop();
				return {
					"left": left,
					"top": top
				};
			},
			myTips : function (msg, status) {
				var heg = $(document).height();
				if (status != "success" && status != "error") {
					status = "error";
				};
				if (status == "success") {
					$("body").append('<div id="windownbg" style="filter:alpha(opacity=0);opacity:0.5;z-index: 999901"></div><div class="change_success" id="change_success"><!--span class="send_close" onclick="$(this).parent().remove();$("#ui-mask").remove();"></span--><i></i>' + msg + '</div>');
					var my = this.mypostion("#change_success");
					$("#change_success").css({
						"position": "absolute",
						"z-index": "9999999",
						"top": my.top + "px",
						"left": my.left + "px"
					});
					$("#windownbg").height($(document).height());
					$("#windownbg").show();
					$("#change_success").show();
					setTimeout(function() {
						$("#change_success,#windownbg").fadeOut("slow",
						function() {
							$("#windownbg").remove();
							$("#change_success").remove();
						});
					},
					1000);
				} else {
					$("body").append('<div id="windownbg" style="filter:alpha(opacity=50);opacity:0.5;z-index: 999901"></div><div class="change_error" id="change_error"><!--span class="send_close" onclick="$(this).parent().remove();$("#ui-mask").remove();"></span--><i></i>' + msg + '</div>');
					var my = this.mypostion("#change_error");
					$("#change_error").css({
						"position": "absolute",
						"z-index": "9999999",
						"top": my.top + "px",
						"left": my.left + "px"
					});
					$("#windownbg").height($(document).height());
					$("#windownbg").show();
					$("#change_error").show();
					setTimeout(function() {
						$("#change_error,#windownbg").fadeOut("slow",
						function() {
							$("#windownbg").remove();
							$("#change_error").remove();
						});
					},
					1000);
				};
			},
			/**刷新页面,默认当前页**/
			refresh : function(url){
				url = url ? url : window.location.href ;
				window.location.href =  url ; 
			}
			
			
	}
	
	C.hide_loading = function(){
		$('#windownbg,.alert').remove();
	}
	/**laoding加载中....*/
	C.show_loading = function(text){
		C.hide_loading();
		var html = [] ;
		html.push('<div id="windownbg" style="height:100%;filter:alpha(opacity=0);opacity:0.5;z-index: 999901"></div>');
		html.push('<div id="alert" class="alert">');
		html.push('	<img src="/images/common/loading.gif">' + text);
		html.push('</div>');
		$("body").append(html.join(''));
		$("#windownbg").height($(document).height());
		var my = C.Utils.mypostion(".alert");
		$(".alert").css({"position":"absolute","z-index":"9999999","top":my.top+"px","left":my.left+"px"});
		$("#windownbg").show();
	}
	C.init = function(){
		$('<link href="/css/common/v.css" rel="stylesheet"/>').appendTo('head');
	}
	C.init();
	C.fn = {
			//登录
			menu_login : function (assId){
				/***/
					vinuxGlobalCall.settings = {
						return_url: V.domain.url +'/open/member/login.vhtml?url=' + window.location.href //登陆成功后iframe刷新的地址
					};
					//社群ID
					vinuxGlobalCall.login(assId);
			},
			menu_logout : function (before,success){
				C.ajax({
					url : "/logout.vhtml" ,
				   data : {},
				 before : function(){
					   before　? before() : function (){
						   C.show_loading('正在退出！');
					   };
					},
					success : function(){
						C.hide_loading();
						C.Utils.myTips("退出成功!!!","success");
						success ? success() : 0
						C.fn.menu_login();
					}
				});
				
			}
			
			
	}
	
	
	w.C = C ;
	
	

		
	/**高*/
	jQuery.fn.H = function(){
		return $(this).css('height') || this.style.height;
	};
	/**宽*/
	jQuery.fn.W = function(){
		return $(this).css('width') || this.style.width;
	};
	/**高*/
	jQuery.fn.T = function(){
		return $(this).css('top') || this.style.top;
	};
	
	
	
	
})(window,$);

$(function(){
	
	jQuery.fn.scrolls = function() {
		var $backToTopEle = $('<a id="backToTop" href="javascript:void(0);" title="返回顶部"><i class="ico"></i></a>').appendTo($("body")).click(function() {
			$("html, body").animate({
				scrollTop: 0
			},
			200);
		}),
		$backToTopFun = function() {
			var st = $(document).scrollTop(),
			winh = $(window).height(); (st > 100) ? $backToTopEle.fadeIn(300) : $backToTopEle.fadeOut(300);
			if (!window.XMLHttpRequest) {
				$backToTopEle.css("top", st + winh - 166);
			}
		};
		$(window).bind("scroll", $backToTopFun);
	}
	
	
});
