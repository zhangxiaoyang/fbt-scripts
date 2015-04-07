$(function(){
  console.log(window.location.href.replace(/.+\//, '').replace('.html', ''));
  var $currentTag = $('#' + window.location.href.replace(/.+\//, '').replace('.html', ''));
  $('.nav a').mouseenter(function() {
      $('.nav a').removeClass('active');
      $(this).addClass('active');
  });
  $('.nav').mouseleave(function() {
      $('.nav a').removeClass('active');
      $currentTag.addClass('active');
  });
});
