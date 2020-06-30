//DETECTS THE POSITION ON THE SCREEN
$(document).ready(function() {
    if ($(document).scrollTop() <= 50) {
        $('#navBar').addClass('header_color');
        $('#navBar').removeClass('barra');
    } else {
        $('#navBar').addClass('barra');
        $('#navBar').removeClass('header_color');
    }
});
$(window).scroll(function() {
    if ($(document).scrollTop() <= 50) {
        $('#navBar').addClass('header_color');
        $('#navBar').removeClass('barra');
    } else {
        $('#navBar').addClass('barra');
        $('#navBar').removeClass('header_color');
    }
});
