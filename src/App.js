import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserIdProvider } from './components/UserIdContext';
import AdminPanel from './components/AdminPanel'; 
import Main from './components/Main';
import Home from './components/Home';

const App = () => {
    return (
        <UserIdProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home/*" element={<Home />} />
                    <Route path="/admin" element={<AdminPanel />} />
                </Routes>
            </Router>
        </UserIdProvider>
    );
};

export default App;

