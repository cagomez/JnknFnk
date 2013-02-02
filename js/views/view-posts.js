
(function($, window, document, undefined){
	'use strict'

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Posts = window.Jnknfnk.Posts || {};

	var Posts = function() {

		var _this = this,
			postsJson = {},
			currentPage = 2,
			$targetEl = $(document.getElementsByClassName('inner-content')),
			$loadButtonEl = $(document.getElementsByClassName('load-more')),
			$loadingContainerEl = $(document.getElementsByClassName('loading-container')),
			loop = 3,
			html = '',
			image = '';


		var getPosts = function(pageCount){
			if(pageCount && parseInt(pageCount)) {
				$.ajax({
					url: window.Jnknfnk.Global.Config.General.hostNameLive + window.Jnknfnk.Global.Config.General.getPostsParams + pageCount,
					dataType: 'jsonp',
					success: function(json) {
						if(json.posts) {
							template(json, true);
						} else {
							noPost();
						}
					},
					error: noPost
				});
			} else {
				noPost();
			}
		};

		var noPost = function() {
			insertPosts($('<div class=\"error\"><h1>Post Not Found</h1><p>Sorry We could not find this post at the moment, please go and check out some of our other great content</p></div>'));
		};

		var template = function(json, emptyHtml){
			postsJson = json.posts || undefined;
			currentPage = currentPage + 1;

			if(emptyHtml) {
				if($('.error'))
					$('.error').remove();
				
				html = '';
			}

			if(postsJson !== undefined) {
				if(postsJson.length > 0){

					(postsJson.length <= 4) ? loop = 1 : 
					(postsJson.length <= 8) ? loop = 2 : 
					(postsJson.length <= 12) ? loop = 3 : loop;

					for(var b = 0;  b < loop;){
						html = html + '<ul class=\'row\'>'
						for(var postsRangeStart = [0, 4, 8], postsRangeEnd = [3, 7, 11], i = postsRangeStart[b];  i <= postsRangeEnd[b]; i++){
							if(i > postsRangeEnd[b] || (i === postsJson.length)) {
								break;
							}
							html = html + '<li class=\'media-box media-box-gallery\'>' + 
										      '<span></span>' + 
										      '<a href=\"#\"" class=\"post-link\" data-post-id=\"' + json.posts[i].id + '\">'; 
										      if( json.posts[i].custom_fields.mainimg ) {
										      	image = 'http://www.ilovejnk.co.uk/timthumb.php?src=' + json.posts[i].custom_fields.mainimg + '&h=176&w=219';
										      } else {
										      	image = 'http://www.placehold.it/219x176';
										      }
										      	html = html + '<img src=\"' + image + '\" alt=\"' + json.posts[i].title + '\" height=\"176\" width=\"219\" /></a>' + 
										      '<ul>' + 
										          '<li class=\"media-type\">' +  (json.posts[i].categories[0] === undefined  ? 'News' : json.posts[i].categories[0].title) + '</li>' + 
										          '<li class=\"media-date\">' + window.Jnknfnk.Utils.prettyDate(json.posts[i].date) + '</li>' + 
										       '</ul>' + 
										       '<h2><a href=\"#\" class=\"post-link\" data-post-id=\"' + json.posts[i].id + '\">' + json.posts[i].title + '</a></h2>' + 
										       '<p>' + Jnknfnk.Utils.linkify(json.posts[i].excerpt) + '</p>' + 
										   '</li>';
						}

						html = html + '</ul>';
						b++;
						insertPosts($(html));
					}
				} 
			} else {
				html = '';
				noPost();
			}

		};

		var insertPosts = function(html){	
			$loadingContainerEl.hide();
			$loadButtonEl.removeClass('loading-more');
			$targetEl.find('.row').remove().end();
			$targetEl.append($(html));
		}

		var bindEvents = function(){

			$(document).on('filterByCat', function() {
				$targetEl.find('.row').remove();
			});

			$('.load-more').on('click', function(e) {
				e.preventDefault();
				$(this).addClass('loading-more');
				if($('.error')) {
					$('.error').remove();
				}
				getPosts(currentPage, false);
			});
			getPosts(1);
		}

		var initialise = function() {			
			bindEvents();
		}();
		

		return {
			getPostData: postsJson,
			insertPosts: insertPosts,
			template: template
		}

	};

	window.Jnknfnk.Posts.viewPosts = new Posts();


})(jQuery, window, document);