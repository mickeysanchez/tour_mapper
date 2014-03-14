var tourMapper = angular.module('tourMapper', []);

tourMapper.controller('ShowsCtrl', function($scope, $http, $filter) {

	$scope.shows = [];
 
 	// grab shows from SeatGeek, populate shows and map.
	$scope.grabShows = function() {
		$http({method: "GET", url: "https://api.seatgeek.com/2/events?type=concert&q=" + $scope.bandName})
			.success(function (data) {
				// clear out any exisitng shows
				$scope.shows = []
				$scope.shows = $scope.showObjectsFromGrab(data);
				$scope.addMapMarkers();
		})
	};
	
	// turn JSON from SeatGeek API into show objects.
	$scope.showObjectsFromGrab = function (data) {
		return data["events"].map(function (show) {	
			return  {
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
	
	$scope.addMapMarkers = function() {
	    tourMapper.featureLayer.setGeoJSON($scope.shows)
		tourMapper.map.fitBounds(tourMapper.featureLayer.getBounds());
		tourMapper.featureLayer.addTo(tourMapper.map);
	};
	
	$scope.addShow = function(show) {
		show.datetime_local = new Date (show.datetime_local);
		$scope.shows.push(angular.copy(show));
	};
	
	$scope.showObjectFromForm = function () {
		
	};
 
});

// load an empty map on page load
tourMapper.map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    	   .setView([20, 0], 1);
		   
tourMapper.featureLayer = L.mapbox.featureLayer()

tourMapper.map.scrollWheelZoom.disable();