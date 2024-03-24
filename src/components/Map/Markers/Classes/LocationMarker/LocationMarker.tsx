import L, { LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';

export const getPosition = (setPosition: React.Dispatch<React.SetStateAction<LatLngTuple | null>>) => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'prompt' || result.state === 'granted') {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            });
        }
    });
};

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

    useEffect(() => {
        // If the browser doesn't support geolocation, do nothing
        if (!navigator.geolocation) {
            return;
        }

        // Get current position immediately
        getPosition(setPosition);

        // Get position every 15 seconds
        const intervalId = setInterval(() => {
            getPosition(setPosition);
        }, 15000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
