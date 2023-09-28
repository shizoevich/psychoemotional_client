import React, { useState, useContext } from 'react';
import { UserIdContext } from '../UserIdContext';

const SuitableWorkersComponent = () => {
    const [suitableWorkers, setSuitableWorkers] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const { userId } = useContext(UserIdContext);
    const token = localStorage.getItem('token');

    const fetchSuitableWorkers = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/owner/${userId}/suitable-workers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ 
                    startTime: startTime.split('T')[1], // Отримайте лише час
                    endTime: endTime.split('T')[1] // Отримайте лише час
                })
            });

            if (response.ok) {
                const workers = await response.json();
                setSuitableWorkers(workers);
            } else {
                console.error('Error fetching suitable workers');
            }
        } catch (error) {
            console.error('Error fetching suitable workers:', error);
        }
    };

   

    return (
        <div>
    <h2>Підходящі Робітники</h2>
    <label>Час початку: </label>
    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
    <br />
    <label>Час закінчення: </label>
    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
    <br />
    <button onClick={fetchSuitableWorkers}>Отримати підходящих робітників</button>
    <table>
        <thead>
            <tr>
                <th>Ім'я</th>
                <th>Рейтинг</th>
                <th>Останній коментар</th>
            </tr>
        </thead>
        <tbody>
            {suitableWorkers.map((worker) => (
                <tr key={worker.id_worker}>
                    <td>{worker.name}</td>
                    <td>{worker.rating}</td>
                    <td>{worker.last_comment}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

    );
};

export default SuitableWorkersComponent;
