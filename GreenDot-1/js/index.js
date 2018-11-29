$('.button_about_1').on('click', function() {
  $(".overlay_about").fadeIn("slow");
 
});
$('.button_about_2').on('click', function() {
  $(".overlay_about").fadeOut("slow");

});


$('.button_service_1').on('click', function() {
  $(".overlay_service").fadeIn("slow");
});

$('.button_service_2').on('click', function() {
  $(".overlay_service").fadeOut("slow");
});


$('.button_contact_1').on('click', function() {
  $(".overlay_contact").fadeIn("slow");
});

$('.button_contact_2').on('click', function() {
  $(".overlay_contact").fadeOut("slow");
});

//中間文字
anime.timeline({ loop: true })
.add({
    targets: '.letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: function (el, i) {
        return 70 * i;
    }
}).add({
    targets: '.letters',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});