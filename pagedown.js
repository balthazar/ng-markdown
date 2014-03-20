'use strict';

angular.module('pageDown').directive('pagedown', function ($timeout) {

	return {
		template: '<textarea></textarea>',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {

			var converter = Markdown.getSanitizingConverter();
			if (attrs.sanitized == "false") {
				converter = new Markdown.Converter();
			}
			if (attrs.postfix) {

			}
			var editor = new Markdown.Editor(converter);
			editor.run();
		}
	};
});
