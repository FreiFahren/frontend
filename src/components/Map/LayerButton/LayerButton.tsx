import React, { useState } from 'react';
import { LayerGroup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import StandardLayer from '../Layers/StandardLayer';
import DarkLayer from '../Layers/DarkLayer';

import './LayerButton.css';

type LayerButtonProps = {
	initialPosition: LatLngTuple | null;
};

const LayerButton = (props: LayerButtonProps) => {
	const { initialPosition } = props;
	const [selectedLayer, setSelectedLayer] = useState('Light');

	const toggleLayer = () => {
		setSelectedLayer(selectedLayer === 'Light' ? 'Dark' : 'Light');
	};

	return (
		<div>
			<button className='toggle-layer-button' onClick={toggleLayer}> {selectedLayer === 'Light' ? <span>☀️</span> : <span>🌑</span>} </button>

			{selectedLayer === 'Light' ? (
				<LayerGroup>
					<StandardLayer position={initialPosition} />
				</LayerGroup>
			) : (
				<LayerGroup>
					<DarkLayer position={initialPosition} />
				</LayerGroup>
			)}
		</div>
	);
};

export default LayerButton;
