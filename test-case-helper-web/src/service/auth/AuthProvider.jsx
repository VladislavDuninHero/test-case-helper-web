import React, { createContext, useContext, useEffect, useState } from 'react'

import { jwtDecode } from 'jwt-decode';
import CookieService from '../cookie/CookieHandlerService';

const AuthContext = createContext();


const AuthProvider = ({children}) => {

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = CookieService.getCookie("token");

        if (token) {
            const decoded = jwtDecode(token);
            setUserData(decoded);
        }
    }, [])

    const login = (token) => {
        CookieService.setTokenCookie(token);
        const decoded = jwtDecode(token);
        setUserData(decoded);
    }

    const hasPermission = (requiredPermission) => {
        if (!userData?.authorities) return false;
        
        return userData.authorities.includes(requiredPermission);
    }

    return (
        <AuthContext.Provider value={{userData, setUserData, login, hasPermission}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);