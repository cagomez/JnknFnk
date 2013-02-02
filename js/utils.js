
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Utils = window.Jnknfnk.Utils || {};

	var Utils = function() {

		var prettyDate = function(time){
			var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
				diff = (((new Date()).getTime() - date.getTime()) / 1000),
				day_diff = Math.floor(diff / 86400);
			if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
				return "A Month Ago";
					
			return day_diff == 0 && (
					diff < 60 && "just now" ||
					diff < 120 && "1 minute ago" ||
					diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
					diff < 7200 && "1 hour ago" ||
					diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
				day_diff == 1 && "Yesterday" ||
				day_diff < 7 && day_diff + " days ago" ||
				day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
		}

		var userIfy = function(text) {
			var tweet = text.replace(/(^|\s)@(\w+)/g, "$1@<a href=\"http://www.twitter.com/$2\">$2</a>");
   			return tweet;
		};

		var linkify = function(text) {
		    var url_pattern = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img;
		    var url_replace = '$1$4$7$10$13<a href="$2$5$8$11$14">$2$5$8$11$14</a>$3$6$9$12';

		    return text.replace(url_pattern, url_replace);
		};

		var trimString = function(string, length){

			if(string && typeof string === "string"){
				var string  = string.substr(0, (length || 99));
				var space = string.lastIndexOf(" ");

				string = string.substr(0, space) + "...";

				return string;
			} else {

			}
			
		};

		var K = function () {
		    var a = navigator.userAgent;
		    return {
		        ie: a.match(/MSIE\s([^;]*)/)
		    }
		}();

		var parseTwitterDate = function(tdate) {
		    var system_date = new Date(Date.parse(tdate));
		    var user_date = new Date();

		    if (K.ie) {
		        system_date = Date.parse(tdate.replace(/( \+)/, ' UTC$1'))
		    }

		    var diff = Math.floor((user_date - system_date) / 1000);
		    if (diff <= 1) {return "just now";}
		    if (diff < 20) {return diff + " seconds ago";}
		    if (diff < 40) {return "half a minute ago";}
		    if (diff < 60) {return "less than a minute ago";}
		    if (diff <= 90) {return "one minute ago";}
		    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
		    if (diff <= 5400) {return "1 hour ago";}
		    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
		    if (diff <= 129600) {return "1 day ago";}
		    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
		    if (diff <= 777600) {return "1 week ago";}
		    return "on " + system_date;
		}
		
		return {
			prettyDate: prettyDate,
			linkify: linkify,
			trimString: trimString,
			parseTwitterDate: parseTwitterDate,
			userIfy: userIfy
		}

	};

	window.Jnknfnk.Utils = new Utils();


})(jQuery, window, document);