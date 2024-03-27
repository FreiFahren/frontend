import L, { LatLngTuple } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

import { createLocationMarkerHTML } from '../../../../../functions/mapUtils';

export const getPosition = (): Promise<{ position: [number, number] | null, watchId: number | null }> => {
    return new Promise((resolve) => {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            if (result.state === 'prompt' || result.state === 'granted') {
                const watchId = navigator.geolocation.watchPosition((position) => {
                    resolve({ position: [position.coords.latitude, position.coords.longitude], watchId });
                }, () => {
                    resolve({ position: null, watchId: null }); // Handle the case where getting position fails
                });
            } else {
                resolve({ position: null, watchId: null }); // Handle the case where permission is not granted
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
            let watchId: number | null = null;
        
            const fetchPosition = async () => {
                const { position, watchId: id } = await getPosition();
                watchId = id;
                console.log(position);
                setPosition(position);
            };
        
            fetchPosition();
        
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
