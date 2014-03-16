tourMapper.controller('ShowsCtrl', function($scope, $http, $filter, showFactory) {

	$scope.shows = [];
	
	// create Mapbox Map Object and load an empty map on page load
	$scope.map = function() {
		var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 2);
		map.scrollWheelZoom.disable();
		
		// instantiate MapBox featureLayer (markers)   
		$scope.featureLayer = L.mapbox.featureLayer()
		
		return map;	 
	}();
			   		  	 
 	// grab shows from SeatGeek, populate shows and map.
	$scope.grabShows = function() {
		showFactory.getShowsFromSeatGeek($scope.bandName)
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
	
	// creates and places markers for all shows in $scope.shows
	$scope.addMapMarkers = function() {
	    $scope.featureLayer.setGeoJSON($scope.shows)
		$scope.map.fitBounds($scope.featureLayer.getBounds());
		$scope.featureLayer.addTo($scope.map);
	};
	
	// called by show form
	$scope.addShow = function(show) {
		$scope.createShowFromForm(show);
	};
	
	// creates proper show object from form data
	$scope.createShowFromForm = function(show) {
		showFactory.createShowFromForm(show)
		.success(function (data) {
			var showObj = showFactory.showObjFromFormData(show, data);
			
			$scope.shows.push(angular.copy(showObj));
			$scope.addMapMarkers();
		});
	};
	
	// generate embed code for $scope.shows
	$scope.getEmbed = function () {
		$body = angular.element( document.querySelector( 'body' ) );
		$body.prepend( JSON.stringify($scope.shows) );
	};
 
});