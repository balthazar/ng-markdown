'use strict';

describe('ngMarkdown Directive', function () {

	var body,
		html,
		$scope,
		bind;

	beforeEach(module('ngMarkdown'));

	beforeEach(inject(function ($rootScope, $compile, $document) {

		body = angular.element($document[0].body);
		$scope = $rootScope.$new();

		$scope.bind = '**strongText**';

		html = angular.element('<div class="wmd-button-bar"></div><ng-markdown ng-model="bind"></ng-markdown><div class="wmd-preview">initialize</div>');
		body.append(html);

		$compile($document)($scope);
		$scope.$digest();

	}));

	it('should equal 42', function () {
		expect(42).toBe(42);
	});

	it('should attach buttons to the toolbar', function () {
		expect(document.querySelectorAll('.wmd-button-bar div i').length).toBe(15);
	});

	it('should be strong', function () {
		expect($scope.bind).toBe('**strongText**');
		expect(document.querySelector('.wmd-preview').innerHTML).toBe('<p><strong>strongText</strong></p>')
	});

});
