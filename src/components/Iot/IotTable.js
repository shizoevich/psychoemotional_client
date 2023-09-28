import React, { useState, useEffect } from 'react';

const GetIots = () => {
    const [iots, setIots] = useState([]);

    useEffect(() => {
        const fetchIots = async () => {
            const response = await fetch('http://localhost:8080/api/iots');
            const data = await response.json();
            setIots(data);
        };

        fetchIots();
    }, []);

    return (
        <div>
    <h2>Всі IoT</h2>
    <ul>
        {iots.map((iot) => (
            <li key={iot.id_iot}>
                ID: {iot.id_iot}, ID власника: {iot.id_owner}
            </li>
        ))}
    </ul>
</div>

    );
};

export default GetIots;
