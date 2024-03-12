export function getCoordinates(setData: React.Dispatch<React.SetStateAction<Array<[number, number, string]>>>) {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        setData(data);
    })
    .catch(error => console.error(error));
}