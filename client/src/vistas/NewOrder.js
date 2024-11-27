import React, { useState, useEffect } from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const NewOrderPage = () => {
    const [pedido, setPedido] = useState({
        idPedido: '',
        cliente: '',
        productos: [{ producto: '', cantidad: 1 }],
        fecha_creado: '',
        fecha_entrega: '',
        direccion_entrega: {
            calle: '',
            ciudad: '',
            codigo_postal: '',
            pais: '',
        },
        estado: 'Pendiente',
        precio_total: 0,
        notas: '',
    });

    const [clientes, setClientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Llamada a la API para obtener los clientes que coincidan con el término de búsqueda
    useEffect(() => {
        if (searchTerm.length > 2) {
            fetch(`http://localhost:5000/api/clientes/buscar?nombre=${searchTerm}`)
                .then((res) => res.json())
                .then((data) => setClientes(data))
                .catch((error) => console.error("Error al obtener clientes:", error));
        } else {
            setClientes([]); // Si no hay búsqueda, vaciar resultados
        }
    }, [searchTerm]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPedido({ ...pedido, [name]: value });
    };

    const handleDireccionChange = (e) => {
        const { name, value } = e.target;
        setPedido({
            ...pedido,
            direccion_entrega: {
                ...pedido.direccion_entrega,
                [name]: value,
            },
        });
    };

    const handleProductoChange = (index, field, value) => {
        const newProductos = [...pedido.productos];
        newProductos[index][field] = value;
        setPedido({ ...pedido, productos: newProductos });
    };

    const addProducto = () => {
        setPedido({
            ...pedido,
            productos: [...pedido.productos, { producto: '', cantidad: 1 }],
        });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleClienteSelect = (clienteId) => {
        setPedido({ ...pedido, cliente: clienteId });
        setClientes([]); // Limpiar la lista de clientes después de seleccionar
    };

    return (
        <BackgroundCard>
            <div className="container">
                <form>
                    {/* ID y Cliente */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="idPedido">ID del Pedido</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="idPedido"
                                    name="idPedido"
                                    placeholder="ID del pedido"
                                    value={pedido.idPedido}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="cliente">Cliente</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cliente"
                                    name="cliente"
                                    placeholder="Buscar cliente por nombre"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                                <div className="list-group mt-2">
                                    {clientes.length > 0 && searchTerm && (
                                        clientes.map((cliente) => (
                                            <button
                                                key={cliente._id}
                                                type="button"
                                                className="list-group-item list-group-item-action"
                                                onClick={() => handleClienteSelect(cliente._id)}
                                            >
                                                {cliente.nombreCliente}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="form-group">
                        <label>Productos</label>
                        {pedido.productos.map((producto, index) => (
                            <div className="row mb-2" key={index}>
                                <div className="col-md-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ID del producto"
                                        value={producto.producto}
                                        onChange={(e) =>
                                            handleProductoChange(index, 'producto', e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Cantidad"
                                        value={producto.cantidad}
                                        onChange={(e) =>
                                            handleProductoChange(index, 'cantidad', e.target.value)
                                        }
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addProducto}
                        >
                            Añadir Producto
                        </button>
                    </div>

                    {/* Fechas */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="fecha_creado">Fecha de Creación</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fecha_creado"
                                    name="fecha_creado"
                                    value={pedido.fecha_creado}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="fecha_entrega">Fecha de Entrega</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fecha_entrega"
                                    name="fecha_entrega"
                                    value={pedido.fecha_entrega}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="form-group">
                        <label>Dirección de Entrega</label>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="calle"
                                    placeholder="Calle"
                                    value={pedido.direccion_entrega.calle}
                                    onChange={handleDireccionChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="ciudad"
                                    placeholder="Ciudad"
                                    value={pedido.direccion_entrega.ciudad}
                                    onChange={handleDireccionChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="codigo_postal"
                                    placeholder="Código Postal"
                                    value={pedido.direccion_entrega.codigo_postal}
                                    onChange={handleDireccionChange}
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="pais"
                                    placeholder="País"
                                    value={pedido.direccion_entrega.pais}
                                    onChange={handleDireccionChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Estado y Notas */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="estado">Estado</label>
                                <select
                                    className="form-control"
                                    id="estado"
                                    name="estado"
                                    value={pedido.estado}
                                    onChange={handleChange}
                                    required
                                >
                                    <option>Pendiente</option>
                                    <option>Enviado</option>
                                    <option>Entregado</option>
                                    <option>Cancelado</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="notas">Notas</label>
                                <textarea
                                    className="form-control"
                                    id="notas"
                                    name="notas"
                                    placeholder="Notas adicionales"
                                    value={pedido.notas}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">
                        Guardar Pedido
                    </button>
                </form>
            </div>
        </BackgroundCard>
    );
};

export default NewOrderPage;