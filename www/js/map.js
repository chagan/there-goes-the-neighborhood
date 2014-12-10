    var map = L.map('map',{
    	zoomControl:false,
    });

    function getColor(index){
    	console.log(index);
    	if (index > 0) {
    		return "green";
    	} else {
    		return "red";
    	}
    }

    $.getJSON("assets/gentrification_map.geojson", function(data) {
    	var geojson = L.geoJson(data, {
		    style: function (feature) {
		        return {
			        weight: 2,
			        opacity: 1,
			        color: 'white',
			        fillColor:getColor(+feature.properties["CA Data for WBEZ_S_2010"]),
			        fillOpacity: 0.7
			    };
		    },
		    onEachFeature: function (feature, layer) {
		        layer.bindPopup(feature.properties["CA Data for WBEZ_Community_Area"]);
		    }
		}).addTo(map);
		map.fitBounds(geojson.getBounds());
		// Disable drag and zoom handlers.
		map.dragging.disable();
		map.touchZoom.disable();
		map.doubleClickZoom.disable();
		map.scrollWheelZoom.disable();

		// Disable tap handler, if present.
		if (map.tap) map.tap.disable();
	});