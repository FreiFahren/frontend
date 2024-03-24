import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const StandardLayer = () => {
  const map = useMap();

  useEffect(() => {
    map.setMaxZoom(15);
    map.setMinZoom(12);
    L.tileLayer(`${process.env.PUBLIC_URL}/tiles/{z}/{x}/{y}.png`, {
      keepBuffer: 4, // Specify the number of additional tile rows and columns to load outside the view
    }).addTo(map);
  }, []); // Empty dependency array means this effect runs once on mount

  return null;
};

export default StandardLayer;