import L, {LatLngTuple} from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';

export const queryPermission = async (): Promise<boolean> => {
    try {
        const permissionStatus = await navigator.permissions.query({ name: 'geolocation' });
        return permissionStatus.state === 'granted';
    } catch (error) {
        return false;
    }
};

export const getPosition = (): LatLngTuple | null => {
    queryPermission().then((permissionGranted) => {
        if (permissionGranted) {
            navigator.geolocation.getCurrentPosition((position) => {
                return [position.coords.latitude, position.coords.longitude];
            });
        }
    });
    return null;
};

const watchPosition = async (onPositionChanged: (position: LatLngTuple | null) => void): Promise<(() => void) | null> => {
    const permissionGranted = await queryPermission();
    if (!permissionGranted) {
        return null;
    }

    const watchId = navigator.geolocation.watchPosition((position) => {
        onPositionChanged([position.coords.latitude, position.coords.longitude]);
    }, () => {
        onPositionChanged(null); // Handle the case where getting position fails
    });

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

            async function fetchPosition() {
                const clearWatch = await watchPosition(setPosition);

                return () => clearWatch ? clearWatch() : undefined;
            }

            fetchPosition();

            // const intervalId = setInterval(fetchPosition, 15000); // 15 seconds

            // return () => clearInterval(intervalId);
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
