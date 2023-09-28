import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserIdContext} from '../UserIdContext';
import jwt_decode from 'jwt-decode';

const Register = () => {
    const { setUserId } = useContext(UserIdContext);
    const navigate = useNavigate();
    const [mailOwner, setMailOwner] = useState('');
    const [passwordOwner, setPasswordOwner] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', },
            body: JSON.stringify({ mail_owner: mailOwner, password_owner: passwordOwner }),
        });
        const data = await response.json();
        if (data.id_owner) {
            const decoded = jwt_decode(data.token);
            const role = decoded.role
            setUserId(data.userId);
            localStorage.setItem('token', data.token);
            console.log('Registration successful', data);
            localStorage.setItem('role', role);
            navigate('/home');
        } else {
            console.log('Registration failed', data);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Пошта</label>
                    <input type="email" value={mailOwner} onChange={(e) => setMailOwner(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={passwordOwner} onChange={(e) => setPasswordOwner(e.target.value)} />
                </div>
                <button type="submit">Регестрація</button>
            </form>
        </div>
    );
};

export default Register;
