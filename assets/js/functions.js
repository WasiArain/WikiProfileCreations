jQuery(document).ready(function() {

    $('.closeexitpop').click(function() {
        $('#ddexitpopwrapper').removeClass('open');
    });


    jQuery('.sing-right.col-md-4').theiaStickySidebar({
        additionalMarginTop: 40
    });


    if (window.location.href.indexOf("lp-coupon") > -1) {

        jQuery('.various.various-hide').click(function() {

            jQuery('div#CountDownTimerMini').hide();

        });

        count = 0;
        limit = 1;

        var refreshId = setInterval(function() {
            if (count < limit) {
                $("#bouncepopup-overlay").css("display", "block")
                $("#bouncepopupform").toggle("bounce", {
                    times: 1
                }, "slow");
                count++;
            } else {
                clearInterval(refreshId);
            }
        }, 1);

        $(".bounce-close , .fancybox-bg").click(function() {
            $(".bouncepopup-overlay ,  .fancybox-bg").hide();
            $("#bouncepopupform").toggle("fadeOut");

        })


    }



    $('.linktotop').click(function(e) {
        $('html, body').animate({
            scrollTop: $('#lptophead').offset().top - 20
        }, 'slow');
    });


    var selectedClass = "";
    $(".fil-cat").click(function() {
        $(this).addClass('active-pf');
        selectedClass = $(this).attr("data-rel");
        $("#portfolio").fadeTo(100, 0.1);
        $("#portfolio>div.scale-anm").not("." + selectedClass).fadeOut().removeClass('scale-anm');
        setTimeout(function() {
            $('.fil-cat').removeClass('active-pf');
            $("." + selectedClass).fadeIn().addClass('scale-anm');
            $("#portfolio").fadeTo(300, 1);
        }, 300);

    });

    $("#CountHeaderTimer").TimeCircles({
        time: {
            Days: {
                show: !1
            },
            Hours: {
                show: !0
            }
        }
    });



    $("#CountDownTimer3").TimeCircles({
        time: {
            Days: {
                show: false
            },
            Hours: {
                show: true
            }
        }

    });

    $("#CountDownTimerMini").TimeCircles({
        time: {
            Days: {
                show: false
            },
            Hours: {
                show: true
            }
        }

    });

    if (window.location.href.indexOf("order-step-2") > -1) {
        jQuery('.js-example-basic-multiple').select2();

        jQuery('.input-changer0').on('click', function() {
            jQuery('input[type=submit]').removeClass('hide-btn');
        });

        jQuery('.input-changer0').on('click', function() {
            jQuery('input[type=submit]').removeClass('hide-btn');
        });

        jQuery('.input-changer').on('change', function() {
            var id = jQuery(this).data('target');
            console.log(id);
            var related = jQuery(this).data('related');
            if (jQuery(this).attr('type') == 'radio') {
                jQuery(related).removeClass('show');
                jQuery(related).addClass('hide-btn');
                jQuery(id).addClass('show');
            } else if (jQuery(this).attr('type') == 'checkbox') {
                if (jQuery(this).prop('checked')) {
                    jQuery(id).addClass('show');
                } else {
                    jQuery(id).find('input,textarea').val('');
                    jQuery(id).find('input[type="radio"]').prop('checked', false);
                    jQuery(id).removeClass('show');
                    jQuery(id).addClass('hide-btn');
                }
            }
            if (jQuery(this).prop('checked')) {
                jQuery('.btn-submit').removeClass('hide-btn');
            }
        });
    }




    if (window.location.href.indexOf("order-step-2") > -1 || window.location.href.indexOf("thank-you") > -1) {
        console.log('header not fixed');
    } else {
        jQuery(window).on('scroll', function() {
            var navScrollTop = jQuery(this).scrollTop();
            if (navScrollTop > 30) {
                jQuery('.header-container').addClass('header-fixed animated fadeInDown');
            } else {
                jQuery('.header-container').removeClass('header-fixed animated fadeInDown');
            }
        });
    }


    jQuery('.chat').click(function() {
        Tawk_API.toggle();
    });



    jQuery("#lp6CountDownTimer").TimeCircles({
        time: {
            Days: {
                show: !1
            },
            Hours: {
                show: !0
            }
        }
    });

    // jQuery("#lpinnerform").validate({});
    // jQuery("#lp6innerform0").validate({});
    // jQuery("#lpfooterform").validate({});

    // jQuery("#indentform").validate({});

    // jQuery("#singValid").validate({});

    // jQuery("#popupform").validate({});
    // jQuery("#secondstep").validate({});
    // jQuery("#contactform").validate({});
    // jQuery("#footerform").validate({});
    // jQuery("#innerform").validate({});
    // jQuery("#subscribe").validate({});
    // jQuery("#bottomform").validate({});
    // jQuery("#sideForm").validate({});


    jQuery('.this-item').click(function(event) {
        jQuery('.this-item').removeClass('this-active');
        jQuery(this).addClass('this-active');
        event.preventDefault();
    });


    jQuery('.mobile-view li.menu-item-has-children').prepend('<span class="opensub"><i class="fa fa-angle-down" aria-hidden="true"></i></span>');


    jQuery('.opensub , li.current-menu-item > a').click(function() {

        jQuery(this).siblings('.sub-menu').toggle('slow');

    });

    jQuery('.mobile-overlay , .mobile-close i.fa').click(function() {
        jQuery("#mobile-menu").removeClass("mopen");
        jQuery('.mobile-overlay').removeClass('moverlay');
        jQuery('.mobile-close').removeClass('mclose');
    });



    jQuery('.headnav i.fa').click(function() {
        jQuery("#mobile-menu").toggleClass("mopen");
        jQuery('.mobile-overlay').addClass('moverlay');
        jQuery('.mobile-close').addClass('mclose');
    });



    $('#lp6textslider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        margin: 0,
        items: 1,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1

            }
        }
    });



    $('#testimonails-slider').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        margin: 10,
        items: 2,
        auto: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            600: {
                items: 1,
                nav: false
            },
            1000: {
                items: 2,
                nav: false,
                loop: false
            }
        }
    });

    var $owl = $('#owl-carousel-testim');

    $owl.children().each(function(index) {
        $(this).attr('data-position', index);
    });

    $owl.owlCarousel({
        center: true,
        loop: true,
        margin: 0,
        // items: 3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });

    $(document).on('click', '.owl-item>div', function() {
        $owl.trigger('to.owl.carousel', $(this).data('position'));
    });


    jQuery('.etop-tbn').click(function(ev) {
        ev.preventDefault();
        //  console.log('test');
        jQuery('#consult').hide();
        jQuery('#activate').show();
        jQuery('#ouibounce-modal , #ouibounce-modal0').css('display', 'block');

    });
    jQuery('.openpop ').click(function(ev) {
        ev.preventDefault();
        //  console.log('test');
        jQuery('#consult').show();
        jQuery('#activate').hide();
        jQuery('#ouibounce-modal , #ouibounce-modal0').css('display', 'block');
    });

    jQuery('.underlay').click(function() {
        jQuery('#ouibounce-modal , #ouibounce-modal0').css('display', 'none');
    });






    $('.cus-overlay').click(function() {
        $('#ouibounce-modal2').attr('id', 'ouibounce-modal');
        setTimeout(function() {
            $('#ouibounce-modal').css('display', 'block')
        }, 1000);

    });


    jQuery('.strip').click(function() {
        jQuery(".floating-form").toggleClass("open");

    });

    jQuery('.floating-overlay').click(function() {
        jQuery(".floating-form").removeClass("open");
    });

    jQuery(window).scroll(function() {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 300) {
            jQuery(".etop-container").addClass("etop-fixed animated slideInUp");
            jQuery(".floating-form").addClass("float-fixed");
        } else {
            jQuery(".etop-container").removeClass("etop-fixed animated slideInUp");
            jQuery(".floating-form").removeClass("float-fixed");
        }
    });

});



function validate(evt) {

    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9+]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}