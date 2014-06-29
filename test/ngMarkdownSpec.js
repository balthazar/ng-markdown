'use strict';

describe('ngMarkdown Directive', function () {

	var $scope,
		$compile,
		elem;

	var getPreview = function () {
		return document.querySelector('.wmd-preview');
	};

	beforeEach(module('ngMarkdown'));

	//need to implement this
	beforeEach(module('test/tpl/default.html'));

	beforeEach(inject(function ($rootScope, $compile, $document) {
		$scope = $rootScope;
		$compile = $compile;

		elem = angular.element([
			'<content>',
			'<div class="wmd-button-bar"></div>',
			'<ng-markdown ng-model="bind"></ng-markdown>',
			'<div class="wmd-preview">initialize</div>',
			'</content>'
		].join(''));

		var body = angular.element($document[0].body);
		body.append(elem);

		$compile(elem)($scope);
	}));

	afterEach(inject(function ($document) {
		var content = document.querySelector('content');
		content.parentNode.removeChild(content);
	}));

	it('should equal 42', function () {
		expect(42).toBe(42);
	});

	it('should attach buttons to the toolbar', function () {
		expect(document.querySelectorAll('.wmd-button-bar div i').length).toBe(15);
	});

	it('should be italic', inject(function ($timeout) {
		$scope.bind = '*italic*';
		expect($scope.bind).toBe('*italic*');
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><em>italic</em></p>');

		$scope.bind = '**no**';
		expect($scope.bind).toBe('**no**');
		$timeout.flush();
		expect(getPreview().innerHTML).not.toBe('<p><em>italic</em></p>');
	}));

	it('should be strong', inject(function ($timeout) {
		$scope.bind = '**strongText**';
		expect($scope.bind).toBe('**strongText**');
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><strong>strongText</strong></p>')
	}));

	it('should be strong and italic', inject(function ($timeout) {
		$scope.bind = '***strong and italic text***';
		expect($scope.bind).toBe('***strong and italic text***');
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><em><strong>strong and italic text</strong></em></p>')
	}));

	it('should be strong and italic', inject(function ($timeout) {
		$scope.bind = '***strong and italic text***';
		expect($scope.bind).toBe('***strong and italic text***');
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><em><strong>strong and italic text</strong></em></p>')
	}));

	it('should add a link', inject(function ($timeout) {
		$scope.bind = '[My StackOverflow][1]\n\n[1]: http://stackoverflow.com/users/2054072/aper%C3%A7u';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><a href="http://stackoverflow.com/users/2054072/aper%C3%A7u">My StackOverflow</a></p>')
	}));

	it('should create a citation block', inject(function ($timeout) {
		$scope.bind = '> The true sign of intelligence is not knowledge but imagination.\n>\n> **Albert Einstein**';
		$timeout.flush();
		expect(getPreview().innerHTML.length).toBe(144);
		expect(getPreview().innerHTML).toBe('<blockquote>\n  <p>The true sign of intelligence is not knowledge but imagination.</p>\n  \n  <p><strong>Albert Einstein</strong></p>\n</blockquote>')
	}));

	it('should create use some code block properly', inject(function ($timeout) {
		$scope.bind = 'A basic use of the `$timeout` **Angular** service :\n\n    $timeout(function () {\n        editor.refresh();\n    });';
		$timeout.flush();
		expect(getPreview().innerHTML.length).toBe(157);
		expect(getPreview().innerHTML).toBe('<p>A basic use of the <code>$timeout</code> <strong>Angular</strong> service :</p>\n\n<pre><code>$timeout(function () {\n    editor.refresh();\n});\n</code></pre>')
	}));

	it('should add an image', inject(function ($timeout) {
		$scope.bind = '![meow][1]\n\n[1]: https://avatars0.githubusercontent.com/u/6033345';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p><img src="https://avatars0.githubusercontent.com/u/6033345" alt="meow" title=""></p>')
	}));

	it('should create a numbered list', inject(function ($timeout) {
		$scope.bind = ' 1. This is a numbered list\n 2. just here to make a test about it\n 3. And because I want to !';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<ol>\n<li>This is a numbered list</li>\n<li>just here to make a test about it</li>\n<li>And because I want to !</li>\n</ol>')
	}));

	it('should create a list with childs', inject(function ($timeout) {
		$scope.bind = ' - This is a simple list\n     - but not at easy finally\n          - cause you can make some childs';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<ul>\n<li>This is a simple list\n<ul><li>but not at easy finally\n<ul><li>cause you can make some childs</li></ul></li></ul></li>\n</ul>')
	}));

	it('should test the headings', inject(function ($timeout) {
		$scope.bind = 'This is the h2 heading\n------\n\n## Like this one ##\n\nAnd the h1\n=======\n\n# Also with two writings';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<h2>This is the h2 heading</h2>\n\n<h2>Like this one</h2>\n\n<h1>And the h1</h1>\n\n<h1>Also with two writings</h1>')
	}));

	it('should make a separator', inject(function ($timeout) {
		$scope.bind = 'Hey Hey, do you want to be separated ?\n\n----------\n\nYep';
		$timeout.flush();
		expect(getPreview().innerHTML).toBe('<p>Hey Hey, do you want to be separated ?</p>\n\n<hr>\n\n<p>Yep</p>')
	}));

});
