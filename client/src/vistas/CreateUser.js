import React, { useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';

const CreateUser = ({ onUserCreated }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios', user);
      if (response.status === 201) {
        alert('Usuario creado exitosamente');
        setUser({
          email: '',
          password: '',
          role: 'user',
        });
        if (onUserCreated) {
          onUserCreated();
        }
      }
    } catch (error) {
      alert('Error al crear el usuario');
    }
  };

  return (
    <div className="user-list-container" style={{ width: '1100px', margin: '0 auto' }}>
      <BackgroundCard className="user-list-card">
        <form>
          <h3 className="mb-4 text-center">Formulario de Usuario</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select
              name="role"
              className="form-control"
              value={user.role}
              onChange={handleChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary mt-3" onClick={createUser}>
            Crear Usuario
          </button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default CreateUser;