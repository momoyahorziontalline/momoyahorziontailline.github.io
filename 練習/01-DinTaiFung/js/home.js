$(document).ready(function(){
    setTimeout(function(){
        $("#video .bg01 .bg1").addClass("fadeInUp animated").css({opactiy:1});
    }, 400);
    setTimeout(function(){
        $("#video .bg01 .bg2").addClass("fadeInUp animated15").css({opactiy:1});
    }, 1000);



    $(window).load(function() {
                    var window_w = $(window).width();
                    var window_h = $(window).height();
                    var window_w_first = $(window).width();

                    var myPlayer;
                    $(".various").fancybox({
                		maxWidth	: 800,
                		maxHeight	: 600,
                		fitToView	: false,
                        padding:0,
                		width		: '100%',
                		height		: '100%',
                		autoSize	: false,
                		closeClick	: false,
                		openEffect	: 'none',
                		closeEffect	: 'none',
                        afterLoad: function(current, previous) {

                            setTimeout(function(){
                                $(".fancybox-outer .ytp-cued-thumbnail-overlay-image").click();
                            }, 1000);
                        }
                	});


                    var _speed=0;
                    if(window_w>1024){
                        _speed=3000;
                    }else{
                        _speed=300;
                    }

                      var bx_pic=$('.bx_home').bxSlider({
                          mode:'fade',
                          speed:800,
                          pause:5000,
                          easing:'easeOutQuart',
                          auto: true,
                          infiniteLoop: true,
                          captions:true,
                          touchEnabled:false,
                          controls:false,
                          pager:true,
                          onSliderLoad:function(currentIndex){
                              // $(".slider li").eq(0).addClass("active");
                              $("#believe .bx-wrapper .bx-pager").css({"margin-top": - $("#believe .bx-wrapper .bx-pager").height()/2 });
                          },
                          onSlideBefore:function($slideElement, oldIndex, newIndex){
                              $("#believe .left_box .memo_block .memo_box").hide('fade',300);
                          },
                          onSlideAfter:function($slideElement, oldIndex, newIndex){
                              if(window_w>1024){
                                  $("#believe .left_box .memo_block .memo_box" + $slideElement.find('.imgs').attr("data-id") ).show('blind',500);
                              }else{
                                  $("#believe .left_box .memo_block .memo_box" + $slideElement.find('.imgs').attr("data-id") ).show('fade',300);
                              }

                          }
                      });


                      var swiper = new Swiper('.swiper-container', {
                             speed:900,
                            //  nextButton: '.swiper-button-next',
                            //  prevButton: '.swiper-button-prev',
                             slidesPerView: 5,
                             centeredSlides: true,
                             paginationClickable: true,
                             spaceBetween: 30,
                            //  pagination: '.swiper-pagination',
                             autoplay:5000,
                            //  autoplayStopOnLast:false,
                             loop: true,
                             touchRatio:0,
                             resistance: false,

                            onInit: function(swiper) {
                                $(".swiper-slide.swiper-slide-active").prev().addClass("neigh");
                            },
                            onSlideChangeStart: function(swiper) {
                                $("#home_food .food_slider .swiper-slide").removeClass("_ready");
                                $(".swiper-slide-next").next().addClass("_ready");
                                $(".swiper-slide-prev").prev().addClass("_ready");
                                var a = swiper.realIndex;
                                console.log(a);
                                $("#home_food .food_slider .text .box_info").stop(1,1).hide();
                                $("#home_food .food_slider .text .box_info"+(a+1)).stop(1,1).show('fade',1000);
                            },
                            breakpoints: {
                               1400: {
                                   speed:900,
                                   slidesPerView: 3,
                                   spaceBetween: 30,
                                   autoplay:3000,
                               },
                               700: {
                                   speed:900,
                                   slidesPerView: 2,
                                   spaceBetween: 30,
                                   autoplay:3000,
                               }
                            }

                         });

                         if(window_w>1024){
                             $('.food_slider .swiper-container').hover(function(){
                                 swiper.stopAutoplay();
                                 console.log('h');
                             },function(){
                                 swiper.startAutoplay();
                                 console.log('o');
                             });
                         }

                         var swiper2 = new Swiper('.world-container', {
                             nextButton: '.swiper-button-next',
                             prevButton: '.swiper-button-prev',
                             slidesPerView: 'auto',
                             paginationClickable: true,
                             spaceBetween: 33,
                             slidesPerGroup:5
                        });


                        $("#globo .map .worldname").each(function() {
                            var _t=$(this).attr("dtop");
                            var _left=$(this).attr("dleft");
                            var _id=$(this).attr("data-id");
                            //console.log('<div class="circle" style="left:'+ _left +'px;top:+'_t+'px; "></div>');
                            $("#globo .map_box .worldmap").append( '<div class="circle circle'+_id+'" data-id='+_id+' style="left:'+ _left +';top:' + _t +'; "></div>' );


                        });


                        // $(document).on('click','.worldmap .circle',function(){
                        //     var _clickid=$(this).attr("data-id");
                        //     var _memo=$(this).attr("dname");
                        //     var _thisname=$("#globo .map .worldname[data-id="+ _clickid +"]").html();
                        //     $("#globo .map_box .box").stop(1,1).hide();
                        //     $("#globo .map .worldname").removeClass("active");
                        //     $("#globo .map .worldname[data-id="+ _clickid +"]").addClass("active");
                        //     $(".circle").removeClass("active");
                        //     $(".circle"+_clickid).addClass("active");
                        //     $("#globo .map_box .box .title").html(_thisname);
                        //     $("#globo .map_box .box .small").html(_memo);
                        //     $("#globo .map_box .box").stop(1,1).show('fade',500);
                        //     album_js(_clickid);
                        // });



                        $(document).on('click','.worldname',function(){
							console.log('a');
                            var _clickid=$(this).attr("data-id");
                            var _memo=$(this).attr("dname");
                            var _thisname=$(this).html();
                            $("#globo .map_box .box").stop(1,1).hide();
                            $("#globo .map .worldname").removeClass("active");
                            $(this).addClass("active");
                            $(".circle").removeClass("active");
                            $(".circle"+_clickid).addClass("active");
                            $("#globo .map_box .box .title").html(_thisname);
                            $("#globo .map_box .box .small").html(_memo);
                            $("#globo .map_box .box").stop(1,1).show('fade',500);
                            album_js(_clickid);
                        });

                        $("#globo .c_select select").on('change', function () {
							console.log('b');
                              var _id = $(this).val(); // get selected value
                              //var _memo = $(this).attr('memo'); // get selected value
                              var _cname = $("#globo .c_select select :selected").text();
                              var _memo = $("#globo .c_select select :selected").attr('memo');
                              $("#globo .map_box .box").stop(1,1).hide();
                              $("#globo .map .worldname").removeClass("active");
                              $("#globo .map_box .box .title").html(_cname);
                              $("#globo .map_box .box .small").html(_memo);
                              $("#globo .map_box .box").stop(1,1).show('fade',500);
                              album_js(_id);
                         });



                        $("#globo .map .worldname").eq(0).click();


                        function album_js(id) {
                            var _clickid = id;
                            console.log(_clickid);

                            $("#album_show").load('index_album.php?id='+id,function functionName() {
                                console.log('index_album');
                                var _this=$(this);
                                var slideWidth_;
                                var _maxSlides= 4;
                                if(window_w>1024){
                                    slideWidth_=166;
                                }else{
                                    slideWidth_= $("#album_show #album .thumb_block .thumb_box").width()/4 ;
                                    if(slideWidth_ < 128){
                                        slideWidth_=128;
                                    }
                                    if(window_w < 500){
                                        _maxSlides=2;
                                    }
                                }

								if($("#album_show").html().length == 0){
									$("#album_show").hide();
								}else{
									$("#album_show").show();
									var bxslider_method_thumb=$('.bx_thumb').bxSlider({ //相簿縮圖
										captions: false,
										minSlides: 2,
										maxSlides: _maxSlides,
										slideWidth: slideWidth_,
										pause:2000,
										speed:800,
										infiniteLoop:false,
										pager:false,
										hideControlOnEnd:true,
										slideMargin: 1,
										onSliderLoad:function(currentIndex){
											//initial();
											$("#album_show #album .thumb_block .store_box").click(function() {
												var _dataid = $(this).attr('dataid');
												$(".show_big").stop(1,1).fadeOut();
												$("#album_show #album .thumb_block .store_box").removeClass("active");
												$(this).addClass("active");
                                                $(".show_big").stop(1,1).fadeIn();
												$(".show_big").load('index_album_big.php?id='+_dataid,function() { //大圖顯示



													var _this_page=$(this).find('.page');
													var _this_page_now=$(this).find('.now');
													console.log('index_album_big');
													var mth_l=$(".big_album li").length;
                                                    var _cc=false;
													$(".page .sum").html('0'+mth_l);
                                                    if( $(".big_album li").length > 1){
                                                        _cc=true;
                                                    }
													var big_=$('.big_album').bxSlider({
														mode: 'fade',
														captions: false,
														pause:3000,
														speed:800,
														infiniteLoop:true,
														hideControlOnEnd:false,
														pager:false,
														controls:_cc,
														// auto:true,
														onSliderLoad:function(currentIndex){
															//initial();
														},
														onSlideBefore: function($slideElement, oldIndex, newIndex){
															if( newIndex < 9){
																_this_page_now.html('0'+(newIndex+1));
															}else{
																_this_page_now.html(newIndex+1);
															}
														},
														onSlideAfter: function($slideElement, oldIndex, newIndex){
														}
													});

												});

											});
											$("#album_show #album .thumb_block .store_box").eq(0).click();
										},
										onSlideBefore: function($slideElement, oldIndex, newIndex){
											// $("#album_002 .control_up .page .now").html('0'+(newIndex+1));
										},
										onSlideAfter: function($slideElement, oldIndex, newIndex){
										}
									});

								}

                            });
                        }


                        $("#video .go_down").click(function() {
                            var p_h=0;
                            if( window_w < 1024){
                                p_h= $("header").height();
                            }
                            $("html,body").stop().animate({ scrollTop: $("#believe").offset().top - p_h + 2 }, { duration: 1300,  easing: "easeOutQuint" });
                        });


                        if(window_w > 768){

                            $("#believe").waypoint(function() {
                                var _this=$(this);
                                // _this.addClass("fadeInUp animated15").css({opactiy:1});
                                setTimeout(function(){
                                   _this.find('.title_img').addClass("active");
                               }, 800);
                               setTimeout(function(){
                                 $("#believe .left_box .memo_block").addClass("fadeInUp animated15").css({opactiy:1});
                                 if(window_w > 1024){
                                    // bx_pic.startAuto();
                                    //$('#site').YTPSetAlign('top,right')
                                 }
                               }, 1300);

                            }, { offset: window_h/1.3});

                             $("#home_news").waypoint(function() {
                                 var _this=$(this);
                                 _this.addClass("fadeInUp animated15").css({opactiy:1});
                                 setTimeout(function(){
                                    _this.find('.title_img').addClass("active");
                                }, 800);


                              }, { offset: window_h/1.3});

                              $("#globo").waypoint(function() {
                                  var _this=$(this);
                                  _this.addClass("fadeInUp animated15").css({opactiy:1});
                                  setTimeout(function(){
                                     _this.find('.title_img').addClass("active");
                                 }, 800);
                                 setTimeout(function(){
                                   $("#globo > .mainmemo").addClass("active");
                                   $("#globo > .map").addClass("active");
                                 }, 1300);


                               }, { offset: window_h/1.3});



                        }else{

                                $("#believe").addClass("fadeInUp animated15").css({opactiy:1});
                                $("#believe").find('.title_img').addClass("active");
                                $("#believe .left_box .memo_block").addClass("fadeInUp animated15").css({opactiy:1});
                                $("#home_news").addClass("fadeInUp animated15").css({opactiy:1});
                                $("#home_news").find('.title_img').addClass("active");
                                $("#globo").addClass("fadeInUp animated15").css({opactiy:1});
                                $("#globo").find('.title_img').addClass("active");
                                $("#globo > .mainmemo").addClass("active");
                                $("#globo > .map").addClass("active");

                        }

                          var frameProportion = 1.78, //png frame aspect ratio
                      		frames = 25, //number of png frames
                      		resize = false;
                          	var transitionLayer = $('.cd-transition-layer');
                      	//	var delay = ( $('.no-cssanimations').length > 0 ) ? 0 : 600;

                            setLayerDimensions();
                            function setLayerDimensions() {
                        		var windowWidth = $(window).width(),
                        			windowHeight = $(window).height(),
                        			layerHeight, layerWidth;

                        		if( windowWidth/windowHeight > frameProportion ) {
                        			layerWidth = windowWidth;
                        			layerHeight = layerWidth/frameProportion;
                        		} else {
                        			layerHeight = windowHeight*1.2;
                        			layerWidth = layerHeight*frameProportion;
                        		}

                        		$(".bg-layer").css({
                        			'width': layerWidth*frames+'px',
                        			'height': layerHeight+'px',
                        		});

                        		resize = false;
                        	}




                            $("#home_food").waypoint(function() {
                                var _this=$(this);
                                _this.addClass("fadeInUp animated15").css({opactiy:1});

                                setTimeout(function(){
                                    swiper.startAutoplay();
                                   _this.find('.title_img').addClass("active");
                                   setTimeout(function(){
                                    //    _this.find('.cd-transition-layer').addClass("closing");
                                    //    setTimeout(function(){
                                    //        _this.find('.cd-transition-layer').removeClass("visible");
                                    //        _this.find('.cd-transition-layer').removeClass("opening");
                                    //    }, 2200);
                                        $(".food_slider").addClass("fadeInUp animated15").css({opactiy:1});
                                   }, 800);
                               }, 800);

                             }, { offset: window_h/1.3});

                        var figureimg,
                        timer=1;
                        $("#people").waypoint(function() {
                            if(timer==1){
                                figureimg = $('#people figure').toArray();
                                figureimg.sort(function(){return 0.5-Math.random();});
                                if(window_w < 500){
                                    figureimg[0].remove();
                                    figureimg[1].remove();
                                }

                                TweenMax.staggerTo(figureimg, 0.8, { className: '+=active', ease: Quad.easeInOut}, 0.3);

                                timer=2;
                            }

                        }, { offset: window_h/1.3});




                    function home_start() {
                        if(window_w>1024){


                                //
                                // home_menu_link = $('header #menu .link').toArray();

                                // setTimeout(function(){
                                //
                                //     // $("#video .bg01 .bg1").addClass("fadeInUp animated15").css({opactiy:1});
                                // }, 1300);

                                // setTimeout(function(){
                                //     // $("#video .bg01 .bg2").addClass("fadeInUp animated15").css({opactiy:1});
                                // }, 1800);

                                setTimeout(function(){
                                    $("#video .fly02").addClass("active");
                                }, 800);
                                setTimeout(function(){
                                    $("#video .fly01").addClass("active");
                                }, 1600);

                                setTimeout(function(){
                                    $("#video .video").addClass("show");
                                    $(".cd-transition-layer").addClass("opening");
                                    $("#video .video .black").addClass("color");
                                    myPlayer = jQuery("#site").YTPlayer();
                                    //$('#site').YTPPlay();
                                },2700);

                                setTimeout(function(){
                                    $("#video .video .site").addClass("active");
                                    $("#video").addClass("wist");
                                    $("#video .front_bg").addClass("active");
                                }, 3500);

                                setTimeout(function(){
                                    // setTimeout(function(){
                                    //     $("#video .video_play").addClass("fadeInUp animated15").css({opactiy:1});
                                    // }, 500);
                                    setTimeout(function(){
                                        $("#video .go_down").addClass("fadeInUp animated15").css({opactiy:1});
                                        $("#video .number_s").addClass("fadeInUp animated15").css({opactiy:1});
                                    }, 1000);
                                    $("#content").addClass("active");
                                    $("header").addClass("show");
                                }, 1500);


                        }else{

                            // $(".cd-transition-layer").addClass("closing");
                            // $("header").addClass("fadeIn animated15").css({opactiy:1});
                            $("header").addClass("show").css({opactiy:1});

                            setTimeout(function(){
                                $("#video").css({opactiy:1});
                                // $("#video .video").addClass("show");
                                // $("#video .video .site").addClass("active");
                                // $("#video").addClass("wist");
                                // $("#video .front_bg").addClass("active");
                                // $("#video .fly01").addClass("active");
                                // $("#video .fly02").addClass("active");
                                // $("#video .go_down").addClass("fadeInUp animated15").css({opactiy:1});
                                // $("#video .video").addClass("show");
                                // $("#video .video_play").addClass("fadeInUp animated15").css({opactiy:1});
                            }, 1000);

                            setTimeout(function(){
                                $("#video .fly01").addClass("active");
                                $("#video .fly02").addClass("active");
                            }, 1300);

                            setTimeout(function(){
                                $("#video .video").addClass("show");
                                $(".cd-transition-layer").addClass("opening");
                                $("#video .video .black").addClass("color");
                            },2000);

                            setTimeout(function(){
                                $("#video .video .site").addClass("show");

                            },2800);

                            setTimeout(function(){
                                $("#video .video_play").addClass("fadeIn animated").css({opactiy:1});
                                // $("#video .go_down").addClass("fadeInUp animated15").css({opactiy:1});
                            },3700);

                        }
                    }



                    Pace.on('done', home_start);




                    $(".scroll_down").click(function(){

                        $("html,body").stop().animate({ scrollTop:500 }, { duration: 1300,  easing: "easeOutQuint" });

                    });





               $(window).resize(function() {
                 var window_w = $(window).width();
                 var window_h = $(window).height();

                 var range = window_w_first - window_w;
                 if (range < 0) {
                     range = -range;
                 }
                 if (range > 400) {
                     location.reload();
                 }



               });
               $(window).scroll(function() {
                        var window_w = $(window).width();
                        var window_h = $(window).height();
                        offsetTop = $(window).scrollTop();


                        if( window_w > 1024){
                          var bgss = $("#home_news .flower");
                          TweenLite.to(bgss, 1, { y : -offsetTop/10 });

                          var bgss2 = $("#home_food .downbg .b02");
                          TweenLite.to(bgss2, 1, { y : offsetTop/10 });

                          var bgss3 = $("#home_news .downbg .b02");
                          var offsetTop20= offsetTop - bgss3.offset().top;
                          TweenLite.to(bgss3, 1, { y : offsetTop20/10 });

                          var bgss4 = $("#home_food .downbg .b01");
                          var offsetTop24= offsetTop - bgss4.offset().top;
                          TweenLite.to(bgss4, 1, { y : -offsetTop24/10 });







                        var bird01 = $("#video .fly01");
                        TweenLite.to(bird01, 1, { y : -offsetTop/12 });

                        var bird02 = $("#video .fly02");
                        TweenLite.to(bird02, 1, { y : offsetTop/8 });


                        }




               });



               var myPlayer2 = jQuery(".video").YTPlayer({
                  quality: 'highres',
                  containment: 'self',
                  showControls: 0,
                  ratio: 'auto',
                  autoPlay: 1,
                  loop: true,
                  optimizeDisplay: 1,
                  mute: false,
                  startAt: 0,
                  opacity: 1,
                  anchor: 'center',
               });



    });
});
