/**
 * 定位插件
 * 用于元素跟随
 * $tip.follow(target)
 */
define("common/ui/Follow", function() {
    $.fn.follow = function(target, options) {
        var defaults = {
            offsets: {
                x: 0,
                y: 0
            },
            position: "4-1",
            edgeAdjust: !0
        },
        opts = $.extend({}, defaults, options || {});
        return $(this).each(function() {
            var self = $(this);
            if (0 != target.length) {
                var offset, left, top, realLeft, i, outerHeight = 0,
                outerWidth = 0,
                height = self.data("height"),
                width = self.data("width"),
                scrollTop = $(window).scrollTop(),
                scrollLeft = $(window).scrollLeft(),
                offsetX = parseInt(opts.offsets.x, 10) || 0,
                offsetY = parseInt(opts.offsets.y, 10) || 0;
                this.cacheData,
                height || (height = self.outerHeight()),
                width || (width = self.outerWidth()),
                offset = target.offset(),
                outerHeight = target.outerHeight(),
                outerWidth = target.outerWidth(),
                left = offset.left,
                top = offset.top;
                var r, s = ["4-1", "1-4", "5-7", "2-3", "2-1", "6-8", "3-4", "4-3", "8-6", "1-2", "7-5", "3-2"],
                position = opts.position,
                u = !1;
                $.each(s,
                function(a, b) {
                    return b === position ? void(u = !0) : void 0
                }),
                u || (position = c.position);
                var v = function(a) {
                    var b = "bottom";
                    switch (a) {
	                    case "1-4":
	                    case "5-7":
	                    case "2-3":
	                        b = "top";
	                        break;
	                    case "2-1":
	                    case "6-8":
	                    case "3-4":
	                        b = "right";
	                        break;
	                    case "1-2":
	                    case "8-6":
	                    case "4-3":
	                        b = "left";
	                        break;
	                    case "4-1":
	                    case "7-5":
	                    case "3-2":
	                        b = "bottom"
                    }
                    return b
                },
                w = function(a) {
                    return "5-7" === a || "6-8" === a || "8-6" === a || "7-5" === a ? !0 : !1
                },
                x = function(a) {
                    var b = 0,
                    c = 0;
                    if ("right" === a) {
                        if (c = left + outerWidth + width + offsetX, c > $(window).width()) return ! 1
                    } else if ("bottom" === a) {
                        if (b = top + outerHeight + height + offsetY, b > scrollTop + $(window).height()) return ! 1
                    } else if ("top" === a) {
                        if (b = height + offsetY, b > top - scrollTop) return ! 1
                    } else if ("left" === a && (c = width + offsetX, c > left)) return ! 1;
                    return ! 0
                };
                r = v(position),
                opts.edgeAdjust && (x(r) ? !
                function() {
                    if (!w(position)) {
                        var a, b = {
                            top: {
                                right: "2-3",
                                left: "1-4"
                            },
                            right: {
                                top: "2-1",
                                bottom: "3-4"
                            },
                            bottom: {
                                right: "3-2",
                                left: "4-1"
                            },
                            left: {
                                top: "1-2",
                                bottom: "4-3"
                            }
                        },
                        c = b[r];
                        if (c) for (a in c) x(a) || (position = c[a])
                    }
                } () : !
                function() {
                    if (w(position)) {
                        var a = {
                            "5-7": "7-5",
                            "7-5": "5-7",
                            "6-8": "8-6",
                            "8-6": "6-8"
                        };
                        position = a[position]
                    } else {
                        var b = {
                            top: {
                                left: "3-2",
                                right: "4-1"
                            },
                            right: {
                                bottom: "1-2",
                                top: "4-3"
                            },
                            bottom: {
                                left: "2-3",
                                right: "1-4"
                            },
                            left: {
                                bottom: "2-1",
                                top: "3-4"
                            }
                        },
                        c = b[r],
                        d = [];
                        for (name in c) d.push(name);
                        position = x(d[0]) || !x(d[1]) ? c[d[0]] : c[d[1]]
                    }
                } ());
                var realPosition = v(position),
                p0 = position.split("-")[0];
                switch (realPosition) {
	                case "top":
	                    realTop = top - height,
	                    realLeft = "1" == p0 ? left: "5" === p0 ? left - (width - outerWidth) / 2 : left - (width - outerWidth);
	                    break;
	                case "right":
	                	realLeft = left + outerWidth,
	                	realTop = "2" == p0 ? top: "6" === p0 ? top - (height - outerHeight) / 2 : top - (height - outerHeight);
	                    break;
	                case "bottom":
	                	realTop = top + outerHeight,
	                    realLeft = "4" == p0 ? left: "7" === p0 ? left - (width - outerWidth) / 2 : left - (width - outerWidth);
	                    break;
	                case "left":
	                	realLeft = left - width,
	                	realTop = "2" == p0 ? top: "6" === p0 ? top - (width - outerWidth) / 2 : top - (height - outerHeight)
                }
                if (opts.edgeAdjust && w(position)) {
                    var windowWidth = $(window).width(),
                    windowHeight = $(window).height();
                    "7-5" == position || "5-7" == position ? .5 * windowWidth > realLeft - scrollLeft ? 0 > realLeft - scrollLeft && (realLeft = scrollLeft) : realLeft - scrollLeft + width > windowWidth && (realLeft = windowWidth + scrollLeft - width) : .5 * windowHeight > realTop - scrollTop ? 0 > realTop - scrollTop && (realTop = scrollTop) : realTop - scrollTop + height > windowHeight && (realTop = windowHeight + scrollTop - height)
                }
                "top" == realPosition || "left" == realPosition ? (realLeft -= offsetX, realTop -= offsetY) : (realLeft += offsetX, realTop += offsetY),
                self.css({
                    position: "absolute",
                    left: Math.round(realLeft),
                    top: Math.round(realTop)
                }).attr("data-align", position)
            }
        })
    };
    var f = function(a, b, c) {
        b.follow(a, c)
    };
    return f.prototype.hide = function() {
        target.remove()
    },
    f
});