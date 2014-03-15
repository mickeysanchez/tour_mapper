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

// factory
tourMapper.factory('showFactory', function($http, $filter) {
	var factory = {};
	
	factory.getShowsFromSeatGeek = function (bandName) {
		return $http({ method: "GET", url: "https://api.seatgeek.com/2/events?type=concert&q=" + bandName });
	};
	
	// turn JSON from SeatGeek API into properly formatted show objects.
	factory.showObjectsFromGrab = function (data) {
		return data["events"].map(function (show) {	
			return  {
						"ticket_url" : show["url"],
						"datetime_local": new Date (show["datetime_local"]),
						"venue": {
							"name": show["venue"]["name"],
							"display_location": show["venue"]["display_location"]
						},
				        "type": "Feature",
				        "geometry": {
				            "type": "Point",
				            "coordinates": [
				                show["venue"]["location"]["lon"],
				                show["venue"]["location"]["lat"]
				            ]
				        },
				        "properties": {
				            "title": $filter('date')(show["datetime_local"]),
				            "description": "<a href='" + show["url"] + "'> Tickets </a>",
				            "marker-size": "small",
				            "marker-color": "#070"
				        }
					};
		});
	};
	
	return factory;
});

// create a Controller named ShowsCtrl
tourMapper.controller('ShowsCtrl', function($scope, $http, $filter, showFactory) {

	$scope.shows = [];
	
	// create Mapbox Map Object and load an empty map on page load
	$scope.map = function() {
		var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 2);
		map.scrollWheelZoom.disable();
		return map;	 
	}();
			   		  	 
	// instantiate MapBox featureLayer (markers)   
	$scope.featureLayer = L.mapbox.featureLayer()

 	// grab shows from SeatGeek, populate shows and map.
	$scope.grabShows = function() {
		$scope.shows = showFactory.getShowsFromSeatGeek($scope.bandName)
		.success(function (data) {
			var confirmed = true;
			
			if ($scope.shows.length > 0) {
				var confirmed = confirm("This will replace the shows you already have. Is that OK?");
			};
			
			if (confirmed) {
				// clear out any existing shows
				$scope.shows = []; 	
				$scope.shows = showFactory.showObjectsFromGrab(data);
			};
		
			$scope.addMapMarkers();
		});
	};
	
	$scope.addMapMarkers = function() {
	    $scope.featureLayer.setGeoJSON($scope.shows)
		$scope.map.fitBounds($scope.featureLayer.getBounds());
		$scope.featureLayer.addTo($scope.map);
	};
	
	$scope.addShow = function(show) {
		show.datetime_local = new Date (show.datetime_local);
		$scope.showObjectFromForm(show);
	};
	
	$scope.showObjectFromForm = function(show) {
		$http({
			method: "GET", 
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + 
			show.address +  "," + show.city + "," + show.state + "&sensor=false" 
		})
		.success(function (data) {
			console.log(data.results[0]["geometry"]["location"])
			
			var showObj = {
				"ticket_url": show.ticket_url,
				"datetime_local": new Date (show.datetime_local),
				"venue": {
					"name": show.venue.name,
					"display_location": show.city + ", " + show.state 
				},
		        "type": "Feature",
		        "geometry": {
		            "type": "Point",
		            "coordinates": [
		                data.results[0]["geometry"]["location"]["lng"],
		                data.results[0]["geometry"]["location"]["lat"]
		            ]
		        },
		        "properties": {
		            "title": $filter('date')(show.datetime_local),
		            "description": "<a href='" + show.ticket_url + "'> Tickets </a>",
		            "marker-size": "small",
		            "marker-color": "#070"
		        }
			};
			
			$scope.shows.push(angular.copy(showObj));
			$scope.addMapMarkers();
		});
	};
	
	$scope.getEmbed = function () {
		$body = angular.element( document.querySelector( 'body' ) );
		$body.prepend( JSON.stringify($scope.shows) );
	};
 
});

