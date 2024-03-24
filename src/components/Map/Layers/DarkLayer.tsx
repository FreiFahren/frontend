import { TileLayer } from 'react-leaflet';

const DarkLayer = () => {

  const setMaxZoom = 15;
  const setMinZoom = 12;

  const darkTileUrl = 'https://tile.jawg.io/0174bc61-dd8b-4006-8b13-5181748e314f/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

  return(
    <TileLayer url={darkTileUrl} maxZoom={setMaxZoom} minZoom={setMinZoom}/>
  );

};

export default DarkLayer;