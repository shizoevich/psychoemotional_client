import React, { useState } from 'react';

const AddOwnerModal = ({ isOpen, onClose, onAdd, token }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/owners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ name, email, role }),
            });

            if (response.ok) {
                const data = await response.json();
                onAdd(data);
                onClose();
            } else {
                const error = await response.json();
                setErrorMessage(error.message);
                console.error('Помилка при додаванні власника:', error);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Помилка при додаванні власника:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Додати власника</h2>
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
                        <label>Роль</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">Користувач</option>
                            <option value="admin">Адміністратор</option>
                        </select>
                    </div>
                    <button type="submit">Додати</button>
                    <button onClick={onClose}>Скасувати</button>
                </form>
                {errorMessage && <p>{errorMessage}</p>}
            </div>
        </div>
    );
};

export default AddOwnerModal;
