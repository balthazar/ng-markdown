'use strict';

angular.module('pageDown').directive('pagedown', function ($timeout) {

	return {
		template: '<textarea class="wmd-input"></textarea>',
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			console.log(attrs);
			console.log(element);
		}
	};
});
