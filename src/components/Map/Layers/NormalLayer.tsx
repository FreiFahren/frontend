import { TileLayer, useMapEvents } from 'react-leaflet';


import { urlTemplate } from '../Map';

const NormalLayer = () => {
    const map = useMapEvents({

    });

    map.setMaxZoom(17);
    map.setMinZoom(11);

    
    return (
        <TileLayer
        attribution= '<a href=\"https://www.jawg.io?utm_medium=map&utm_source=attribution\" target=\"_blank\">&copy; Jawg</a> - <a href=\"https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg\" target=\"_blank\">&copy; OpenStreetMap</a>&nbsp;contributors'
        url={urlTemplate}
         />
    )
}

export default NormalLayer;