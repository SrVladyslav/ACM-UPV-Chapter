/*
const navSlide1 = () => {
	const burger= document.querySelector('.burger');
	const nav = document.querySelector('.nav-links');
	const navLinks = document.querySelectorAll('.nav-links li');
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

navSlide1();
*/