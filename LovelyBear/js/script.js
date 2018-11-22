//******************
//*     jquery
//******************
//navbar
$('.navbarTrigger').click(function () {
  $(this).toggleClass('active');
  // console.log("Clicked menu");
  $("#mainListDiv").toggleClass("show_list");
  $("#mainListDiv").fadeIn();

});

//收合
$('.main_list ul li a').click(function () {
  /* always close responsive nav after click */
  $('.navbarTrigger:visible').click();
});

//banner
$(function () {
  var $item = $('.carousel .carousel-item');
  var $wHeight = $(window).height();
  $item.height($wHeight);
  $item.addClass('full-screen');

  $('.carousel img').each(function () {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
      'background-image': 'url(' + $src + ')',
      'background-color': $color
    });
    $(this).remove();
  });

  //縮放視窗調整視窗高度
  $(window).on('resize', function () {
    $wHeight = $(window).height();
    $item.height($wHeight);
  });
});

// 跑馬燈marquee
$(function () {
  var $marqueeUl = $('div#marquee ul'),
    $marqueeli = $marqueeUl.append($marqueeUl.html()).children(),
    _height = $('div#marquee').height() * -1,
    scrollSpeed = 600,
    timer,
    speed = 3000 + scrollSpeed;

  $marqueeli.hover(function () {
    clearTimeout(timer);
  }, function () {
    timer = setTimeout(showad, speed);
  });

  function showad() {
    var _now = $marqueeUl.position().top / _height;
    _now = (_now + 1) % $marqueeli.length;

    // $marqueeUl 移動
    $marqueeUl.animate({
      top: _now * _height
    }, scrollSpeed, function () {

      if (_now == $marqueeli.length / 2) {
        $marqueeUl.css('top', 0);
      }
    });

    timer = setTimeout(showad, speed);
  }

  timer = setTimeout(showad, speed);

  $('a').focus(function () {
    this.blur();
  });
});

//cover
var cover = new TimelineMax();
cover.to("#load", 0, { center: 0 })
.to("#load", 5.0, { opacity: 0, scale: 1 }, 1.5)
.to("#section_cover", 5.0, { height: 0}, 2);






