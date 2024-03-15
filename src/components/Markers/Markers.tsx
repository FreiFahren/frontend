import React, { useEffect, useState } from "react";

import { Marker, Popup } from 'react-leaflet';
import { getLatestData } from '../../functions/dbUtils';

interface MarkersProps {
  formSubmitted: boolean;
}

export type MarkerData = {
	Coordinates: [number, number];
	Station: string;
	Direction: string;
	Line: string;
};

const Markers: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [data, setData] = useState<MarkerData[]>([]);

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
          const station = item.Station || "";
          const line = item.Line;
          const direction = item.Direction || "";

          if (Array.isArray(item.Coordinates)) {
            const [latitude, longitude] = item.Coordinates;

            return (
              <Marker key={`${line}-${index}`} position={[latitude, longitude]}>
                <Popup>
                  <>
                    {line} {direction ? direction + " - " : ""} {station}
                  </>
                </Popup>
              </Marker>
            );
          } else {
            if (process.env.NODE_ENV === "development") {
              console.log("Coordinates are not an array");
            }
            return "";
          }
        })}
    </div>
  );
};

export default Markers;
