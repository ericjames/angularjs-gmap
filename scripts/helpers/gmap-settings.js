// A nice library of settings to use out of the box

gMap.factory('gMapSettings', function() {
    var gMapSettings = {};

    var defaultStroke = 1;
    var selectedStroke = 2;
    var defaultOpacity = 0.4;
    var selectedOpacity = 0.8;

    var library = {
        markers: [],
        tcCenter: {
            lat: 44.97,
            lng: -93.20
        },
        dcCenter: {
            lat: 38.9047,
            lng: -77.0164
        },
        defaultOpacity: defaultOpacity,
        selectedOpacity: selectedOpacity,
        selectedStroke: selectedStroke,
        defaultIcon: {
            path: 'M30,20c0-2.8-1-5.1-2.9-7.1c-2-2-4.3-2.9-7.1-2.9s-5.1,1-7.1,2.9c-2,2-2.9,4.3-2.9,7.1 s1,5.1,2.9,7.1c2,2,4.3,2.9,7.1,2.9s5.1-1,7.1-2.9C29,25.1,30,22.8,30,20z M40,20c0,2.8-0.4,5.2-1.3,7c0,0-17.8,33-18.7,33 C19.1,60,1.3,27,1.3,27C0.4,25.2,0,22.8,0,20C0,14.5,2,9.8,5.9,5.9S14.5,0,20,0s10.2,2,14.1,5.9C38,9.8,40,14.5,40,20z',
            scale: 0.5,
            anchor: new google.maps.Point(20, 65),
            fillColor: '#f95b00',
            fillOpacity: defaultOpacity,
            strokeColor: '#B23322',
            strokeWeight: defaultStroke,
            clickable: true,
            editable: true,
        },
        selectedIcon: {
            path: 'M30,20c0-2.8-1-5.1-2.9-7.1c-2-2-4.3-2.9-7.1-2.9s-5.1,1-7.1,2.9c-2,2-2.9,4.3-2.9,7.1 s1,5.1,2.9,7.1c2,2,4.3,2.9,7.1,2.9s5.1-1,7.1-2.9C29,25.1,30,22.8,30,20z M40,20c0,2.8-0.4,5.2-1.3,7c0,0-17.8,33-18.7,33 C19.1,60,1.3,27,1.3,27C0.4,25.2,0,22.8,0,20C0,14.5,2,9.8,5.9,5.9S14.5,0,20,0s10.2,2,14.1,5.9C38,9.8,40,14.5,40,20z',
            scale: 0.5,
            anchor: new google.maps.Point(20, 65),
//            fillColor: '#f95b00',
            fillColor: '#fff',
            fillOpacity: selectedOpacity,
            strokeColor: '#B23322',
            strokeWeight: selectedStroke,
            clickable: true,
            editable: true,
        },
        defaultPolygon: {
            fillColor: '#f95b00',
            fillOpacity: defaultOpacity,
            strokeColor: '#B23322',
            strokeWeight: defaultStroke,
            strokeOpacity: 1,
            clickable: true,
            editable: true,
        },
        defaultCircle: {
            strokeColor: '#B23322',
            fillColor: '#f95b00',
            fillOpacity: defaultOpacity,
            strokeWeight: defaultStroke,
            strokeOpacity: 1,
            clickable: true,
            editable: true,
        },
        defaultRectangle: {
            strokeColor: '#B23322',
            fillColor: '#f95b00',
            fillOpacity: defaultOpacity,
            strokeWeight: defaultStroke,
            strokeOpacity: 1,
            clickable: true,
            editable: true,
        },
        vintageStyle: [{
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#444444"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        }, {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#f0e3ce"
            }, {
                "lightness": "39"
            }, {
                "gamma": "1.01"
            }]
        }, {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }]
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#e7e1d6"
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c3c6d6" //d9d9d9
            }]
        }],
        plainStyle: [{
            "elementType": "labels.text",
            "stylers": [{
                "color": "#adb580"
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "landscape.natural",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#f5f5f2"
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "administrative",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "transit",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.attraction",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.business",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.medical",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.place_of_worship",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.school",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "stylers": [{
                "visibility": "simplified"
            }, {
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "simplified"
            }]
        }, {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "color": "#71c8d4"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "color": "#e5e8e7"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "color": "#8ba129"
            }]
        }, {
            "featureType": "road",
            "stylers": [{
                "color": "#ffffff"
            }]
        }, {
            "featureType": "poi.sports_complex",
            "elementType": "geometry",
            "stylers": [{
                "color": "#c7c7c7"
            }, {
                "visibility": "off"
            }]
        }, {
            "featureType": "water",
            "stylers": [{
                "color": "#a0d3d3"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "color": "#91b65d"
            }]
        }, {
            "featureType": "poi.park",
            "stylers": [{
                "gamma": 1.51
            }]
        }, {
            "featureType": "road.local",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "poi.government",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "landscape",
            "stylers": [{
                "visibility": "off"
            }]
        }, {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [{
                "color": "#adb580"
            }, {
                "visibility": "simplified"
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "simplified"
            }]
        }]
    }

    angular.extend(gMapSettings, library);

    gMapSettings.initialMapOptions = {
        center: {
            lat: 37.0902,
            lng: -95.7129
        },
        zoom: 12,
        mapTypeId: 'roadmap',
        styles: gMapSettings.vintageStyle,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        panControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        fullscreenControl: false
    };

    return gMapSettings;

});
