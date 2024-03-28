import L, {LatLngTuple} from 'leaflet';
import React, { useCallback, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML, watchPosition} from '../../../../../functions/mapUtils';

interface LocationMarkerProps {
    userPosition: LatLngTuple | null;
    setUserPosition: (position: LatLngTuple | null) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ userPosition, setUserPosition }) => {

        const LocationIcon = L.divIcon({
            className: 'custom-icon',
            html: createLocationMarkerHTML(),
            iconSize: [20, 20]
        });

        const fetchPosition = useCallback(async () => {
            const stopWatching = await watchPosition(setUserPosition);
            return () => stopWatching();
        }, []);

        useEffect(() => {
            fetchPosition();
        }, [fetchPosition]);

    return (
        <div>
            {userPosition && (
                <Marker position={userPosition} icon={LocationIcon} >
                    <Popup>
                        Dein Standort
                    </Popup>
                </Marker>
            )}
        </div>
    );
};

export default LocationMarker;
