import React, { useEffect } from 'react';

import { LatLngTuple, LeafletEvent } from 'leaflet';
import { TileLayer, useMap } from 'react-leaflet';

import { berlinViewPosition } from '../Map';

interface StandardLayerProps {
	position: LatLngTuple | null;
}

export const darkModeIds = ['report-button', 'toggle-layer-button', 'util-button', 'util-modal', 'container', 'open', 'util-modal-block']

export const setDarkMode = (ids: string[]) => {
	for (const id of ids) {
		const element = document.getElementsByClassName(id);
		if (element) {
			element.item(0)?.classList.add('dark-mode');
			console.log(element, 'dark-mode', 'class', id);
		}
	}
};

const DarkLayer = (props: StandardLayerProps) => {
	const { position } = props;

	const setMaxZoom = 16;
	const setMinZoom = 11;

	const darkTileUrl =
		'https://tile.jawg.io/ee6306f0-9ef8-45ed-b207-72ce2bb9d897/{z}/{x}/{y}{r}.png?access-token=FFEQAFoSuGPsfDwcON88gVkX5vZQkR0VNRMkfAOBYE7hrX9c7beONi36E5BNYPHo';

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
