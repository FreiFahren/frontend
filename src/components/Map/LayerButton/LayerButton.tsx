import React, { useContext } from 'react';

import './LayerButton.css';
import { LayerContext } from '../../../pages/App/App';

const LayerButton = () => {
    const { currentThemeLayer, setCurrentThemeLayer } = useContext(LayerContext);

	const toggleThemeLayer = () => {
		setCurrentThemeLayer(currentThemeLayer === 'Light' ? 'Dark' : 'Light');
	};

	return (
		<div>
			<button className={(currentThemeLayer === 'Light') ? 'toggle-layer-button' : 'toggle-layer-button dark-mode'  } onClick={toggleThemeLayer}> {currentThemeLayer === 'Light' ? <span>☀️</span> : <span>🌑</span>} </button>
		</div>
	);
};

export default LayerButton;
