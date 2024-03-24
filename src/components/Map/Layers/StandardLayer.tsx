import { TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

const StandardLayer = () => {
  const map = useMap();

  useEffect(() => {
    map.setMaxZoom(15);
    map.setMinZoom(12);
    L.tileLayer(`${process.env.PUBLIC_URL}/tiles/{z}/{x}/{y}.png`, {
    }).addTo(map);
  }, []); // Empty dependency array means this effect runs once on mount

  return(<TileLayer url={`${process.env.PUBLIC_URL}/tiles/{z}/{x}/{y}.png`} />);
};

export default StandardLayer;