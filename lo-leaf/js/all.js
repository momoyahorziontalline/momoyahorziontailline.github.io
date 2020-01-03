//******************
//*     jquery
//******************
//navbar
// @ts-ignore
$('.nav-open').click(function () {
    // @ts-ignore
    $(".nav-container").toggleClass('active');
});


//backtop
// @ts-ignore
$('.backtop').hide();

//button fade in fade out 
// @ts-ignore
$(document).scroll(function () {
    // @ts-ignore
    if ($(this).scrollTop() > 10) {
        // @ts-ignore
        $('.backtop').fadeIn();
    } else {
        // @ts-ignore
        $('.backtop').fadeOut();
    }
});

//animate scroll to top
// @ts-ignore
$('.backtop').on('click', function () {
    // @ts-ignore
    $('body,html').animate({
        scrollTop: 0
    }, 500)
});



// Params
var sliderSelector = '.swiper-container',
    options = {
        init: false,
        loop: true,
        speed: 800,
        slidesPerView: 'auto', // or 'auto'
        //   spaceBetween: 10,
        centeredSlides: true,
        effect: 'coverflow', // 'cube', 'fade', 'coverflow',
        coverflowEffect: {
            rotate: 50, // Slide rotate in degrees
            stretch: 0, // Stretch space between slides (in px)
            depth: 100, // Depth offset in px (slides translate in Z axis)
            modifier: 1, // Effect multipler
            slideShadows: true, // Enables slides shadows
        },
        grabCursor: true,
        parallax: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            1023: {
                slidesPerView: 1,
                spaceBetween: 0
            }
        },
        // Events
        on: {
            imagesReady: function () {
                this.el.classList.remove('loading');
            }
        }
    };
// @ts-ignore
var mySwiper = new Swiper(sliderSelector, options);

// Initialize slider
mySwiper.init();