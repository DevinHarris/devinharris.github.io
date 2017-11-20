$(function() {
  $.fn.scrollio = function() {
     $button = $('.scrollio');
     $button.on('click', function() {
       var scrollTo = $(this).attr('data-scroll');
       $('html, body').animate({
         scrollTop: $('#' + scrollTo).offset().top
       }, 1000);
     });
  };
});