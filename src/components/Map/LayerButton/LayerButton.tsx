import React, { useContext } from 'react';

import './LayerButton.css';
import { LayerContext } from '../../../pages/App/App';

export const darkModeIds = ['report-button', 'toggle-layer-button', 'util-button', 'util-modal-block-button', 'inspector-marker']

export const setDarkMode = (ids: string[]) => {
	for (const id of ids) {
		const element = document.getElementsByClassName(id);
		if (element) {
			element.item(0)?.classList.add('dark-mode');
			console.log(element, 'dark-mode', 'class', id);
		}
	}

};

export const removeDarkMode = (ids: string[]) => {
	for (const id of ids) {
		const element = document.getElementsByClassName(id);
		if (element) {
			element.item(0)?.classList.remove('dark-mode');
		}
	}

};

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
