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
  isHistoric: boolean;
};

const MarkerContainer: React.FC<MarkersProps> = ({ formSubmitted }) => {
  const [ticketInspectorList, setTicketInspectorList] = useState<MarkerData[]>([]);

 useEffect(() => {
    const fetchData = async () => {
        const newTicketInspectorList = await getRecentTicketInspectorInfo();
        if (JSON.stringify(newTicketInspectorList) !== JSON.stringify(ticketInspectorList)) {
          setTicketInspectorList(newTicketInspectorList);
        }
        ticketInspectorList.forEach((ticketInspector) => {
          if (ticketInspector.timestamp === '0001-01-01T00:00:00Z'){
            ticketInspector.isHistoric = true;
          }else{
            ticketInspector.isHistoric = false;
          }
        })

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
            return (
              <OpacityMarker
                markerData={ticketInspector}
                index={index}
                key={ticketInspector.station.id}
                isHistoric={ticketInspector.isHistoric}/>
            );

        })}
    </div>
  );
};

export default MarkerContainer;
