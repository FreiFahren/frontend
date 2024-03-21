import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';
import L from 'leaflet';
import { useRef, useEffect, useState } from 'react';

export const OpacityMarker = ({ markerData, index }: { markerData: MarkerData; index: number; }) => {
    const [opacity, setOpacity] = useState(1); // full opacity so that the component renders initially
    const { timestamp, station, line, direction } = markerData;

    const timestampSeconds = new Date(timestamp.replace(/T|Z/g, ' ')).getTime();

    const markerRef = useRef<L.Marker | null>(null);

    useEffect(() => {
        // ensures that intervalId is defined before it's used
        let intervalId: NodeJS.Timeout;
        
        const calculateOpacity = () => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - timestampSeconds;
            const newOpacity = Math.max(0, 1 - (elapsedTime / (15 * 60 * 1000)));
            setOpacity(newOpacity);
            if (newOpacity === 0) {
                clearInterval(intervalId);
            }
        };

        calculateOpacity(); // Initial calculation

        intervalId = setInterval(calculateOpacity, 5000); // every 5 seconds to avoid excessive rerenders

        return () => clearInterval(intervalId);
    }, [timestampSeconds]); // runs when getting a new timestamp

    useEffect(() => {
        if (markerRef.current && opacity > 0) {
            const newIcon = OpacityMarkerIcon(opacity);
            markerRef.current.setIcon(newIcon);
        }
    }, [opacity]);

    if (opacity <= 0) {
        return null;
    }

    return (
        <Marker 
            ref={markerRef}
            key={`${line}-${index}`}
            position={[station.coordinates.latitude, station.coordinates.longitude]} 
            icon={OpacityMarkerIcon(opacity)}
        >
            <Popup>
                {`${line} ${direction.name ? direction.name + ' - ' : ''} ${station.name}`}
            </Popup>
        </Marker>
    );
};
