import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';
import '../styles/Lists.css'; // Reutilizando o adaptando el CSS existente

const VendorList = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición a la API para obtener la lista de vendedores
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vendedores');
        setSellers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los vendedores');
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  if (loading) return <p>Cargando vendedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BackgroundCard>
      <div>
        <h1>Lista de Vendedores</h1>
        {sellers.length === 0 ? (
          <p>No hay vendedores disponibles</p>
        ) : (
          <div className="information-list">
            {sellers.map((seller) => (
              <div className="information-card" key={seller.idVendedor}>
                <h3>{seller.nombre} {seller.apellido}</h3>
                <p><strong>CI:</strong> {seller.ciVendedor}</p>
                <p><strong>Teléfono:</strong> {seller.contacto.telefono}</p>
                {seller.contacto.email && (
                  <p><strong>Email:</strong> {seller.contacto.email}</p>
                )}
                <p><strong>Estado:</strong> {seller.activo ? 'Activo' : 'Inactivo'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </BackgroundCard>
  );
};

export default VendorList;
