import React, { useEffect, useState } from "react";

import { Marker, Popup } from "react-leaflet";
import { getCoordinates, IdToStation } from "../../functions/dbUtils";

interface MarkersProps {
	formSubmitted: boolean;
}

export type MarkerData = {
	Coordinates: [number, number];
	StationID: string;
	DirectionID: string;
	Line: string;
};

const Markers: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [data, setData] = useState<MarkerData[]>([]);

    useEffect(() => {
        getCoordinates(setData);
    }, [formSubmitted]);

  return (
    <div>
  {data.map((item, index) => {
        const [latitude, longitude] = item.Coordinates;
		const station = IdToStation(item.StationID) || "";
        const line = item.Line;
        const direction = IdToStation(item.DirectionID) || "";

        return (
          <Marker
            key={`${line}-${index}`}
            position={[latitude, longitude]}
          >
            <Popup>{line} {direction ? (direction + " - ") : ""} {station}</Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default Markers;
