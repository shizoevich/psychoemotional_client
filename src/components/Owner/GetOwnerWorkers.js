import React, { useState, useEffect, useContext  } from 'react';
import CreateWorker from '../Worker/CreateWorker';
import UpdateWorker from '../Worker/UpdateWorker';
import DeleteWorker from '../Worker/DeleteWorker'; 
import { UserIdContext } from '../UserIdContext';


const OwnerWorkers = () => {
    const { userId } = useContext(UserIdContext);
    const [workers, setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [action, setAction] = useState(null);

    useEffect(() => {
        const fetchOwnerWorkers = async () => {
            const token = localStorage.getItem('token');
            console.log("ownerId from useContext:", userId);
            try {
                const response = await fetch(`http://localhost:8080/api/owner/${userId}/workers`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                const data = await response.json();
                console.log("Data from API:", data);
                if (!Array.isArray(data)) {
                    console.error('Data is not an array:', data);
                    return;
                }
                setWorkers(data);
            } catch (error) {
                console.error('Error getting owner workers:', error);
            }
        };
        fetchOwnerWorkers();
    }, [userId]);

    const handleEdit = (worker) => {
        setSelectedWorker(worker);
        setAction('update');
    };

    
    const handleDelete = (worker) => {
        setSelectedWorker(worker);
        setAction('delete');
    };
    const handleDeleteConfirmation = (id) => {
        setSelectedWorker(workers.find(worker => worker.id_worker === id));
        setAction('delete');
    };

    const handleAdd = () => {
        setSelectedWorker(null);
        setAction('create');
    };

    const handleClose = () => {
        setSelectedWorker(null);
        setAction(null);
    };


    return (
        <div>
            <h2>Робітники власника</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Email</th>
                        <th>Початок сну</th>
                        <th>Кінець сну</th>
                        <th>Пік продуктивності</th>
                        <th>Найнижча продуктивність</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {workers.map(worker => (
                        <tr key={worker.id_worker}>
                            <td>{worker.id_worker}</td>
                            <td>{worker.name_worker}</td>
                            <td>{worker.mail_worker}</td>
                            <td>{worker.usually_sleep_start_time}</td>
                            <td>{worker.usually_sleep_end_time}</td>
                            <td>{worker.usually_peak_productivity_time}</td>
                            <td>{worker.usually_lowest_productivity_time}</td>
                            <td>
                                <button onClick={() => handleEdit(worker)}>Редагувати</button>
                                <button onClick={() => handleDelete(worker)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAdd}>Додати робітника</button>
            {action === 'create' && <CreateWorker ownerId={userId} onClose={handleClose} />}
            {action === 'update' && <UpdateWorker ownerId={userId} workerId={selectedWorker.id_worker} onClose={handleClose} token={localStorage.getItem('token')} />}
            {action === 'delete' && (
                <DeleteWorker
                    workerId={selectedWorker.id_worker} 
                    token={localStorage.getItem('token')}
                    ownerId={userId}
                    worker={selectedWorker}
                    onDelete={handleDeleteConfirmation}
                    onClose={handleClose}
                />
            )}
        </div>
    );
};

export default OwnerWorkers;