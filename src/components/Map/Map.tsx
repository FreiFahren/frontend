import { MapContainer, LayersControl } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';

import MarkerContainer from './Markers/MarkerContainer';
import NormalLayer from './Layers/NormalLayer';
import LocationMarker from './Markers/Classes/LocationMarker/LocationMarker';
import './Map.css'
import OfflineLayer from './Layers/OfflineLayer';


interface MapProps {
    formSubmitted: boolean;
}

export const urlTemplate = `https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`;
export const urlTemplateDark = `https://tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`;


const Map: React.FC<MapProps> = ({ formSubmitted }) => {
    // Berlin as Standardview
    const position: LatLngTuple = [52.5162,13.3880];

    const maxBounds = latLngBounds([52.77120093288026, 13.102569580078127], [52.30889844356715, 13.6944580078125]);


    return (
        <MapContainer id='map' center={position} zoom={11} scrollWheelZoom={true} maxBounds={maxBounds}>
            <LayersControl position="bottomleft">

            <LayersControl.Overlay name="Offline name">
                    <OfflineLayer />
                </LayersControl.Overlay>

                <LayersControl.Overlay checked name="Normal layer">
                    <NormalLayer />
                </LayersControl.Overlay>

                
            </LayersControl>
            <LocationMarker />

            <MarkerContainer formSubmitted={formSubmitted} />

        </MapContainer>
    );
}
export default Map;
