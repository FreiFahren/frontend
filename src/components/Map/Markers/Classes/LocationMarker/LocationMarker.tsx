import L, {LatLngTuple} from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';
import { watchPosition } from '../../../../../functions/mapUtils';

interface LocationMarkerProps {
     initialPosition: LatLngTuple | null;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ initialPosition }) => {
     const [position, setPosition] = useState<LatLngTuple | null>(initialPosition);

        const LocationIcon = L.divIcon({
            className: 'custom-icon',
            html: createLocationMarkerHTML(),
            iconSize: [20, 20]
        });

        const fetchPosition = useCallback(async () => {
            const clearWatch = await watchPosition(setPosition);
            return () => clearWatch ? clearWatch() : undefined;
        }, []);

        useEffect(() => {
            fetchPosition();
        }, [fetchPosition]);

    return (
        <div>
            {position && (
                <Marker position={position} icon={LocationIcon} >
                    <Popup>
                        Dein Standort
                    </Popup>
                </Marker>
            )}
        </div>
    );
};

export default LocationMarker;
