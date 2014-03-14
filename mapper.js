function ShowsCtrl($scope, $http, $filter) {

	$scope.shows = [];
 
	$scope.grabShows = function() {
		$http({method: "GET", url: "https://api.seatgeek.com/2/events?type=concert&q=" + $scope.bandName})
			.success(function (data) {
				$scope.shows = []

				$scope.shows = data["events"].map(function (show) {	
					
					return  {
								"datetime_local": show["datetime_local"],
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
				
			
			    featureLayer.setGeoJSON($scope.shows)
									
				map.fitBounds(featureLayer.getBounds());
				
				featureLayer.addTo(map);
		})
	};
 
}


var map = L.mapbox.map('map', 'examples.map-9ijuk24y')
    	   .setView([20, 0], 1);

var featureLayer = L.mapbox.featureLayer()

map.scrollWheelZoom.disable();