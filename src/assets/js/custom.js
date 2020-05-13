$(document).ready(function() {
    "use strict";

    //LEFT MOBILE MENU OPEN
    $(".ts-menu-5").on('click', function() {
        $(".mob-right-nav").css('right', '0px');
    });

    //LEFT MOBILE MENU OPEN
    $(".mob-right-nav-close").on('click', function() {
        $(".mob-right-nav").css('right', '-270px');
    });

    //LEFT MOBILE MENU CLOSE
    $(".mob-close").on('click', function() {
        $(".mob-close").hide("fast");
        $(".menu").css('left', '-92px');
        $(".mob-menu").show("slow");
    });

    //mega menu
    $(".t-bb").hover(function() {
        $(".cat-menu").fadeIn(50);
    });
    $(".ts-menu").mouseleave(function() {
        $(".cat-menu").fadeOut(50);
    });

    //mega menu
    $(".sea-drop").on('click', function() {
        $(".sea-drop-1").fadeIn(100);
    });
    $(".sea-drop-1").mouseleave(function() {
        $(".sea-drop-1").fadeOut(50);
    });
    $(".dir-ho-t-sp").mouseleave(function() {
        $(".sea-drop-1").fadeOut(50);
    });

    //mega menu top menu
    $(".sea-drop-top").on('click', function() {
        $(".sea-drop-2").fadeIn(100);
    });
    $(".sea-drop-1").mouseleave(function() {
        $(".sea-drop-2").fadeOut(50);
    });
    $(".top-search").mouseleave(function() {
        $(".sea-drop-2").fadeOut(50);
    });

    //ADMIN LEFT MOBILE MENU OPEN
    $(".atab-menu").on('click', function() {
        $(".sb2-1").css("left", "0");
        $(".btn-close-menu").css("display", "inline-block");
    });

    //ADMIN LEFT MOBILE MENU CLOSE
    $(".btn-close-menu").on('click', function() {
        $(".sb2-1").css("left", "-350px");
        $(".btn-close-menu").css("display", "none");
    });

    //mega menu
    $(".t-bb").hover(function() {
        $(".cat-menu").fadeIn(50);
    });
    $(".ts-menu").mouseleave(function() {
        $(".cat-menu").fadeOut(50);
    });
    //review replay
    $(".edit-replay").on('click', function() {
        $(".hide-box").show();
    });

    //PRE LOADING
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });

    $('.dropdown-button').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrainWidth: 400, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: 0, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left', // Displays dropdown with edge aligned to the left of button
        stopPropagation: false // Stops event propagation
    });
    $('.dropdown-button2').dropdown({
        inDuration: 300,
        outDuration: 225,
        constrain_width: false, // Does not change width of dropdown to that of the activator
        hover: true, // Activate on hover
        gutter: ($('.dropdown-content').width() * 3) / 2.5 + 5, // Spacing from edge
        belowOrigin: false, // Displays dropdown below the button
        alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });

    //Collapsible
    // $('.collapsible').collapsible();

    //material select
    // $('select').material_select();
	
    //HOME PAGE FIXED MENU
    $(window).scroll(function() {

        if ($(this).scrollTop() > 450) {
            $('.hom-top-menu').fadeIn();
            $('.cat-menu').hide();
        } else {
            $('.hom-top-menu').fadeOut();
        }
    });


});



function scrollNav() {
    $('.v3-list-ql-inn a').click(function() {
        //Toggle Class
        $(".active-list").removeClass("active-list");
        $(this).closest('li').addClass("active-list");
        var theClass = $(this).attr("class");
        $('.' + theClass).parent('li').addClass('active-list');
        //Animate
        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 130
        }, 400);
        return false;
    });
    $('.scrollTop a').scrollTop();
}



//Tab Scroll
$(document).ready(function() {
    var slide = 0;
    $(".slide-left").click(function() {
        slide = slide + 200;
        if (slide > 0) {
            slide = 0;
        }
        $(".list-cat").css({'left': slide+'px'});
    });
    
    $(".slide-right").click(function() {
        slide = slide - 200;
        let listWidth = $(".list-cat").width();
        let centerWidth = $(".slide-center").width() - 160;
        if (slide < -(listWidth - centerWidth)) {
            slide = -(listWidth - centerWidth);
        }
        $(".list-cat").css({'left': slide+'px'});
    });
    
    $(".slide-left-outsize").click(function() {
        slide = 0;
        $(".list-cat").css({'left': slide});
    });
    
    $(".slide-right-outsize").click(function() {
        let listWidth = $(".list-cat").width();
        let centerWidth = $(".slide-center").width() - 160;
        slide = -(listWidth - centerWidth);
        $(".list-cat").css({'left': slide+'px'});
    });
});

$(document).ready(function(){
    function toggleIcon(e) {
                    $(e.target)
                            .prev('.panel-heading')
                            .find(".more-less")
                            .toggleClass('glyphicon-plus glyphicon-minus');
                }
                $('.panel-primary').on('hidden.bs.collapse', toggleIcon);
                $('.panel-primary').on('shown.bs.collapse', toggleIcon);
    
                $('.accordion').on('hidden.bs.collapse', toggleIcon);
                $('.accordion').on('shown.bs.collapse', toggleIcon);
           
    });

scrollNav();

$(document).ready(function () {
$('.collapse').on('show.bs.collapse', function () {
  $('.collapse').each(function(){
      $(this).collapse('hide');
  });
});
});

$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.show").each(function(){
      $(this).prev(".panel-heading").find(".fa").addClass("fa-angle-up").removeClass("fa-angle-down");
    });
    
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
      $(this).prev(".panel-heading").find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
    }).on('hide.bs.collapse', function(){
      $(this).prev(".panel-heading").find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
    });
});



$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
});

// $(document).ready(function () {
// $('.modal').on('show.bs.modal', function () {
   
//     $('.modal .modal-body').css('overflow-y', 'auto'); 
//     $('.modal .modal-body').css('max-height', $(window).height() * 0.7);
// });
// });


$(document).ready(function() {
    $(function () {
      $('[data-toggle="popover"]').popover()
    });
  
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
  });

  
  $(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
       isClosed = false;
  
      trigger.click(function () {
        hamburger_cross();      
      });
  
      function hamburger_cross() {
  
        if (isClosed == true) {          
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          isClosed = false;
        } else {   
          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          isClosed = true;
        }
    }
    

    $('[data-toggle="offcanvas"]').click(function () {
          $('#wrapper').toggleClass('toggled');
    });  

 
  });

