import { selectOption } from '../components/AutocompleteInputForm/AutocompleteInputForm';
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

export async function getRecentTicketInspectorInfo(lastUpdateTimestamp: string | null): Promise<MarkerData[] | null> {
    try {
        const headers = new Headers();
        // Include the If-Modified-Since header only if lastUpdateTimestamp is available
        if (lastUpdateTimestamp) {
            headers.append('If-Modified-Since', lastUpdateTimestamp);
        }

        // Make the request with optional If-Modified-Since header
        const response = await fetch(`${process.env.REACT_APP_API_URL}/recent`, {
            method: 'GET',
            headers: headers,
        });

        // Handle 304 Not Modified
        if (response.status === 304) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return []; // Return an empty array in case of error
    }
}

export async function getAllStationsList(): Promise<StationList> {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/list?stations=true`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return {};
  }
}

export async function getAllLinesList(): Promise<LinesList> {
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/list?lines=true`);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error:', error);
      return {};
  }
}

export async function reportInspector(line: selectOption, station: selectOption, direction: selectOption) {
    const requestBody = JSON.stringify({
        line: line === undefined ? '' : line.value,
        station: station.label,
        direction: (direction === undefined || direction === null) ? '' : direction.label,
    });

    fetch(`${process.env.REACT_APP_API_URL}/newInspector`, {
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

