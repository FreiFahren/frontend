import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import { getCoordinates} from '../../functions/dbUtils';

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
      {
	  Array.isArray(data) && data.map((item, index) => {
		const station = item.StationID || '';
		const line = item.Line;
		const direction = item.DirectionID || '';

		if (Array.isArray(item.Coordinates)) {
			const [latitude, longitude] = item.Coordinates;

			return (
				<Marker key={`${line}-${index}`} position={[latitude, longitude]}>
					<Popup>
						<>{line} {direction ? (direction + ' - ') : ''} {station}</>
					</Popup>
				</Marker>
			);
		}else{
			if (process.env.NODE_ENV === 'development') {
				console.log('Coordinates are not an array');
			}
			return '';
		}

	})}
    </div>
  );
};

export default Markers;
