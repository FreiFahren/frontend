import L from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createLocationMarkerHTML } from '../../functions/mapUtils';

const LocationMarker = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    
    
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

        const getPosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition([position.coords.latitude, position.coords.longitude]);
            });
        };

        // Get current position immediately
        getPosition();

        // Then get it every 2 seconds
        const intervalId = setInterval(getPosition, 10000);

        // Clear interval on component unmount
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
