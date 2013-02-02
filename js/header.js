
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Header = window.Jnknfnk.Header || {};

	var Header = function() {

		var $targetEl = $(document.getElementById("nav")),
			$contentEl = $(document.getElementById("content"));

		var bindEvents = function(){
			$targetEl.find('a').on('click', function(e) {
				e.preventDefault();
				scrollToContent($(this).data('cat'));
			});
		};

		var scrollToContent = function(category) {

			$($contentEl).find('.loading-container').show().children('.loading').show();
			$('body').animate({ 
				scrollTop: 540 
			}, 600, function() {
				getContent(category.toLowerCase());
				$(document).trigger("filterByCat");
			});
		};

		var getContent = function(category) {
				$.ajax({
					url: window.Jnknfnk.Global.Config.General.hostNameLive + window.Jnknfnk.Global.Config.General.getCatParams + category,
					dataType: "jsonp",
					success: function(json) {
						window.Jnknfnk.Posts.viewPosts.template(json, true)
					},
					error: function(data) {
						insertPost($("<h1>Category Not Found</h1>"), $("<p>Sorry We could not find this post at the moment, please go and check out some of our other great content</p>"));
					}
				});
		};

		var initialise = function() {
			bindEvents();
		}();
		

	};

	window.Jnknfnk.Header = new Header();


})(jQuery, window, document);