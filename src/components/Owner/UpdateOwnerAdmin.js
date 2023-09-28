import React, { useState, useEffect } from 'react';

const UpdateOwnerModal = ({ isOpen, onClose, ownerId, role, token }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updatedRole, setUpdatedRole] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
        setUpdatedRole(role);
    }, [isOpen, role]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/owner/${ownerId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ 
                    name, 
                    email, 
                    password,
                    role: updatedRole,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Інформація про власника успішно оновлена');
                console.log('Оновлений власник:', data);
            } else {
                const error = await response.json();
                setErrorMessage(error.message);
                console.error('Помилка при оновленні власника:', error);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Помилка при оновленні власника:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Оновити інформацію про власника</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Ім'я</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Електронна пошта</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Пароль</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label>Роль</label>
                        <input type="text" value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)} />
                    </div>
                    <button type="submit">Оновити</button>
                    <button onClick={onClose}>Скасувати</button>
                </form>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default UpdateOwnerModal;
