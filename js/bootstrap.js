(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Global.Bootstrap = window.Jnknfnk.Global.Bootstrap || {};

	var BootStrap = function(elem, options) {
		
		var _this = this;

		var d = {
			$carouselElem: $("#carousel")
		};

		if(options) {
			d = $.extend({}, d, options);
		}

		var getCarousel = function(element){
			d.$carouselElem.tinycarousel({
				interval: true,
				pager: true,
				intervaltime: 5000,
				duration: 500,
				controls: false
			});
		}

		var initialise = function(){
			getCarousel(d.$carouselElem);
		}();

		return {
			initialise: initialise
		}

	};

	window.Jnknfnk.Global.Bootstrap = new BootStrap();


})(jQuery, window, document);