import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getRecentTicketInspectorInfo } from '../../functions/dbUtils';
import { createMarkerHTML } from '../../functions/mapUtils';
import { MarkerComponent } from './MarkerComponent';

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
}, [data, formSubmitted]);

  return (
    <div>
      {
        data.map((item, index) => {
        
            return (
              <MarkerComponent markerData={item} index={index} />
            );

        })}
    </div>
  );
};

export default Markers;
