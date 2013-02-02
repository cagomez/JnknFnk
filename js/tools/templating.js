
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Utils.Templating = window.Jnknfnk.Templating || {};

	var Templating = function() {
		var _this = this;

		var templateFolder = "templates";

		var initialise = function() {

		}();

		var getTemplate = function(templateName, json){
			var dfd = $.Deferred();

			$.ajax({
				url: templateFolder + "/" + templateName + ".html",
				dataType: "jsonp",
				success: function(data) {
					var compiledTemplate = Handlebars.compile(data.responseText);
					var output = template(json);
					dfd.resolve(output);

				},
				error: function(data) {
					var template = Handlebars.compile(data.responseText);
					var output = template(json);
					dfd.resolve(output);

				}
			});
			return dfd.promise();
		
		};

		return {
			getTemplate: getTemplate
		}

	};

	window.Jnknfnk.Utils.Templating = new Templating();


})(jQuery, window, document);