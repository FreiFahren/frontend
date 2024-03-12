import React, { useEffect, useState } from 'react';

export default function Markers() {
    const [data, setData] = useState<any[]>([]); // Add type annotation for data state variable

    useEffect(() => {
        fetch('http://157.230.118.137:8080/data')
            .then(response => {
                console.log(response);
                return response.json() as Promise<any[]>;
            })
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);
    console.log(data);
    return (
        <div>
            {/* Render the fetched data */}
            {data.map(item => (
                <div key={item.id}>{item.name}</div>
            ))}
            
        </div>
    );
}
