import React, { useEffect, useState } from 'react';

import { Marker, Popup } from 'react-leaflet';

export default function Markers() {
    const [data, setData] = useState<any[]>([]); // Add type annotation for data state variable

    useEffect(() => {
        fetch('/data')
            .then(response => response.json())
            .then(data => {
                setData(data);
                 // Print data in the console
            })
            .catch(error => console.error(error));
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
