'use strict';

angular.module('ngMarkdown').directive('ng-markdown', function ($timeout) {

	return {
		template: '<textarea></textarea>',
		restrict: 'E',
		replace: true,
		scope: {
			preConversion: '=',
			postConversion: '=',
			postNormalization: '=',
			plainLinkText: '=',
			preBlockGamut: '=',
			postBlockGamut: '=',
			preSpanGamut: '=',
			postSpanGamut: '=',
			onPreviewRefresh: '=',
			helpHandler: '=',
			customStrings: '='
		},
		link: function postLink(scope, element, attrs) {

			$timeout(function () {
				//Setting defaults params
				var converter = Markdown.getSanitizingConverter();
				var postfix = '';
				var prefix = 'wmd-';
				var helpHandler = null;
				var strings = {};

				//Test attributes
				if (attrs.sanitized === 'false') {
					converter = new Markdown.Converter();
				}
				if (attrs.postfix) {
					postfix = attrs.postfix;
				}
				if (attrs.prefix) {
					prefix = attrs.prefix;
				}
				if (attrs.preConversion) {
					converter.hooks.chain('preConversion', scope.preConversion)
				}
				if (attrs.postConversion) {
					converter.hooks.chain('postConversion', scope.postConversion);
				}
				if (attrs.postNormalization) {
					converter.hooks.chain('postNormalization', scope.postNormalization);
				}
				if (attrs.plainLinkText) {
					converter.hooks.chain('plainLinkText', scope.plainLinkText);
				}
				if (attrs.preBlockGamut) {
					converter.hooks.chain('preBlockGamut', scope.preBlockGamut);
				}
				if (attrs.postBlockGamut) {
					converter.hooks.chain('postBlockGamut', scope.postBlockGamut);
				}
				if (attrs.preSpanGamut) {
					converter.hooks.chain('preSpanGamut', scope.preSpanGamut);
				}
				if (attrs.postSpanGamut) {
					converter.hooks.chain('postSpanGamut', scope.postSpanGamut);
				}
				if (attrs.onPreviewRefresh) {
					editor.hooks.chain('onPreviewRefresh', scope.onPreviewRefresh);
				}
				if (attrs.postBlockquoteCreation) {
					editor.hooks.chain('postBlockquoteCreation', scope.postBlockquoteCreation);
				}
				if (attrs.insertImageDialog) {
					editor.hooks.set('insertImageDialog', scope.insertImageDialog);
				}
				if (attrs.helpHandler) {
					helpHandler = scope.helpHandler;
				}
				if (attrs.customStrings) {
					strings = scope.customStrings;
				}

				element.addClass(prefix + 'input' + postfix);
				var editor = new Markdown.Editor(converter, postfix, prefix, helpHandler, strings);
				editor.run();
			}, 0);
		}
	};
});
