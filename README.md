#Tour Mapper

##[Live](https://rawgithub.com/mickeysanchez/tour_mapper/master/app/index.html)

Towards a single page, non-sign-in, Angular.js, version of Tour Planner's embeddable tour maps. 

Start a server:
	
	from root:
	option 1: ruby -run -e httpd . -p 8000
	option 2: python -m SimpleHTTPServer
	
	in browser navigate to:
	http://localhost:8000/app
	

To run tests:
	
	for jasmine unit tests:
	open SpecRunner.html in a browser
	
	for protractor tests:
	make sure app server is running
	
	start standalone selenium server:
	webdriver-manager start (may need sudo)
	(you can install using: webdriver-manager update --standalone)
	
	then from root:
	protractor app/spec/test_config.js
	(you can install using: npm install -g protractor)

To edit Sass:
	
	from root: 
	sass --watch app/css/app.scss:app/css/app.css

