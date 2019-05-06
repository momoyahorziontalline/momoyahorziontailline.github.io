// // @ts-ignore
// $(".open-button").on("click", function () {
//     // @ts-ignore
//     $(this).closest('.collapse-group').find('.collapse').collapse('show');
// });

// // @ts-ignore
// $(".close-button").on("click", function () {
//     // @ts-ignore
//     $(this).closest('.collapse-group').find('.collapse').collapse('hide');
// });

// // @ts-ignore
// $(document).ready(function(){
//     // @ts-ignore
//     $(".fancybox").fancybox({
//         openEffect: "none",
//         closeEffect: "none"
//     });
// });

// @ts-ignore
$(window).scroll(function () {
    // Navbar 
    // @ts-ignore
    if (($(window).scrollTop() + 5) > $('#video').css('height').toString().replace('px', '')) {

        // @ts-ignore
        if ($('#navbar').hasClass('navshow') == false) {
            // @ts-ignore
            $('#navbar').css('background', '').toggleClass('navshow');
            // @ts-ignore
            // $('#GoTop').animate({ opacity: '0.6' }, 50);
        }
    } else {
        // @ts-ignore
        $('#navbar').removeClass('navshow').css('background', 'transparent');
        // @ts-ignore
        // $('#GoTop').animate({ opacity: '0' }, 50);
    }
});

//backtop
// $('.backtop').hide();

// //button fade in fade out 
// $(document).scroll(function () {

//     if ($(this).scrollTop() > 200) {
//         $('.backtop').fadeIn();
//     } else {
//         $('.backtop').fadeOut();
//     }
// });