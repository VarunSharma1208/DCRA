import * as olSource from "ol/source";

function wms(source) {
	return new olSource.TileWMS(source)
}


	
 
export default wms;