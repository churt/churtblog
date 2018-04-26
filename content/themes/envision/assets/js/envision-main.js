/*
*	MAIN JS FILE for Envision Ghost Theme
*
*	Here you can add custom functionality, 
*	if you need help don't hesitate to ask for it
*	at aftertype.com/community
*
*	Require.js is used for performance optimization,
*	call the required scripts on context
*	and execute Aftertype Services.
*/

window.GhostURL = document.body.getAttribute('data-ghost_url')

requirejs.config({
	paths: {
		fluidvids: 	'https://cdn.aftertype.com/vendor/fluidvids/latest.min',
		velocity: 	'https://cdn.aftertype.com/vendor/velocityjs/latest.min',
		velocityUI: 'https://cdn.aftertype.com/vendor/velocityjs/latest.ui.min',
		prettify: 	'https://cdn.aftertype.com/vendor/prettify/prettify.min',
		ATassistant: 'https://cdn.aftertype.com/js/assistant.min'
	}
});

requirejs(
[
	'fluidvids',
	'velocity',
	'prettify',
	'ATassistant'
],
function(fluidvids){

// ===============================
// REQUIRE DEPENDANTS
// ===============================
require(['velocityUI'])

// ===============================
// INIT CALLS & HELPERS
// ===============================
fluidvids.init({
	selector: ['iframe', 'object'], // runs querySelectorAll()
	players: ['www.youtube.com', 'player.vimeo.com'] // players to support
});

// ===============================
// PARALLAX EFFECT
// ===============================
// Element Schemas to parallax
var scrollTop 		= document.body.scrollTop;
var insideHead 		= document.getElementById('inside-head-wsong');
var insideHeadCover = document.getElementById('inside-head-cover-wsong');
var diffuseElements = document.querySelectorAll('.diffuse-elements');
var homeHeadHeight 	= insideHead.offsetHeight + 134;

var blogCoverSlowness = 0.4;

// Functions to run the parallax
function updateParallax(){
	window.requestAnimationFrame(function(){
		setScrollTops();
		animateElements();
	});
}

function setScrollTops() {
	scrollTop = document.body.scrollTop;
}

function animateElements() {
	var coverOpacity = 0.2 + ( 0.8 * (scrollTop / homeHeadHeight));
	var coverPadding = scrollTop * blogCoverSlowness;

	if (insideHeadCover) {
		insideHeadCover.style.opacity 	= coverOpacity;
		insideHeadCover.style.top 		= (scrollTop * blogCoverSlowness) + 'px';
	}

	for (var i = 0; i < diffuseElements.length; i++) {
		var elem = diffuseElements[i];
		var elemOpacity = 1 - (scrollTop / homeHeadHeight);
		elem.style.opacity = elemOpacity;
	}
}

// Run Parallax
scrollIntervalID = setInterval(updateParallax, 10);

// ===============================
// MOBILE MENU ACTIONS
// ===============================
var topMenu 		= document.getElementById('top-menu-wsong');
var mobileMenuBtn 	= document.getElementById('mobile-menu-btn-wsong');
var mobileMenuIcon 	= mobileMenuBtn.querySelector('span');

mobileMenuBtn.addEventListener('click', function(){
	var topMenuClassList 		= topMenu.classList;
	var mobileMenuBtnClassList 	= mobileMenuBtn.classList;
	var mobileMenuIconClassList = mobileMenuIcon.classList;

	topMenuClassList.toggle('mmenushow');
	mobileMenuBtnClassList.toggle('giro');
	mobileMenuIconClassList.toggle('fa-close');
	mobileMenuIconClassList.toggle('fa-reorder');
});

// ===============================
// PRETTYPRINT CODE BLOCKS
// ===============================
var preBlocks = document.querySelectorAll('pre');

for (var i = 0; i < preBlocks.length; i++) {
	preBlocks[i].classList.add('prettyprint');
}

prettyPrint();

});