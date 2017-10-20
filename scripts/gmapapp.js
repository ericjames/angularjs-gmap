var gMap = angular.module('gMap', []);

gMap.service('gMap', ['$rootScope', '$q', 'gMapSettings', 'gMapGeoLocate', 'guidService', '$timeout', 'gMapDrawingManager', 'gMapAddress', 'gMapMarker', 'gMapPolygon', function($rootScope, $q, gMapSettings, gMapGeoLocate, guidService, $timeout, gMapDrawingManager, gMapAddress, gMapMarker, gMapPolygon) {

    var map;

    /* Register service variables */
    var gMap = {};
    gMap.map = map;
    gMap.collection = gMapDrawingManager.collection;

    gMap.loadGoogleMaps = function(domElementId, options, callback) {
        return $q(function(resolve, reject) {
            function tryGoogle() {
                // Timeout after 30 seconds
                var timer = setTimeout(function() {
                    reject(true);
                }, 30000);
                if (google !== 'undefined') {
                    clearTimeout(timer);
                    google.maps.event.addDomListenerOnce(window, 'load', function() {
                        map = gMap.loadMap(domElementId, options, function() {
                            resolve(true);
                        });
                    });
                } else {
                    setTimeout(function() {
                        tryGoogle()
                    }, 3000);
                }
            }
            tryGoogle();
        });
    };

    gMap.loadMap = function(domElementId, options, resolvePromise) {
        google.maps.visualRefresh = true;
        var map = new google.maps.Map(document.getElementById(domElementId), options);
        setupListeners(map);
        createMapElements(map);
        google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
            resolvePromise();
        });
        return map;
    };

    function setupListeners(map) {
        google.maps.event.addListener(map, 'maptypeid_changed', function() {
            var originalStyle;
            if (map.getMapTypeId() == "satellite" || map.getMapTypeId() == "hybrid") {
                originalStyle = map.data.getStyle();
                map.setOptions({
                    styles: null
                });
            } else {
                map.setOptions({
                    styles: originalStyle
                });
            }
        });

        google.maps.event.addListener(map, "zoom_changed", function() {
            /*
                    for (var i = 0; i < currentRegion.markers.length; i++) {
                        var marker = currentRegion.markers[i];
                        var icon = marker.getIcon();
                        if (map.getZoom() < 13) icon.scale = 0.5;
                        if (map.getZoom() >= 13 && map.getZoom() < 17) icon.scale = 0.7;
                        if (map.getZoom() >= 17) icon.scale = 1;
                        marker.setIcon(icon);
                    }
                    */
        });
    }

    function createMapElements(map) {
        gMap.radiusOverlay = new google.maps.Circle({
            strokeColor: "#0094ce",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0094ce",
            fillOpacity: 0.35,
            //      map: map,
            //      center: newCenter,
            //      radius: my.radii,
            zIndex: -1,
        });
        gMap.locationMarker = new google.maps.Marker({
            icon: gMapSettings.locationicon,
            animation: google.maps.Animation.DROP
        });
    }

    function resizeIcon(newScaledSize) {
        for (var i in my.stopObjects) {
            my.stopObjects[i].marker.setIcon(new google.maps.MarkerImage(my.stopObjects[i].marker.getIcon().url, //marker's same icon graphic
                null, //size
                null, //origin
                null, //anchor
                newScaledSize //changes the scale
            ));
        }
    };

    function createInfoWindow(marker) {
        google.maps.event.addListener(marker, 'click', function(event) {
            var infowin = new google.maps.InfoWindow();
            infowin.setContent('<div class="infowindow">' + marker.name + '</div>');
            infowin.setPosition(marker.getPosition());
            infowin.setOptions({
                pixelOffset: new google.maps.Size(0, -20),
                maxWidth: 150
            });
            infowin.open(map);
        });
    };

    gMap.setZoom = function(zoom) {
        map.setZoom(zoom);
    }

    gMap.setMapCenter = function(coordString) {
        var coord = coordString.split(',');
        var coords = {
            lat: parseFloat(coord[0]),
            lng: parseFloat(coord[1])
        };
        map.panTo(coords);
    }

    gMap.getCoords = function(coords) {
        var coords = coords.split(',');
        return {
            lat: parseFloat(coords[0]),
            lng: parseFloat(coords[1])
        };
    }

    gMap.resizeMap = function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.panTo(center);
    };

    gMap.fitBoundsToVisibleMarkers = function(markers) {
        var center = map.getCenter();
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].getVisible() && markers[i].getPosition().lat !== 0) {
                bounds.extend(markers[i].getPosition());
            }
        }
        setTimeout(function() {
            gMap.resizeMap();
            map.fitBounds(bounds);
        }, 500);
    };

    /* Pass throughs */

    gMap.addAddressSearchBar = function() {
        gMapAddress.addAddressSearchBar(map);
    };

    gMap.showDrawingTools = function() {
        gMapDrawingManager.enableDrawingManager(map);
    }

    gMap.addMarker = function(id, name, coords) {
        console.log('Add marker', id, name, coords);
        var marker = gMapMarker.createMarker(map, id, name, coords);
        gMapDrawingManager.attachEventListeners(marker);
        gMapDrawingManager.collection.marker[marker.id] = marker;

    }

    gMap.addPolygon = function(id, name, coords) {
        console.log('Add polygon', id, name, coords);
        var polygon = gMapPolygon.createPolygon(map, id, name, coords);
        gMapDrawingManager.attachEventListeners(polygon);
        gMapDrawingManager.collection.polygon[polygon.id] = polygon;

    }

    /* Helpers */

    gMap.getPolygonCenterCoordinates = function(polygon) {
        var lowx,
            highx,
            lowy,
            highy,
            lats = [],
            lngs = [],
            vertices = polygon.getPath();

        for(var i=0; i<vertices.length; i++) {
          lngs.push(vertices.getAt(i).lng());
          lats.push(vertices.getAt(i).lat());
        }

        lats.sort();
        lngs.sort();
        lowx = lats[0];
        highx = lats[vertices.length - 1];
        lowy = lngs[0];
        highy = lngs[vertices.length - 1];
        center_x = lowx + ((highx-lowx) / 2);
        center_y = lowy + ((highy - lowy) / 2);
        return center_x + ',' + center_y;
    }

    gMap.getCircleCenterCoordinates = function(circle) {
        return circle.getCenter().lat() + ',' + circle.getCenter().lng();
    }

    gMap.getMarkerCoordinates = function(marker) {
        return marker.getPosition().lat() + ',' + marker.getPosition().lng();
    }

    gMap.getMarkerJson = function(marker) {
        return JSON.stringify(marker.getPosition());
    }

    gMap.getCircleJson = function(circle) {
        var out = {};
        out.lat = circle.getCenter().lat();
        out.lng = circle.getCenter().lng();
        out.radius = Math.round(circle.getRadius());
        return JSON.stringify(out);
    }

    gMap.getPolygonJson = function(polygon) {
        var vertices = polygon.getPath();
        var out = [];

        // Iterate over the vertices.
        for (var i = 0; i < vertices.getLength(); i++) {
            var xy = vertices.getAt(i);
            out.push({
                lat: xy.lat(),
                lng: xy.lng()
            });
        }
        return JSON.stringify(out);
    };

    return gMap;

}]);

