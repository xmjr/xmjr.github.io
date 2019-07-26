$(document).ready(function() {


  $('a.blog-button').click(function() {
    // If already in blog, return early without animate overlay panel again.
    if (location.hash && location.hash == "#blog") return;
    if ($('.panel-cover').hasClass('panel-cover--collapsed')) return;
    $('.main-post-list').removeClass('hidden');
    currentWidth = $('.panel-cover').width();
    if (currentWidth < 2000) {
      $('.panel-cover').addClass('panel-cover--collapsed');
    } else {
      $('.panel-cover').css('max-width',currentWidth);
      $('.panel-cover').animate({'max-width': '320px', 'width': '22%'}, 400, swing = 'swing', function() {} );
    }

    
  });

  if (window.location.hash && window.location.hash == "#blog") {
    $('.panel-cover').addClass('panel-cover--collapsed');
    $('.main-post-list').removeClass('hidden');
  }

  if (window.location.pathname.substring(0, 5) == "/tag/") {
    $('.panel-cover').addClass('panel-cover--collapsed');
  }

  $('.btn-mobile-menu__icon').click(function() {
    // 导航按钮被点击
    // this.style.backgroundColor = '#fff'; 设置颜色后会自动消失
  });  


  var backTop = $(".back-top");

  // 点击“返回顶部”，页面按一定速度向上移动，直到顶部；
  backTop.on("click", function() {
    $("html,body").animate({scrollTop:0},500)
  })
  // 当位于第一屏时，不显示“返回顶部”按钮；
  $(window).on("scroll", function() {
    if($(window).scrollTop() > 0) {
      backTop.fadeIn();
    } else {
      backTop.fadeOut();
    }
  })
  // 最开始时，不出现“返回顶部”按钮；
  $(window).trigger("scroll");

});