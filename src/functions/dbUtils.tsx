import { MarkerData } from '../components/Map/Markers/MarkerContainer';

export async function getRecentTicketInspectorInfo(lastUpdateTimestamp: string | null): Promise<MarkerData[] | null> {
    try {
        const headers = new Headers();
        console.log(lastUpdateTimestamp + " ss ");
        // Include the If-Modified-Since header only if lastUpdateTimestamp is available
        if (lastUpdateTimestamp && lastUpdateTimestamp !== "undefined") {
            headers.append("If-Modified-Since", lastUpdateTimestamp);
            console.log('Headersss:', headers);
        }

        // Make the request with optional If-Modified-Since header
        const response = await fetch('/recent', {
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
