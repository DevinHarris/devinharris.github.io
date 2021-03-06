(function($) {
	'use strict';

	// first time using Arrow Functions, really cuts down on code and look really cool!

	document.addEventListener('DOMContentLoaded', event => {
		let projects,
			counter = 0,
			projectTitle = querySel('.project-title'),
			projectLink = querySel('.project-link'),
			projectType = querySel('.project-type'),
			projectDesc = querySel('.project-desc'),
			projectQuote = querySel('.project-quote'),
			projectShortDesc = querySel('.project-short-desc'),
			navBtns = document.querySelectorAll('.project-nav-btn'),
			tools = querySel('.tools'),
			why = querySel('.why'),
			learned = querySel('.learned'),
			writeupTitle = querySel('.writeup-title'),
			projectImg = querySel('.project-img');

		// try to refactor xhr request code into a Promise

		function querySel(el) {
			return document.querySelector(el);
		}

		function insertData(el, data) {
			return (el.innerHTML = data);
		}

		function addPortfolioData() {
			// insertData for left sidebar
			insertData(projectTitle, projects.projects[counter].project_name);
			projectLink.href = projects.projects[counter].project_link;
			insertData(projectType, projects.projects[counter].type);
			insertData(tools, projects.projects[counter].tools);
			insertData(projectQuote, projects.projects[counter].project_quote);
			// About project section
			insertData(writeupTitle, projects.projects[counter].project_name);
			insertData(why, projects.projects[counter].about.why);
			insertData(learned, projects.projects[counter].about.learned);

			// Add Writeup Images

			//projectImg.src = projects.projects[counter].about.img;

			/*projectImgs.map((imgSrc) => {
				if ($('.project-img').length !== projectImgs.length && $('.project-img').src !== imgSrc) {
					$gallery.append(`<img class="project-img" src=${imgSrc} alt="Project Image"/>`);
				}
				
			}); */

			// Change project img background

			$('.project-img').css({
				background: `url(../public/img/project-imgs/${projects.projects[
					counter
				].project_name.toLowerCase()}.png) center center no-repeat`,
				'background-size': 'cover'
			});
		}

		const xhr = new XMLHttpRequest();

		xhr.onload = () => {
			if (xhr.status === 200) {
				projects = JSON.parse(xhr.response);
				console.log(projects.projects[0].project_name, projects.projects[0].status);

				addPortfolioData();
			} else {
				console.log('There was a problem ', xhr.status, xhr.responseText);
			}
		};

		xhr.open('GET', 'public/js/projects.json');

		xhr.send();

		// When hiding portfolio msg, make sure to remove the 'click' event listener before hiding it (display: none) to avoid a Memory Leak

		//	console.log(event);

		navBtns.forEach(btn => {
			btn.addEventListener('click', function() {
				let galDir = this.getAttribute('data-dir');

				if (galDir === 'right') {
					++counter;
				} else if (galDir === 'left') {
					counter--;

					console.log(counter);
				}
				if (counter > projects.projects.length) {
					counter = 0;
				}
				if (counter < 0) {
					counter = projects.projects.length;
				}

				// insert data into DOM

				addPortfolioData();

				//console.log(counter);
			});
		});

		// show nav

		$('.menu-btn-wrap').on('click', () => {
			$('.menu').toggleClass('show-menu');
			$('.nav-item').toggleClass('slideIn');
		});

		$('.nav-item').on('click', () => {
			$('.menu').toggleClass('show-menu');
		});

		// show project writeups

		$('.view-project').on('click', function(e) {
			e.preventDefault();
			$('.portfolio').addClass('show-project-details');
			$('.menu-initials').addClass('show-project-details-color');
			$('.project-img').addClass('remove-grayscale');
			$('.project-writeup-wrap').addClass('show-writeup');
		});

		$('.back-projects').on('click', function(e) {
			e.preventDefault();
			$('.portfolio').removeClass('show-project-details');
			$('.menu-initials').removeClass('show-project-details-color');
			$('.project-img').removeClass('remove-grayscale');
			$('.project-writeup-wrap').removeClass('show-writeup');
		});
	});
})(jQuery);
