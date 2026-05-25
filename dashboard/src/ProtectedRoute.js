import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigate } from "react-router";
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ Element }) => {
    const { token, authHeader, setAuthHeader, setToken } = useContext(AuthContext);

    const storedToken = localStorage.getItem('token');

    try {
        if (storedToken) {
            const decodedToken = jwtDecode(storedToken);

            if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.removeItem('token'); 
                setToken(null);
                setAuthHeader(null);
            } else {
                setToken(storedToken);
                setAuthHeader(storedToken);
            }
        }   
    } catch (error) {
        console.log(`Erro ao verificar token: ${error}`);
        setToken(null);      
    }

    return(
        <>
            {!token ? <Navigate to="/"/> : <Element />}
        </>
    );
}

export default ProtectedRoute;