
(function($, window, document, undefined){
	'use strict'

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Posts = window.Jnknfnk.Posts || {};

	var Post = function() {

		var _this = this,
			$targetEl = $(document.getElementsByTagName('left-col')),
			$body = $(document.getElementsByTagName('body')),
			$loadingEl = $(document.getElementsByClassName('loading')),
			$targetEl = $('.left-col').find('.overlay-content'),
			$overlayInnerEl = $(document.getElementsByClassName('overlay-inner')),
			articleUrl = "";

		var getPost = function(postId){

			if(postId && parseInt(postId)) {
				$.ajax({
					url: window.Jnknfnk.Global.Config.General.hostNameLive + window.Jnknfnk.Global.Config.General.getPostParams + postId,
					dataType: 'jsonp',
					success: function(json) {
						
						if(history) {
							history.pushState({}, json.post.title, window.location.origin + window.location.pathname + '#' +  json.post.slug + '/' + postId);
							articleUrl = window.location.origin + window.location.pathname + '#' +  json.post.slug + '/' + postId;
							
							
							
						} else {
							window.location.hash = json.post.slug + '/' + postId;
						}

						json.post.content = json.post.content.replace(/<p>&nbsp;<\/p>/g, '');
						json.post.title = json.post.title.replace(/[//]/g, ' ');

						$body.trigger('newpost:opened', json.post);
					},
					error: function(json) {
						insertPostContent($('<h1>Post Not Found</h1>'), $('<p>Sorry We could not find this post at the moment, please go and check out some of our other great content</p>'));
					}
				});
			} else {
				insertPostContent($('<h1>Page Not Found</h1>'), 'Sorry this page is no longer available');
			}
		};

		var onLoadOpenContent = function(){
			if(window.location.hash) {
				var postId = window.location.hash.split('/');
				window.Jnknfnk.Overlay.Main.openOverlay(750);
				getPost(postId[1]);
			}
		}

		var insertPostContent = function(title, content){

			//Title and Body Content
			$targetEl.find('h1').html(title);
			$targetEl.find('.body-content').append(content);

			//Facebook Comments Widget
			$('.fb-comments-placeholder').html('<div class="fb-comments" data-href=\"' + articleUrl + '\" data-num-posts="10" data-width="470"></div>');
			FB.XFBML.parse();

			//Show Content
			$loadingEl.fadeOut(100, showContent);
			
		};

		var insertPostDate = function(date) {
			var timeEl = $(document.getElementsByTagName('time'));
				timeEl.html(window.Jnknfnk.Utils.prettyDate(date));
		};

		var showContent = function() {
			$('.overlay-content-outer').show();
			
			if(($overlayInnerEl.height() + 100) < window.innerHeight) {
				$body.addClass('noScroll');
			}

		};

		var bindEvents = function(){

			$body.on('newpost:opened', function(e, json) {
				insertPostDate(json.date);
				insertPostContent(json.title, json.content);
			});

			$body.on('click', '.post-link', function(e) {
				e.preventDefault();
				e.stopPropagation();
				window.Jnknfnk.Overlay.Main.openOverlay(750);
				getPost($(this).data('post-id'));
			});
		}

		var initialise = function() {
			onLoadOpenContent();
			bindEvents();
		}();
		
	};

	window.Jnknfnk.Posts.viewPost = new Post();


})(jQuery, window, document);