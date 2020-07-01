//DETECTS THE POSITION ON THE SCREEN
$(document).ready(function() {
    if ($(document).scrollTop() <= 250) {
        $('#nav').addClass('navbar_top');
    } else {
        $('#nav').removeClass('navbar_top');
    }
});

$(window).scroll(function() {
    if ($(document).scrollTop() <= 250) {
        $('#nav').addClass('navbar_top');
    } else {
        $('#nav').removeClass('navbar_top');
    }
});


const navSlide = () => {
    const burger= document.querySelector('.burger');
    const navbar= document.querySelector('.navbar');
	const nav = document.querySelector('.nav_links');
	const navLinks = document.querySelectorAll('.nav_links');
	//Toggle nav
	burger.addEventListener('click', () => {
		navbar.classList.toggle('nav_active');

		//Animate links
		navLinks.forEach((link, index) =>{

			if(link.style.animation){
                link.style.animation = '';
                link.style = '';
			} else {
				link.style.animation = 'navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s';
                link.style = 'color:black!important';
            }
            /*
            if( $(".nav_link").css('color') == 'black') {
                $(link).css({
                    "display":"none",
                    "color":"white!important"
                });
                console.log("UPS1")
            }else {
                $(link).css({
                    "display":"block",
                    "color":"black!important"
                });
                console.log("UPS2")
            }*/
        });
        navbar.classList.toggle('active_main');
        nav.classList.toggle('active_main');
		//Burger animation
		burger.classList.toggle('toggle');
    });
    
    /* Closes the search bar when you click
    nav.addEventListener('click', ()=> {
        if($(".burger").hasClass("nav_active")) {
            console.log("Pulsado");
            navbar.classList.toggle('nav_active');
            //Burger animation
            burger.classList.toggle('toggle');
        }
    });
    */
	
}

navSlide();