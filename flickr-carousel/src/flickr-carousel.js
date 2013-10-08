(function ()
{
    'use strict';

    var app = angular.module("flickr.carousel", []);

    app.factory('photoService', ["$http", "$q", function ($http, $q)
    {
        var o = {};

        o.query = function (src)
        {
            var deferred = $q.defer();

            // return if already have photos

            if (o.photos)
            {
                deferred.resolve(o.photos);
            }
            else
            {
                $http.jsonp('http://www.flickr.com/services/feeds/' + src + '&lang=en-us&format=json&jsoncallback=JSON_CALLBACK',
                {
                    cache: true
                })
                .success(function (result)
                {
                    o.photos = result.items;

                    angular.forEach(o.photos, function (p)
                    {
                        // change to large format
                        p.image = p.media.m.replace('_m', '_z');
                    });

                    deferred.resolve(o.photos);

                })
                .error(function ()
                {
                    deferred.reject('Could not retrieve json');
                });
            }

            return deferred.promise;
        }

        o.hasPhotos = function ()
        {
            return !!o.photos;
        }

        return o;
    }]
    );


    app.directive('flickrCarousel', ['photoService', function (photoService)
    {
        return {
            restrict: 'A',
            template:
                '<carousel interval="interval">' +
                '<slide ng-repeat="slide in slides" active="slide.active">' +
                  '<img ng-src="{{slide.image}}" style="margin:auto;">' +
                  '<div class="carousel-caption">' +
                    '<p><a href="{{slide.link}}">{{slide.title}}</a></p>' +
                  '</div>' +
                '</slide>' +
                '</carousel>'
                    ,

            link: function (scope, element, attrs)
            {
                // defaults
                scope.interval = attrs.interval || 8000;
                scope.src = attrs.src || "photos_public.gne?id=92505062@N04";

                var render = function (photos)
                {
                    scope.slides = photos;
                }

                if (photoService.hasPhotos())
                {
                    // show cached photos
                    render(photoService.photos);
                }
                else
                {
                    // download photos
                    photoService.query(scope.src)
                    .then(function (photos)
                    {
                        render(photos);
                    });
                }
            }
        }
    }]
       );
})();
