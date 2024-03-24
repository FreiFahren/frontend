import React, { useEffect } from 'react';
import { LayerGroup, LayersControl, MapContainer } from 'react-leaflet';
import { LatLngTuple, latLngBounds } from 'leaflet';

import MarkerContainer from './Markers/MarkerContainer';
import LocationMarker from './Markers/Classes/LocationMarker/LocationMarker';
import './Map.css'

import StandardLayer from './Layers/StandardLayer';
import DarkLayer from './Layers/DarkLayer';

interface MapProps {
    formSubmitted: boolean;
    initialPosition: LatLngTuple | null;
}

const Map: React.FC<MapProps> = ({ formSubmitted, initialPosition }) => {
    // Berlin as Standardview

    const position: LatLngTuple = initialPosition ? initialPosition : [52.5162,13.3880] as LatLngTuple;

    const maxBounds = latLngBounds([52.96125019866001, 12.509131386425151], [52.014679000584486, 14.382300343810543]);

  return (
        <MapContainer id='map' center={position} zoom={13} scrollWheelZoom={true} maxBounds={maxBounds}>

            <LayersControl position='bottomleft'>

                <LayersControl.BaseLayer checked name='Light'>
                    <LayerGroup>
                        <StandardLayer position={initialPosition} />
                    </LayerGroup>
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer name='Dark'>
                    <LayerGroup>
                        <DarkLayer />
                    </LayerGroup>
                </LayersControl.BaseLayer>

            </LayersControl>
            <LocationMarker initialPosition={initialPosition}/>

            <MarkerContainer formSubmitted={formSubmitted}/>

        </MapContainer>
  );
}

export default Map;
