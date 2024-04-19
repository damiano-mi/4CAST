import { MapContainer, Marker, TileLayer, useMap, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useSelector } from 'react-redux';
import { RootState } from "../state/store";
import { useEffect, useState } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import "../assets/styles/map.css";
import { cityNameFormat } from '../utilities/StringFormat';
import Flag from 'react-world-flags';

type ChangeViewProps = {
  center: [number, number],
  zoom: number
};

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

const WeatherMap: React.FC = () => {
  const city = useSelector((state: RootState) => state.city.city);
  const [mapPosition, setMapPosition] = useState<[number, number]>([city.lat, city.lon]);
  const [layer, setLayer] = useState<string>("temp_new");

  let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [24, 36], iconAnchor: [12, 36] });

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    setMapPosition([city.lat, city.lon]);
  }, [city]);

  return (
    <>
      <div id="mapContainer" className="d-flex mb-3">
        <MapContainer
          id="map"
          style={{ width: 450, height: 450 }}
          zoom={5}
          center={mapPosition}
          scrollWheelZoom={true}
          fadeAnimation={true}
          markerZoomAnimation={true}
        >
          <ChangeView center={mapPosition} zoom={5} />
          <TileLayer
            url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <TileLayer url={"https://tile.openweathermap.org/map/" + layer + "/{z}/{x}/{y}.png?appid=" + process.env.REACT_APP_API_KEY} />
          <Marker position={mapPosition} >
            <Popup>
              <div className="mapPopup">
                <p className="m-auto mb-2 text-center fs-6">
                  {cityNameFormat(city.name, city.state)}<Flag code={city.country} height="12" className="ms-1 mb-1" />
                </p>
                <p className="m-auto text-center">
                  {Math.round(city.lat * 100) / 100 + ", " + Math.round(city.lon * 100) / 100}
                </p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        <div id="mapLayer">
          <select className="form-select mx-auto shadow-none outline-none" aria-label="Select map layer" onChange={(e) => setLayer(e.target.value)}>
            <option value={"temp_new"}>Temperature</option>
            <option value={"wind_new"}>Wind</option>
            <option value={"pressure_new"}>Pressure</option>
            <option value={"precipitation_new"}>Precipitation</option>
            <option value={"clouds_new"}>Clouds</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default WeatherMap;
