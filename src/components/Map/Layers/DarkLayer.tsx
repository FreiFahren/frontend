import React, { useEffect } from 'react';

import { LatLngTuple, LeafletEvent } from 'leaflet';
import { TileLayer, useMap } from 'react-leaflet';

import { berlinViewPosition } from '../Map';
import { darkModeIds, setDarkMode } from '../LayerButton/LayerButton';

interface StandardLayerProps {
	position: LatLngTuple | null;
}

const DarkLayer = (props: StandardLayerProps) => {
	const { position } = props;

	const setMaxZoom = 16;
	const setMinZoom = 11;

	const darkTileUrl =
		'https://tile.jawg.io/f3354f40-2334-41b6-a537-c72decb830b2/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

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
					setDarkMode(darkModeIds);
				},
			}}
		/>
	);
};

export default DarkLayer;
