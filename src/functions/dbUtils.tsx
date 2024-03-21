import { Option } from '../components/AutocompleteInputForm/AutocompleteInputForm';
import { MarkerData } from '../components/Map/Markers/MarkerContainer';

export interface StationProperty {
	name: string;
	coordinates: {
		latitude: number;
		longitude: number;
	};
	lines: string[];
}

export type LineProperty = {
    [key: string]: string[];
}

export type StationList = Record<string, StationProperty>;
export type LinesList = Record<string, string[]>;

export async function getRecentTicketInspectorInfo(): Promise<MarkerData[]> {
    try {
        const response = await fetch('/recent');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

export async function getAllStationsList(): Promise<StationList> {
  try {
      const response = await fetch('/list?stations=true');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return {};
  }
}

export async function getAllLinesList(): Promise<LinesList> {
  try {
      const response = await fetch('/list?lines=true');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return {};
  }
}

export async function reportInspector(line: Option, station: Option, direction: Option) {
    // TODO: we should send ID instead of the name!!!!!! (backend issue)
    const requestBody = JSON.stringify({
        line: line === undefined ? '' : line.value,
        station: station.label,
        direction: (direction === undefined || direction === null) ? '' : direction.label,
    });

    fetch('/newInspector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: requestBody
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error('Error:', error));
}

