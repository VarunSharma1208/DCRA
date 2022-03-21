import React, { useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer,ImageLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector, wms } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";
import Background from './assets/Map_Layers@3x.png';
import mapConfig from "./config.json";
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import "./App.css";

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const App = () => {
  const [center, setCenter] = useState([81.87, 21.96]);
  const [zoom, setZoom] = useState(5);
  const [dropdownvalue, setDropdownvalue] = useState("")
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const [show, setShow] = useState(false)
  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  /// layer state for true or false////////
  const [PowerPlant, setPowerPlant] = useState(false);
  const [OilAndGasPipelines, setOilAndGasPipelines] = useState(false);
  const [Electricityline, setElectricityline] = useState(false);
  const [Seaport, setSeaport] = useState(false);
  const [Roads, setRoads] = useState(false);
  const [RailwayStation, setRailwayStation] = useState(false);
  const [RailwayLine, setRailwayLine] = useState(false);
  const [Bridges, setBridges] = useState(false);
  const [Airport, setAirport] = useState(false);
  const [Schools, setSchools] = useState(false);
  const [PoliceStation, setPoliceStation] = useState(false);
  const [Hospital, setHospital] = useState(false);
  const [FireStation, setFireStation] = useState(false);
  const [CycloneShelter, setCycloneShelter] = useState(false);
  const [Slums, setSlums] = useState(false);
  const [Residential, setResidential] = useState(false);
  const [Industrial, setIndustrial] = useState(false);
  const [Commercial, setCommercial] = useState(false);
  const [VillageBoundary, setVillageBoundary] = useState(false);
  const [TehsilBoundary, setTehsilBoundary] = useState(false);
  const [DistrictBoundary, setDistrictBoundary] = useState(false);
  const [ConeOfUncertainity, setConeOfUncertainity] = useState(false);
  const [ForecastedTrackLine, setForecastedTrackLine] = useState(false);
  const [ForecastedTrackPoints, setForecastedTrackPoints] = useState(false);
  const [ObservedTrackLine, setObservedTrackLine] = useState(false);
  const [ObservedTrackPoints, setObservedTrackPoints] = useState(false);
  const [SurgeHazard, setSurgeHazard] = useState(false);
  const [FloodHazard, setFloodHazard] = useState(false);
  const [CycloneHazard, setCycloneHazard] = useState(false);
  const [AffectedPopulation, setAffectedPopulation] = useState(false);
  const [AffectedPopulationDensity, setAffectedPopulationDensity] = useState(false);
  const [StateBoundarynew, setStateBoundarynew] = useState(false);
  const toggleDrawer = (e) => {
    setShow(true)
  }
  const toggleDrawer1 = (e) => {
    setShow(false)
  }
  const handleChange = (e) => {
    setDropdownvalue(e.target.value);
    console.log(dropdownvalue);
  }
  return (
    <div style={{ flex: 1 }}>
      <div style={{ height: 60, width: '100%' }}>
        <div style={{
          height: 60,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          backgroundImage: `url(${Background})`
        }}>


          <div style={{ alignItems: 'center',display:'flex',justifyContent:'center' }}>
            <span style={{ fontSize: 15,color:'#FFFFFF', fontWeight: "700", marginLeft: 10,marginTop:20 }}>MAP</span>
          </div>
          <div style={{ height: 60, width: 60, position: 'absolute', right: 35, display: 'flex', justifyContent: 'center', alignItems: 'center',top:0 }}>

            <img style={{ width: 24, height: 24 }} src={require('./assets/Frame16903@3x.png')}
              onClick={(e) => { }} />
          </div>
          <div style={{ height: 60, width: 60, position: 'absolute', right: 0, display: 'flex', justifyContent: 'center', alignItems: 'center',top:0 }}>

            <img style={{ width: 24, height: 24 }} src={require('./assets/Frame16904@3x.png')}
              onClick={(e) => toggleDrawer()} />
          </div>
        </div>
      </div>
      {/***SELECT BOX */}
      <div style={{ backgroundColor: "#E5E5E5", padding: "4%" }}>
        <select style={{ width: "100%", height: 50, borderRadius: 10, padding: 10 }} value={dropdownvalue} name="dropdownvalue" onChange={(e) => handleChange(e)} >
          <option>None</option>
          <option value="2">Andhra Pradesh</option>
          <option value="1">Daman & Diu</option>
          <option value="3">Goa</option>
          <option value="4">Gujarat</option>
          <option value="5">Karnataka</option>
          <option value="6">Kerala</option>
          <option value="7">Maharashtra</option>
          <option value="8">Odisha</option>
          <option value="9">Puducherry</option>
          <option value="10">Tamil Nadu</option>
          <option value="11">West Bengal</option>
          <option value="12">Andaman & Nicobar Islands</option>
          <option value="13">Lakshadweep</option>
        </select>
      </div>
      <Map center={fromLonLat(center)} zoom={zoom}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />


          {PowerPlant && (
           <TileLayer source={wms({
            url: 'https://ahocevar.com/geoserver/wms',
            params: { 'layers': 'topp:states', 'TILED': true },
            serverType: 'geoserver',
            transition: 0,
          })} zIndex={1} />
          )}
          {OilAndGasPipelines && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:OilAndGas', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}

          {Electricityline && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:ElectricityLine' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Seaport && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Seaport', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Roads && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Roads', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {RailwayStation && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:RailwayStation', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {RailwayLine && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:RailwayLine', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Bridges && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblBridgesExposure', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Airport && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Airport' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Schools && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Schools', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {PoliceStation && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:PoliceStation', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Hospital && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Hospital', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {FireStation && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:FireStation', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {CycloneShelter && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:CycloneShelter', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Slums && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblSlumsExposure', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Residential && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Residential' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Industrial && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Industrial', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {Commercial && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Commercial', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {VillageBoundary && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:Village%20Boundaries', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {TehsilBoundary && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblTehsil_layers', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {DistrictBoundary && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:DistrictBoundary', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {ConeOfUncertainity && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_cone_of_uncertainity' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {ForecastedTrackLine && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_track_line_fore', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {ForecastedTrackPoints && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_track_point_fore', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {ObservedTrackLine && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_track_line_obs', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {ObservedTrackPoints && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_track_point_obs', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {SurgeHazard && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblEventSurgeHazard_real' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {FloodHazard && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblEventFloodHazard_real', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {CycloneHazard && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblEventWindHazard_real', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {AffectedPopulation && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_Affected_Population', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {AffectedPopulationDensity && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:tblRT_Affected_Population_Density', 'TILED': true },
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
          {StateBoundarynew && (
            <TileLayer source={wms({
              url: 'http://webdcra.ncrmp.gov.in:8080/geoserver/geonode/wms',
              params: { 'layers': 'geonode:StateBoundarynew' , 'TILED': true},
              serverType: 'geoserver',
              transition: 0,
            })} zIndex={1} />
          )}
        </Layers>

      </Map>
      {/* -------->> FOR SIDE DRAWER <---------------- */}
      <Drawer anchor="right" open={show} onClose={() => toggleDrawer1()} variant="temporary" elevation={16} PaperProps={{ style: { marginTop: 60 } }}>
        <Paper style={{ display: "flex", flexDirection: "column", width: 320, }}>
          <div style={{ alignItems: 'center', marginTop: 20, }}>
            <span style={{ fontSize: 15, fontWeight: "700", marginLeft: 10 }}>Layers</span>
            <img src={require('./assets/Vector3.png')} alt="icon" style={{ height: 13, width: 13, position: 'absolute', right: 20 }} onClick={() => toggleDrawer1()} />
          </div>
          <div style={{ marginTop: 10 }} className='drawer-name'>
            <Checkbox
              value={"A"}
              checked={PowerPlant}
              onClick={(event) => {
                console.log(event.target.checked)
                setPowerPlant(event.target.checked)
              }}
            /><span className='drawer-text'>PowerPlant  </span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              value={"A"}
              checked={OilAndGasPipelines}
              onClick={(event) => {
                console.log(event.target.checked)
                setOilAndGasPipelines(event.target.checked)
              }}
            /><span className='drawer-text'>Oil And Gas Pipelines</span>
          </div>
          <div className='drawer-name'>
            <Checkbox value={"B"}
              checked={Electricityline}
              onClick={(event) => {
                console.log(event.target.checked)
                setElectricityline(event.target.checked)
              }}
            /><span className='drawer-text'>Electricity line</span>
          </div>
          <div className='drawer-name'>
            <Checkbox value={"C"}
              checked={Seaport}
              onClick={(event) => {
                console.log(event.target.checked)
                setSeaport(event.target.checked)
              }}
            /><span className='drawer-text'>Seaport</span>
          </div>
          <div className='drawer-name'>
            <Checkbox value={"D"}
              checked={Roads}
              onClick={(event) => {
                console.log(event.target.checked)
                setRoads(event.target.checked)
              }}
            /><span className='drawer-text'>Roads</span>
          </div>
          <div className='drawer-name'>
            <Checkbox value={"E"}
              checked={RailwayStation}
              onClick={(event) => {
                console.log(event.target.checked)
                setRailwayStation(event.target.checked)
              }}

            /><span className='drawer-text'>Railway Station</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              value={"F"}
              checked={RailwayLine}
              onClick={(event) => {
                console.log(event.target.checked)
                setRailwayLine(event.target.checked)
              }}

            /><span className='drawer-text'>Railway Line</span>
          </div>
          <div className='drawer-name'>
            <Checkbox value={"G"}
              checked={Bridges}
              onClick={(event) => {
                console.log(event.target.checked)
                setBridges(event.target.checked)
              }}
            /><span className='drawer-text'>Bridges</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Airport}
              onClick={(event) => {
                console.log(event.target.checked)
                setAirport(event.target.checked)
              }}
            /><span className='drawer-text'>Airports</span>
          </div>

          <div className='drawer-name'>
            <Checkbox
              checked={Schools}
              onClick={(event) => {
                console.log(event.target.checked)
                setSchools(event.target.checked)
              }}
            /><span className='drawer-text'>Schools</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={PoliceStation}
              onClick={(event) => {
                console.log(event.target.checked)
                setPoliceStation(event.target.checked)
              }}
            /><span className='drawer-text'>Police Station</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Hospital}
              onClick={(event) => {
                console.log(event.target.checked)
                setHospital(event.target.checked)
              }}
            /><span className='drawer-text'>Hospitals</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={FireStation}
              onClick={(event) => {
                console.log(event.target.checked)
                setFireStation(event.target.checked)
              }}
            /><span className='drawer-text'>Fire Station</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={CycloneShelter}
              onClick={(event) => {
                console.log(event.target.checked)
                setCycloneShelter(event.target.checked)
              }}
            /><span className='drawer-text'>CycloneShelter</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Slums}
              onClick={(event) => {
                console.log(event.target.checked)
                setSlums(event.target.checked)
              }}
            /><span className='drawer-text'>Slums</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Residential}
              onClick={(event) => {
                console.log(event.target.checked)
                setResidential(event.target.checked)
              }}
            /><span className='drawer-text'>Residential</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Industrial}
              onClick={(event) => {
                console.log(event.target.checked)
                setIndustrial(event.target.checked)
              }}
            /><span className='drawer-text'>Industrial</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={Commercial}
              onClick={(event) => {
                console.log(event.target.checked)
                setCommercial(event.target.checked)
              }}
            /><span className='drawer-text'>Commercial</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={VillageBoundary}
              onClick={(event) => {
                console.log(event.target.checked)
                setVillageBoundary(event.target.checked)
              }}
            /><span className='drawer-text'>Village Boundary</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={TehsilBoundary}
              onClick={(event) => {
                console.log(event.target.checked)
                setTehsilBoundary(event.target.checked)
              }}
            /><span className='drawer-text'>Tehsil Boundary</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={DistrictBoundary}
              onClick={(event) => {
                console.log(event.target.checked)
                setDistrictBoundary(event.target.checked)
              }}
            /><span className='drawer-text'>District Boundary</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={ConeOfUncertainity}
              onClick={(event) => {
                console.log(event.target.checked)
                setConeOfUncertainity(event.target.checked)
              }}
            /><span className='drawer-text'>Cone Of Uncertainity</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={ForecastedTrackLine}
              onClick={(event) => {
                console.log(event.target.checked)
                setForecastedTrackLine(event.target.checked)
              }}
            /><span className='drawer-text'>Forecasted Track Line</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={ForecastedTrackPoints}
              onClick={(event) => {
                console.log(event.target.checked)
                setForecastedTrackPoints(event.target.checked)
              }}
            /><span className='drawer-text'>Forecasted Track Points</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={ObservedTrackLine}
              onClick={(event) => {
                console.log(event.target.checked)
                setObservedTrackLine(event.target.checked)
              }}
            /><span className='drawer-text'>Observed Track Line</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={ObservedTrackPoints}
              onClick={(event) => {
                console.log(event.target.checked)
                setObservedTrackPoints(event.target.checked)
              }}
            /><span className='drawer-text'>Observed Track Points</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={SurgeHazard}
              onClick={(event) => {
                console.log(event.target.checked)
                setSurgeHazard(event.target.checked)
              }}
            /><span className='drawer-text'>Surge Hazard</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={FloodHazard}
              onClick={(event) => {
                console.log(event.target.checked)
                setFloodHazard(event.target.checked)
              }}

            /><span className='drawer-text'>Flood Hazard</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={CycloneHazard}
              onClick={(event) => {
                console.log(event.target.checked)
                setCycloneHazard(event.target.checked)
              }}

            /><span className='drawer-text'>Cyclone Hazard</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={AffectedPopulation}
              onClick={(event) => {
                console.log(event.target.checked)
                setAffectedPopulation(event.target.checked)
              }}

            /><span className='drawer-text'>Affected Population</span>
          </div>
          <div className='drawer-name'>
            <Checkbox
              checked={AffectedPopulationDensity}
              onClick={(event) => {
                console.log(event.target.checked)
                setAffectedPopulationDensity(event.target.checked)
              }}
            /><span className='drawer-text'>Affected Population Density</span>
          </div>
          <div className='drawer-name1'>
            <Checkbox
              checked={StateBoundarynew}
              onClick={(event) => {
                console.log(event.target.checked)
                setStateBoundarynew(event.target.checked)
              }}
            /><span className='drawer-text'>State Boundary new</span>
          </div>


        </Paper>
      </Drawer>
      {/* <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />{" "}
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />{" "}
        Wyandotte County
      </div>
      <hr />
      <div>
        <input
          type="checkbox"
          checked={showMarker}
          onChange={(event) => setShowMarker(event.target.checked)}
        />{" "}
        Show markers
      </div> */}
    </div>
  );
};

export default App;
