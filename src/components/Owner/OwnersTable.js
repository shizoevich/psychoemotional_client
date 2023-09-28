import React, { useState, useEffect } from 'react';
import UpdateOwnerModal from '../Owner/UpdateOwnerAdmin';
import AddOwnerModal from '../Owner/AddOwnerModal';

const OwnersTable = () => {
    const [owners, setOwners] = useState([]);
    const [message, setMessage] = useState(null);
    const [selectedOwnerId, setSelectedOwnerId] = useState(null);
    const [selectedOwnerRole, setSelectedOwnerRole] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    useEffect(() => {
        fetchOwners();
    }, []);

    const fetchOwners = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/owners', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token'),
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOwners(data);
            } else {
                console.error('Помилка при отриманні власників:', await response.json());
            }
        } catch (error) {
            console.error('Помилка при отриманні власників:', error);
        }
    };

    const handleAdd = (newOwner) => {
        setOwners((prevOwners) => [...prevOwners, newOwner]);
    };

    const handleEdit = (id, role) => {
        setSelectedOwnerId(id);
        setSelectedOwnerRole(role);
        setIsUpdateModalOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/owner/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setMessage('Власника успішно видалено');
                fetchOwners();
            } else {
                console.error('Помилка при видаленні власника:', await response.json());
            }
        } catch (error) {
            console.error('Помилка при видаленні власника:', error);
        }
    };

    return (
        <div>
            <h2>Власники</h2>
            {message && <p>{message}</p>}
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Ім'я</th>
                        <th>Електронна пошта</th>
                        <th>Роль</th>
                        <th>Дії</th>
                    </tr>
                </thead>
                <tbody>
                    {owners.map((owner) => (
                        <tr key={owner.id_owner}>
                            <td>{owner.id_owner}</td>
                            <td>{owner.name_owner}</td>
                            <td>{owner.mail_owner}</td>
                            <td>{owner.role}</td>
                            <td>
                                <button onClick={() => handleEdit(owner.id_owner, owner.role)}>Редагувати</button>
                                <button onClick={() => handleDelete(owner.id_owner)}>Видалити</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => setIsAddModalOpen(true)}>Додати власника</button>
            {isUpdateModalOpen && (
                <UpdateOwnerModal
                    isOpen={isUpdateModalOpen}
                    onClose={() => setIsUpdateModalOpen(false)}
                    ownerId={selectedOwnerId}
                    role={selectedOwnerRole}
                    token={localStorage.getItem('token')}
                />
            )}
            {isAddModalOpen && (
                <AddOwnerModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onAdd={handleAdd}
                    token={localStorage.getItem('token')}
                />
            )}
        </div>
    );
};

export default OwnersTable;
