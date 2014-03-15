var tourMapper = angular.module('tourMapper', []);

tourMapper.controller('ShowsCtrl', function($scope, $http, $filter) {

	$scope.shows = [];
 
 	// grab shows from SeatGeek, populate shows and map.
	$scope.grabShows = function() {
		$http({method: "GET", url: "https://api.seatgeek.com/2/events?type=concert&q=" + $scope.bandName})
			.success(function (data) {
				// clear out any exisitng shows
				var confirmed = true;
				
				if ($scope.shows.length > 0) {
					var confirmed = confirm("This will replace the shows you alread have. Is that OK?");
				};
				
				if (confirmed) {
					$scope.shows = [];
					$scope.shows = $scope.showObjectsFromGrab(data);
					$scope.addMapMarkers();
				};
		})
	};
	
	// turn JSON from SeatGeek API into show objects.
	$scope.showObjectsFromGrab = function (data) {
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
	
	$scope.addMapMarkers = function() {
	    tourMapper.featureLayer.setGeoJSON($scope.shows)
		tourMapper.map.fitBounds(tourMapper.featureLayer.getBounds());
		tourMapper.featureLayer.addTo(tourMapper.map);
	};
	
	$scope.addShow = function(show) {
		show.datetime_local = new Date (show.datetime_local);
		$scope.showObjectFromForm(show);
	};
	
	$scope.showObjectFromForm = function(show) {
		$http({method: "GET", url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + show.address +  "," + show.city + "," + show.state + "&sensor=false" })
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
		console.log("embed");
		$body = angular.element( document.querySelector( 'body' ) );
		$body.prepend( JSON.stringify($scope.shows) );
	};
 
});

// load an empty map on page load
tourMapper.map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    	   .setView([30, 10], 2);
		   
tourMapper.featureLayer = L.mapbox.featureLayer()

tourMapper.map.scrollWheelZoom.disable();