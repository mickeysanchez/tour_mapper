describe("Tour Mapper", function() {
	
	beforeEach(module("tourMapper"));
	
	it("should be cool", function() {
		var cool = "cool";
		expect(cool).toBe("cool");
	});
	
	describe("ShowsCtrl", function () {
		beforeEach(inject(function($rootScope, $controller) {
			$scope = $rootScope.$new();
			$controller("ShowsCtrl", {$scope: $scope});
		}))
		
		it("should have a shows array", function () {
			expect($scope.shows).toBeDefined();
		});
	});
	
	describe("showFactor", function () {
		
		it("should get shows from Seat Geek", inject(function(showFactory) {
			expect(showFactory.getShowsFromSeatGeek).toBe(1);
		}));
	
		it("should make proper show objects from grab", inject(function(showFactory) {
			expect(showFactory.showObjectsFromGrab).toBe(2);
		}));
	
		it("should create show from form", inject(function(showFactory) {
			expect(showFactory.createShowFromForm).toBe(3);
		}));
	
		it("should create proper show object from form data", inject(function(showFactory) {
			expect(showFactory.showObjFromFormData).toBe(4);
		}));
		
	});

});