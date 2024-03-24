import { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';

interface StandardLayerProps {
  position: LatLngTuple | null;
}

const DarkLayer = (props: StandardLayerProps) => {
  const { position } = props;

  const setMaxZoom = 15;
  const setMinZoom = 12;

  const darkTileUrl = 'https://tile.jawg.io/0174bc61-dd8b-4006-8b13-5181748e314f/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

  const map = useMap();


  useEffect(() => {
    const interval = setInterval(() => {
      if (position) {
        map.setView(position);
      } else {
        console.log(position)
        map.setView([52.5162, 13.3880]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [position, map]);

  return(
    <TileLayer url={darkTileUrl} maxZoom={setMaxZoom} minZoom={setMinZoom}/>
  );

};

export default DarkLayer;