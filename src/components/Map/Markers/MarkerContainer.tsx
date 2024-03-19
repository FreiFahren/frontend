import React, { useEffect, useState } from 'react';

import { getRecentTicketInspectorInfo } from '../../../functions/dbUtils';
import { OpacityMarker } from './Classes/OpacityMarker/OpacityMarker';

export interface MarkersProps {
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
      };
  };
  direction: {
      id: string;
      name: string;
      coordinates: {
          latitude: number;
          longitude: number;
      };
  };
  line: string;
};

const MarkerContainer: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [ticketInspectorList, setTicketInspectorList] = useState<MarkerData[]>([]);
  useEffect(() => {
   
    const fetchData = async () => {
      // change name lastUpdateTime for understanding
        const lastUpdateTime = localStorage.getItem('lastUpdateTime');
        if (!lastUpdateTime) {
            console.log('No lastUpdateTime found in local storage.');
            const currentTime = new Date().toISOString();
            localStorage.setItem('lastUpdateTime', currentTime);
        }
        const newTicketInspectorList = await getRecentTicketInspectorInfo(lastUpdateTime); 
        console.log(newTicketInspectorList, ticketInspectorList);
        // Only update ticketInspectorList if newTicketInspectorList is an array
        if (Array.isArray(newTicketInspectorList)) {
            setTicketInspectorList(newTicketInspectorList);

            // Assuming the array is sorted with the most recent timestamp first
            if (newTicketInspectorList.length > 0) {
                // Update lastUpdateTime in local storage with the most recent timestamp
                const latestReturnedTimestamp = newTicketInspectorList[0].timestamp;
                localStorage.setItem('lastUpdateTime', latestReturnedTimestamp);
            }
        } else {
            console.log('No new data to update.');
        }
    };

    fetchData();
    console.log(ticketInspectorList)
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
}, [formSubmitted]);

  return (
    <div>
      {
        ticketInspectorList.map((ticketInspector, index) => {
            return (
              <OpacityMarker markerData={ticketInspector} index={index} key={ticketInspector.station.id}/>
            );

        })}
    </div>
  );
};

export default MarkerContainer;
