import { LatLngTuple, LeafletEvent } from 'leaflet';
import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { berlinViewPosition } from '../Map';

interface StandardLayerProps {
	position: LatLngTuple | null;
}
export const setDarkMode = (id: string) => {
  const element = document.getElementsByClassName(id);
  if (element) {
    element.item(0)?.classList.add('dark-mode');
    console.log(element, 'dark-mode')
	
  }
}

const DarkLayer = (props: StandardLayerProps) => {
	const { position } = props;

	const setMaxZoom = 16;
	const setMinZoom = 11;

	const darkTileUrl =
		'https://tile.jawg.io/0174bc61-dd8b-4006-8b13-5181748e314f/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

	const map = useMap();
	
	useEffect(() => {
		const interval = setInterval(() => {
			if (position) {
				map.setView(position);
			} else {
				map.setView(berlinViewPosition);
			}
		}, 10 * 1000);

		return () => clearInterval(interval);
	}, [position, map]);

	return (
		<TileLayer
			url={darkTileUrl}
			maxZoom={setMaxZoom}
			minZoom={setMinZoom}
     		 eventHandlers={{
				add: (event: LeafletEvent) => {
					
				},
			}}
		/>
	);
};

export default DarkLayer;
