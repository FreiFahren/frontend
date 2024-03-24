import L, { Control, LatLngTuple, LeafletEvent } from 'leaflet';
import { useEffect } from 'react';
import { TileLayer, useMap } from 'react-leaflet';
import { berlinViewPosition } from '../Map';

interface StandardLayerProps {
	position: LatLngTuple | null;
}

export const removeDarkMode = (id: string) => {
	const element = document.getElementsByClassName(id);
	if (element) {
	  element.item(0)?.classList.remove('dark-mode');
	}
  }

const StandardLayer = (props: StandardLayerProps) => {
	const { position } = props;

	const maxZoom = 16;
	const minZoom = 11;
	const lightTileUrl =
		'https://tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

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
			url={lightTileUrl}
			maxZoom={maxZoom}
			minZoom={minZoom}
			eventHandlers={{
				add: (event: LeafletEvent) => {
					removeDarkMode('report-button');
					removeDarkMode('leaflet-control-layers-toggle');
					removeDarkMode('leaflet-control-layers');
					removeDarkMode('util-button')
					removeDarkMode('report-form.report-form.container.open');

				},
			}}
		/>
	);
};

export default StandardLayer;
