import React, { useState } from 'react';
import OwnerWorkers from './Owner/GetOwnerWorkers';
import UpdateOwner from './Owner/UpdateOwner';
import SuitableWorkersComponent from './Owner/GetSuitableWorkers';
import WorkersStatusComponent from './Owner/WorkersStatus';
import AdminPanelButton from './AdminPanelButton';

const Home = ({ ownerId, token }) => {
    const [isUpdateOwnerVisible, setUpdateOwnerVisible] = useState(false);
    const role = localStorage.getItem('role');
    const handleUpdateOwner = () => {
        setUpdateOwnerVisible(true);
    };

    const handleClose = () => {
        setUpdateOwnerVisible(false);
    };

    return (
        <div>
            <h2>Головна</h2>
            <OwnerWorkers />
            <button onClick={handleUpdateOwner}>Оновити інформацію власника</button>
            {isUpdateOwnerVisible && <UpdateOwner onClose={handleClose} />}
            <SuitableWorkersComponent ownerId={ownerId} token={token} />
            <WorkersStatusComponent ownerId={ownerId} token={token} />
            <AdminPanelButton role={role} token={token}/>
        </div>
    );
};

export default Home;


