import { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';

let icon = OpacityMarkerIcon(1);

export const OpacityMarker = ({ markerData, index, isHistoric }: { markerData: MarkerData; index: number; isHistoric: boolean}) => {

    const [opacity, setOpacity] = useState(0);
    const { timestamp, station, line, direction } = markerData;

    const timestampSeconds = new Date(timestamp);

    // Subtract one hour to account for the time difference between the server and the client
    timestampSeconds.setHours(timestampSeconds.getHours() - 1);
    const currentTime = new Date().getTime();

    const calculateOpacity = () => {
        const elapsedTime = currentTime - timestampSeconds.getTime();
        const opacityValue = Math.max(0, 1 - (elapsedTime / ( 15 * 60 * 1000)));

        setOpacity(opacityValue);
        icon = OpacityMarkerIcon(opacityValue);
        return opacityValue;
    };

    useEffect(() => {
        if (!isHistoric) {
            const interval = setInterval(() => {
                calculateOpacity();

                if (opacity === 0) {
                    clearInterval(interval);
                }
            }, 2000);

            return () => {
                clearInterval(interval);
            };
        }

    });

    // If the opacity hits zero, we don't want to render the marker
    if (opacity === 0) {
        return null;
    }

    return (
        <Marker key={`${line}-${index}`} position={[station.coordinates.latitude, station.coordinates.longitude]} icon={icon}>
            <Popup>
                <>
                    {line} {direction.name ? direction.name + ' - ' : ''} { isHistoric ? station.name + ' (Historisch)' : station.name }
                </>
            </Popup>
        </Marker>
    );
};
