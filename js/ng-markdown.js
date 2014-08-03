(function () {
    'use strict';
    /* global angular */
    /* global Markdown */

    angular.module('ngMarkdown', ['monospaced.elastic'])
        .config(['msdElasticConfig', function (config) {
            config.append = '\n\n';
        }])
        .directive('ngMarkdown', function ($timeout, $compile) {

            return {
                template: '<textarea ng-keydown="refresh()"></textarea>',
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

                            //Change elasticity, recompile element
                            if (attrs.elastic !== 'false') {
                                element.attr('msd-elastic', '');
                                $compile(element)(scope);
                            }

                            //Setting defaults params
                            var converter = Markdown.getSanitizingConverter();
                            var editor;
                            var preview;
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

                            preview = angular.element(document.querySelector('.' + prefix + 'preview' + postfix));

                            element.addClass(prefix + 'input' + postfix);

                            editor = new Markdown.Editor(converter, postfix, prefix, helpHandler, strings);
                            editor.run();

                            scope.refresh = function () {
                                $timeout(function () {
                                    editor.refreshPreview();
                                    angular.forEach(preview.find('code'), function (block) {
                                        hljs.highlightBlock(block);
                                    });
                                });
                            };

                            scope.$on('refreshMarkdown', function (event, message) {
                                if (!message || message === '' || message === (prefix + postfix)) {
                                    scope.refresh();
                                }
                            });

                        }
                    };
                }
            };
        });
})();
