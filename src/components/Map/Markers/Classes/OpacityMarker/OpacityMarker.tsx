import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import L from 'leaflet';

export const OpacityMarker = ({ markerData, index }: { markerData: MarkerData; index: number; }) => {
    const [opacity, setOpacity] = useState(1);
    const { timestamp, station, line, direction } = markerData;

    const timestampSeconds = new Date(timestamp.replace(/T|Z/g, ' ')).getTime();
    const currentTime = new Date().getTime();

    const calculateOpacity = () => {

        const elapsedTime = currentTime - timestampSeconds;
        const opacityValue = Math.max(0, 1 - (elapsedTime / (15 * 60 * 1000)));
        setOpacity(opacityValue);
        return opacityValue;
    };

    const OpacityMarkerIcon = () => {
        const icon = L.divIcon({
            className: 'custom-icon',
            html: `<div style="background-color:rgba(255,0,0,${opacity});width:20px;height:20px;border-radius:50%;"></div>`,
            iconSize: [20, 20],
        });

        return icon;
    };

    const icon = OpacityMarkerIcon();

    useEffect(() => {
        const interval = setInterval(() => {
            calculateOpacity();

            if (opacity === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });

    // If the opacity hits zero, we don't want to render the marker
    if (opacity === 0) {
        return null;
    }

    return (
        <Marker key={`${line}-${index}`} position={[station.coordinates.latitude, station.coordinates.longitude]} icon={icon}>
            <Popup>
                <>
                    {line} {direction.name ? direction.name + ' - ' : ''} {station.name}
                </>
            </Popup>
        </Marker>
    );
};
