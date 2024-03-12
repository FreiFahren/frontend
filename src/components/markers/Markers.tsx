import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';
import { getData } from '../../functions/db_util';

export default function Markers() {
    const [data, setData] = useState<any[]>([]); // Add type annotation for data state variable

    useEffect(() => {
        getData(setData);
    }, []);
    
    
    return(
        <div>
            {data.map((item) => {
                console.log(item);
                return (
                    <Marker position={[item[0],item[1]]}>
                        <Popup>
                            {item[2]}
                        </Popup>
                    </Marker>
                );
            })}
        </div>
    )

}
