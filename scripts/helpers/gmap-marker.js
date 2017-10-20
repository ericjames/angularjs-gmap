gMap.service('gMapMarker', ['$rootScope', 'gMapSettings', 'gMapDrawingManager', 'guidService', function($rootScope, gMapSettings, gMapDrawingManager, guidService) {
    var gMapMarker = {};

    gMapMarker.createMarker = function(map, id, name, coords, icon, finalEventCallback) {
        var type = 'marker';
        if (!icon) {
            icon = gMapSettings.defaultIcon;
        }
        if (!coords || coords.length == 0) {
            coords = map.getCenter();
        }
        // console.log('received id', id);
        if (id == undefined) {
            id = guidService.get();
        }
        if (!name) {
            name = 'New marker';
        }
        var object = new google.maps.Marker({
            position: coords,
            icon: icon,
            map: map,
            name: name
        });
        if (!object) {
            return false;
        }
        /* Append some internal data */
        object.id = id;
        object.type = type;
        console.log("Added new " + type, "ID", id);

        /* Set event */
        if (finalEventCallback) {
            finalEventCallback();
        }
        return object;
    }

    gMapMarker.editMarker = function(marker) {
        gMapTools.editMarker(marker);
    };

    // gMapMarker.triggerMarker = function(marker) {
    //     if (_activatedMarker) {
    //         gMapMarker.resetMarkers();
    //     }
    //     var icon = marker.getIcon();
    //     icon.fillColor = "#ebab00";
    //     marker.setIcon(icon);
    //     map.panTo(marker.getPosition());
    //     _activatedMarker = marker;
    // }

    // gMapMarker.resetMarkers = function() {
    //     var marker = _activatedMarker;
    //     var icon = marker.getIcon();
    //     icon.fillColor = gMapSettings.coffeeIcon.fillColor;
    //     marker.setIcon(icon);
    // }

    gMapMarker.displayMarkers = function(markers) {
        var promise = [];
        markers.forEach(function(marker, i) {
            if (marker.lat > 0) {
                promise.push(marker.setVisible(true));
            }
        });
        return $q.all(promise);
    };

    return gMapMarker;
}]);
