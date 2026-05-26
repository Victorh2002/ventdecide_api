import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

export const AuthContext = createContext();

const API_URL = 'https://electric-amoeba-light.ngrok-free.app/api/user';

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    const setAuthHeader = (token) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                // Verifica se o token não expirou
                if (decodedToken.exp * 1000 > Date.now()) {
                    setToken(storedToken);
                    setAuthHeader(storedToken);
                }
            } catch (error) {
                console.log('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    const login = async ( email, password ) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password, admin: 1 });
            setToken(response.data.token);
            setAuthHeader(response.data.token);
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
        <AuthContext.Provider value={{ token, setAuthHeader, setToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
