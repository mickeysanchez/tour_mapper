// factory for grabbing, creating, and formatting show data
tourMapper.factory('showFactory', function($http, $filter) {
	
	var factory = {};
	
	// ajax call to SeatGeek API
	factory.getShowsFromSeatGeek = function (bandName) {
			return $http({ method: "GET", url: "https://api.seatgeek.com/2/events?type=concert&q=" + bandName });
	};
	
	// turn JSON from SeatGeek API into properly formatted show objects.
	factory.showObjectsFromGrab = function (data) {
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
	
	// ajax call to Google Geocoding API for show's lat and lon
	factory.createShowFromForm = function (show) {
			return $http({
				method: "GET", 
				url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + 
				show.address +  "," + show.city + "," + show.state + "&sensor=false" 
			});
	};
	
	// returns proper show object from form data and data from
	// ajax call to Google Geocoding API
	factory.showObjFromFormData = function (show, data) {
			return {
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
	};
	
	return factory;
});
