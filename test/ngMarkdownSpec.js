'use strict';

describe('ngMarkdown Directive', function () {

	var body,
		window,
		html,
		el,
		$scope,
		$compile;

	var getHtml = function () {
		return angular.element([
			'<content>',
			'<div class="wmd-button-bar"></div>',
			'<ng-markdown ng-model="bind"></ng-markdown>',
			'<div class="wmd-preview">initialize</div>',
			'</content>'
		].join());
	};

	var getPreview = function () {
		return document.querySelector('.wmd-preview');
	};

	beforeEach(module('ngMarkdown'));
	beforeEach(inject(function (_$rootScope_, _$compile_, $window) {
		$scope = _$rootScope_;
		$compile = _$compile_;
		window = $window;
	}));

	var compile = function () {
		window.document.body.append(getHtml());
		var el = $compile(window)($scope);
		$scope.$digest();
		return el;
	}

	it('should work as an element', function () {
		el = compile();
		expect(el).toBe('<p><em>hi</em></p>');
	});

	/*
	it('should work correctly with default model values', function () {

		$scope.bind = 'ok';

		var mark = compile(getHtml());
		expect(mark).toBe('<p>ok</p>');

		$scope.bind = 'no';
		$scope.$digest();
		expect(mark).toBe('<p>ok</p>');
	});
*/
/*
	beforeEach(inject(function ($rootScope, $compile, $document) {

		$scope = $rootScope;
		$scope.bind = '**strongText**';

		body = angular.element($document[0].body);
		html = getHtml();
		body.append(html);

		$compile(html)($scope);
		$scope.$digest();

	}));

	afterEach(function () {
		document.querySelector('content').innerHTML = getHtml();
	});

	it('should equal 42', function () {
		expect(42).toBe(42);
	});

	it('should attach buttons to the toolbar', function () {
		expect(document.querySelectorAll('.wmd-button-bar div i').length).toBe(15);
	});

	it('should be strong', function () {
		$scope.bind = '**strongText**';
		expect($scope.bind).toBe('**strongText**');
		expect(getPreview().innerHTML).toBe('<p><strong>strongText</strong></p>')
	});

	it('should be italic', function () {
		expect(getPreview().innerHTML).not.toBe('<p><em>italic</em><p>');

		$scope.bind = '*italic*';
		expect($scope.bind).toBe('*italic*');

		$scope.$digest();
		expect(getPreview().innerHTML).toBe('<p><em>italic</em><p>');
	});
*/
});
