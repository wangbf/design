/**
 * 轮播图插件，依赖jquery.SuperSlide.js
 */
define('Lunbo', function() {
	require('./lunbo1.css');
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
})

