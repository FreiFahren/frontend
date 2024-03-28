import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';

import MarkerContainer from './Markers/MarkerContainer';
import LocationMarker from './Markers/Classes/LocationMarker/LocationMarker';
import './Map.css'

interface MapProps {
    formSubmitted: boolean;
    userPosition: LatLngTuple | null;
    setUserPosition: (position: LatLngTuple | null) => void;
}

export const berlinViewPosition: LatLngTuple = [52.5162, 13.3880];

const Map: React.FC<MapProps> = ({ formSubmitted, userPosition, setUserPosition }) => {

    const maxBounds = latLngBounds([52.96125019866001, 12.509131386425151],
                                   [52.014679000584486, 14.382300343810543]);

  return (
        <MapContainer id='map'
            center={berlinViewPosition}
            zoom={13}
            scrollWheelZoom={true}
            maxBounds={maxBounds}
            maxBoundsViscosity={1}
            inertia={true}
            bounceAtZoomLimits={false}
            touchZoom={true}
        >
        <TileLayer
            attribution= '<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a>'
            url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_ACCESS_TOKEN}`}
            minZoom={11}
            maxZoom={16}
        />

        <LocationMarker userPosition={userPosition} setUserPosition={setUserPosition}/>

        <MarkerContainer formSubmitted={formSubmitted}/>

        </MapContainer>
  );
}

export default Map;
