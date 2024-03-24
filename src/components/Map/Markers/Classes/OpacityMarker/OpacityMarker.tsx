import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import './OpacityMarker.css';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';

interface OpacityMarkerProps {
    markerData: MarkerData;
    index: number;
}

export const OpacityMarker: React.FC<OpacityMarkerProps> = ({ markerData, index }) => {
    const [opacity, setOpacity] = useState(0);
    const { timestamp, station, line, direction, isHistoric } = markerData;

    // By using useMemo, we can avoid recalculating the timestamp on every render
    const Timestamp = useMemo(() => {
        const tempTimestamp = new Date(timestamp);
        tempTimestamp.setHours(tempTimestamp.getHours() - 1); // Adjust for UTC to local
        return tempTimestamp;
    }, [timestamp]);

    const markerRef = useRef<L.Marker | null>(null);
    useEffect(() => {
        let intervalId : NodeJS.Timeout;

        if (!isHistoric) {
          const calculateOpacity = () => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - Timestamp.getTime();
            const newOpacity = Math.max(0, 1 - (elapsedTime / (30 * 60 * 1000)));
            setOpacity(newOpacity);
            if (newOpacity === 0) {
              clearInterval(intervalId);
            }
          };
          calculateOpacity(); // Initial calculation

          intervalId = setInterval(calculateOpacity, 5 * 1000); // every 5 seconds to avoid excessive rerenders
        } else {
          setOpacity(1);
        }
        return () => clearInterval(intervalId);
    }, [Timestamp, isHistoric]);

    useEffect(() => {
        if (markerRef.current && opacity > 0) {
            const newIcon = OpacityMarkerIcon(opacity);
            markerRef.current.setIcon(newIcon);
        }
    }, [opacity]);

    if (opacity <= 0) {
        return null;
    }

    const elapsedTimeMessage = (elapsedTime:number, isHistoric:boolean): string => {
        if (elapsedTime > 10 * 60 * 1000 || isHistoric) {
            return 'Vor mehr als <strong>10 Minuten</strong> gemeldet.';
        }
        else {
            const minutes = Math.max(1, Math.floor(elapsedTime / (60 * 1000)));
            return `Vor <strong>${minutes === 1 ? 'einer' : minutes} Minuten</strong> gemeldet.`;
        }
    };

    return (
        <Marker
            ref={markerRef}
            key={`${line}-${index}`}
            position={[station.coordinates.latitude, station.coordinates.longitude]}
            icon={OpacityMarkerIcon(opacity)}
        >
            <Popup>
                <>
                    {line} {direction.name ? direction.name + ' - ' : ''} <strong>{station.name}</strong>
                    <div dangerouslySetInnerHTML={{ __html: elapsedTimeMessage(new Date().getTime() - Timestamp.getTime(), isHistoric) }} />
                </>
            </Popup>
        </Marker>
    );
};
