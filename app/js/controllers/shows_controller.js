tourMapper.controller('ShowsCtrl', function($scope, $http, $filter, showFactory, $cookieStore) {

	// load shows stored in cookies or set shows to empty array
	$scope.shows = function() {
		return ( $cookieStore.get("shows") || [] );
	}();
	
	// create Mapbox Map Object and load an empty map on page load
	$scope.map = function () {
		var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 1);
		map.scrollWheelZoom.disable();
		return map;
	}();
	
	// MapBox featureLayer (markers) - add shows if shows are in cookies
	$scope.featureLayer = function() {
		var featureLayer = $scope.map.featureLayer;
		
		if ($scope.shows.length > 0) {
			featureLayer.setGeoJSON($scope.shows);
			setTimeout(function () {
				$scope.map.fitBounds(featureLayer.getBounds());
			}, 200);
		};

		return featureLayer;
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
				$scope.shows = showFactory.showObjectsFromGrab(data);
			};
		
			$scope.addMapMarkers();
			$scope.updateShowsCookie();
		});
	};
	
	// creates and places markers for all shows in $scope.shows
	$scope.addMapMarkers = function() {
		$scope.featureLayer.setGeoJSON($scope.shows)
		
		if ($scope.shows.length === 0) {
			$scope.map.setView([30, 10], 1);
		} else {
			$scope.map.fitBounds($scope.featureLayer.getBounds());		
		};
		
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
			
			$scope.show = null;
			$scope.updateShowsCookie();
		});
	};
	
	// generate embed code for $scope.shows
	$scope.getEmbed = function () {
		$("textarea").html(showFactory.generateEmbed($scope.shows, $scope.mapWidth, $scope.mapHeight));
		$("body").addClass("has-active-modal");			
	};
	
	// Dynamically update height and width in embed code.
	$scope.$watch('mapHeight', function() {
		$("textarea").html(showFactory.generateEmbed($scope.shows, $scope.mapWidth, $scope.mapHeight));
	});
	$scope.$watch('mapWidth', function() {
		$("textarea").html(showFactory.generateEmbed($scope.shows, $scope.mapWidth, $scope.mapHeight));
	});
	
	// hide modal overlay when X is clicked
	$scope.closeModal = function () {
		$("body").removeClass("has-active-modal");
	};
	
	// remove show from $scope.shows, update map and cookie
	$scope.removeShow = function(idx) {
	      $scope.shows.splice(idx, 1);
		  $scope.addMapMarkers();
		  $scope.updateShowsCookie();
	};
	
	$scope.updateShowsCookie = function() {
		$cookieStore.put("shows", $scope.shows)
	};
	
});