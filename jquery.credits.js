/*
 * Version: 0.1
 * Original author: Theo Vogeleisen
 * Licensed under the CC-BY 2.0
 */

(function($) {

	jQuery.fn.credits = function(arguments)
	{
		var options = {
			url: 'humans.txt',
			idSelector: '',
			music: '',
			img: '',
			imgDirectory: 'img/',
			transition: 'fadeIn',
			fullScreen: false,
			showText: false,
			speed: 'normal',
			fixe: false,
			showScrollBar: false,
			callback: null
		};

		options = $.extend(options, arguments);

		jQuery.fn.transition = function(anim)
		{
			switch(anim){
				case 'toggle': this.toggle(); break;
				case 'fadeIn': this.fadeIn(); break;
				case 'slideDown': this.slideDown(); break;
				default: this.fadeIn();
			}
		};
		
		jQuery.fn.enterFullscreen = function() 
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
		if(options.fixe == false) { var playPause = '<br><img src="'+options.imgDirectory+'pause.png" id="playPause">'; } else { playPause = ''; }

		if($('#backInBlack').length == 0) {
			if(options.img != '') {var background = 'background: black url(\''+options.img+'\') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;'} else {var background = ' background-color: black;'; }
			var blackBack = $('<div id="backInBlack" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; '+background+' text-align: center; z-index: 0; overflow: hidden;"><div class="controls" style="position: fixed; right: 0; top: 0; cursor: pointer;  z-index: 10;"><img src="'+options.imgDirectory+'stop.png" id="stop">'+playPause+'</div></div>').appendTo('body');
			if(options.fullScreen) {blackBack.enterFullscreen();}
			blackBack.transition(options.transition);
		}

		$('#backInBlack #credits').empty();
		$('#backInBlack').append('<div id="credits" style="position: fixed; width: 100%; margin: auto;"></div>');


		//===============Call the credits page===============/*==
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


				//===============playPause Button===============
				var play = true;

				$('#playPause').click(function(){

					if(play) {
						if(options.music != '') { playPause(); }
						$('#credits').stop();
						play = false;
						$('#playPause').attr('src', options.imgDirectory+'play.png');

					} else {
						if(options.music != '') { playPause(); }
						$('#credits').animate({bottom: hVP+'px',}, speed, 'linear', stopCredits);
						play = true;
						$('#playPause').attr('src', options.imgDirectory+'pause.png');
					}
					
				});

			}


			//===============Music Option===============
			if(options.music != '') {
				var nameMusic = options.music.replace(/\.mp3|\.ogg/i, '');
				$('.controls').append('<audio id="audioPlayer" autoplay><source src="'+nameMusic+'.mp3"></source><source src="'+nameMusic+'.ogg"></source></audio><br><img id="mute" src="'+options.imgDirectory+'sound.png">');

				var player = document.getElementById('audioPlayer');

				function playPause() {
					if(player.paused) {
						player.play();
					} else {
						player.pause();
					}
				}

				$('#mute').click(function(){
					
					if(player.volume > 0) {
						player.volume = 0;
						$('#mute').attr('src', options.imgDirectory+'mute.png');
					} else {
						player.volume = 1;
						$('#mute').attr('src', options.imgDirectory+'sound.png');
					}
					
				});
			}

			$('#stop, #mute, #playPause').on('mouseover', function(){
				$(this).css({outline: '1px inset white'});
			});

			$('#stop, #mute, #playPause').on('mouseout', function(){
				$(this).css({outline: 'none'});
			});

			$('#stop').click(function(){
				stopCredits();
			});

		}

		//===============Stop Credits===============
		function stopCredits() {
			$('#audioPlayer').remove();
			$('#backInBlack').fadeOut({
				complete: function(){
					$('#credits').stop();
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

})(jQuery);