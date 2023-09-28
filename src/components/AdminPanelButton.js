import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanelButton = ({ role, token }) => {
    const navigate = useNavigate();

    const handleAdminPanelClick = () => {
        navigate('/admin');
    };

    if (role !== 'admin') {
        return null;
    }

    return (
        <button onClick={handleAdminPanelClick}>
            Адмін панель
        </button>
    );
};

export default AdminPanelButton;



