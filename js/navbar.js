//DETECTS THE POSITION ON THE SCREEN
$(document).ready(function() {
    if ($(document).scrollTop() <= 100) {
        $('#nav').addClass('navbar_top');
        //$('#navbar').removeClass('barra');+
        //$('.navbar').css({"background-color":"white!important;"});
    } else {
        $('#nav').removeClass('navbar_top');
        //$('#navBar').addClass('barra');
        //$('#navBar').removeClass('header_color');
        //$('.navbar').css({"background-color":"black!important;"});
    }
});
$(window).scroll(function() {
    if ($(document).scrollTop() <= 100) {
        $('#nav').addClass('navbar_top');
        //$('.navbar').css({"background-color":"white!important;"});
        //$('#navBar').addClass('header_color');
        //$('#navBar').removeClass('barra');
    } else {
        $('#nav').removeClass('navbar_top');
        //$('.navbar').css({"background-color":"black!important;"});
        //$('#navBar').addClass('barra');
        //$('#navBar').removeClass('header_color');
    }
});


const navSlide = () => {
	const burger= document.querySelector('.burger');
	const nav = document.querySelector('.nav_links');
	const navLinks = document.querySelectorAll('.nav_link a');
	//Toggle nav
	burger.addEventListener('click', () => {
		//document.write("hi");
		nav.classList.toggle('nav_active');

		//Animate links
		navLinks.forEach((link, index) =>{
			if(link.style.animation){
				link.style.animation = '';
			} else {
				link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
			}
		});
		//Burger animation
		burger.classList.toggle('toggle');
	});
	
}

navSlide();