import { Option } from '../components/AutocompleteInputForm/AutocompleteInputForm';
import { MarkerData } from '../components/Map/Markers/MarkerContainer';

export type StationsAndLinesList = {
    lines: string[];
    stations: string[];
  };

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

export async function getAllStationsAndLines(): Promise<StationsAndLinesList> {
    try {
        const response = await fetch('/list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return { lines: [], stations: [] };
    }
}

export async function reportInspector(line: Option, station: Option, direction: Option) {
    // TODO: we should send ID instead of the name!!!!!! (backend issue)
    const requestBody = JSON.stringify({
        line: line.value,
        station: station.label,
        direction: direction.label,
    });
    console.log(requestBody)
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
      .then(data => {
        console.log(data)
        console.log('Success!');
        })
      .catch((error) => console.error('Error:', error));
}

