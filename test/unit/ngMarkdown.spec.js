'use strict';

describe('ngMarkdown Directive', function () {

  var $scope,
      $timeout,
      $document,
      $compile,
      elem;

  var defTemplate = [
    '<content>',
      '<div class="wmd-button-bar"></div>',
      '<ng-markdown ng-model="bind"></ng-markdown>',
      '<div class="wmd-preview">initialize</div>',
    '</content>'
  ].join('');

  beforeEach(module('ngMarkdown'));

  beforeEach(inject(function (_$rootScope_, _$timeout_, _$compile_, _$document_) {
    $scope = _$rootScope_;
    $document = _$document_;
    $timeout = _$timeout_;
    $compile = _$compile_;

    var template = angular.element(defTemplate);
    angular.element($document[0].body).append(template);

    $compile(template)($scope);
    $scope.$digest();
  }));

  afterEach(inject(function ($document) {
    clearContent();
  }));

  function recompile (tpl) {
    clearContent();

    var template = angular.element(tpl || defTemplate);
    angular.element($document[0].body).append(template);

    $compile(template)($scope);
    $scope.$digest();
  }

  function getPreview (custom) {
    return document.querySelector(custom || '.wmd-preview');
  }

  function clearContent () {
    var content = document.querySelector('content');
    content.parentNode.removeChild(content);
  }

  function newValue (value) {
    $scope.bind = value;
    $timeout.flush();
  }

  function checkPreview (value) {
    expect(getPreview().innerHTML).toBe(value);
  }

  it('should equal 42', function () {
    newValue(42);
    expect(42).toBe(42);
    checkPreview('<p>42</p>');
  });

  it('should attach buttons to the toolbar', function () {
    expect(document.querySelectorAll('.wmd-button-bar div i').length).toBe(15);
  });

  it('should be italic', function () {
    newValue('*italic*');
    expect($scope.bind).toBe('*italic*');
    checkPreview('<p><em>italic</em></p>');
  });

  it('should be strong', function () {
    newValue('**strongText**');
    expect($scope.bind).toBe('**strongText**');
    checkPreview('<p><strong>strongText</strong></p>');
  });

  it('should be strong and italic', function () {
    newValue('***strong and italic text***');
    expect($scope.bind).toBe('***strong and italic text***');
    checkPreview('<p><em><strong>strong and italic text</strong></em></p>');
  });

  it('should be strong and italic', function () {
    newValue('***strong and italic text***');
    expect($scope.bind).toBe('***strong and italic text***');
    checkPreview('<p><em><strong>strong and italic text</strong></em></p>');
  });

  it('should add a link', function () {
    newValue('[My StackOverflow][1]\n\n[1]: http://stackoverflow.com/users/2054072/aper%C3%A7u');
    checkPreview('<p><a href="http://stackoverflow.com/users/2054072/aper%C3%A7u">My StackOverflow</a></p>');
  });

  it('should create a citation block', function () {
    newValue('> The true sign of intelligence is not knowledge but imagination.\n>\n> **Albert Einstein**');
    expect(getPreview().innerHTML.length).toBe(144);
    checkPreview('<blockquote>\n  <p>The true sign of intelligence is not knowledge but imagination.</p>\n  \n  <p><strong>Albert Einstein</strong></p>\n</blockquote>');
  });

  it('should create use some code block properly', function () {
    //Take care of the new highlight integration
    newValue('A basic use of the `$timeout` **Angular** service :\n\n    $timeout(function () {\n        editor.refresh();\n    });');
    expect(getPreview().innerHTML.length).toBe(366);
    checkPreview('<p>A basic use of the <code class=" hljs bash"><span class="hljs-variable">$timeout</span></code> <strong>Angular</strong> service :</p>\n\n<pre><code class=" hljs php"><span class="hljs-variable">$timeout</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{\n    editor.refresh();\n});\n</code></pre>');
  });

  it('should add an image', function () {
    newValue('![meow][1]\n\n[1]: https://avatars0.githubusercontent.com/u/6033345');
    checkPreview('<p><img src="https://avatars0.githubusercontent.com/u/6033345" alt="meow" title=""></p>');
  });

  it('should create a numbered list', function () {
    newValue(' 1. This is a numbered list\n 2. just here to make a test about it\n 3. And because I want to !');
    checkPreview('<ol>\n<li>This is a numbered list</li>\n<li>just here to make a test about it</li>\n<li>And because I want to !</li>\n</ol>');
  });

  it('should create a list with childs', function () {
    newValue(' - This is a simple list\n     - but not at easy finally\n          - cause you can make some childs');
    checkPreview('<ul>\n<li>This is a simple list\n<ul><li>but not at easy finally\n<ul><li>cause you can make some childs</li></ul></li></ul></li>\n</ul>');
  });

  it('should test the headings', function () {
    newValue('This is the h2 heading\n------\n\n## Like this one ##\n\nAnd the h1\n=======\n\n# Also with two writings');
    checkPreview('<h2>This is the h2 heading</h2>\n\n<h2>Like this one</h2>\n\n<h1>And the h1</h1>\n\n<h1>Also with two writings</h1>');
  });

  it('should make a separator', function () {
    newValue('Hey Hey, do you want to be separated ?\n\n----------\n\nYep');
    checkPreview('<p>Hey Hey, do you want to be separated ?</p>\n\n<hr>\n\n<p>Yep</p>');
  });

  it('should create directive with a suffix', function () {
    recompile([
      '<content>',
        '<div class="wmd-button-bar-ok"></div>',
        '<ng-markdown ng-model="bind" suffix="-ok"></ng-markdown>',
        '<div class="wmd-preview-ok">initialize</div>',
      '</content>'
    ].join(''));
    newValue(42);
    expect(getPreview('.wmd-preview-ok').innerHTML).toBe('<p>42</p>');
  });

  it('should create directive with a prefix', function () {
    recompile([
      '<content>',
        '<div class="apercu-button-bar"></div>',
        '<ng-markdown ng-model="bind" prefix="apercu-"></ng-markdown>',
        '<div class="apercu-preview">initialize</div>',
      '</content>'
    ].join(''));
    newValue(42);
    expect(getPreview('.apercu-preview').innerHTML).toBe('<p>42</p>');
  });

  it('should sanitize output', function () {
    newValue('<marquee>I\'m a relic of a forgotten past.</marquee>');
    checkPreview('<p>I\'m a relic of a forgotten past.</p>');
  });

  it('should not sanitize output', function () {
    recompile([
      '<content>',
        '<div class="wmd-button-bar"></div>',
        '<ng-markdown ng-model="bind" sanitized="false"></ng-markdown>',
        '<div class="wmd-preview">initialize</div>',
      '</content>'
    ].join(''));
    newValue('<marquee>I\'m a relic of a forgotten past.</marquee>');
    checkPreview('<p><marquee>I\'m a relic of a forgotten past.</marquee></p>');
  });

  it('should add a preConversion hook', function () {

    $scope.func = function (text) {
      return '# This text will be followed by the real input\n\n' + text;
    };

    recompile([
      '<content>',
        '<div class="wmd-button-bar"></div>',
        '<ng-markdown ng-model="bind" pre-conversion="func"></ng-markdown>',
        '<div class="wmd-preview">initialize</div>',
      '</content>'
    ].join(''));

    newValue('#Prehook');
    checkPreview('<h1>This text will be followed by the real input</h1>\n\n<h1>Prehook</h1>');
  });

  it('should add a postConversion hook', function () {

    $scope.func = function (text) {
      return text + '<br>\n**This is not bold, because it was added after the conversion**';
    };

    recompile([
      '<content>',
        '<div class="wmd-button-bar"></div>',
        '<ng-markdown ng-model="bind" post-conversion="func"></ng-markdown>',
        '<div class="wmd-preview">initialize</div>',
      '</content>'
    ].join(''));

    newValue('**Okay that\'s some really awesome tests**');
    checkPreview('<p><strong>Okay that\'s some really awesome tests</strong></p><br>\n**This is not bold, because it was added after the conversion**');
  });

  it('should call the post normalisation', function () {

    $scope.func = function (text) {
      return text;
    };

    recompile([
      '<content>',
        '<div class="wmd-button-bar"></div>',
        '<ng-markdown ng-model="bind" post-normalization="func"></ng-markdown>',
        '<div class="wmd-preview">initialize</div>',
      '</content>'
    ].join(''));

    newValue('                      \n**strong text**');
    checkPreview('<p><strong>strong text</strong></p>');
  });

  it('should control plain links', function () {

    $scope.func = function (url) {
      if (/^http:\/\/stackoverflow.com\/.*/i.test(url)) {
        return '<b>A link to an awesome site !</b>';
      }
      else {
        return 'Some page on the internet';
      }
    };

    recompile([
      '<content>',
        '<div class="wmd-button-bar"></div>',
        '<ng-markdown ng-model="bind" plain-link-text="func"></ng-markdown>',
        '<div class="wmd-preview">initialize</div>',
      '</content>'
    ].join(''));

    newValue('# Hey hey\nhttp://stackoverflow.com/users/2054072/aper%C3%A7u');
    checkPreview('<h1>Hey hey</h1>\n\n<p><a href="http://stackoverflow.com/users/2054072/aper%C3%A7u"><b>A link to an awesome site !</b></a></p>');
  });

});
