import React, { useState } from 'react';

const DeleteWorker = ({ workerId, token, worker, onClose }) => {
    const [successMessage, setSuccessMessage] = useState(null);
    const handleDelete = async (e) => {
        try {
            const response = await fetch(`http://localhost:8080/api/worker/${workerId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${token}`
                }
            });
            
            if (!response.ok) {
                setSuccessMessage('Робітник успішно видалений');
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
        onClose();
    };

    return (
        <div>
            <h2>Видалити робітника</h2>
            <p>Ви впевнені, що хочете видалити {worker.name_worker}?</p>
            {successMessage && <p>{successMessage}</p>}
            <button onClick={handleDelete}>Так</button>
            <button onClick={onClose}>Ні</button>
        </div>
    );
};

export default DeleteWorker;

