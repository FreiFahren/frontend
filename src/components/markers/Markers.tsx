import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import { getCoordinates } from '../../functions/dbUtils';

const Markers = () => {
    const [data, setData] = useState<Array<[number, number, string]>>([]);

    useEffect(() => {
        getCoordinates(setData);
    }, []);

    return(
        <div>
            {data.map((coordinates, index) => {
                // coordinates are an array of [latitude, longitude, stationName]
                const stationName = coordinates[2];
                return (
                    <Marker key={`${stationName}-${index}`} position={[coordinates[0],coordinates[1]]}>
                        <Popup>
                            {stationName}
                        </Popup>
                    </Marker>
                );
            })}
        </div>
    )
}

export default Markers;