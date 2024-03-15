import { MarkerData } from '../components/Markers/Markers';

export function getLatestData(setData: React.Dispatch<React.SetStateAction<MarkerData[]>>) {
    fetch('/data?names=true')
    .then(response => response.json())
    .then(data => {
        const MarkerData: MarkerData[] = [];

        // The response body is
        // [Coordinates, StationID, DirectionID, Line]
        // StationID and DirectionID can be IDs or names
        // We convert it to this format for conveniency:
        for (const item of data) {
            const Marking: MarkerData = {
                Coordinates: item.Coordinates,
                Station: item.StationID,
                Direction: item.DirectionID,
                Line: item.Line,
            }
            MarkerData.push(Marking);
        }
        setData(MarkerData);
    })
    .catch(error => console.error('Error:', error));

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
