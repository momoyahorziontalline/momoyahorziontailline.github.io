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

//******************
//*  javascript
//******************
// scrollToTop
function scrollToTop(scrollDuration) {
  const scrollHeight = window.scrollY,
    scrollStep = Math.PI / (scrollDuration / 15),
    cosParameter = scrollHeight / 2;
  var scrollCount = 0,
    scrollMargin,
    scrollInterval = setInterval(function () {
      if (window.scrollY != 0) {
        scrollCount = scrollCount + 1;
        console.log('計算次數  scrollCount:' + scrollCount);
        scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
        console.log('計算方法:' + cosParameter + '-' + cosParameter + ' * ' + '  Math.cos' + '(' + scrollCount + '*' + scrollStep + ')');
        window.scrollTo(0, (scrollHeight - scrollMargin));
        console.log(scrollMargin);
        console.log(' ');
      }
      else clearInterval(scrollInterval);
    }, 15);

  console.log('Y軸高度  scrollHeight:' + scrollHeight);
  console.log('圓周率(3.14159) / (1000 / 15)  scrollStep:' + scrollStep);
  console.log('Y軸高除於2  cosParameter:' + cosParameter);
}

//tab
var btn1 = document.querySelector('#btn1');
var btn2 = document.querySelector('#btn2');
var btn3 = document.querySelector('#btn3');
var btn4 = document.querySelector('#btn4');
var tab_content1 = document.querySelector('#tab_content1');
var tab_content2 = document.querySelector('#tab_content2');
var tab_content3 = document.querySelector('#tab_content3');
var tab_content4 = document.querySelector('#tab_content4');


btn1.onclick = function () {
  tab_content1.classList.add("show");
  tab_content2.classList.remove("show");
  tab_content3.classList.remove("show");
  tab_content4.classList.remove("show");
}
btn2.onclick = function () {
  tab_content1.classList.remove("show");
  tab_content2.classList.add("show");
  tab_content3.classList.remove("show");
  tab_content4.classList.remove("show");
}
btn3.onclick = function () {
  tab_content1.classList.remove("show");
  tab_content2.classList.remove("show");
  tab_content3.classList.add("show");
  tab_content4.classList.remove("show");
}
btn4.onclick = function () {
  tab_content1.classList.remove("show");
  tab_content2.classList.remove("show");
  tab_content3.classList.remove("show");
  tab_content4.classList.add("show");
}

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

