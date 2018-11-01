//banner
$('.carousel').carousel({
  interval: 2000
})

// swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 2,
  spaceBetween: 30,
  slidesPerGroup: 2,
  loop: true,
  loopFillGroupWithBlank: true,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


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
  // console.log('計算次數:' + scrollCount);
  // console.log(scrollMargin);
  // console.log(scrollHeight);
  // console.log(scrollHeight);
}