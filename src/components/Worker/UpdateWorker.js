import React, { useState } from 'react';
import { UserIdContext } from '../UserIdContext';

export const UpdateWorker = ({  workerId, token, onClose, userId }) => {
    const [name_worker, setNameWorker] = useState('');
    const [mail_worker, setMailWorker] = useState('');
    const [usually_sleep_start_time, setUsuallySleepStartTime] = useState('');
    const [usually_sleep_end_time, setUsuallySleepEndTime] = useState('');
    const [usually_peak_productivity_time, setUsuallyPeakProductivityTime] = useState('');
    const [usually_lowest_productivity_time, setUsuallyLowestProductivityTime] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/api/worker/${workerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `${token}` },
            body: JSON.stringify({ 
                name_worker, 
                mail_worker, 
                usually_sleep_start_time, 
                usually_sleep_end_time, 
                usually_peak_productivity_time,
                usually_lowest_productivity_time,
                id_owner: userId
             }),
        });
        
        const data = await response.json();
        console.log(data);
        onClose();
    };

    return (
        <div>
            <h2>Update Worker</h2>
            <form onSubmit={handleSubmit}>
                
                <div>
                    <label>Ім'я</label>
                    <input type="text" value={name_worker} onChange={(e) => setNameWorker(e.target.value)} />
                </div>
                <div>
                    <label>Пошта</label>
                    <input type="email" value={mail_worker} onChange={(e) => setMailWorker(e.target.value)} />
                </div>
                <div>
                    <label>Початок сну</label>
                    <input type="text" value={usually_sleep_start_time} onChange={(e) => setUsuallySleepStartTime(e.target.value)} />
                </div>
                <div>
                    <label>Кінець сну</label>
                    <input type="text" value={usually_sleep_end_time} onChange={(e) => setUsuallySleepEndTime(e.target.value)} />
                </div>
                <div>
                    <label>Пік продуктивності</label>
                    <input type="text" value={usually_peak_productivity_time} onChange={(e) => setUsuallyPeakProductivityTime(e.target.value)} />
                </div>
                <div>
                    <label>Найнижча продуктивність</label>
                    <input type="text" value={usually_lowest_productivity_time} onChange={(e) => setUsuallyLowestProductivityTime(e.target.value)} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default UpdateWorker;
