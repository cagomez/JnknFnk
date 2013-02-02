
(function($, window, document, undefined){
	"use strict"

	window.Jnknfnk = window.Jnknfnk || {};
	window.Jnknfnk.Utils.Templating = window.Jnknfnk.Templating || {};

	var Templating = function() {

		var templateFolder = "../../templates";

		var initialise = function() {

		}();

		var getTemplate = function(templateName, json){

			$.ajax({
				url: templateFolder + "/" + templateName + ".html",
				dataType: "jsonp",
				success: function(data) {
					console.log(data);
					compileTemplate(data);
				},
				error: function(data) {
					console.log(data);
				}
			});


		};

	 	var compileTemplate = function(template, json) {
	 		var compiledTemplate = Handlebars.compile(template);

	 		mergeTemplateDate(compiledTemplate, json);
	 	};

	 	var mergeTemplateDate = function(template, json) {

	 		return template(json);
			
	 	};

		return {
			getTemplate: getTemplate
		}

	};

	window.Jnknfnk.Utils.Templating = new Templating();


})(jQuery, window, document);