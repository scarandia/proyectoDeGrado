import React, { useState } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';
import axios from 'axios';

const CreateUser = () => {
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

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Ingrese el email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contraseña */}
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Ingrese la contraseña"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Rol */}
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

          <button type="button" className="btn btn-primary mt-3 w-100" onClick={createUser}>
            Crear Usuario
          </button>
        </form>
      </BackgroundCard>
    </div>
  );
};

export default CreateUser;