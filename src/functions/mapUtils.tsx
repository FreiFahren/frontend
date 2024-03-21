import L from 'leaflet';

export const createLocationMarkerHTML = () => {
    return `<div style="
                background-color:black;
                width:20px;
                height:20px;
                border-radius:50%;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
                "></div>`;
    };

export const OpacityMarkerIcon = (opacity: number) => {
    const icon = L.divIcon({
        className: 'custom-icon',
        html: `<div style="background-color:rgba(255,0,0,${opacity});
                            width:20px;
                            height:20px;
                            border-radius:50%;
                            box-shadow: 0 2px 4px rgba(0, 0, 0, ${opacity});"></div>`,
        iconSize: [20, 20],
    });

    return icon;
};

