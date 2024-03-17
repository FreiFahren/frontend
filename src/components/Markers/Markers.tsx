import React, { useEffect, useState } from 'react';

import { getRecentTicketInspectorInfo } from '../../functions/dbUtils';
import { MarkerComponent } from './OpacityMarker';
import { MarkersProps, MarkerData } from '../../functions/markerProps';

const Markers: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [data, setData] = useState<MarkerData[]>([]);

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
              <MarkerComponent markerData={item} index={index} key={index}/>
            );

        })}
    </div>
  );
};

export default Markers;
