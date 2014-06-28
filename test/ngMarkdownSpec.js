'use strict';

describe('ngMarkdown Directive', function () {
	var element,
		$scope,
		bind;

	beforeEach(module('ngMarkdown'));

	beforeEach(inject(function ($rootScope, $compile) {

		$scope = $rootScope;

		element = angular.element('<ng-markdown ng-model="bind"></ng-markdown>');

		$compile(element)($scope);
		$scope.$digest();

	}));

	it('should equal 42', function () {
		expect(42).toBe(42);
	});

});
