import L, { LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';

export const getPosition = (): Promise<{ position: LatLngTuple | null }> => {
    return new Promise((resolve) => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'prompt' || result.state === 'granted') {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve({ position: [position.coords.latitude, position.coords.longitude] });
                }, () => {
                    resolve({ position: null}); // Handle the case where getting position fails
                });
            } else {
                resolve({ position: null}); // Handle the case where permission is not granted
            }
        });
    });
};

export const watchPosition = (onPositionChanged: (position: LatLngTuple | null) => void): (() => void) => {
    const watchId = navigator.geolocation.watchPosition((position) => {
        onPositionChanged([position.coords.latitude, position.coords.longitude]);
    }, () => {
        onPositionChanged(null); // Handle the case where getting position fails
    });

    // Return a function that can be used to stop watching the position
    return () => (navigator.geolocation.clearWatch(watchId));
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
            const stopWatchingPosition = watchPosition(setPosition);
            return () => stopWatchingPosition();

        }, [position]);

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
