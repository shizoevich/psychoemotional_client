import React, { useState, useEffect , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import UpdateIotModal from './Iot/UpdateIot';
import AddIotModal from './Iot/AddIot';
import OwnersTable from './Owner/OwnersTable';

import { UserIdContext } from './UserIdContext';

const AdminPanel = () => {
    const [iots, setIots] = useState([]);
    const role = localStorage.getItem('role');
    const { userId, setUserId } = useContext(UserIdContext);
    const navigate = useNavigate();
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [selectedIot, setSelectedIot] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);


    useEffect(() => {
        fetch('http://localhost:8080/api/iots', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(data => {
            setIots(data);
        })
        .catch(error => {
            console.error('Помилка отримання статусу робітників:', error);
        });
    }, []);
    

    const handleEdit = (iot) => {
        setSelectedIot(iot);
        setIsUpdateModalOpen(true);
    };

    const handleClose = () => {
        setIsUpdateModalOpen(false);
    };
    

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/iot/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });
    
            if (response.ok) {
                console.log('IoT успішно видалено');
                // Опціонально, оновити список iots, зробивши новий запит GET
            } else {
                console.error('Помилка видалення IoT:', await response.json());
            }
        } catch (error) {
            console.error('Помилка видалення IoT:', error);
        }
    };
    

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };
    

    if (role !== 'admin') {
        return <div>Доступ заборонено</div>
    }

    return (
        <div>
            <h2>Панель адміністратора</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ID власника</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {iots.map(iot => (
                        <tr key={iot.id_iot}>
                            <td>{iot.id_iot}</td>
                            <td>{iot.id_owner}</td>
                            <td>
                                <button onClick={() => handleEdit(iot)}>Редагувати</button>
                                <button onClick={() => handleDelete(iot.id_iot)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAdd}>Додати IoT</button>
            {isUpdateModalOpen && (
                <UpdateIotModal
                    isOpen={isUpdateModalOpen}
                    onClose={handleClose}
                    token={localStorage.getItem('token')}
                    userId={userId}  // Передайте userId, якщо це необхідно
                />
            )}
            {isAddModalOpen && (
            <AddIotModal
                isOpen={isAddModalOpen}
                onClose={handleClose}
                token={localStorage.getItem('token')}
                userId={userId}  // Передайте userId, якщо це необхідно
            />)}
             <OwnersTable />
        </div>
    );
    
    
}    

export default AdminPanel;

