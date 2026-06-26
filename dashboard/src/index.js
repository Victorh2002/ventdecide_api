import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from "react-router";
import './index.css';
import App from './pages/App';
import Usuarios from './pages/Usuarios';
import Casos from './pages/Casos';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

export const routes = [
    { path: "/", name: "Home", element: App, protected: false },
    { path: "/usuarios", name: "Usuarios", element: Usuarios, protected: true },
    { path: "/casos", name: "Casos", element: Casos, protected: true }
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <HashRouter>
                <Routes>
                    {routes.map((route) => (
                        <Route 
                            key={route.path}
                            path={route.path}
                            element={route.protected ? <ProtectedRoute Element={route.element} /> : <route.element />}
                        />
                    ))}
                </Routes>
            </HashRouter>
        </AuthProvider>
    </React.StrictMode>
);
