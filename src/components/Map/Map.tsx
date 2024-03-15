import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import Markers from '../Markers/Markers';
import './Map.css'

interface MapProps {
    formSubmitted: boolean;
}

const Map: React.FC<MapProps> = ({ formSubmitted }) => {
    // Berlin as Standardview
    const position: LatLngTuple = [52.5162,13.3880];

  return (
        <MapContainer id='map' center={position} zoom={13} scrollWheelZoom={true}>
        <TileLayer
            attribution= '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>'
            url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}
        />
        <Markers formSubmitted={formSubmitted}/>

        </MapContainer>
  );
}

export default Map;
