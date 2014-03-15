// create main namespace a.k.a. 'angular module'
var tourMapper = angular.module('tourMapper', ['ngRoute']);

// config routes (we only have one)
tourMapper.config(function ($routeProvider) {
	$routeProvider
		.when('/', 
			{
				controller: 'ShowsCtrl', 
				templateUrl: 'partials/all.html'
			})
		.otherwise({ redirectTo: '/'});	
});



