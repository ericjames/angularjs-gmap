gMap.service('gMapDrawingManager', ['$rootScope', 'guidService', 'gMapSettings', function($rootScope, guidService, gMapSettings) {

    var gMapDrawingManager = {};

    var collection = {
        marker: {},
        polygon: {},
        circle: {},
        rectangle: {},
        other: {}
    };

    gMapDrawingManager.collection = collection;

    var enabled = false;
    gMapDrawingManager.enableDrawingManager = function(map) {
        if (enabled) {
            return;
        }
        enabled = true;
        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP,
                drawingModes: ['marker', 'circle', 'polygon']
            },
            markerOptions: {
                icon: gMapSettings.defaultIcon
            },
            circleOptions: gMapSettings.defaultCircle,
            polygonOptions: gMapSettings.defaultPolygon,
            rectangleOptions: gMapSettings.defaultRectangle,
        });
        drawingManager.setMap(map);
        setDrawingToolStyles();

        google.maps.event.addListener(drawingManager, 'circlecomplete', function(circle) {
            setUIActions(circle, 'circle');
        });

        google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
            setUIActions(polygon, 'polygon');
        });

        google.maps.event.addListener(drawingManager, 'markercomplete', function(marker) {
            setUIActions(marker, 'marker');
        });

        google.maps.event.addListener(drawingManager, 'rectanglecomplete', function(rectangle) {
            setUIActions(rectangle, 'rectangle');
        });

        google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
            if (event.type == 'circle') {
                //            var radius = event.overlay.getRadius();
            }
        });
    }

    function setDrawingToolStyles() {

        // Hacky way to listen in on the div toolbox that Drawing Manager automatically adds to the map
        (function listen() {
            var findEle = $("#map").find('div[title="Stop drawing"]');
            if (findEle.length) {
                setStyle(findEle);
            } else {
                setTimeout(function() {
                    listen();
                }, 500);
            }
        }());

        function setStyle(targetEle) {
            var parent = $(targetEle).parent().parent();
            $(parent).addClass('map-tab-layout');
            var tabs = $(parent).children();
            $(tabs).each(function() {
                var button = $(this).children()[0];
                $(button).addClass('map-tab');
                $(button).on('click', function() {
                    reset();
                    $(button).addClass('selected');
                });
            });

            $(targetEle).click();

            function reset() {
                $(tabs).each(function() {
                    var button = $(this).children()[0];
                    $(button).removeClass('selected');
                });
            }
        }
    }

    gMapDrawingManager.selectedObject; // There can only ever be one selected object

    function setSelected(object) {
        if (!gMapDrawingManager.selectedObject) {
            highlightObjectOnMap(object, true);
            gMapDrawingManager.selectedObject = object;
        } else {
            // Important order in event there is only one object on map
            highlightObjectOnMap(gMapDrawingManager.selectedObject, false);
            highlightObjectOnMap(object, true);
            gMapDrawingManager.selectedObject = object;
        };

        function highlightObjectOnMap(object, bool) {
            var newOpacity = bool ? gMapSettings.selectedOpacity : gMapSettings.defaultOpacity;
            var newStroke = bool ? gMapSettings.selectedStroke : gMapSettings.defaultStroke;
            if (object.type == 'polygon' || object.type == 'circle') {
                object.setDraggable(bool);
                object.setEditable(bool);
                object.setOptions({
                    fillOpacity: newOpacity,
                    strokeWeight: newStroke
                });
            }
            var newIcon = bool ? gMapSettings.selectedIcon : gMapSettings.defaultIcon;
            if (object.type == 'marker') {
                object.setDraggable(bool);
                object.setIcon(newIcon);
            }
        }
    };

    function notifyScope(object) {
        $rootScope.$broadcast('mapObjectEditing', object);
        $rootScope.$apply();
    };

    function notifyObjectMoved(object) {
        $rootScope.$broadcast('objectMovedPosition', object.id);
    };

    function setUIActions(object, type) {
        // New marker setup
        var guid = guidService.get();
        object.id = guid;
        object.type = type;
        console.log("Added new " + type);

        // Add to local collection
        collection[type][guid] = object;

        // Establish this new object as selected
        setSelected(object);
        notifyScope(object);

        // Finally attach event listeners
        gMapDrawingManager.attachEventListeners(object);
    };

    gMapDrawingManager.attachEventListeners = function(object) {
        google.maps.event.addListener(object, 'mouseover', function(event) {
        });

        google.maps.event.addListener(object, 'mouseout', function(event) {});
        google.maps.event.addListener(object, 'click', function(event) {
            setSelected(object);
            notifyScope(object);
        });
        google.maps.event.addListener(object, 'dragend', function() {
            if (object.type == 'polygon' || object.type == 'circle') {
                object.setEditable(true);
            }
            notifyScope(object);
            notifyObjectMoved(object);
        });
        google.maps.event.addListener(object, 'mouseup', function() {
            //notifyScope(object);
        });

    }

    return gMapDrawingManager;
}]);
