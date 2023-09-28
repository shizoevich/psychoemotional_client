import React, { useState, createContext } from 'react';

const UserIdContext = createContext();

const UserIdProvider = (props) => {
    const [userId, setUserId] = useState(null);

    return (
        <UserIdContext.Provider value={{ userId, setUserId }}>
            {props.children}
        </UserIdContext.Provider>
    );
}

export { UserIdContext, UserIdProvider };
