/*
*	MAIN JS FILE for Human Ghost Theme
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
		pscrollbar: 'https://cdn.aftertype.com/vendor/perfect-scrollbar/js/perfect-scrollbar.min',
		ATassistant: 'https://cdn.aftertype.com/js/assistant.min'
	}
});

requirejs(
[
	'fluidvids',
	'pscrollbar',
	'velocity',
	'prettify',
	'ATassistant'
],
function(fluidvids, Ps){

// ===============================
// REQUIRE DEPENDANTS
// ===============================
require(['velocityUI'])

// ===============================
// INIT CALLS & HELPERS
// ===============================
var menu = document.getElementById('menu-human');

Ps.initialize(menu);

fluidvids.init({
	selector: ['iframe', 'object'], // runs querySelectorAll()
	players: ['www.youtube.com', 'player.vimeo.com'] // players to support
});

// ===============================
// GET CSS PREFIX TOOL
// ===============================
var CSSprefix = (function () {
	var styles = window.getComputedStyle(document.documentElement, '');
	var pre = (
		Array.prototype.slice.call(styles).join('') 
		.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	)[1];

	return '-' + pre + '-';
})();

// ===============================
// RECURRENT ELEMENTS
// ===============================
var body 		= document.body;
var menuBtn 	= document.getElementById('menu-btn-human');
var menuBtnIcon = menuBtn.querySelector('span');

var pageHead 	= document.getElementById('head-page-human');
var coverOpener = document.getElementById('cover-opener-human');
var tagHead 	= document.getElementById('tag-page-opener-human');
var authorHead 	= document.getElementById('author-head-human');

var menuEnv;

// ===============================
// CURRENT TEMPLATE
// ===============================
var isHomeTemplate 		= body.className.match(/\bhome-template\b/)
var isPostTemplate 		= body.className.match(/\bpost-template\b/)
var isPageTemplate 		= body.className.match(/\bpost-template\b/)
var isArchiveTemplate 	= body.className.match(/\bpaged\b/)
var isTagTemplate 		= body.className.match(/\btag-template\b/)
var isAuthorTemplate 	= body.className.match(/\bauthor-template\b/)

if (isHomeTemplate)
	menuEnv = coverOpener.offsetHeight;

if (isPostTemplate || isPageTemplate)
	menuEnv = pageHead.offsetHeight;

if (isArchiveTemplate)
	menuEnv = coverOpener.offsetHeight;

if (isTagTemplate)
	menuEnv = tagHead.offsetHeight;

if (isAuthorTemplate)
	menuEnv = authorHead.offsetHeight;

// ===============================
// Parallax & Menu Scrolled
// ===============================
// Element Schemas to parallax
var scrollTop 			= document.body.scrollTop;
var diffuseElems 		= document.querySelectorAll('.diffuse-elements');

var indexTitle 	= document.getElementById('blog-title-human');
var indexDescr 	= document.getElementById('index-description-human');
var postHead 	= document.getElementById('in-post-header-human');

var indexCoverI;
var postCoverI;

if (coverOpener)
	indexCoverI = (coverOpener.offsetHeight / 2);

if (postCoverI)
	postCoverI = (pageHead.offsetHeight / 2);

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
	var translateTitle 		= scrollTop * 0.2;
	var translateDescr 		= scrollTop * 0.4;
	var translatePostHead 	= scrollTop * 0.4;

	var transformRuleName = CSSprefix + 'transform';

	if (indexTitle)
		indexTitle.style[transformRuleName] = 'translate(0, -'+translateTitle.toFixed(2)+'px)';

	if (indexDescr)
		indexDescr.style[transformRuleName] = 'translate(0, -'+translateDescr.toFixed(2)+'px)';

	if (postHead) {
		postHead.style[transformRuleName] 	= 'translate(0, -'+translatePostHead.toFixed(2)+'px)';
		postHead.style.opacity = 1 - (scrollTop / postCoverI);
	}

	for (var i = 0; i < diffuseElems.length; i++) {
		var elem = diffuseElems[i];
		var opacity = 1 - (scrollTop / indexCoverI)
		elem.style.opacity = opacity
	}

	var hasScrolled = menuBtn.className.match(/\bscrolled\b/)

	if (!hasScrolled && scrollTop > menuEnv)
		menuBtn.classList.add('scrolled');

	if (scrollTop < menuEnv)
		menuBtn.classList.remove('scrolled');
}

// Run Parallax
scrollIntervalID = setInterval(updateParallax, 10);

// ===============================
// MOBILE MENU TOGGLE
// ===============================
menuBtn.addEventListener('click', function(){
	menuBtn.classList.toggle('active-menu');
	menuBtnIcon.classList.toggle('fa-reorder');
	menuBtnIcon.classList.toggle('fa-chevron-right');

	if (menuBtn.className.match(/\bactive-menu\b/))
		return Velocity(menu, {'right': 0}, {duration: 400, easing: 'easeOutCubic', queue: false});

	Velocity(menu, {'right': -220}, {duration: 400, easing: 'easeOutCubic', queue: false});
});


// ===============================
// BRING TITLE UP ON SINGLE POST/PAGE
// ===============================
if (isPostTemplate) {
	var headSlideDistance = (pageHead.offsetHeight - postHead.offsetHeight) / 2 + 67;
	Velocity(postHead, {
		top: -headSlideDistance
	}, {duration: 400});
};

// ===============================
// PRETTYPRINT CODE BLOCKS
// ===============================
var preBlocks = document.querySelectorAll('pre');

for (var i = 0; i < preBlocks.length; i++) {
	preBlocks[i].classList.add('prettyprint');
}

prettyPrint();

});