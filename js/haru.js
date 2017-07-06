(function (global, $){
    'use strict';
    var document = global.document;

    console.log('global.scrollY:', global.scrollY);
    
      $(global).scroll(function(){
        if (global.scrollY > 500){
          $('.nav-wrap').addClass("scroll-top");
        } else {
          $('.nav-wrap').removeClass("scroll-top");
        }
      });

      $('.reservation-menu-wrap').on('click', function(){
        if ($('.reservation-menu').hasClass('pop-up-on')){
          $('.reservation-menu').removeClass('pop-up-on').addClass('pop-up-off');
        } else {
          $('.reservation-menu').addClass('pop-up-on').removeClass('pop-up-off');
        }
          
          
        
      });
      


    // console.log('navigation:', navigation);
    
})(window, window.jQuery);