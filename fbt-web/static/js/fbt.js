$(function(){
  $('.nav a')
    .mouseenter(function() {
      $(this).addClass('active');
    })
    .mouseleave(function() {
      $(this).removeClass('active');
    });
});
