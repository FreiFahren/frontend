import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';

let icon = OpacityMarkerIcon(1);

export const OpacityMarker = ({ markerData, index }: { markerData: MarkerData; index: number; }) => {
    const [opacity, setOpacity] = useState(0);
    const { timestamp, station, line, direction } = markerData;

    const timestampSeconds = new Date(timestamp.replace(/T|Z/g, ' ')).getTime();
    const currentTime = new Date().getTime();

    const calculateOpacity = () => {

        const elapsedTime = currentTime - timestampSeconds;
        const opacityValue = Math.max(0, 1 - (elapsedTime / (15 * 60 * 1000)));
        setOpacity(opacityValue);
        icon = OpacityMarkerIcon(opacityValue);
        return opacityValue;
    };

    useEffect(() => {
        // Get the initial opacity value
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
