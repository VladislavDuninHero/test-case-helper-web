import React, {createContext, useContext, useState} from 'react';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [teams, setTeams] = useState([]);
    const [login, setLogin] = useState(null);

    return (
        <UserContext.Provider value={{teams, setTeams, setLogin, login}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("Context is not defined");
    }

    return context;
}