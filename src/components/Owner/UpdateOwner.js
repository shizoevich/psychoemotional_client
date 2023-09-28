import React, { useState, useEffect } from 'react';

const UpdateOwnerModal = ({ isOpen, onClose, owner, token, userId }) => {
    const [name_owner, setNameOwner] = useState('');
    const [mail_owner, setMailOwner] = useState('');
    const [password_owner, setPasswordOwner] = useState('');
    const [availability_iot, setAvailabilityIot] = useState('');
    const [setRole] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (owner) {
            setNameOwner(owner.name_owner || '');
            setMailOwner(owner.mail_owner || '');
            setPasswordOwner(owner.password_owner || '');
            setAvailabilityIot(owner.availability_iot || '');
            setRole(owner.role || '');
        }
    }, [owner]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/owner/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ 
                    name_owner, 
                    mail_owner, 
                    password_owner, 
                    availability_iot
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Інформацію власника успішно оновлено');
                console.log('Updated owner:', data);
            } else {
                const error = await response.json();
                setErrorMessage(error.message);
                console.error('Error updating owner:', error);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Error updating owner:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Оновити інформацію власника</h2>
                <form onSubmit={handleSubmit}>
                <div>
                    <label>Ім'я</label>
                    <input type="text" value={name_owner} onChange={(e) => setNameOwner(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" value={mail_owner} onChange={(e) => setMailOwner(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={password_owner} onChange={(e) => setPasswordOwner(e.target.value)} />
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
