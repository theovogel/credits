credits
=======
What is Credits ?
Credits is a jQuery plugin for animate a page load by ajax like movie credits.


=Usage=

Javascript
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
<script src="js/jquery.credits.min.js"></script>
<script>$('.theEnd').credits();</script>

HTML
<code><a href="#" class="theEnd">THE END</a></code>

Icons
Place icons in a "img" directory or specify path in options.

Options
<code>
//Default Configuration
$(".theEnd").credits({
  url: 'humans.txt',  	// path to the txt or html file
	idSelector : '',	  	// id selector for html file, syntax : '#idName'
	music: '',       	  	// path to mp3/ogg file
	img: '',            	// path to the background image
	imgDirectory: 'img/',	// path to the control icons
	fullScreen: false,	  // path to the picture
	transition: 'fadeIn',	// 'fadeIn', slideDown' or 'toggle'
	speed: 'normal',    	// 'normal', 'fast' or 'slow'
	showText: false,    	// Define if the text begin hide or not
	showScrollBar: false,	// hide scrollbar or not
	fixe: false,	      	// Animated or not
	callback: null	      // Callback function
});
</code>

Licence : CC-BY 2.0