gMap.service('gMapGeoLocate', ['gMapSettings', function(gMapSettings) {

    var gMapGeoLocate = {};

    var overlay = gMapSettings.radiusOverlay;
    var location = gMapSettings.locationMarker;

    gMapGeoLocate.openLocator = function(newCenter) {
        location.setPosition(newCenter);
        location.setMap(map);
        overlay.setRadius(100);
        overlay.setCenter(newCenter);
        overlay.setMap(map);
    }

    gMapGeoLocate.closeLocator = function() {
        var wait = setTimeout(function() {
            var animation = setInterval(fadeCircle, 100);

            function fadeCircle() {
                overlay.setRadius(overlay.getRadius() - 50);
                if (overlay.getRadius() <= 0) {
                    location.setMap(null);
                    overlay.setRadius(0);
                    clearInterval(animation);
                    delete animation;
                }
            }
        }, 300)
    }

    gMapGeoLocate.locateUser = function(callback) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat = position.coords.latitude;
                var lng = position.coords.longitude;
                geoLocatorOpen({
                    lat: lat,
                    lng: lng
                });
                callback();
                geoLocatorClose();
            }, function() {
                console.log("Failed");
                view.mapAlert("Couldn't find you.");
            });
        } else {
            view.mapAlert("Couldn't find you.");
        }
    }

    return gMapGeoLocate;

}]);

gMap.service('guidService', function() {

    var guidService = {};

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    function generateGuid() {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

    guidService.get = function() {
        var newGuid = generateGuid();
        return newGuid;
    };

    return guidService;
});
