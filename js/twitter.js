

(function($, window, document, undefined){
	'use strict'

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Twitter = window.Jnknfnk.Twitter || {};

	var Twitter = function(elem) {
		
		var _this = this;

		var getTweets = function(){

			$.ajax({
				url: Jnknfnk.Global.Config.SocialFeeds.Twitter.getLatestStatus,
				dataType: 'jsonp',
				success: function(data) {
					outPutTweet(data, true);
				},
				error: function(data) {
					outPutTweet(data, false);
				}
			});
		}

		var outPutTweet = function(data, isValid){

			if(isValid) {

				data[0].created_at = Jnknfnk.Utils.parseTwitterDate(data[0].created_at);
				data[0].text = Jnknfnk.Utils.userIfy(Jnknfnk.Utils.linkify(Jnknfnk.Utils.trimString(data[0].text, 80)));
				
			} else {

				data[0].created_at = '2 Hours ago';
				data[0].text = 'Looking forward to another big one at our next event, Get your tickets, their selling fast!'
			
			}
			
			var result = '<span>' + data[0].created_at + '</span>  - ' + data[0].text;
			
			$('.social').find('.twitter').append(result);
			
		}

		var initialise = function(){
			getTweets();
		}();

	};

	window.Jnknfnk.Twitter = new Twitter();


})(jQuery, window, document);