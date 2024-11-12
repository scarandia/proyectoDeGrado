import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container mt-5">
      <h2 className="mb-4">Crear Usuario</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="role">Rol</label>
        <select
          className="form-control"
          id="role"
          name="role"
          value={user.role}
          onChange={handleChange}
        >
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>
      <button className="btn btn-primary mt-3" onClick={createUser}>
        Crear Usuario
      </button>
    </div>
  );
}

export default CreateUser;
