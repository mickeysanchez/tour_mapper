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
		
		it("should grabShows properly", inject(function ($httpBackend, $http) {
			$httpBackend.when('GET', 'https://api.seatgeek.com/2/events?type=concert&q=Beyonce').respond(beyonceData);
			
			$scope.bandName = "Beyonce";
			$scope.grabShows();
			$httpBackend.flush();
			
			var resultString = JSON.stringify($scope.shows[0]);
			expect(resultString).toBe(JSON.stringify(goodShowObject));
			
			expect($scope.shows[0]["ticket_url"]).toBe(goodShowObject["ticket_url"]);
		}));
		
		it("should addMapMarkers", function () {
			// how to check if methods are called on an object
		});		
		
		it("should add show from form", inject(function ($httpBackend) {
			var show = { venue: { name: "Mickey's" }, address: "1 Main St", city: "Brooklyn", state: "NY"};
			
			$httpBackend.when('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=1 Main St,Brooklyn,NY&sensor=false').respond(googleLocationData);
			
			$scope.addShow(show);
			$httpBackend.flush();
			
			expect($scope.shows.length).toBe(1);
			expect($scope.shows[0]["geometry"]["coordinates"][0]).toBe(-122.08542120);
			expect($scope.shows[0]["geometry"]["coordinates"][1]).toBe(37.42291810);
			expect($scope.shows[0].venue.name).toBe("Mickey's")

			var show2 = { venue: { name: "Mickey's 2" }, address: "1 Main St", city: "Brooklyn", state: "NY"};
			$scope.addShow(show2);
			$httpBackend.flush();
			
			expect($scope.shows.length).toBe(2);
			expect($scope.shows[1].venue.name).toBe("Mickey's 2")
		}));
		
		it("should create correct embed code", function() {
			$scope.shows = [goodShowObject]
			$('body').append("<textarea></textarea>");
			
			$scope.getEmbed();
			expect($("textarea").html()).toBe(goodEmbed);
			$("textarea").remove();
		});
	});
	
	describe("showFactory", function () {
		
		it("should make request to Seat Geek with correct URL", inject(
			function(showFactory, $httpBackend) {
			
			$httpBackend.when('GET', 
			'https://api.seatgeek.com/2/events?type=concert&q=Beyonce').respond();
			
			$httpBackend.expectGET('https://api.seatgeek.com/2/events?type=concert&q=Beyonce');
			showFactory.getShowsFromSeatGeek("Beyonce");
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
		}));
	
		it("should create proper show object from form data", inject(function(showFactory) {
			var data = { "results": [{ "geometry": { "location": { "lng": 10, "lat": 10}}}] };
			
			var resultString = JSON.stringify(showFactory.showObjFromFormData(show, data));
			expect(resultString).toBe(JSON.stringify(goodShowFromForm));
		}));
		
	});

});