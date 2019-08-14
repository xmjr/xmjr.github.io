  	$(function() {
      var width = 600;
      var images_count = 4;
      var num = 0;

      // 在banner容器尾部增加第一张banner
      for(var j=0; j<images_count+1; j++) {
      	$(".banner ul li:first").clone(true).appendTo(".banner ul");
      }

  		// 轮播圆点
  		$(".banner ol li").mouseover(function() {
  			$(this).addClass("current").siblings().removeClass("current");
  			// 第一张图： 0 * width
  			// 第二张图： 1 * width
  			// 第三张图： 2 * width
  			// 获取当前编号
  			var i = $(this).index();
  			// console.log(i);
  			$(".banner ul").stop().animate({left:-i*width + "px"},1000);
  			num = i;
  		});

  		// 自动播放
  		var timer = null;
  		function prevPlay() {
  			num--;
  			if(num<0){
  				// 第一张往前翻时，悄悄把图片跳到最后一张图（复制页，与第一张图相同），然后做出图片播放动画，left参数是定位而不是移动的长度
  				$(".banner ul").css({left:-width*images_count}).stop().animate({left:-width*(images_count-1) + "px"},1000);
  				num=images_count-1;
  			} else {
  				$(".banner ul").stop().animate({left:-num*width + "px"},1000);
  			}
  			if (num==images_count-1) {
  				$(".banner ol li").eq(images_count-1).addClass("current").siblings().removeClass("current");
  			} else {
  				$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
  			}
  		}
  		function nextPlay(){
			  num++;
			  if(num>images_count){
				  //播放到最后一张(复制页)后,悄悄地把图片跳到第一张,因为和第一张相同,所以难以发觉,
				  $('.banner ul').css({left:0}).stop().animate({left:-width + "px"},1000);
				  //css({left:0})是直接悄悄改变位置，animate({left:-window_width},1000)是做出移动动画
				  //随后要把指针指向第二张图片,表示已经播放至第二张了。
				  num=1;
			  }else{
				  //在最后面加入一张和第一张相同的图片，如果播放到最后一张，继续往下播，悄悄回到第一张(肉眼看不见)，从第一张播放到第二张
				  //console.log(num);
				  $('.banner ul').stop().animate({left:-num*width + "px"},1000);
			  }
			  if(num==images_count){
				  $('.banner ol li').eq(0).addClass('current').siblings().removeClass('current');
			  }else{
				  $('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
			  }
		  }
		  timer = setInterval(nextPlay,2000);

		  // 鼠标经过banner时，停止定时器，离开则继续轮播
		  $(".banner").mouseenter(function() {
		  	clearInterval(timer);
		  	// 左右箭头淡入
		  	$(".banner i").fadeIn();
		  }).mouseleave(function() {
		  	timer = setInterval(nextPlay,2000);
		  	// 左右箭头淡出
		  	$(".banner i").fadeOut();
		  });

		  // 点击右箭头，播放下一张
		  $(".banner .right").click(function() {
		  	nextPlay();
		  });
		  // 点击左箭头，播放上一张
		  $(".banner .left").click(function() {
		  	prevPlay();
		  });

  	});