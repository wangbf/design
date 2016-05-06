/**
 * 错误提示插件
 * 用于表单验证时提示错误
 * 该插件依赖于Follow插件来定位提示信息的位置
 * $input.errorTip('aaaa')
 */
define("common/ui/ErrorTip", function() {
	require('../follow/Follow'),
	require('./tips.css');
    var d = "ui_tips",
    e = d + "_";
    $.fn.errorTip = function(msg, options) {
        var defaults = {
            unique: !0,
            align: "center",
            onShow: $.noop,
            onHide: $.noop
        },
        opts = $.extend({}, defaults, options || {});
        return $.isFunction(msg) && (msg = msg()), "string" != typeof msg ? this: $(this).each(function(index, item) {
            if (! (1 == opts.unique && index > 0)) {
                var $tip, $msg, $arrow, $target = $(this);
                if (1 == opts.unique && window.errorTip) {
                	$tip = errorTip.data("trigger", $target);
                } else if (0 == opts.unique && $target.data("errorTip")) {
                	$tip = $target.data("errorTip");
                } else {
                	$tip = $('<div class="' + e + "x " + e + 'error"></div>').html('<span class="' + e + 'before"></span><i class="' + e + 'after"></i>'),
                    $(document.body).append($tip.append($msg).append($arrow)),
                    1 == opts.unique ? window.errorTip = $tip.data("trigger", $target) : $target.data("errorTip", $tip);
                    var fun_resize = function() {
                        "none" != $tip.css("display") && ($tip.hide(), opts.onHide.call(($tip.data("trigger") || $target).removeClass("error"), $tip))
                    };
                    $(document).bind({
                        keydown: function(event) {
                            16 != event.keyCode && 17 != event.keyCode && fun_resize()
                        },
                        mousedown: function(event) {
                            var b = document.activeElement,
                            c = $tip.data("trigger"),
                            d = event.target;
                            b && c && b == d && b == c.get(0) || fun_resize()
                        }
                    }),
                    $(window).bind({
                        resize: fun_resize
                    })
                }
                $tip.show(),
                $msg = $tip.find("span"),
                $arrow = $tip.find("i"),
                $msg.html(msg);
                var left = 0;
                "left" == opts.align ? left = -.5 * $msg.width() + parseInt($msg.css("padding-left")) || 0 : "right" == opts.align ? left = .5 * $msg.width() - parseInt($msg.css("padding-right")) || 0 : "number" == typeof opts.align && (left = opts.align),
                $arrow.css({
                    left: left
                }),
                $tip.follow($target, {
                    align: opts.align,
                    position: "5-7",
                    edgeAdjust: !1
                });
                var zIndex = 1 * $tip.css("zIndex") || 19,
                nZindex = zIndex;
                $("body").children().each(function() {
                    var a;
                    0 == $(this).hasClass(d) && (a = 1 * $(this).css("zIndex")) && (nZindex = Math.max(a, nZindex))
                }),
                nZindex > zIndex && $tip.css("zIndex", nZindex + 1),
                opts.onShow.call($target.addClass("error valided"), $tip)
            }
        })
    };
    var ErrorTip = function(a, b, c) {
        return a.errorTip(b, c),
        this.el = {
            trigger: a
        },
        this.cl = d,
        this
    };
    return ErrorTip
});