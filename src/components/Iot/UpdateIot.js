import React, { useState, useEffect } from 'react';

const UpdateIotModal = ({ isOpen, onClose, iot, token, userId }) => {
    const [id_iot, setIdIot] = useState('');
    const [id_owner, setIdOwner] = useState('');
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [role, setRole] = useState('');

    useEffect(() => {
        if (iot) {
            setIdIot(iot.id_iot || '');
            setIdOwner(iot.id_owner || '');
            setRole(iot.role || '');
        }
    }, [iot]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/iot/${id_iot}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`
                },
                body: JSON.stringify({ 
                    id_iot, 
                    id_owner,
                    role
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('Інформація успішно оновлена');
                console.log('Оновлене IoT:', data);
            } else {
                const error = await response.json();
                setErrorMessage(error.message);
                console.error('Помилка при оновленні IoT:', error);
            }
        } catch (error) {
            setErrorMessage(error.message);
            console.error('Помилка при оновленні IoT:', error);
        }
    };

    return (
        <div className={`modal ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                <h2>Оновити інформацію про IoT</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>ID IoT</label>
                        <input type="text" value={id_iot} onChange={(e) => setIdIot(e.target.value)} />
                    </div>
                    <div>
                        <label>ID власника</label>
                        <input type="text" value={id_owner} onChange={(e) => setIdOwner(e.target.value)} />
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

export default UpdateIotModal;
