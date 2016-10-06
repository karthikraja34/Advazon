var Overlay = document.getElementsByClassName("overlay");

$('#menu').click(function(){
  $('.navbar').toggleClass("overlay");
    $('.navigation-drawer').toggleClass("open");
    
});


$('.overlay').click(function(){
  $('.navbar').toggleClass("overlay");
    $('.navigation-drawer').toggleClass("open");
});

