import React, { useRef, useState, useEffect } from "react"
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import View from 'ol/View'
import { transform } from 'ol/proj'
const Map = ({ children, zoom, center }) => {
	const mapRef = useRef();
	const [map, setMap] = useState(null);

	// on component mount
	useEffect(() => {
		let options = {
			view: new ol.View({ zoom, center }),
			layers: [],
			controls: [],
			overlays: []
		};

		let mapObject = new ol.Map(options);
		mapObject.setTarget(mapRef.current);
		setMap(mapObject);

		mapObject.on('click', handleMapClick)
		return () => mapObject.setTarget(undefined);
	}, []);

	const handleMapClick = (event) => {
		// get clicked coordinate using mapRef to access current React state inside OpenLayers callback
		//  https://stackoverflow.com/a/60643670
		
		// const clickedCoord = map.getCoordinateFromPixel(event.pixel);
	
		// // transform coord to EPSG 4326 standard Lat Long
		//  const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')
		// set React state
		console.log(mapRef)
		// const viewResolution = new View({
		//   projection: 'EPSG:3857',
		//   center: [0, 0],
		//   zoom: 2
		// })
		// mapRef.current.forEachLayerAtPixel(event.pixel, function (layer) {
		//   switch (layer.get('id')) {
		// 	case 'OilAndGas':
		// 	  var tileWMSSouce = new TileLayer({
		// 		source: new TileWMS({
		// 		  url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
		// 		  // params: {'LAYERS': 'topp:states', 'TILED': true},
	
		// 		  params: {
		// 			'SERVICE': 'WMS', 'VERSION': "1.1.1", "REQUEST": "GetFeatureInfo", "FORMAT": "application/json", "TRANSPARENT": "true", "QUERY_LAYERS": "PowerPlant", "exceptions": "application/vnd.ogc.se_inimage", "INFO_FORMAT": "application/json", "FEATURE_COUNT": "50", "SRS": "EPSG:4326", 'LAYERS': 'PowerPlant', "X": "50",
		// 			"Y": "50", "STYLES": "",
		// 			"WIDTH": "101",
		// 			"HEIGHT": "101"
		// 		  },
		// 		  serverType: 'geoserver',
		// 		  // crossOrigin: 'anonymous',
		// 		  // Countries have transparency, so do not fade tiles:
		// 		  transition: 0,
		// 		})
		// 	  })
	
		// 	  var url = tileWMSSouce.getSource().getFeatureInfoUrl(event.coordinate, viewResolution.getResolution(), viewResolution.getProjection(), 'EPSG:3857', { 'INFO_FORMAT': 'application/json', 'propertyName': 'GRAY_INDEX', })
		// 	  console.log("url1>>>>>", url)
	
		// 	//   fetch(url,)
		// 	// 	.then(response => response.json())
		// 	// 	.then(data =>
		// 	// 	  console.log("url1>>>>>")
	
		// 	// 	);
		//   }
	
	
	
		// });
	
	
	
		//     if (url) {
	
		// }
		// setSelectedCoord(transormedCoord)
	
	  }
	// zoom change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setZoom(zoom);
	}, [zoom]);

	// center change handler
	useEffect(() => {
		if (!map) return;

		map.getView().setCenter(center)
	}, [center])

	return (
		<MapContext.Provider value={{ map }}>
			<div ref={mapRef} style={{width:'100%',height:"100vh", flex:1}} >
				{children}
			</div>
		</MapContext.Provider>
	)
}

export default Map;