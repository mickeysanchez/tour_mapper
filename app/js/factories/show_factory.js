// factory for grabbing, creating, and formatting show data
tourMapper.factory('showFactory', function($http, $filter) {

	var factory = {};

	// ajax call to SeatGeek API
	factory.getShowsFromSeatGeek = function(bandName) {
		return $http({
			method: "GET",
			url: "https://api.seatgeek.com/2/events?q=" + bandName
		});
	};

	// turn JSON from SeatGeek API into properly formatted show objects.
	factory.showObjectsFromGrab = function(data) {
		return data["events"].map(function(show) {
			return {
				"ticket_url": show["url"],
				"datetime_local": new Date(show["datetime_local"]),
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
					"description": show["venue"]["display_location"] + "<br>" + "<a href='" + show["url"] + "' target='_blank'> Tickets </a>",
					"marker-size": "small",
					"marker-color": "#070"
				}
			};
		});
	};

	// ajax call to Google Geocoding API for show's lat and lon
	factory.createShowFromForm = function(show) {
		return $http({
			method: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/json?address=" +
				show.address + "," + show.city + "," + show.state + "&sensor=false"
		});
	};

	// returns proper show object from form data and data from
	// ajax call to Google Geocoding API
	factory.showObjFromFormData = function(show, data) {
		return {
			"ticket_url": show.ticket_url,
			"datetime_local": new Date(show.datetime_local),
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
				"description": show.city.charAt(0).toUpperCase() + show.city.slice(1) + ", " + show.state.toUpperCase() + "<br>" + "<a href='" + show.ticket_url + "' target='_blank'> Tickets </a>",
				"marker-size": "small",
				"marker-color": "#070"
			}
		};
	};

	factory.generateEmbed = function(shows, width, height) {
		return "&lt;!-- Map Styles --&gt; \n&lt;style&gt; #map { border: 1px solid black; height: " + height + "px; width: " + width + "px; } &lt;/style&gt; \n\n&lt;!-- This is where the map is drawn. --&gt; \n&lt;div id='map'&gt;&lt;/div&gt; \n\n&lt;!-- Required libraries. Props to Mapbox --&gt; \n&lt;script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'&gt;&lt;/script&gt; &lt;link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' /&gt; \n\n&lt;!-- Draws markers. Contains show data. --&gt; \n&lt;script&gt; var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 2); map.scrollWheelZoom.disable(); var featureLayer = L.mapbox.featureLayer().setGeoJSON(" + JSON.stringify(shows) + "); map.fitBounds(featureLayer.getBounds()); featureLayer.addTo(map); &lt;/script&gt;"
	};

	return factory;
});