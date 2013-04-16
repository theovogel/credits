/*
 * Version: 0.3
 * Original author: Theo Vogeleisen
 * Licensed under the CC-BY 2.0
 */
(function($) {

	$.fn.credits = function(arguments)
	{
		var options = {
			url: 'humans.txt',
			idSelector: '',
			music: '',
			img: '',
			imgDirectory: 'img/controls.png',
			fullScreen: false,
			showText: false,
			speed: 'normal',
			fixe: false,
			showScrollBar: false,
			ctrlPosition: 'left',
			callback: null
		};

		options = $.extend(options, arguments);
		
		$.fn.enterFullscreen = function() 
		{
	        if(this[0].requestFullScreen) { this[0].requestFullScreen(); } 
	        else if(this[0].webkitRequestFullScreen) { this[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); } 
	        else if(this[0].mozRequestFullScreen){ this[0].mozRequestFullScreen(); }
			return this;
		 };
		 

	this.each(function(){
		$(this).click(function(e){

			e.preventDefault();
			

		//===============Background Black===============
		if(options.showScrollBar) { var overflow = $('body').css('overflow'); $('body').css('overflow', 'hidden'); }
		if(options.fullScreen) 	  { var hVP = screen.height; } else { var hVP = $(window).height(); }

		if($('#backInBlack').length == 0) {
			if(options.img != '') {var background = 'background: black url(\''+options.img+'\') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;'} else {var background = ' background-color: black;'; }
			var blackBack = $('<div id="backInBlack" style="display: block; position: fixed; opacity:0; top: 0; left: 0; width: 100%; height: 100%; '+background+' text-align: center; z-index: 0; overflow: hidden;"><div class="controls" style="position: fixed; '+options.ctrlPosition+': 0; top: 0; cursor: pointer; z-index: 10;"><div style="width: 64px; height: 64px; background: url('+options.imgDirectory+') 0 0 repeat;" id="stop"></div></div></div>').appendTo('body');
			if(options.fullScreen) {blackBack.enterFullscreen();}
			blackBack.animate({opacity:1});
		}

		$('#backInBlack #credits').empty();
		$('#backInBlack').append('<div id="credits" style="position: fixed; width: 100%; margin: auto;"></div>');


		//===============Call the credits page=================
		var txtFile;
		if(/\.txt/i.test(options.url)) {
		 txtFile = true; 
		 $.get(options.url, insertCredits); 
		}
		else {
			if(options.idSelector != '') {var selector = ' ' + options.idSelector; } else {var selector = '';}
			$('#credits').load(options.url + selector, insertCredits);
		}

		function insertCredits(data) {
			if(txtFile) { data = data.replace(/\n/g, '<br/>'); $('#credits').append(data); }


			//===============Clap credits===============
			if(options.fixe) {
				$('#credits').css('padding-top', '5%');

			} else {
				
				var hCredits = $('#credits').height();
				if(options.showText) {hCredits = hCredits/2} // Option ShowText
				$('#credits').css({bottom: '-'+hCredits+'px'});

				var speed = 10000 + hCredits*10; //Ratio Height/speed increase

				switch(options.speed) {
					case 'slow': speed = speed * 3; break;
					case 'normal': speed; break;
					case 'fast': speed = speed * 0.4; break;
					default: speed ; break;
				}

				$('#credits').animate({bottom: hVP+'px',}, speed, 'linear', stopCredits);

			}


			//===============Music Option===============
			if(options.music != '') {
				var nameMusic = options.music.replace(/\.mp3|\.ogg/i, '');
				$('.controls').append('<audio id="audioPlayer" autoplay><source src="'+nameMusic+'.mp3"></source><source src="'+nameMusic+'.ogg"></source></audio><div id="mute" style="width: 64px; height: 64px; background: url('+options.imgDirectory+') -192px 0 repeat;"></div>');

				var player = document.getElementById('audioPlayer');

				$('#mute').click(function(){
					
					if(player.volume > 0) {
						player.volume = 0;
						$('#mute').css({backgroundPosition: '-256px 0'});
					} else {
						player.volume = 1;
						$('#mute').css({backgroundPosition: '-192px 0'});
					}
					
				});
			}

			$('#stop, #mute').on('mouseover', function(){
				$(this).css({outline: '1px inset white'});
			});

			$('#stop, #mute').on('mouseout', function(){
				$(this).css({outline: 'none'});
			});

			$('#stop').click(function(){
				stopCredits();
			});

		}


		//===============Stop Credits===============
		function stopCredits() {
			$('#audioPlayer').remove();
			$('#backInBlack').animate({opacity:0}, {
				complete: function(){
					$(this).remove();
					if(options.showScrollBar) { $('body').css('overflow', overflow); }
				}
			});
		}


		//===============Callback===============
		if(options.callback){
		    options.callback();
		}


	return this;
	});
});



}

})(window.Zepto || window.jQuery);