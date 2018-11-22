$('.tab a').on('click', function (e) {
    // 先預設值
    e.preventDefault();
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    target = $(this).attr('href');
    // 隱藏
    $('.tab-content > div').not(target).hide();
    // 浮現
    $(target).fadeIn(600);
});