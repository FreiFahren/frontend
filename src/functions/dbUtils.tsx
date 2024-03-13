export function getCoordinates(setData: React.Dispatch<React.SetStateAction<Array<[number, number, string]>>>) {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        setData(data);
    })
    .catch(error => console.error(error));
}

export function reportInspector(line: string, station: string, direction: string): Promise<any> {
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