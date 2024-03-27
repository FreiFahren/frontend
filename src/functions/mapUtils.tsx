import L from 'leaflet';

export const createLocationMarkerHTML = () => {
    return `<div
                aria-label="location marker"
                style="
                    background-color:black;
                    width:25px;
                    height:25px;
                    border-radius:50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                    outline: 2px solid white;
                "></div>`;
    };

export const OpacityMarkerIcon = (opacity: number, currentThemeLayer: string) => {
    const icon = L.divIcon({
        className: 'inspector-markers',
        html: `<div 
                class="inspector-marker"
                aria-label="inspector marker"
                style="
                    ${(currentThemeLayer === 'Light') ? `background-color:rgba(256,0,0,${opacity});` : `background-color:rgba(175,0,0,${opacity});`}
                    
                    width:25px;
                    height:25px;
                    border-radius:50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, ${opacity});
                    outline: 2px solid white;
                "></div>`,
        iconSize: [25, 25],
    });

    return icon;
};

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
	const R = 6371; // Radius of the earth in km
	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lon2 - lon1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c; // Distance in km
	return distance;
}

function deg2rad(deg: number) {
	return deg * (Math.PI / 180);
}

