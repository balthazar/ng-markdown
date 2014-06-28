'use strict';

describe('ngMarkdown Directive', function () {

	var body,
		html,
		$scope,
		bind;

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

	beforeEach(inject(function ($rootScope, $compile, $document) {

		$scope = $rootScope.$new();
		$scope.bind = '**strongText**';

		body = angular.element($document[0].body);
		html = getHtml();
		body.append(html);

		$compile($document)($scope);
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

});
