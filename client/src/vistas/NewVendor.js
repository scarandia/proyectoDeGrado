import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendedorList = () => {
  const [vendedores, setVendedores] = useState([]);
  const [formData, setFormData] = useState({
    idVendedor: '',
    nombre: '',
    apellido: '',
    ciVendedor: '',
    telefono: '',
    email: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Obtener todos los vendedores
  useEffect(() => {
    fetchVendedores();
  }, []);

  const fetchVendedores = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/vendedores');
      setVendedores(response.data);
    } catch (error) {
      console.error('Error al obtener los vendedores:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vendedores', {
        idVendedor: formData.idVendedor,
        nombre: formData.nombre,
        apellido: formData.apellido,
        ciVendedor: formData.ciVendedor,
        contacto: {
          telefono: formData.telefono,
          email: formData.email,
        },
      });
      fetchVendedores();
      setFormData({
        idVendedor: '',
        nombre: '',
        apellido: '',
        ciVendedor: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al agregar el vendedor:', error);
    }
  };

  const handleEdit = (vendedor) => {
    setIsEditing(true);
    setEditId(vendedor._id);
    setFormData({
      idVendedor: vendedor.idVendedor,
      nombre: vendedor.nombre,
      apellido: vendedor.apellido,
      ciVendedor: vendedor.ciVendedor,
      telefono: vendedor.contacto.telefono,
      email: vendedor.contacto.email || '',
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/vendedores/${editId}`, {
        idVendedor: formData.idVendedor,
        nombre: formData.nombre,
        apellido: formData.apellido,
        ciVendedor: formData.ciVendedor,
        contacto: {
          telefono: formData.telefono,
          email: formData.email,
        },
      });
      fetchVendedores();
      setIsEditing(false);
      setEditId(null);
      setFormData({
        idVendedor: '',
        nombre: '',
        apellido: '',
        ciVendedor: '',
        telefono: '',
        email: '',
      });
    } catch (error) {
      console.error('Error al actualizar el vendedor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/vendedores/${id}`);
      fetchVendedores();
    } catch (error) {
      console.error('Error al eliminar el vendedor:', error);
    }
  };

  return (
    <div>
      <h1>Gestión de Vendedores</h1>

      <form onSubmit={isEditing ? handleUpdate : handleAdd}>
        <input
          type="text"
          name="idVendedor"
          placeholder="ID Vendedor"
          value={formData.idVendedor}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={formData.apellido}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="ciVendedor"
          placeholder="CI Vendedor"
          value={formData.ciVendedor}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">{isEditing ? 'Actualizar' : 'Agregar'}</button>
        {isEditing && <button onClick={() => setIsEditing(false)}>Cancelar</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CI</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vendedores.map((vendedor) => (
            <tr key={vendedor._id}>
              <td>{vendedor.idVendedor}</td>
              <td>{vendedor.nombre}</td>
              <td>{vendedor.apellido}</td>
              <td>{vendedor.ciVendedor}</td>
              <td>{vendedor.contacto.telefono}</td>
              <td>{vendedor.contacto.email || 'N/A'}</td>
              <td>
                <button onClick={() => handleEdit(vendedor)}>Editar</button>
                <button onClick={() => handleDelete(vendedor._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendedorList;