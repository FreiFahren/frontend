import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';

import MarkerContainer from './Markers/MarkerContainer';
import LocationMarker from './Markers/Classes/LocationMarker/LocationMarker';
import './Map.css'

interface MapProps {
    formSubmitted: boolean;
}

const Map: React.FC<MapProps> = ({ formSubmitted }) => {
    // Berlin as Standardview
    const position: LatLngTuple = [52.5162,13.3880];

    const maxBounds = latLngBounds([52.96125019866001, 12.509131386425151], [52.014679000584486, 14.382300343810543]);

  return (
        <MapContainer id='map' center={position} zoom={13} scrollWheelZoom={true} maxBounds={maxBounds}>
        <TileLayer
            attribution= '<a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
            url={`https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}
        />


        <LocationMarker />

        <MarkerContainer formSubmitted={formSubmitted}/>

        </MapContainer>
  );
}

export default Map;
