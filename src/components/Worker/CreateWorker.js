import React, { useState, useContext } from 'react';
import { UserIdContext } from '../UserIdContext';

export const CreateWorker = ({ onClose, onCancel }) => {
    const { userId } = useContext(UserIdContext);
    const [name_worker, setNameWorker] = useState('');
    const [mail_worker, setMailWorker] = useState('');
    const [usually_sleep_start_time, setUsuallySleepStartTime] = useState('');
    const [usually_sleep_end_time, setUsuallySleepEndTime] = useState('');
    const [usually_peak_productivity_time, setUsuallyPeakProductivityTime] = useState('');
    const [usually_lowest_productivity_time, setUsuallyLowestProductivityTime] = useState('');
    const [message] = useState('');
    const [isCreated, setIsCreated] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/worker', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
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
        setIsCreated(true);
    };
        
    if (isCreated) {
        return (
            <div>
                <h2>Робітника успішно створено!</h2>
                <button onClick={onCancel}>OK</button>
            </div>
        );
    }
    
    return (
        <div>
            <h2>Створити робітника</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Ім'я</label>
                    <input type="text" value={name_worker} onChange={(e) => setNameWorker(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
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
                <button type="submit">Створити</button>
                <button onClick={onClose}>Скасувати</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
    
 
    } 

export default CreateWorker;
