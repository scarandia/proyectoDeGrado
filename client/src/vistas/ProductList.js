import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';
import '../styles/Lists.css'; // Reutilizando o adaptando el CSS existente

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Petición a la API para obtener la lista de productos
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <BackgroundCard>
      <div>
        <h1>Lista de Productos</h1>
        {products.length === 0 ? (
          <p>No hay productos disponibles</p>
        ) : (
          <div className="information-list">
            {products.map((product) => (
              <div className="information-card" key={product.idProducto}>
                <h3>{product.nombreProducto}</h3>
                <p><strong>Categoría:</strong> {product.categoria || 'Sin categoría'}</p>
                <p><strong>Descripción:</strong> {product.descripcion || 'Sin descripción'}</p>
                <p><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Proveedor:</strong> {product.proveedor?.nombre || 'No especificado'}</p>
                <p><strong>Estado:</strong> {product.activo ? 'Activo' : 'Inactivo'}</p>
                {product.imagenURL && (
                  <p><strong>Imagen:</strong> <a href={product.imagenURL} target="_blank" rel="noopener noreferrer">Ver Imagen</a></p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </BackgroundCard>
  );
};

export default ProductList;
