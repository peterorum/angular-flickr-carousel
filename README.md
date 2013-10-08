angular-flickr-carousel
=======================

A directive for creating an angular-ui carousel with photos from flickr.


###Dependency

* angularjs
* angular-ui
* bootstrap.css

###Usage

Include the 'flickr-carousel' module and carousel templates.


    <script type="text/javascript" src="../src/flickr-carousel.js"></script>


Set module dependencies and initialize an ng-app.

	var app = angular.module("demoApp", ["ui.bootstrap.carousel", "flickr.carousel"]);

	angular.bootstrap(document, [app.name]);


#####Include the directive as an attribute in an element:

	<div flickr-carousel src="photos_public.gne?id=92505062@N04" interval="8000"></div>

- **src**: The flickr id of the public account. See [http://www.flickr.com/services/feeds/](http://www.flickr.com/services/feeds/) and [http://www.flickr.com/services/feeds/docs/photos_public/](http://www.flickr.com/services/feeds/docs/photos_public/)

- **interval**: Milliseconds between slides.
 

###Demo

Clone this project.

	git clone git@github.com:peterorum/angular-flickr-carousel.git

View demo/index.html
