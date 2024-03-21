import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';
import L from 'leaflet';
import { useRef, useEffect, useCallback, useState } from 'react';

export const OpacityMarker = ({ markerData, index }: { markerData: MarkerData; index: number; }) => {
    const [opacity, setOpacity] = useState(0);
    const { timestamp, station, line, direction } = markerData;

    const timestampSeconds = new Date(timestamp.replace(/T|Z/g, ' ')).getTime();

    const markerRef = useRef<L.Marker | null>(null); // Create a ref to store the marker instance

    const calculateOpacity = useCallback(() => { // Wrapped in useCallback
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - timestampSeconds;
        const opacityValue = Math.max(0, 1 - (elapsedTime / (15 * 60 * 1000)));
        setOpacity(opacityValue);
        return opacityValue;
    }, [timestampSeconds]); // timestampSeconds is a dependency

    useEffect(() => {
        calculateOpacity();

        const interval = setInterval(() => {
            calculateOpacity();

            if (opacity === 0) {
                clearInterval(interval);
            }
        }, 3000);

        return () => {
            clearInterval(interval);
        };
    }, [calculateOpacity, opacity]); // calculateOpacity is now a stable function

    useEffect(() => {
        if (markerRef.current) {
            const newIcon = OpacityMarkerIcon(opacity);
            markerRef.current.setIcon(newIcon); // Update the icon of the marker instance
        }
    }, [opacity]); // Run this effect whenever the opacity changes

    if (opacity === 0) {
        return null;
    }

    return (
        <Marker 
            ref={markerRef} // Pass the ref to the Marker component
            key={`${line}-${index}`} 
            position={[station.coordinates.latitude, station.coordinates.longitude]} 
            icon={OpacityMarkerIcon(opacity)}
        >
            <Popup>
                <>
                    {line} {direction.name ? direction.name + ' - ' : ''} {station.name} {opacity.toFixed(2)}
                </>
            </Popup>
        </Marker>
    );
};