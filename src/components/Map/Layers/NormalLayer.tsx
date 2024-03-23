import { TileLayer, useMapEvents } from 'react-leaflet';
import { urlTemplate } from '../Map';
import { tileLayer } from 'leaflet';

const NormalLayer = () => {
    const map = useMapEvents({
        click: (e) => {
            console.log('Clicked location:', e.latlng);
        }
    });


    map.setMaxZoom(17);
    map.setMinZoom(11);
    
    const layer = tileLayer(urlTemplate, {
        maxZoom: 17,
        minZoom: 11,

        attribution: '<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors'
    })
    
    return (
        <></>
        // <TileLayer
        // attribution= '<a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        // url={urlTemplate}
        //  />
    )
}

export default NormalLayer;