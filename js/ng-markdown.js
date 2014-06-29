(function () {
    'use strict';
    /* global angular */
    /* global Markdown */

    angular.module('ngMarkdown', ['monospaced.elastic'])
	.config(['msdElasticConfig', function(config) {
		config.append = '\n\n';
	}])
    .directive('ngMarkdown', function ($timeout) {

        return {
            template: '<textarea msd-elastic></textarea>',
            restrict: 'EA',
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
                customStrings: '=',
				ngModel: '='
            },
			compile: function () {
				return {
					post: function (scope, element, attrs) {

						//Setting defaults params
						var converter = Markdown.getSanitizingConverter();
						var editor;
						var postfix = '';
						var prefix = 'wmd-';
						var helpHandler = null;
						var strings = {};

						//Test attributes
						if (attrs.sanitized === 'false') {
							converter = new Markdown.Converter();
						}
						if (attrs.suffix) {
							postfix = attrs.suffix;
						}
						if (attrs.prefix) {
							prefix = attrs.prefix;
						}
						if (attrs.preConversion) {
							converter.hooks.chain('preConversion', scope.preConversion);
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

						editor = new Markdown.Editor(converter, postfix, prefix, helpHandler, strings);
						editor.run();

						var refresh = function () {
							$timeout(function() {
								editor.refreshPreview();
							}, 0);
						};

						scope.$watch('ngModel', function(value) {
							refresh();
						});

						scope.$on('refreshMarkdown', function(event, message) {
							if (!message || message === '' || message === (prefix + postfix)) {
								refresh();
							}
						});

					}
				};
			},
		};
	});
})();
