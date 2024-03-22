import React, { useEffect, useState, useRef } from 'react';

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
	const lastReceivedInspectorTimestamp = useRef<string | null>(null);
	
	useEffect(() => {
		const fetchData = async () => {
			const newTicketInspectorList = await getRecentTicketInspectorInfo(lastReceivedInspectorTimestamp.current) || [];

			// Check if the new array is not empty, then update the state
			if (Array.isArray(newTicketInspectorList) && newTicketInspectorList.length > 0) {

				setTicketInspectorList(newTicketInspectorList);

				// Update lastUpdateTime in local storage with the most recent timestamp
				lastReceivedInspectorTimestamp.current = newTicketInspectorList[0].timestamp;
			}
		};

		fetchData();
		const interval = setInterval(fetchData, 5000);

		return () => clearInterval(interval);
	}, [formSubmitted, ticketInspectorList]);

	return (
		<div>
			{ticketInspectorList.map((ticketInspector, index) => {
				return (
					<OpacityMarker
						markerData={ticketInspector}
						index={index}
						key={ticketInspector.station.id}
						isHistoric={ticketInspector.isHistoric} />
				);

			})}
		</div>
	);
};

export default MarkerContainer;
