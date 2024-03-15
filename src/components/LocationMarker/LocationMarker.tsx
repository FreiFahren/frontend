import L, { Icon } from 'leaflet';
import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';

const LocationMarker = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const icon: Icon = L.icon({
        iconUrl: process.env.PUBLIC_URL + '/location.svg',
        iconSize: [64, 64],
        iconAnchor: [32, 32],
        popupAnchor: [0, -16],

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
        const intervalId = setInterval(getPosition, 2000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {position && (
                <Marker position={position} icon={icon} >
                    <Popup>
                        Dein Standort
                    </Popup>
                </Marker>
            )}
        </div>
    );
};

export default LocationMarker;
