import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import Markers from "./markers/Markers";
import './Map.css'

export default function Map() {
    const position: LatLngTuple = [52.520008,13.404954];
    const alexanderplatz: LatLngTuple = [52.521992, 13.413244];
  return (
    

        <MapContainer id="map" center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution= '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>'
            url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}
            accessToken='FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo'
        />
        <Markers />
        
        <Marker position={alexanderplatz}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
        </MapContainer>

  );
}
