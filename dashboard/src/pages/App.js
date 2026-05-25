import { useNavigate } from "react-router";
import { useContext, useState } from "react";
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
