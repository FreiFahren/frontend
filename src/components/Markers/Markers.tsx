import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { getLatestData } from '../../functions/dbUtils';

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

	const MarkerIcon: Icon = L.icon({
		iconUrl: process.env.PUBLIC_URL + '/marker.svg',
		iconSize: [48, 48],
		iconAnchor: [25, 50],
		popupAnchor: [0, -16],

	});

  useEffect(() => {
    getLatestData(setData);
      const interval = setInterval(() => {
      getLatestData(setData);
      }, 5000);

    // When the component unmounts, clear the interval, because we don't want to keep fetching data
      return () => {
        clearInterval(interval);
      };

  }, [formSubmitted]);

  return (
    <div>
      {Array.isArray(data) &&
        data.map((item, index) => {
          const station = item.station.name || '';
          const line = item.line;
          const direction = item.direction.name || '';

            const latitude = item.station.coordinates.latitude;
            const longitude =  item.station.coordinates.longitude;

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
