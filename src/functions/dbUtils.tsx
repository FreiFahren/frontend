import { MarkerData } from '../components/Markers/Markers';

export function getCoordinates(setData: React.Dispatch<React.SetStateAction<MarkerData[]>>) {
    fetch('/data?names=true')
    .then(response => response.json())
    .then(data => {
        setData(data);
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

// export async function IdToStation(id: string): Promise<string> {
//     if (id === "") return "";
//     fetch('/station?id=' + id)
//     .then(response => response.json()) // Parse the JSON response body
//     .then(data => {
//         return data;
//     })

//     return "////";
// }
