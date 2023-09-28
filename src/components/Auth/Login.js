import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {UserIdContext} from '../UserIdContext';
import jwt_decode from 'jwt-decode';

const Login = () => {
    const { setUserId } = useContext(UserIdContext);
    const navigate = useNavigate(); 
    const [mailOwner, setMailOwner] = useState('');
    const [passwordOwner, setPasswordOwner] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json', },
            body: JSON.stringify({ mail_owner: mailOwner, password_owner: passwordOwner }),
        });
        const data = await response.json();
        if (data.token) {
            const decoded = jwt_decode(data.token);
            const role = decoded.role;
        
            setUserId(data.id_owner);
            console.log('Login successful', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', role);
            navigate('/home');
        } else {
            console.log('Login failed', data);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Пошта</label>
                    <input type="email" value={mailOwner} onChange={(e) => setMailOwner(e.target.value)} />
                </div>
                <div>
                    <label>Пароль</label>
                    <input type="password" value={passwordOwner} onChange={(e) => setPasswordOwner(e.target.value)} />
                </div>
                <button type="submit">Вхід</button>
            </form>
        </div>
    );
};

export default Login;
