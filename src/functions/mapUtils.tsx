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

