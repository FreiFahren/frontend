import { MarkerData } from '../components/Map/Markers/MarkerContainer';

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

export async function reportInspector(line: string, station: string, direction: string): Promise<ResponseType> {
    const requestBody = {
        line,
        station,
        direction,
    };

    return fetch('/newInspector', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Convert the JavaScript object to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response body
    .catch(error => {
        console.error('Error reporting inspector sighting:', error);
    });
}
