import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createUser = async () => {
    try {
      const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
      const response = await axios.post('http://localhost:5000/api/create-user', user, {
        headers: {
          Authorization: token
        }
      });
      console.log('Usuario creado:', response.data);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <div>
      <h2>Crear Usuario</h2>
      <input
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <select name="role" value={user.role} onChange={handleChange}>
        <option value="user">Usuario</option>
        <option value="admin">Administrador</option>
      </select>
      <button onClick={createUser}>Crear Usuario</button>
    </div>
  );
}

export default CreateUser;