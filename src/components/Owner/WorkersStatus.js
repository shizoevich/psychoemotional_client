import React, { useState, useEffect, useContext  } from 'react';
import { UserIdContext } from '../UserIdContext';
 
const WorkersStatusComponent = () => {
    const [workersStatus, setWorkersStatus] = useState([]);
    const { userId, setUserId } = useContext(UserIdContext);
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchWorkersStatus = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/owner/${userId}/workers-status`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });

                if (response.ok) {
                    const statusData = await response.json();
                    setWorkersStatus(statusData);
                } else {
                    console.error('Error fetching workers status');
                }
            } catch (error) {
                console.error('Error fetching workers status:', error);
            }
        };

        fetchWorkersStatus();
    }, [userId, token]);

    return (
        <div>
            <h2>Статус робітників</h2>
            <ul>
                {workersStatus.map((worker) => (
                    <li key={worker.id_worker}>
                        Пошта: {worker.mail_worker}<br />
                        Максимальний рівень стресу: {worker.max_stress_level}<br />
                        Середній рівень якості сну: {worker.avg_sleep_quality}<br />
                        Середній рівень енергії: {worker.avg_energy_level}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WorkersStatusComponent;
