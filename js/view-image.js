
(function($, window, document, undefined){
	'use strict'

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Posts.ImageModule = window.Jnknfnk.Posts.ImageModule || {};

	var viewImage = function() {

		var $targetEl = $(document.getElementsByClassName('image-module')),
			html = '';

		var insertImage = function(html){
			$(html).insertAfter('.related-module');
		};

		var template = function(json){	
			$targetEl.remove();

			if(json.image) {
				html = '<section class=\"side-module image-module\""><h3>' +  + '</h3><p>' + + '</p><img src=\"' + + '\" alt=\"' + + '\" /></section>';
			}

			insertImage(html);				

		};
		
		var bindEvents = function(){
			$(document).on('newpost:opened', function(e, json) {
				template(json);
			});
		};

		var initialise = function() {
			bindEvents();
		}();
		
	};

	window.Jnknfnk.Posts.ImageModule = new viewImage();


})(jQuery, window, document);


