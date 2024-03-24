import React from 'react';
import { MapContainer } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';

import MarkerContainer from './Markers/MarkerContainer';
import LocationMarker from './Markers/Classes/LocationMarker/LocationMarker';
import './Map.css'

import LayerButton from './LayerButton/LayerButton';

interface MapProps {
    formSubmitted: boolean;
    initialPosition: LatLngTuple | null;
}

export const berlinViewPosition: LatLngTuple = [52.5162, 13.3880];

const Map: React.FC<MapProps> = ({ formSubmitted, initialPosition }) => {

    const maxBounds = latLngBounds([52.96125019866001, 12.509131386425151], [52.014679000584486, 14.382300343810543]);

    return (
        <div>
        <MapContainer id='map' center={berlinViewPosition} zoom={13} scrollWheelZoom={true} maxBounds={maxBounds}>
            <LayerButton initialPosition={initialPosition} />

            <LocationMarker initialPosition={initialPosition}/>
            <MarkerContainer formSubmitted={formSubmitted}/>
        </MapContainer>
        </div>
    );
}

export default Map;
