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

