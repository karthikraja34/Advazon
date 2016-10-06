$(function(){
    
    //Cache winddow object
    var $window = $(window);
    
    //Parallax scrolling
    
    $('div[data-type="background"]').each(function(){
        var bg = $(this);
        
        $($window).scroll(function(){
            var ypos = -($window.scrollTop()/bg.data('speed'));
            var coords = '50%' + ypos +'px';
            bg.css({backgroundPosition: coords});
        });
    });
});