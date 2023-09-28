import React, { useState } from 'react';
import Register from './Auth/Register';
import Login from './Auth/Login';

const Main = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            {showLogin ? <Login /> : <Register />}
            <button onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? 'Зареєструватися' : 'Вхід'}
            </button>
        </div>
    );
};

export default Main;
