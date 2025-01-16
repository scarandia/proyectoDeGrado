import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import BackgroundCard from '../componentes/BackgroundCard';
import DetailView from './DetailView';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Lists.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categorias');
        setCategories(response.data);
      } catch (err) {
        setError('Error al cargar las categorías');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  const handleRowClick = (productId) => {
    setSelectedProductId(productId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductId(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === '' || (product.categoria && product.categoria._id === selectedCategory)) &&
      (product.nombreProducto.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const productFields = [
    { key: 'nombreProducto', label: 'Nombre del Producto' },
    { key: 'categoria.nombreCategoria', label: 'Categoría' },
    { key: 'precio', label: 'Precio' },
    { key: 'stock', label: 'Stock' },
    { key: 'descripcion', label: 'Descripción' },
  ];

  return (
    <div className="product-list-container" style={{ width: '1900px', margin: '0 auto' }}>
      <BackgroundCard className="product-list-card">
        <div>
          <h1>Lista de Productos</h1>
          <Form>
            <Form.Group controlId="search">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label>Categoría</Form.Label>
              <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.nombreCategoria}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
          {filteredProducts.length === 0 ? (
            <p style={{ width: '600px', margin: '0 auto', textAlign: 'center' }}>No se encontró ningun producto relacionado a la búsqueda</p>
          ) : (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Nombre del Producto</th>
                  <th scope="col">Categoría</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product._id} onClick={() => handleRowClick(product._id)} style={{ cursor: 'pointer' }}>
                    <td style={{ padding: '15px' }}>{product.nombreProducto}</td>
                    <td style={{ padding: '15px' }}>{product.categoria ? product.categoria.nombreCategoria : 'Sin categoría'}</td>
                    <td style={{ padding: '15px' }}>${product.precio.toFixed(2)}</td>
                    <td style={{ padding: '15px' }}>{product.stock}</td>
                    <td style={{ padding: '15px' }}>{product.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Detalle del Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProductId && (
              <DetailView
                entityType="Producto"
                apiEndpoint="http://localhost:5000/api/productos"
                fields={productFields}
                id={selectedProductId}
              />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </BackgroundCard>
    </div>
  );
};

export default ProductList;