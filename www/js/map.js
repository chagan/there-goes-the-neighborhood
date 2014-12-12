    var map = L.map('map',{
    	zoomControl:false,
    });

    function getColor(index){
    	console.log(index);
    	if (index > 6) {
    		return "#018571";
    	} else if (index > 0) {
    		return "#80cdc1";
    	} else if (index > -1) {
    		return "#f5f5f5";
    	} else if (index > -7) {
    		return "#dfc276";
    	} else if (index > -14) {	
    		return "#a6611a";
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
		        layer.bindPopup("<strong>"+feature.properties["CA Data for WBEZ_Community_Area"]+"</strong><br>Index: "+feature.properties["CA Data for WBEZ_S_2010"]);
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