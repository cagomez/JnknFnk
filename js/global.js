
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Global = window.Jnknfnk.Global || {};

	var Config = function() {

		var d = {
			General: {
				hostNameLocal: "http://localhost:8888/jnknfnk2013/site_build/",
				hostNameLive: "http://www.ilovejnk.co.uk/",
				getPostParams: "?json=get_post&custom_fields=mainimg&post_id=",
				getPostsParams: "?json=get_recent_posts&count=12&custom_fields=mainimg&page=",
				getCatParams: "?json=get_category_posts&custom_fields=mainimg&slug="
			},
			SocialFeeds: {
				Twitter: {
					getLatestStatus: "https://api.twitter.com/1/statuses/user_timeline/jnkNfnk.json?count=1&include_rts=1"
				}
			}
		};

		var $carousel = $(document.getElementById('carousel'));

		
		
		var getWindowTop = function() {

			$(window).scroll(function(e){
				if(window.pageYOffset > $carousel.height()) {
					$carousel.tinycarousel_stop();
				} else {
					$carousel.tinycarousel_start();
				}
			});
			return 
		}();

		var initialise = function() {
			$carousel.mouseenter(function() {
				$carousel.tinycarousel_stop();
			});

			$carousel.mouseleave(function(){
				$carousel.tinycarousel_start();
			});

		}();

		return {
			Config: d
		}

	};

	window.Jnknfnk.Global = new Config();


})(jQuery, window, document);