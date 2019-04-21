// JavaScript Document

$(document).ready(function(){
    $("#load").addClass("show");
    setTimeout(function(){
        $("#load .bow").addClass("move");
    },400);


    function enter() {
        $("#load").css({ opacity:0 });
        $(".pace").fadeOut(600);
        setTimeout(function(){
            $("#load").fadeOut();
        },600);
        if($("#home_food").length < 1){
            setTimeout(function(){
                $("#content").addClass("active");
                $("header").addClass("show");
            },1000);
        }

    }



    Pace.on('done', enter);






    /*set*/
    var window_w = $(window).width();
    var window_h = $(window).height();
    var footers=1;
    var active_m;
    var active_w;
    $(window).load(function() {








                  var window_w = $(window).width();
                  var window_h = $(window).height();

                  $(".app_show").fancybox({
                      maxWidth	: 696,
                      maxHeight	: 281,
                      fitToView	: false,
                      padding:0,
                      width		: '90%',
                      height		: '90%',
                      autoSize	: false,
                      closeClick	: false,
                      openEffect	: 'none',
                      closeEffect	: 'none'
                  });


                  // $("header #menu .logo").addClass("fadeInDown animated15");

                  // $("header #menu .time,header #menu .nav,header #menu .service").addClass("show");

                 // $("#loader").addClass("fadeOut animated15");
                 //  clearTimeout(timerx);
                 //  $("#counter").html('100');






                  //nav_btn
                  $("header #nav_btn").click(function(){
                    $(this).toggleClass("active");
                    $("header #menu").toggleClass("active");
                    $("#phone_box,#menubox").toggleClass("show");
                    $("#menubox_box").toggleClass("show");

                    $("header > .close").toggleClass("show");
                  });

                  $("header > .close").click(function(){
                    $("header #nav_btn").removeClass("active");
                    $("header #menu").removeClass("active");
                    $("#phone_box,#menubox").removeClass("show");
                    $("#menubox_box").removeClass("show");

                    $("header > .close").removeClass("show");
                  });

                  $("header .menu_button").click(function(){
                    $("#menu_box,#head_shadow").toggleClass("show");
                  });

                  $("#menu_close").click(function(){
                    $("#menu_box,#head_shadow").removeClass("show");
                  });

                  if ( window_w > 1024) {
                      $( "#language" ).selectmenu({
                        change: function( event, ui ) {

                        var vv=$(this).val();
                        var msg=lang[vv];
                        if(msg){
                            alert(msg);
                        }else{
                            if(vv==="tw")window.location.href=domain+page; else
                            window.location.href=domain+vv+"/"+page;
                        }

                        }
                      }).selectmenu( "menuWidget" ).addClass( "overflow" );
                  }else{
                      $( "#language" ).selectmenu().selectmenu( "destroy" );
                  }

                    // $(".various").fancybox({
                    //   maxWidth  : 430,
                    //   maxHeight : 310,
                    //   padding:0,
                    //   fitToView : false,
                    //   width   : '100%',
                    //   height    : '90%',
                    //   autoSize  : false,
                    //   closeClick  : true,
                    //   openEffect  : 'fade',
                    //   closeEffect : 'fade',
                    //   afterLoad: function(current, previous) {

                    //       setTimeout(function(){//關閉
                    //         console.info( 'close ');
                    //         $.fancybox.close( );
                    //       },2500);
                    //   }
                    // });




                  //    if($("#content").length > 0){

                  //       $("#modal-iframe-reservation").iziModal({
                  //           title: '', //Modal title
                  //           subtitle: '', //Modal subtitle
                  //           fullscreen: false, //Icon to expand modal to fullscreen
                  //           //headerColor: 'rgb(51, 76, 123)', //Color of modal header. Hexa colors allowed.
                  //           overlayColor: 'rgba(0, 0, 0, 0.8)', //Color of overlay behind the modal
                  //           autoOpen:false,
                  //           zindex: 1999,
                  //           width: 1000,
                  //           iframeHeight: $(window).height(),
                  //           iframe: true, //In this example, this flag is mandatory. Izimodal needs to understand you will call an iFrame from here
                  //           iframeURL: "reservation.html"
                  //       });


                  //       $(document).on('click', '#show_infomation', function (event) {
                  //           event.preventDefault();
                  //           $("#modal-iframe-reservation").iziModal('open', event);
                  //       });

                  //       $(document).on('click', '#close_reservation', function (event) {
                  //           $('#modal-iframe-reservation').iziModal('close');
                  //       });

                  //   }





                  // /*移過去切換圖*/
                  $("._menu_hover").each(function(){
                    var img1 = $(this).find('IMG').eq(0);
                    img1.css({'z-index':'2','position':'absolute',top:0,left:0}).show();
                    var img2 = $(this).find('IMG').eq(1);
                    img2.css({'z-index':'1','position':'absolute',top:0,left:0}).show();
                    $(this).hover(
                      function(){
                        if ($(this).hasClass('stop')) return false;
                        img1.stop().animate({opacity: '0'},500,function(){});
                        img2.stop().animate({opacity: '1'},500,function(){});
                      },
                      function(){
                        if ($(this).hasClass('stop')) return false;
                        img1.stop().animate({opacity: '1'},800,function(){});
                        img2.stop().animate({opacity: '0'},800,function(){});
                      }
                    );
                   });




               //點選回到最頂
                    $('#gotop').click(function() {
                        $("html,body").stop().animate({ scrollTop: 0 }, { duration: 800,  easing: "swing" });
                    });



                });




                //視窗重新縮放
               $(window).resize(function() {
                 var window_w = $(window).width();
                 var window_h = $(window).height();

                  if ( window_w > 1024) {
                      $( "#language" ).selectmenu({
                        change: function( event, ui ) {

                        var vv=$(this).val();
                        var msg=lang[vv];
                         if(msg){
                            alert(msg);
                        }else{
                            if(vv==="tw")window.location.href=domain+page; else
                            window.location.href=domain+vv+"/"+page;
                        }

                        }
                      }).selectmenu( "menuWidget" ).addClass( "overflow" );
                  }else{
                      $( "#language" ).selectmenu().selectmenu( "destroy" );
                  }
               });
                //視窗重新縮放 結束





                    $(window).scroll(function(event) {

                        var window_w = $(window).width();
                        var window_h = $(window).height();
                        offsetTop = $(window).scrollTop();


                        if(offsetTop > 160){
                          $("header").addClass("active");
                        }else{

                          $("header").removeClass("active");

                        }






                        // if( window_w > 1024 &&　$("#banner .imgs").length>0 && offsetTop<500){
                        //   var banner_img = $("#banner .imgs");
                        //   TweenLite.to(banner_img, 1, { 'background-position' : '50% '+ (50+offsetTop/10)+'%' });


                        // }







                  });






});
