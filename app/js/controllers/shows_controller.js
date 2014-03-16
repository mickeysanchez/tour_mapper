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
		$("textarea").html("&lt;meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' /&gt; &lt;script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.js'&gt;&lt;/script&gt; &lt;link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.css' rel='stylesheet' /&gt; &lt;script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js'&gt;&lt;/script&gt; &lt;style&gt; #map { border: 1px solid black; width: 900px; height: 500px; } &lt;/style&gt; &lt;div id='map'&gt;&lt;/div&gt; &lt;script&gt; var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 2); map.scrollWheelZoom.disable(); var featureLayer = L.mapbox.featureLayer().setGeoJSON(" + JSON.stringify($scope.shows) + "); map.fitBounds(featureLayer.getBounds()); featureLayer.addTo(map); &lt;/script&gt;");
		$("body").addClass("has-active-modal");			
	};
	
	// hide modal overlay when X is clicked
	$scope.closeModal = function () {
		$("body").removeClass("has-active-modal");
	};
 
});