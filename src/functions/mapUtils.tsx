import L, { LatLngTuple } from 'leaflet';

export const createLocationMarkerHTML = () => {
    return `<div
                aria-label="location marker"
                style="
                    background-color:black;
                    width:25px;
                    height:25px;
                    border-radius:50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                "></div>`;
    };

export const OpacityMarkerIcon = (opacity: number) => {
    const icon = L.divIcon({
        className: 'inspector-marker',
        html: `<div 
                aria-label="inspector marker"
                style="
                    background-color:rgba(255,0,0,${opacity});
                    width:25px;
                    height:25px;
                    border-radius:50%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, ${opacity});
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

// this streams the position of the user, meaning we have to split getPosition and watchPosition
export const watchPosition = async (onPositionChanged: (position: LatLngTuple | null) => void): Promise<(() => void)> => {
    const watchId = navigator.geolocation.watchPosition((position) => {
        onPositionChanged([position.coords.latitude, position.coords.longitude]);
    }, () => {
        onPositionChanged(null); // Handle the case where getting position fails
    });
    return () => (navigator.geolocation.clearWatch(watchId));

};