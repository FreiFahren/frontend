import { Marker, Popup } from 'react-leaflet';
import { MarkerData } from '../../MarkerContainer';
import { OpacityMarkerIcon } from '../../../../../functions/mapUtils';
import L from 'leaflet';
import { useRef, useEffect, useState } from 'react';

interface OpacityMarkerProps {
    markerData: MarkerData;
    index: number;
    isHistoric: boolean;
}

export const OpacityMarker: React.FC<OpacityMarkerProps> = ({ markerData, index, isHistoric }) => {
    const [opacity, setOpacity] = useState(0);
    const { timestamp, station, line, direction } = markerData;

    // Timestamp is only one time call, so it's safe to ignore the warning
    const Timestamp = new Date(timestamp);
    Timestamp.setHours(Timestamp.getHours() -1); // subtracts 1 hour from the timestamp (utc to local time conversion)

    const markerRef = useRef<L.Marker | null>(null);
    useEffect(() => {
        // ensures that intervalId is defined before it's used
        // eslint-disable-next-line prefer-const
        let intervalId: NodeJS.Timeout;

        if (!isHistoric) {
          const calculateOpacity = () => {
            const currentTime = new Date().getTime();
            const elapsedTime = currentTime - Timestamp.getTime();
            const newOpacity = Math.max(0, 1 - (elapsedTime / (30 * 1000)));
            setOpacity(newOpacity);
            if (newOpacity === 0) {
              clearInterval(intervalId);
            }
          };
          calculateOpacity(); // Initial calculation

          intervalId = setInterval(calculateOpacity, 5000); // every 5 seconds to avoid excessive rerenders
        } else {
          setOpacity(1);
          return () => clearInterval(intervalId); // This will clear the interval when isHistoric becomes true
        }
       
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

    return (
        <Marker
            ref={markerRef}
            key={`${line}-${index}`}
            position={[station.coordinates.latitude, station.coordinates.longitude]}
            icon={OpacityMarkerIcon(opacity)}
        >
            <Popup>
                <>
                    {line} {direction.name ? direction.name + ' - ' : ''} { station.name }
                </>
            </Popup>
        </Marker>
    );
};
