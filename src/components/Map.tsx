import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function Map() {
    const mapRef = useRef(null);
    let mapInstance: L.Map | L.LayerGroup<any> | null = null;

    useEffect(() => {
        if (!mapInstance) {
            mapInstance = L.map(mapRef.current!).setView([52.5072, 13.4248], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapInstance);
        }
    }, []);

    return (
        <div ref={mapRef} ></div>
    );
}