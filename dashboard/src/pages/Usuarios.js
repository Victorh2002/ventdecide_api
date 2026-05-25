import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './App.css';
import axios from 'axios';

function Usuarios() {
    const [users, setUsers] = useState(null);

    const { logout } = useContext(AuthContext);

    const fetchAllUsers = async () => {
        const response = await axios.get('https://electric-amoeba-light.ngrok-free.app/api/user/todos');

        return response;
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await fetchAllUsers();
            setUsers(response.data);
            console.log(response.data);
        }
        fetch();
    }, []);

    return (
        <div>
            <h1>Lista de Usuários</h1>
            <button onClick={handleLogout}>Logout</button>
            <table className='table'>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Nome</th>
                    <th>Profissão</th>
                    <th>ID de Profissional</th>
                    <th>Instituição</th>
                    <th>Gênero</th>
                </tr>
            {users ? (users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{user.professionalId}</td>
                        <td>{user.institution}</td>
                        <td>{user.gender}</td>
                    </tr>
                ))
            ) : 
                <p>Carregando usuários...</p>
            }
            </table>
        </div>
    );
}

export default Usuarios;
