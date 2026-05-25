import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'https://electric-amoeba-light.ngrok-free.app/api/user';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [authHeader, setAuthHeader] = useState(null);

    const login = async ( email, password ) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password, admin: 1 });
            setToken( response.data.token);
            return response.data.token;
        } catch (error) {
            alert("Usuário não existe ou usuário não autorizado.");
        }

        return null;
    }

    const logout = () => {
        setToken(null);
        setAuthHeader(null);
    }

    return (
        <AuthContext.Provider value={{ token, authHeader, setAuthHeader, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
