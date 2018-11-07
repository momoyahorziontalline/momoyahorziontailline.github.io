 // section_navbar 滾動效果
 var intViewportHeight = window.innerHeight;
 var navFixHeight = intViewportHeight - 5;

 window.onscroll = function () { myFunction() };

 function myFunction() {
     if (document.body.scrollTop > navFixHeight || document.documentElement.scrollTop > navFixHeight) {
         /*當卷軸滾動超過50px時，執行以下程式*/
         document.querySelector("#navbar_1").classList.add('fixed');
     } else {
         document.querySelector("#navbar_1").classList.remove('fixed');
     }
 }

//banner
$('.carousel').carousel({
    interval: 2000
});

//swiper
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 2,
    spaceBetween: 0,
    slidesPerGroup: 2,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        576: {
            slidesPerView: 1,
            spaceBetween: 10,
        }
    },
});