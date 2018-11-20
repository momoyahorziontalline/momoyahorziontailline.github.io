
//AOS初始化
AOS.init();

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
            slidesPerGroup: 1,
        }
    },
});

//banner
$('.carousel').carousel({
    interval: 2000
});

// section_navbar 滾動效果
var intViewportHeight = window.innerHeight;
var navFixHeight = intViewportHeight - 100;

window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.body.scrollTop > navFixHeight || document.documentElement.scrollTop > navFixHeight) {
        /*當卷軸滾動超過50px時，執行以下程式*/
        console.log("123");

        document.querySelector("#navbar_1").classList.add('fixed');
    } else {
        document.querySelector("#navbar_1").classList.remove('fixed');
    }
}

//backtop
$('.backtop').hide();

//button fade in fade out 
$(document).scroll(function () {

    if ($(this).scrollTop() > 200) {
        $('.backtop').fadeIn();
    } else {
        $('.backtop').fadeOut();
    }
});

//animate scroll to top
$('.backtop').on('click', function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500)
});

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

