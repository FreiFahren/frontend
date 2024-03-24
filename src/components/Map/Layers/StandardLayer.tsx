import {  LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';

interface StandardLayerProps {
  position: LatLngTuple | null;
}

const StandardLayer = (props: StandardLayerProps) => {
  const { position } = props;

  const maxZoom = 15;
  const minZoom = 12;
  const lightTileUrl = 'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

  const map = useMap();

  useEffect(() => {
    const interval = setInterval(() => {
      if (position) {
        map.setView(position);
      } else {
        map.setView([52.5162, 13.3880]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {

  //   setInterval(() => {

  //     else map.setView([52.5162,13.3880]);
  //   }, 10000);

  // }, []);
  return(<TileLayer url={lightTileUrl} maxZoom={maxZoom} minZoom={minZoom}/>);
};

export default StandardLayer;