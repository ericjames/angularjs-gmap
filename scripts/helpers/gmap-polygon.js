// Integration with polygons

gMap.service('gMapPolygon', ['$rootScope', 'gMapSettings', 'gMapDrawingManager', 'guidService', function($rootScope, gMapSettings, gMapDrawingManager, guidService) {
    var gMapPolygon = {};

    gMapPolygon.createPolygon = function(map, id, name, coords, styles, finalEventCallback) {
        var type = 'polygon';
        var options = {};
        options.paths = coords;

        if (!styles) {
            options = Object.assign(options, gMapSettings.defaultPolygon);
            options.editable = false;
        } else {
            options = Object.assign(options, styles);
        }
        if (id == undefined) {
            id = guidService.get();
        }
        if (!name) {
            name = 'New marker';
        }
        var object = new google.maps.Polygon(options);
        if (!object) {
            return false;
        }

        object.setMap(map);

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

    return gMapPolygon;
}]);
