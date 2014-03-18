#Tour Mapper

##[Live](https://rawgithub.com/mickeysanchez/tour_mapper/master/app/index.html)

A single page, non-sign-in, Angular.js, version of Tour Planner's embeddable tour maps. 

####To view
Start a server:
	
From root directory: <br>
Option 1: 
	
	ruby -run -e httpd . -p 8000
	
Option 2: 

	python -m SimpleHTTPServer

In browser navigate to:

	http://localhost:8000/app
	
####To run tests:
	
For jasmine unit tests jus open SpecRunner.html in a browser
	
for protractor integration tests (coming soon!):

1. make sure app server is running
	
2. start standalone selenium server:
	
		webdriver-manager start (may need sudo)
		(you can install using: webdriver-manager update --standalone)
	
3. then from root:
	
		protractor app/spec/test_config.js

(you can install protractor using: npm install -g protractor)

#### To edit Sass:
	
from root: 
	
	sass --watch app/css/app.scss:app/css/app.css

#Notes

This app relies on three API's:

1. SeatGeek
2. Mapbox.js
3. Google Coding

Props to all of them.

