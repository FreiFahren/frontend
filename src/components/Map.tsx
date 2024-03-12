import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";

import './Map.css'

export default function Map() {
    const position: LatLngTuple = [52.520008,13.404954];

  return (
    
    
        <MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>

  );
}
