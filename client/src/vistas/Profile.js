import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);  // Tipado con `null` inicialmente
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Asegúrate de que el token esté en localStorage

    if (token) {
      axios
        .get('http://localhost:5000/api/usuarios/profile', {
          headers: {
            Authorization: `Bearer ${token}`,  // Enviar el token en el header
          },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error al obtener los datos del perfil:', err.response);  // Para depurar el error
          setError('Error al obtener los datos del perfil');
          setLoading(false);
        });
    } else {
      setError('Token no encontrado');
      setLoading(false);
    }
  }, []);  // El array vacío asegura que solo se ejecute una vez al montar el componente

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      {/* Agrega más datos de perfil según el esquema de usuario */}
    </div>
  );
};

export default ProfilePage;