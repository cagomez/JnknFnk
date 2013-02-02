
(function($, window, document, undefined){
	'use strict'

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Posts.Authors = window.Jnknfnk.Posts.Authors || {};

	var viewAuthor = function() {

		var $targetEl = $(document.getElementsByClassName('author-module'));


		var insertAuthor = function(html){
			$(html).insertAfter('.author-module h3');
		};

		var template = function(json){
			
			$targetEl.find('span').remove()
			$targetEl.find('p').remove();
			if(json.author.description === '')
				json.author.description = 'Aliquam in est magna, ultricies sollicitudin velit. Ut ac turpis eu erat molestie adipiscing non vel purus. Nulla facilisi.';

			var html = '<span>' + json.author.first_name + ' ' + json.author.last_name + '</span>' +
					   '<p>' + json.author.description + '</p>';

			insertAuthor(html);				
		}


		var bindEvents = function(){
			$(document).on('newpost:opened', function(e, json) {
				template(json);
			});
		};

		var initialise = function() {
			bindEvents();
		}();

	};

	window.Jnknfnk.Posts.viewPost = new viewAuthor();


})(jQuery, window, document);