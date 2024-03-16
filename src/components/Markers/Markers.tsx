import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getRecentTicketInspectorInfo } from '../../functions/dbUtils';
import { createMarkerHTML } from '../../functions/mapUtils';

interface MarkersProps {
  formSubmitted: boolean;
}

export type MarkerData = {
	timestamp: string;
	station: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  }
	direction: {
    id: string;
    name: string;
    coordinates: {
      latitude: number;
      longitude: number;
    }
  }
	line: string;
};
    
const Markers: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [data, setData] = useState<MarkerData[]>([]);

  
    const MarkerIcon = L.divIcon({
        className: 'custom-icon',
        html: createMarkerHTML(),
        iconSize: [20, 20]
    });

 useEffect(() => {
    const fetchData = async () => {
        const newData = await getRecentTicketInspectorInfo();
        if (JSON.stringify(newData) !== JSON.stringify(data)) {
            setData(newData);
        }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
        clearInterval(interval);
    };
}, [data]);

  return (
    <div>
      {
        data.map((item, index) => {
            const station = item.station.name 
            const line = item.line;
            const direction = item.direction.name;

            const latitude = item.station.coordinates.latitude;
            const longitude =  item.station.coordinates.longitude;

            console.log(item.station.name, item.line, item.direction.name, item.station.coordinates.latitude, item.station.coordinates.longitude)

            return (
              <Marker key={`${line}-${index}`} position={[latitude, longitude]} icon={MarkerIcon}>
                <Popup>
                  <>
                    {line} {direction ? direction + ' - ' : ''} {station}
                  </>
                </Popup>
              </Marker>
            );

        })}
    </div>
  );
};

export default Markers;
