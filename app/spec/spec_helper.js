var beyonceData = {"meta":{"per_page":1,"total":10,"geolocation":null,"took":5,"page":1},"events":[{"links":[],"id":1925224,"stats":{"listing_count":11,"average_price":915,"lowest_price":673,"highest_price":1063},"title":"Beyonce with Monsieur Adi","announce_date":"2013-12-13T16:52:36","score":0.73361,"date_tbd":false,"type":"concert","datetime_local":"2014-03-18T20:00:00","visible_until_utc":"2014-03-18T23:00:00","time_tbd":false,"taxonomies":[{"parent_id":null,"id":2000000,"name":"concert"}],"performers":[{"name":"Beyonce","short_name":"Beyonce","url":"http://seatgeek.com/beyonce-tickets","type":"band","image":"http://cdn.chairnerd.com/images/performers-landscape/beyonce-e4feea/37/huge.jpg","primary":true,"home_venue_id":null,"slug":"beyonce","score":0.77023,"images":{"huge":"http://cdn.chairnerd.com/images/performers-landscape/beyonce-e4feea/37/huge.jpg","medium":"http://cdn.chairnerd.com/images/performers/37/beyonce-4559cb/medium.jpg","large":"http://cdn.chairnerd.com/images/performers/37/beyonce-320c07/large.jpg","small":"http://cdn.chairnerd.com/images/performers/37/beyonce-3cb80d/small.jpg"},"id":37},{"name":"Monsieur Adi","short_name":"Monsieur Adi","url":"http://seatgeek.com/monsieur-adi-tickets","type":"band","image":null,"home_venue_id":null,"slug":"monsieur-adi","score":0,"images":{},"id":18960}],"url":"http://seatgeek.com/beyonce-with-monsieur-adi-tickets/amsterdam-ziggo-dome-2014-03-18-8-pm/concert/1925224/","created_at":"2013-12-13T16:52:36","venue":{"city":"Amsterdam","name":"Ziggo Dome","extended_address":"Amsterdam, Netherlands","url":"http://seatgeek.com/venues/ziggo-dome/tickets/","country":"Netherlands","display_location":"Amsterdam, Netherlands","links":[],"slug":"ziggo-dome","state":"A","score":0.48182,"postal_code":"1101 AX","location":{"lat":52.3171,"lon":4.9377},"address":"100 De Passage","timezone":"Europe/Amsterdam","id":7240},"short_title":"Beyonce with Monsieur Adi","datetime_utc":"2014-03-18T19:00:00","datetime_tbd":false}]};

var show = beyonceData["events"][0];

var goodShowObject = {
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
        "title": "Mar 18, 2014",
        "description": "<a href='" + show["url"] + "'> Tickets </a>",
        "marker-size": "small",
        "marker-color": "#070"
    }	
};

var goodShowFromForm = 
		{
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
	                10,
	                10
	            ]
	        },
	        "properties": {
		        "title": 'Mar 18, 2014',
	            "description": "<a href='" + show.ticket_url + "'> Tickets </a>",
	            "marker-size": "small",
	            "marker-color": "#070"
	        }
		};
		
var googleLocationData = {
   "results" : [
      {
         "address_components" : [
            {
               "long_name" : "1600",
               "short_name" : "1600",
               "types" : [ "street_number" ]
            },
            {
               "long_name" : "Amphitheatre Pkwy",
               "short_name" : "Amphitheatre Pkwy",
               "types" : [ "route" ]
            },
            {
               "long_name" : "Mountain View",
               "short_name" : "Mountain View",
               "types" : [ "locality", "political" ]
            },
            {
               "long_name" : "Santa Clara",
               "short_name" : "Santa Clara",
               "types" : [ "administrative_area_level_2", "political" ]
            },
            {
               "long_name" : "California",
               "short_name" : "CA",
               "types" : [ "administrative_area_level_1", "political" ]
            },
            {
               "long_name" : "United States",
               "short_name" : "US",
               "types" : [ "country", "political" ]
            },
            {
               "long_name" : "94043",
               "short_name" : "94043",
               "types" : [ "postal_code" ]
            }
         ],
         "formatted_address" : "1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA",
         "geometry" : {
            "location" : {
               "lat" : 37.42291810,
               "lng" : -122.08542120
            },
            "location_type" : "ROOFTOP",
            "viewport" : {
               "northeast" : {
                  "lat" : 37.42426708029149,
                  "lng" : -122.0840722197085
               },
               "southwest" : {
                  "lat" : 37.42156911970850,
                  "lng" : -122.0867701802915
               }
            }
         },
         "types" : [ "street_address" ]
      }
   ],
   "status" : "OK"
};

var goodEmbed = "&lt;meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' /&gt; &lt;script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.js'&gt;&lt;/script&gt; &lt;link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.css' rel='stylesheet' /&gt; &lt;style&gt; #map { border: 1px solid black; width: 900px; height: 500px; } &lt;/style&gt; &lt;div id='map'&gt;&lt;/div&gt; &lt;script&gt; var map = L.mapbox.map('map', 'examples.map-9ijuk24y').setView([30, 10], 2); map.scrollWheelZoom.disable(); var featureLayer = L.mapbox.featureLayer().setGeoJSON(" + JSON.stringify([goodShowObject]) + "); map.fitBounds(featureLayer.getBounds()); featureLayer.addTo(map); &lt;/script&gt;"