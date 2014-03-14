function ShowsCtrl($scope, $http) {

	$scope.shows = [];
 
	$scope.grabShows = function() {
		$http({method: "GET", url: "http://api.seatgeek.com/2/events?type=concert&q=" + $scope.bandName})
			.success(function (data) {
				$scope.shows = data["events"];
		})
	};
 
}