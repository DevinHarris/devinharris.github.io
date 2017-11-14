(function() {
	'use strict';

	// first time using Arrow Functions, really cuts down on code and look really cool!

document.addEventListener('DOMContentLoaded', event => {

	function querySel(el) {
		return document.querySelector(el);
	}

	function insertData(el, data) {
		return el.textContent = data;
	}

	const xhr = new XMLHttpRequest();
	let	projects,
		counter = 0,
		projectLink = querySel('.project-name'),
		projectQuote = querySel('.about-project'),
		projectDesc = querySel('.project-desc'),
		projectShortDesc = querySel('.project-short-desc'),
		navBtns = document.querySelectorAll('.project-nav-btn'),
		tools = querySel('.tools');

	// try to refactor xhr request code into a Promise

	xhr.onload = () => {

		if (xhr.status === 200) {
			projects = JSON.parse(xhr.response);
			console.log(projects.projects[0].project_name, projects.projects[0].status);

			insertData(projectLink, projects.projects[counter].project_name);
			insertData(projectQuote,  projects.projects[counter].project_quote);
			insertData(tools, projects.projects[counter].tools);

			
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
			} if (counter > projects.projects.length) {
				counter = 0;
			} if (counter < 0) {
				counter = projects.projects.length;
			}

			// insert data into DOM
			insertData(projectLink, projects.projects[counter].project_name);
			projectLink.href = projects.projects[counter].project_link;
			insertData(projectQuote, projects.projects[counter].project_quote);
			insertData(tools, projects.projects[counter].tools);

			//console.log(counter);
		});
	});

	// write code to get about.html - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/HTML_in_XMLHttpRequest

});
}());