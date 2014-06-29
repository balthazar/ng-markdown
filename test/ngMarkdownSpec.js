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

});
