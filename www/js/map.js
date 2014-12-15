    var map_socio = L.map('map_socio',{
    	zoomControl:false,
    });

    var map_index = L.map('map_index',{
    	zoomControl:false,
    });

    function getColor(index){
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

    function getIndex(index){
    	if (index == 9) {
    		return "#542788";
    	} else if (index == 8) {
    		return "#8073ac";
    	} else if (index == 7) {
    		return "#b2abd2";
    	} else if (index == 6) {
    		return "#1a9850";
    	} else if (index == 5) {	
    		return "#a6d96a";
    	} else if (index == 4) {	
    		return "#4575b4";
    	} else if (index == 3) {	
    		return "#74add1";
    	} else if (index == 2) {	
    		return "#fee090";
    	} else if (index == 1) {	
    		return "#ffffbf";
    	};
    }

    $.getJSON("assets/gentrification_map.geojson", function(data) {
    	var geojson_socio = L.geoJson(data, {
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
		}).addTo(map_socio);

		var geojson_index = L.geoJson(data, {
		    style: function (feature) {
		        return {
			        weight: 2,
			        opacity: 1,
			        color: 'white',
			        fillColor:getIndex(+feature.properties["CA Data for WBEZ_Typology"]),
			        fillOpacity: 0.7
			    };
		    },
		    onEachFeature: function (feature, layer) {
		        layer.bindPopup("<strong>"+feature.properties["CA Data for WBEZ_Community_Area"]+"</strong><br>Index: "+feature.properties["CA Data for WBEZ_Typology"]);
		    }
		}).addTo(map_index);
		
		// Set map bounds
		map_socio.fitBounds(geojson_socio.getBounds());
		map_index.fitBounds(geojson_index.getBounds());
		
		// Disable drag and zoom handlers.
		map_socio.dragging.disable();
		map_socio.touchZoom.disable();
		map_socio.doubleClickZoom.disable();
		map_socio.scrollWheelZoom.disable();

		map_index.dragging.disable();
		map_index.touchZoom.disable();
		map_index.doubleClickZoom.disable();
		map_index.scrollWheelZoom.disable();

		// Disable tap handler, if present.
		if (map_socio.tap) map_socio.tap.disable();
		if (map_index.tap) map_index.tap.disable();


		$('#map_index, .index-map-legend').toggle();

		$( window ).resize(function() {
			$('#map_index, #map_socio').width($('.map-container').width());
			map_socio.fitBounds(geojson_socio.getBounds());
			map_index.fitBounds(geojson_index.getBounds());
		});
	});