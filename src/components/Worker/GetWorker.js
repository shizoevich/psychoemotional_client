import React, { useState } from 'react';

const GetWorker = () => {
    const [id_worker, setIdWorker] = useState('');
    const [worker, setWorker] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8080/worker/${id_worker}`);
        const data = await response.json();
        setWorker(data);
    };

    return (
        <div>
            <h2>Get Worker</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID Worker</label>
                    <input type="text" value={id_worker} onChange={(e) => setIdWorker(e.target.value)} />
                </div>
                <button type="submit">Get</button>
            </form>
            {worker && <div>
                <h3>Worker Details:</h3>
                <p>Name: {worker.name_worker}</p>
                <p>Email: {worker.mail_worker}</p>
                <p>Usually Sleep Start Time: {worker.usually_sleep_start_time}</p>
                <p>Usually Sleep End Time: {worker.usually_sleep_end_time}</p>
                <p>Usually Peak Productivity Time: {worker.usually_peak_productivity_time}</p>
                <p>Usually Lowest Productivity Time: {worker.usually_lowest_productivity_time}</p>
                <p>Owner ID: {worker.id_owner}</p>
            </div>}
        </div>
    );
};

export default GetWorker;
