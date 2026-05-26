import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from "../contexts/AuthContext";
import './App.css';
//import axios from 'axios';

const App = () => {
    let navigate = useNavigate();
    const { login } = useContext( AuthContext );

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async () => {
        if (email === '' || senha === '') {
            alert("Login Vazio!");
        } else {
            const response = await login(email, senha);
            if (response) {
                localStorage.setItem('token', response);
            }
            navigate("/usuarios");
        }
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken);
                // Verifica se o token não expirou
                if (decodedToken.exp * 1000 > Date.now()) {
                    const lastPage = localStorage.getItem('lastPage') || '/usuarios';
                    navigate(lastPage);
                }
            } catch (error) {
                console.log('Token inválido:', error);
                localStorage.removeItem('token');
            }
        }
    }, []);

    return (
        <div>
            <h1>Dashboard VentDecide</h1>
            <input type="text" value={email} onChange={event => setEmail(event.target.value)} placeholder="Email"/>
            <br />
            <input type="password" value={senha} onChange={event => setSenha(event.target.value)} placeholder="Senha"/>
            <br />
            <button onClick={() => handleLogin()}>Login</button>
        </div>
    );
}

export default App;
