describe("Tour Mapper", function() {
	
	beforeEach(module("tourMapper"));
	
	describe("ShowsCtrl", function () {
		beforeEach(inject(function($rootScope, $controller) {
			$('body').append("<div id='map'></div>");
			$scope = $rootScope.$new();
			$controller("ShowsCtrl", { $scope: $scope });
		}));
		
		afterEach(function () {
			// do this or get a "map already initialized" error
			$('#map').remove();
		});
		
		it("should have shows", function () {
			expect($scope.shows).toBeDefined();	
		});
		
		it("should have map and featureLayer", function () {
			expect($scope.map).toBeDefined();
			expect($scope.featureLayer).toBeDefined();
		});			
	});
	
	describe("showFactory", function () {
		
		it("should make request to Seat Geek with correct URL", inject(
			function(showFactory, $httpBackend) {
			
			$httpBackend.when('GET', 
			'https://api.seatgeek.com/2/events?type=concert&q=Beyonce').respond();
			
			$httpBackend.expectGET('https://api.seatgeek.com/2/events?type=concert&q=Beyonce');
			showFactory.getShowsFromSeatGeek("Beyonce");
			$httpBackend.flush();
		}));
	
		it("should make proper show objects from grab", inject(function(showFactory) {
			var resultString = JSON.stringify(showFactory.showObjectsFromGrab(beyonceData));
			expect(resultString).toBe(JSON.stringify([goodShowObject]));
		}));
	
		it("should make proper request to Google for lat and lon", inject(function(showFactory, $httpBackend) {
			var show = {};
			show.address = "1 Main St";
			show.city = "Brooklyn";
			show.state = "NY";
			
			$httpBackend.when('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=1 Main St,Brooklyn,NY&sensor=false').respond();
			
			$httpBackend.expectGET('https://maps.googleapis.com/maps/api/geocode/json?address=1 Main St,Brooklyn,NY&sensor=false');
			showFactory.createShowFromForm(show);
			$httpBackend.flush();
		}));
	
		it("should create proper show object from form data", inject(function(showFactory) {
			var data = { "results": [{ "geometry": { "location": { "lng": 10, "lat": 10}}}] };
			
			var resultString = JSON.stringify(showFactory.showObjFromFormData(show, data));
			expect(resultString).toBe(JSON.stringify(goodShowFromForm));
		}));
		
	});

});