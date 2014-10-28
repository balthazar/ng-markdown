(function () {
  'use strict';
  /* global angular */
  /* global Markdown */

  angular.module('ngMarkdown', ['monospaced.elastic'])
    .config(['msdElasticConfig', function (config) {
      config.append = '\n\n';
    }])
    .service('ngMarkdown', function () {
      return {
        get: function (input, unsafe) {
          if (!input) { return null; }
          var converter = unsafe ? new Markdown.Converter() : Markdown.getSanitizingConverter();
          return converter.makeHtml(input);
        }
      };
    })
    .filter('ngMarkdown', function (ngMarkdown) {
      return function (input, unsafe) {
        return ngMarkdown.get(input, unsafe);
      };
    })
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
              var suffix = '';
              var prefix = 'wmd-';
              var helpHandler = null;
              var strings = {};

              if (attrs.sanitized === 'false') {
                converter = new Markdown.Converter();
              }
              if (attrs.suffix) {
                suffix = attrs.suffix;
              }
              if (attrs.prefix) {
                prefix = attrs.prefix;
              }
              if (attrs.helpHandler) {
                helpHandler = scope.helpHandler;
              }
              if (attrs.customStrings) {
                strings = scope.customStrings;
              }

              editor = new Markdown.Editor(converter, suffix, prefix, helpHandler, strings);

              [
                'preConversion',
                'postConversion',
                'postNormalization',
                'plainLinkText',
                'preBlockGamut',
                'postBlockGamut',
                'preSpanGamut',
                'postSpanGamut'
              ].forEach(function (hook) {
                  if (hook in attrs) { converter.hooks.chain(hook, scope[hook]); }
                });

              [
                'onPreviewRefresh',
                'postBlockquoteCreation',
                'insertImageDialog'
              ].forEach(function (hook) {
                  if (hook in attrs) { editor.hooks.chain(hook, scope[hook]); }
                });

              preview = angular.element(document.querySelector('.' + prefix + 'preview' + suffix));

              element.addClass(prefix + 'input' + suffix);

              editor.run();

              scope.refresh = function () {
                if (attrs.listTransform === 'true') {
                  scope.ngModel = scope.ngModel.replace(/•/g, '-');
                }
                $timeout(function () {
                  editor.refreshPreview();
                  angular.forEach(preview.find('code'), function (block) {
                    hljs.highlightBlock(block);
                  });
                });
              };

              scope.$on('refreshMarkdown', function (event, message) {
                if (!message || message === '' || message === (prefix + suffix)) {
                  scope.refresh();
                }
              });

              scope.refresh();

            }
          };
        }
      };
    })
    .directive('ngMarkdownPreview', function ($timeout, ngMarkdown) {
      return {
        template: '<div class="wmd-preview"></div>',
        restrict: 'EA',
        replace: true,
        scope: {
          ngModel: '='
        },
        compile: function () {
          return {
            post: function (scope, element, attrs) {

              scope.refresh = function () {
                $timeout(function () {
                  element.html(ngMarkdown.get(scope.ngModel, attrs.sanitized === 'false'));
                  angular.forEach(element.find('code'), function (block) {
                    hljs.highlightBlock(block);
                  });
                });
              };

              scope.refresh();
              scope.$watch('ngModel', scope.refresh);
            }
          };
        }
      };
    });
})();
