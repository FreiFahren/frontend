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
        const newTicketInspectorList = await getRecentTicketInspectorInfo();
        if (JSON.stringify(newTicketInspectorList) !== JSON.stringify(ticketInspectorList)) {
          setTicketInspectorList(newTicketInspectorList);
        }
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
        clearInterval(interval);
    };
}, [ticketInspectorList, formSubmitted]);

  return (
    <div>
      {
        ticketInspectorList.map((ticketInspector, index) => {
            let isHistoric = false;
            if (ticketInspector.timestamp === '0001-01-01T00:00:00Z'){
              isHistoric = true;
            }
            return (
              <OpacityMarker
                markerData={ticketInspector}
                index={index}
                key={ticketInspector.station.id}
                isHistoric={isHistoric}/>
            );

        })}
    </div>
  );
};

export default MarkerContainer;
