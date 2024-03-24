import { useMap } from "react-leaflet"
import L from 'leaflet'

const StandardLayer = () => {
    const map = useMap()
    map.setMaxZoom(15)
    map.setMinZoom(12)
    L.tileLayer(`${process.env.PUBLIC_URL}/tiles/{z}/{x}/{y}.png`, {
        keepBuffer: 4, // Specify the number of additional tile rows and columns to load outside the view
        errorTileUrl: `${process.env.PUBLIC_URL}/tiles/{z}/{x}/{y}.png`, // URL for the low-resolution tile image
    }).addTo(map);

    return null
}

export default StandardLayer