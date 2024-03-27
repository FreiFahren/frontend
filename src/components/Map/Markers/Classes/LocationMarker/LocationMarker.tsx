import L, { LatLng, LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';

export const getPosition = (): Promise<[number, number] | null> => {
    return new Promise((resolve) => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'prompt' || result.state === 'granted') {
                navigator.geolocation.getCurrentPosition((position) => {
                    resolve([position.coords.latitude, position.coords.longitude]);
                }, () => {
                    resolve(null); // Handle the case where getting position fails
                });
            } else {
                resolve(null); // Handle the case where permission is not granted
            }
        });
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
            const fetchPosition = async () => {
                const newPos = await getPosition();
                setPosition(newPos);
            };

            fetchPosition();

            const intervalId = setInterval(fetchPosition, 15000); // 15 seconds

            return () => clearInterval(intervalId);
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
