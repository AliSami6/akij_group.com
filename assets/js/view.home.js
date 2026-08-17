/*
Name: 			View - Home
Written by: 	Okler Themes - (http://www.okler.net)
Theme Version:	13.1.0
*/

(($ => {
    /*
	Circle Slider
	*/
    if ($.isFunction($.fn.flipshow)) {
		const circleContainer = $('.fc-slideshow');
	
		$.each( circleContainer, function() {
				
			const $container = $(this);
				
			$container.flipshow();

			setTimeout(function circleFlip() {
				$container.data().flipshow._navigate($container.find('div.fc-right span:first'), 'right');
				setTimeout(circleFlip, 3000);
			}, 3000);
			
		});
	}

    /*
	Move Cloud
	*/
    if ($('.cloud').get(0)) {
		const moveCloud = () => {
			$('.cloud').animate({
				'top': '+=20px'
			}, 3000, 'linear', () => {
				$('.cloud').animate({
					'top': '-=20px'
				}, 3000, 'linear', () => {
					moveCloud();
				});
			});
		};

		moveCloud();
	}
})).apply(this, [jQuery]);

 window.addEventListener("scroll", function () {
   const header = document.getElementById("header");
   if (window.scrollY > 50) {
     header.classList.add("header-scrolled");
   } else {
     header.classList.remove("header-scrolled");
   }
 });

 document.addEventListener("DOMContentLoaded", function () {
   // 1. Get the current page file name
   let currentPage = window.location.pathname.split("/").pop();

   // Use index.html when the URL is the root path
   if (!currentPage || currentPage === "") {
     currentPage = "index.html";
   }

   // 2. Remove the active class from all navigation links
   const allNavLinks = document.querySelectorAll(
     "#HeaderMainNav .nav-link, #HeaderMainNav .dropdown-item",
   );

   allNavLinks.forEach(function (link) {
     link.classList.remove("active");
   });

   // 3. Define Home pages
   const homePages = ["index.html", "index-2.html"];

   if (homePages.includes(currentPage)) {
     // Set the Home parent link as active
     const homeLink = document.querySelector(
       "#HeaderMainNav #navbarDropdownMenuLink",
     );

     if (homeLink) {
       homeLink.classList.add("active");
     }

     // If the current page is index-2.html, also activate Home Two
     if (currentPage === "index-2.html") {
       const homeTwo = document.querySelector(
         '#HeaderMainNav .dropdown-item[href="index-2.html"]',
       );

       if (homeTwo) {
         homeTwo.classList.add("active");
       }
     }
   } else {
     // 4. Detect and activate the current page navigation link
     allNavLinks.forEach(function (link) {
       const href = link.getAttribute("href");

       if (href && href !== "#") {
         const linkPage = href.split("/").pop();

         if (linkPage === currentPage) {
           // Activate the current navigation link
           link.classList.add("active");

           // Activate the parent dropdown link if applicable
           const parentDropdown = link.closest(".dropdown");

           if (parentDropdown) {
             const parentNavLink =
               parentDropdown.querySelector(":scope > .nav-link");

             if (parentNavLink) {
               parentNavLink.classList.add("active");
             }
           }
         }
       }
     });
   }

   // 5. Mobile dropdown toggle logic
   const dropdownToggles = document.querySelectorAll(
     "#HeaderMainNav > li.dropdown > a.dropdown-toggle",
   );

   dropdownToggles.forEach(function (toggle) {
     toggle.addEventListener("click", function (e) {
       if (window.innerWidth <= 991) {
         e.preventDefault();

         const parentLi = this.parentElement;
         const dropdownMenu = parentLi.querySelector(".dropdown-menu");

         // Close all other dropdown menus
         document
           .querySelectorAll("#HeaderMainNav > li.dropdown")
           .forEach(function (li) {
             if (li !== parentLi) {
               li.classList.remove("show");

               const menu = li.querySelector(".dropdown-menu");

               if (menu) {
                 menu.classList.remove("show");
               }
             }
           });

         // Toggle the current dropdown menu
         parentLi.classList.toggle("show");

         if (dropdownMenu) {
           dropdownMenu.classList.toggle("show");
         }
       }
     });
   });
 });