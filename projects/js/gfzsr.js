
$(function() {
	var jsBack = $(".js_back");
	var header = $(".header");
	var banner = $(".banner");

	// 点击“返回顶部”，页面按一定速度向上移动，直到顶部；
	jsBack.on("click", function() {
		$("html,body").animate({scrollTop:0},800)
	})
	// 当位于第一屏时，不显示“返回顶部”按钮；
	$(window).on("scroll", function() {
		if($(window).scrollTop() > 0) {
			jsBack.show();
		} else {
			jsBack.hide();
		}
	})
	// 最开始时，不出现“返回顶部”按钮；
	$(window).trigger("scroll");

	// 页面向下滚动时，导航栏变为固定定位，依附在窗口顶部；
	$(window).on("scroll", function() {
		if($(window).scrollTop() > 0) {
			header.css({"position":"fixed", "background":"rgba(255,255,255,0.9)"});
		} else {
			header.css({"position":"static", "background":"#fff"});
		}
	})


})