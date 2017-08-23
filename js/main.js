$(document).ready(function(){
  // global variables

  var _window = $(window);

  // prevent default for blank links
  $('a[href="#"]').on('click', function(e){
    e.preventDefault();
  });

  // Smoth scroll
	$('a[href^="#top"], a[href^="#bottom"]').on('click', function() {
      var el = $(this).attr('href');
      var offset = 20;
      $('body, html').animate({
          scrollTop: $(el).offset().top - offset}, 1000);
      return false;
	});

  // Hamburger
  $('.hamburger').on('click', function(){
    $(this).toggleClass('is-active');
    $(this).parent().toggleClass('active');
  });

  // tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // hidden menu
  $(".hidden_menu").on('click', function(){
    $(this).toggleClass('active');
    $('.company_bar').toggleClass('active');
  });

  setScrolledPos();

  _window.on('scroll', function(){
    setScrolledPos();
  });

  _window.on('resize', function(){
    setScrolledPos();
  });

  function setScrolledPos(){
    var scrollTop = _window.scrollTop();

    if ( scrollTop > 40 && _window.width() < 1025 ){
      $(".hidden_menu").addClass('scrolled');
      $('.company_bar').addClass('scrolled');
    } else {
      $(".hidden_menu").removeClass('scrolled');
      $('.company_bar').removeClass('scrolled');
    }
  }

  $(document).mouseup(function (e) {
    var container = new Array();
    var value = $('.company_bar');
    if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
      $(".hidden_menu").removeClass('active');
      $('.company_bar').removeClass('active');
    }
  });


  // prev functionaloty
  function hideallDropdowns() {
    $(".dropped .drop-menu-main-sub").removeClass('showing');
    $(".dropped").removeClass('dropped');
    $(".dropped .drop-menu-main-sub .title").unbind("click");
    $(".dropped .drop-menu-main-sub .title").unbind("click");
  }

  function showDropdown(el) {
    var el_li = $(el).parent().addClass('dropped');
    el_li
        .find('.title')
        .click(function () {
            hideallDropdowns();
        })
        .html($(el).html());

    el_li.find('.drop-menu-main-sub').addClass('showing');
  }

  $(".drop-down").click(function(){
    showDropdown(this);
  });

  $(document).mouseup(function () {
    hideallDropdowns();
  });

});
