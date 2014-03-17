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