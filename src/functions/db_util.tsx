export function getData(setData: any) {
    fetch('/data')
    .then(response => response.json())
    .then(data => {
        setData(data);
    })
    .catch(error => console.error(error));
}