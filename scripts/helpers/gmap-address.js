gMap.service('gMapAddress', ['$rootScope', function($rootScope) {

    var gMapAddress = {};
    var geocoder;

    function setupGeocoder() {
        if (!geocoder) {
            geocoder = new google.maps.Geocoder();
        }
    };

    gMapAddress.addAddressSearchBar = function(map) {
        setupGeocoder();
        var control = document.createElement('div');
        var input = document.createElement('input');
        control.appendChild(input);
        control.setAttribute('id', 'locationField');
        input.setAttribute('id', 'locationInput');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', 'Address...');
        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(control);

        var ac = new google.maps.places.Autocomplete(input, {
            types: ['geocode']
        });
        google.maps.event.addListener(ac, 'place_changed', function() {
            var place = ac.getPlace();
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }
        });

        google.maps.event.addListener(map, 'bounds_changed', function() {
            input.blur();
            input.value = '';
        });

        input.onkeyup = gMapAddress.submitGeocode(input, map);
    }

    gMapAddress.submitGeocode = function(input, map) {
        return function(e) {
            var keyCode;

            if (window.event) {
                keyCode = window.event.keyCode;
            } else if (keyCode) {
                keyCode = e.which;
            }

            if (keyCode == 13) {
                geocoder.geocode({
                    address: input.value
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && results[0].geometry.viewport) {
                        map.fitBounds(results[0].geometry.viewport);
                        map.setZoom(map.getZoom() + 2);
                    } else {
                        console.log("The location entered could not be found");
                    }
                });
            }
        }
    }

    return gMapAddress;

}]);
