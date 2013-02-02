

(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Overlay = window.Jnknfnk.Overlay || {};

	var Overlay = function(elem, options) {
		
		var _this = this,
			$outerOverlay = $('.overlay-outer'),
			$innerOverlay = $('.overlay-inner'),
			$innerOverlayContent = $('.overlay-content-outer'),
			$loading = $('.loading'),
			$closeButton = $(".close"),
			$carousel = $(document.getElementById("carousel")),
			$body = $(document.getElementsByTagName("body")),
			overlayOpened = false;

		var closeOverlay = function(){
			$carousel.tinycarousel_start()
			$loading.hide();
			$body.removeClass('noScroll');
			$outerOverlay.fadeOut(600, function() {
				overlayOpened = false;
				$innerOverlayContent.hide();
				$innerOverlay.find('.body-content, .overlay-content h1').empty();
			});
			if(history){
				history.pushState({}, "Home Page", window.location.origin + window.location.pathname);
			}
		};

		var openOverlay = function() {
			$carousel.tinycarousel_stop();
			$loading.show();
			$innerOverlay.css({ top: window.pageYOffset + 100});
			$outerOverlay.fadeIn(1000, function(){
				overlayOpened = true;
				setTimeout(function() {
					$($outerOverlay).css("height", document.body.scrollHeight);
				}, 500);
			});
			
		};

		var bindEvents = function() {
			$closeButton.on('click', closeOverlay);
			$outerOverlay.on('click', closeOverlay);
			$(window).keydown(function(e) {
				if(overlayOpened)
					if(e.keyCode === 27) {
						closeOverlay();
					}
			});
		};

		var initialise = function(){
			bindEvents();
		}();

		return {
			closeOverlay: closeOverlay,
			openOverlay: openOverlay
		}

	};

	window.Jnknfnk.Overlay.Main = new Overlay();


})(jQuery, window, document);