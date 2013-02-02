
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Posts = window.Jnknfnk.Posts || {};

	var Post = function(options) {

		var _this = this,
			defaults = {
			targetElem: ".left-col",
			templateName: "post",
			postData: {}
		};

		defaults = $.extend({}, defaults, options);

		var getPost = function(postId){
			if(postId && parseInt(postId)) {
				$.ajax({
					url: window.Jnknfnk.Global.Config.General.hostNameLive + window.Jnknfnk.Global.Config.General.getPostParams + postId,
					dataType: "jsonp",
					success: function(data) {
						window.location.hash = data.post.slug + "/" + postId;
						var content = data.post.content.replace(/<p>&nbsp;<\/p>/g, "");
							content = content.replace(/<p>&nbsp;/g, "");
							content = content + "<div class=\"fb-comments\" data-href=\"http://www.ilovejnk.co.uk/relaunch/#" + data.post.slug + "/" + postId + "\" data-num-posts="10" data-width="570"></div>";
							console.log(content);
						defaults.postData = data;
						$(document).trigger('postReturned', defaults.postData);
						insertPost($("<h1>" + data.post.title + "</h1>"), $(content));
					},
					error: function(data) {
						insertPost($("<h1>Post Not Found</h1>"), $("<p>Sorry We could not find this post at the moment, please go and check out some of our other great content</p>"));
					}
				});
			} else {
				insertPost($("<h1>Page Not Found</h1>"), "Sorry this page is no longer available");

			}
		};

		var onLoadOpenContent = function(){
			if(window.location.hash) {
				var postId = window.location.hash.split("/");
				window.Jnknfnk.Overlay.Main.openOverlay(750);
				getPost(postId[1]);
			}
		}

		var insertPost = function(title, content){

			$(defaults.targetElem).append(title, content);
			$('.loading').fadeOut(100, function() {
				showContent();
			});
			
		};

		var showContent = function() {
			$('.left-col, .right-col').show();
		};

		var bindEvents = function(){

			$('body').on('click', '.post-link', function(e) {
				e.preventDefault();
				e.stopPropagation();
				window.Jnknfnk.Overlay.Main.openOverlay(750);
				getPost($(this).data("post-id"));
			});

		}

		var initialise = function() {
			onLoadOpenContent();
			bindEvents();
		}();
		

		return {
			getPostData: defaults.postData
		}

	};

	window.Jnknfnk.Posts.viewPost = new Post({template: "overlay"});


})(jQuery, window, document);