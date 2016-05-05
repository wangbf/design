/**
 * 下个版本将废弃掉
 */
define('Lunbo', function() {
	require('./Lunbo.css');
	$.fn.lunbo = function(options) {
		return $(this).each(function(index, item) {
			(function(item) {
				var target = item;
				var $mainImage = $('.main_image', $(target));
				$(target).hover(function() {
					$(".main_image .btn_next,.btn_next", $(target)).fadeIn()
					clearInterval(timer);
				}, function(){
					$(".main_image .btn_next,.btn_next", $(target)).fadeOut()
					timer = setInterval(function(){
						$(".btn_next", $mainImage).click();
					}, 5000);
				});
				
				$dragBln = false;
				
				$mainImage.touchSlider({
					flexible: true,
					speed: 200,
					btn_prev: $(".btn_prev", $mainImage),
					btn_next: $(".btn_next", $mainImage),
					paging: $('.flicking_con a', $(target)),
					counter: function (e) {
						$('.flicking_con a', $(target)).removeClass("on").eq(e.current-1).addClass("on");
					}
				});
				
				timer = setInterval(function() {
					$(".btn_next", $mainImage).click();
				}, 5000);
				
			})(item);
			
        });
	} 
	
    return {
        init: function(target, options) {
        	target = target || $('.main_visual');
        	target.lunbo(options)
        }
    }
})

