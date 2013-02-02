$(document).ready(function() {

	(function() {
		var ctx = $('#canvas')[0].getContext("2d");
		ctx.fillStyle = colorToHex(DelSite.Facebook.auth.linkColour);
		ctx.beginPath();
		ctx.arc(63, 63, 63, 0, Math.PI * 2, false);
		var imageObj = new Image();
		imageObj.onload = function() {
			ctx.drawImage(imageObj, 0, 0);
		};
		imageObj.src = "../images/book_tickets_sticker_text.png";
		ctx.closePath();
		ctx.fill();
	})();

	$('#canvas').live('click', function() {
		window.location = $(this).find('a').attr('href');
	});


	$('span.highlight, a').css({
		'color' : DelSite.Facebook.auth.linkColour
	});

	$('.button').css({
		'background': DelSite.Facebook.auth.linkColour
	});



	function colorToHex(color) {
		if (color.substr(0, 1) === '#') {
			return color;
		}
		var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);

		var red = parseInt(digits[2]);
		var green = parseInt(digits[3]);
		var blue = parseInt(digits[4]);

		var rgb = blue | (green << 8) | (red << 16);
		return digits[1] + '#' + rgb.toString(16);
	};

});

var DelSite = {

	/* initialise
		  ****************************************************************************************/

	init: function() {
		//Add events to dom elements
		//DelSite.ajaxLoader();
		this.Facebook.init();
		// Fire google maps
		this.Google.plusOne();

		this.LoadEvents();
	},

	/* bind events on page
		  ****************************************************************************************/

	LoadEvents: function() {
		var button = $('#slide_down_button a'),
			newsFeed = $('.news_feed');

		button.live('click', function(evt) {
			evt.preventDefault();

			var colHeight = $('#inner_wrapper').height() + 40,
				container = $('#outerWrapper, .right_col');
			open = container.hasClass('open');

			if (open === false) {
				container.animate({
					height: colHeight
				},
				1000, function() {
					button.text('Less');
					container.addClass('open');
				});

			} else if (open === true) {
				container.animate({
					height: '549px'
				},
				1000, function() {
					container.removeClass('open');
					button.text('More');
				});
			}

			$(".sticker").bind('click', function() {
				_gaq.push(['_trackPageview', "Book Tickets Link Clicked"]);
			});

		});

		//Look for each feed item and add a mouse enter event to them
		newsFeed.delegate('.feed_item', 'mouseenter', function() {
			//Add a close link/icon to the this feeditem														 
			$(this).append('<a href="#" title="#" class="close">Close</a>');
		});

		//Look for each feed item and add a mouseleave event to them
		newsFeed.delegate('.feed_item', 'mouseleave', function() {
			//On click of close cross remove this parent feeditem												   
			$('.close').remove();
		});

		newsFeed.delegate('.close', 'click', function(e) {
			e.preventDefault();
			$(this).parent('li').fadeOut(600);
		});
	},

	/* Ajax Loader
		  ****************************************************************************************/

	ajaxLoader: function() {
		$('.loader').ajaxStart(function() {
			$(this).show();
		});
	},

	/* Facebook related functionality
		  ****************************************************************************************/

	Facebook: {
		init: function() {
			DelSite.Facebook.getToken();

		},
		auth: {
			appId: "145197755569764",
			appSecret: "bade0cff12a12fa7700d7f070a397003",
			eventPageId: "426224220766295",
			siteUrl: "http://www.Delete-cardiff.co.uk",
			linkColour: "#cd3939"

		},
		getToken: function() {

			if (!this.getAccessToken()) {
				if (window.location.hash.length == 0) {
					var path = 'https://www.facebook.com/dialog/oauth?',
						queryParams = ['client_id=' + this.auth.appId, 'redirect_uri=' + this.auth.siteUrl, 'response_type=token'],
						query = queryParams.join('&'),
						url = path + query;
					window.location = url;
				} else {
					accessToken = window.location.hash.substring(1);
					this.WallFeed.getWallFeed(accessToken);
					DelSite.Google.maps.init(accessToken);
					DelSite.Facebook.getAttending(accessToken);
				}
			}
		},
		animateFeed: function() {

			var container = $('.news_feed ul'),
				firstItem = container.find('li.feed_item:first'),
				itemHeight = firstItem.height();


			setInterval(function() {
				$('li.feed_item:first').animate({
					height: '0px',
					marginBottom: '0px',
					borderBottom: '0px'
				},
				1000, function() {

					$(this).detach().insertAfter('li.feed_item:last').css({
						height: itemHeight,
						marginBottom: '20px',
						display: 'block',
						borderBottom: '1px solid #FFF'
					});

					$(this).css({height : "auto"});

				});
			}, 7500);

		},
		getAttending: function(accessToken) {

			var url = function() {
				return "https://graph.facebook.com/fql?q=SELECT%20attending_count,%20unsure_count,%20all_members_count,%20declined_count%20FROM%20event%20WHERE%20eid%20=" + DelSite.Facebook.auth.eventPageId + "&" + accessToken;
			};

			$.ajax({
				url: url(),
				success: function(data) {
					var container = $('.buzz_module'),
						attendingElem = container.find('#attending'),
						maybeElem = container.find('#maybe'),
						notElem = container.find('#not-attending'),
						invitedElem = container.find('#invited'),
						data = JSON.parse(data);

						attendingElem.html(data.data[0].attending_count);
						maybeElem.html(data.data[0].unsure_count);
						notElem.html(data.data[0].declined_count);
						invitedElem.html(data.data[0].all_members_count);

					//Remove ajax animating gif
					//$(".loader").remove();
					//Insert formatted response into dom
					//$(html).appendTo('.buzz_module ul li:first .highlight');
				},
				dataType: "text",
				error: function(jqXHR, textStatus, errorThrown) {
					return console.log(arguments);
				}
			});

		},

		setAccessToken: function(accessToken) {
			return false;
		},
		getAccessToken: function(key) {
			return false;
		},

		/* Authenticate site on facebook and retrieve Facebook group wall feed (AJAX)
		  		****************************************************************************************/

		WallFeed: {
			feedUrl: function() {
				return "https://graph.facebook.com/" + DelSite.Facebook.auth.eventPageId + "/feed?" + accessToken + "/?callback=?";
			},
			getWallFeed: function(accessToken) {
				var self = this;
				$.ajax({
					url: DelSite.Facebook.WallFeed.feedUrl(),
					success: function(data) {
						
						if(!$.isEmptyObject(data)) {
						var items = "",
							list = $('.news_feed ul'),
							data = JSON.parse(data);

						$.each(data.data, function(i, item) {	
							items += '<li class="feed_item"><div class="feed_item_img"><img src="https://graph.facebook.com/' + item.from.id + '/picture" alt="profile image"/></div><div class="item_content"><h4><a href="https://www.facebook.com/profile.php?id=' + item.from.id + '" title="' + item.from.name + '">' + item.from.name + '</a></h4><p>' + DelSite.Utils.linkify(item.message) + '</p><ul class="feed_item_meta"><li>' + item.created_time + '</li></ul></div></li>';
						});

						} else {
						
							items = "<li>No Comments At The Moment, Why not add some <a href=\"https://www.facebook.com/events/" + DelSite.Facebook.auth.eventPageId +"/\" title=\"delete facebook\">here</a></li>";
						
						}
						
						$(items).appendTo(list);

						DelSite.Facebook.animateFeed();
							
					},
					context: document.body,
					dataType: "text",
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(errorThrown);
					}
				});
			}
		},

		/* Get the Facebook event information (AJAX) and inject into dom response
		 		 ****************************************************************************************/

		getEventInfo: function(accessToken) {
			var self = this,
				dfd = $.Deferred(),
				getUrl = function() {
					return "https://graph.facebook.com/" + DelSite.Facebook.auth.eventPageId + "/?" + accessToken + "&callback=?"
				};

				self.accessToken = accessToken;

			$.ajax({
				url: getUrl(),
				success: function(data) {
					self.Venue = {
						"id" : data.venue.id,
						"latitude": "",
						"longitude": ""
					}
					$.ajax({
						url: "https://graph.facebook.com/" + self.Venue.id + "/?" + self.accessToken + "&callback=?",
						success: function(response) {
							self.Venue = response;
							dfd.resolve();

							$('.location_module li:eq(0)').empty().html('<strong>Venue: </strong><a href=\"' + self.Venue.link + '\">' + self.Venue.username + "</a>");
							$('.location_module li:eq(1)').empty().html('<strong>Street: </strong>' + self.Venue.location.street);
						},
						error: function(response) {
							console.log(response);
						},
						dataType: "json"
					});

					var date = Date.parse(data.start_time),
						html = "<div id=\"outerWrapper\"><div id=\"inner_wrapper\"><h3>" + data.name + "</h3><span class=\"event_time\"><strong>Time:&nbsp;</strong>" + date + "</span>",
						description = "<p class=\"event_info_description\">" + data.description.replace(/\n\n/g, "<br />") + "</p>";
					html += description + "</div></div>";
					
					

					//Remove ajax animating gif
					$(".loader").remove();
					//Insert formatted response into dom
					$(html).appendTo('.event_info').insertBefore('#slide_down_button');

				},
				dataType: "json"
			});

			return dfd.promise();
		}
	},
	Google: {
		maps: {
			init: function(accessToken) {
				$.when(DelSite.Facebook.getEventInfo(accessToken)).then(function() {
					var myLatlng = new google.maps.LatLng(DelSite.Facebook.Venue.location.latitude, DelSite.Facebook.Venue.location.longitude),
						myOptions = {
							zoom: 14,
							center: myLatlng,
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							disableDefaultUI: true
						}
					var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
					var image = 'images/map_pin.png';
					var beachMarker = new google.maps.Marker({
						position: myLatlng,
						map: map,
						icon: image
					});
					
				});
			}
		},
		plusOne: function() {
			window.___gcfg = {
				lang: 'en-GB'
			};

			(function() {
				var po = document.createElement('script');
				po.type = 'text/javascript';
				po.async = true;
				po.src = 'https://apis.google.com/js/plusone.js';
				var s = document.getElementsByTagName('script')[0];
				s.parentNode.insertBefore(po, s);
			})();
		}

	},
	Utils: {
		linkify: function(text) {
		    var url_pattern = /(\()((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\))|(\[)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\])|(\{)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(\})|(<|&(?:lt|#60|#x3c);)((?:ht|f)tps?:\/\/[a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]+)(>|&(?:gt|#62|#x3e);)|((?:^|[^=\s'"\]])\s*['"]?|[^=\s]\s+)(\b(?:ht|f)tps?:\/\/[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]+(?:(?!&(?:gt|#0*62|#x0*3e);|&(?:amp|apos|quot|#0*3[49]|#x0*2[27]);[.!&',:?;]?(?:[^a-z0-9\-._~!$&'()*+,;=:\/?#[\]@%]|$))&[a-z0-9\-._~!$'()*+,;=:\/?#[\]@%]*)*[a-z0-9\-_~$()*+=\/#[\]@%])/img;
		    var url_replace = '$1$4$7$10$13<a href="$2$5$8$11$14">$2$5$8$11$14</a>$3$6$9$12';

		    return text.replace(url_pattern, url_replace);}

		}
	}

DelSite.init();
