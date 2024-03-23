import React from 'react';
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
            attribution= '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>'
            url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}
        />

        <LocationMarker />

        <MarkerContainer formSubmitted={formSubmitted}/>

        </MapContainer>
  );
}

export default Map;
