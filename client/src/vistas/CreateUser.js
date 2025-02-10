import React, { useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';

const CreateUser = ({ onUserCreated }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'user',
  });

  const [emailExists, setEmailExists] = useState(false);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // Verificar si el correo electrónico ya existe
    if (name === 'email' && value) {
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/checkEmailExists/${value}`);
        setEmailExists(response.data.exists);
      } catch (error) {
        console.error('Error al verificar el correo electrónico:', error);
      }
    }
  };

  const createUser = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/usuarios/register', user);
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
        <form onSubmit={(e) => { e.preventDefault(); createUser(); }}>
          <h3 className="mb-4 text-center">Formulario de Usuario</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={user.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            {emailExists && <div className="alert alert-danger">El correo electrónico ya existe.</div>}
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select
              name="role"
              className="form-control"
              value={user.role}
              onChange={handleChange}
              required
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3" disabled={emailExists}>
            Crear Usuario
          </button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default CreateUser;