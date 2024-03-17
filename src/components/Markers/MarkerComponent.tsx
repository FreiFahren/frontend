import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from './Markers';
import L from 'leaflet';

export const MarkerComponent = ({ markerData, index }: { markerData: MarkerData, index: Number }) => {
    const { timestamp, station, line, direction } = markerData;

    const timestampMarker = new Date(timestamp).getTime();

    const [opacity, setOpacity] = useState(1);

    
    useEffect(() => {
        const interval = setInterval(() => {
            setOpacity(prevOpacity => Math.max(0, prevOpacity - (1 / (1 * 60))));
        }, 1000);
        
        
        

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Create a custom icon with the calculated opacity
    const MarkerIcon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color:rgba(255,0,0,${opacity});width:20px;height:20px;border-radius:50%;"></div>`,
        iconSize: [20, 20],
    });

    return (
        <>
            <Marker key={`${line}-${index}`} position={[station.coordinates.latitude, station.coordinates.longitude]} icon={MarkerIcon}>
                <Popup>
                    <>
                        {line} {direction.name ? direction.name + ' - ' : ''} {station.name}
                    </>
                </Popup>
            </Marker>
        </>
    );
};