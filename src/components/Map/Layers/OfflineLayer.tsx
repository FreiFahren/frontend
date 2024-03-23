
import TileManager from 'leaflet.offline' ;

import { urlTemplate, urlTemplateDark } from '../Map';
import { useMapEvents } from 'react-leaflet';

const OfflineLayer = () => {
    const map = useMapEvents({
        zoomend: () => {

        }
    })

    
     const layerOffline = TileManager.tileLayerOffline(urlTemplateDark, {
        attribution: '<a href="https://www.jawg.io?utm_medium=map&utm_source=attribution" target="_blank">&copy; Jawg</a> - <a href="https://www.openstreetmap.org?utm_medium=map-attribution&utm_source=jawg" target="_blank">&copy; OpenStreetMap</a>&nbsp;contributors',
        maxZoom: 17,
        minZoom: 11,

    }).addTo(map);



   
    

    layerOffline.on('savestart', (e) => {
        console.log('Save start', e);
    })
   

    
    map.setMaxZoom(17);
    map.setMinZoom(11);

    
    return null
}
export default OfflineLayer;