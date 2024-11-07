import React, { useState } from 'react';
import axios from 'axios';

function NewOrderPage() {
    const [order, setOrder] = useState({
        idPedido: '',
        cliente: '',
        productos: [{
            producto: '',
            cantidad: 1
        }],
        fecha_creado: new Date().toISOString().split('T')[0],
        fecha_entrega: '',
        distribuidorAsignado: '',
        direccion_entrega: {
            calle: '',
            ciudad: '',
            codigo_postal: '',
            pais: ''
        },
        estado: 'Pendiente',
        notas: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('producto') || name.startsWith('cantidad')) {
            const index = parseInt(name.split('-')[1], 10);
            const key = name.split('-')[0];

            setOrder(prev => ({
                ...prev,
                productos: prev.productos.map((producto, i) => (
                    i === index ? { ...producto, [key]: value } : producto
                ))
            }));
        } else if (['calle', 'ciudad', 'codigo_postal', 'pais'].includes(name)) {
            setOrder(prev => ({
                ...prev,
                direccion_entrega: {
                    ...prev.direccion_entrega,
                    [name]: value
                }
            }));
        } else {
            setOrder({ ...order, [name]: value });
        }
    };

    const addProduct = () => {
        setOrder(prev => ({
            ...prev,
            productos: [...prev.productos, { producto: '', cantidad: 1 }]
        }));
    };

    const createOrder = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/pedidos', order);
            console.log('Pedido creado:', response.data);
        } catch (error) {
            console.error('Error al crear el pedido:', error);
        }
    };

    return (
        <div>
            <h2>Información del Pedido</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                name="idPedido"
                                placeholder="ID del Pedido"
                                value={order.idPedido}
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                name="cliente"
                                placeholder="ID del Cliente"
                                value={order.cliente}
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                name="fecha_creado"
                                placeholder="Fecha Creado"
                                type="date"
                                value={order.fecha_creado}
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                name="fecha_entrega"
                                placeholder="Fecha Entrega"
                                type="date"
                                value={order.fecha_entrega}
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                name="distribuidorAsignado"
                                placeholder="ID del Distribuidor"
                                value={order.distribuidorAsignado}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <select
                                name="estado"
                                value={order.estado}
                                onChange={handleChange}
                                required
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Entregado">Entregado</option>
                                <option value="Cancelado">Cancelado</option>
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Productos</h2>
            {order.productos.map((producto, index) => (
                <table key={index}>
                    <tbody>
                        <tr>
                            <td>
                                <input
                                    name={`producto-${index}`}
                                    placeholder="ID del Producto"
                                    value={producto.producto}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    name={`cantidad-${index}`}
                                    placeholder="Cantidad"
                                    type="number"
                                    value={producto.cantidad}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            ))}
            <button onClick={addProduct}>Añadir Producto</button>

            <h2>Dirección de Entrega</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                name="calle"
                                placeholder="Calle"
                                value={order.direccion_entrega.calle}
                                onChange={handleChange}
                                required
                            />
                        </td>
                        <td>
                            <input
                                name="ciudad"
                                placeholder="Ciudad"
                                value={order.direccion_entrega.ciudad}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input
                                name="codigo_postal"
                                placeholder="Codigo Postal"
                                value={order.direccion_entrega.codigo_postal}
                                onChange={handleChange}
                            />
                        </td>
                        <td>
                            <input
                                name="pais"
                                placeholder="País"
                                value={order.direccion_entrega.pais}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>Notas</h2>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <input
                                name="notas"
                                placeholder="Notas"
                                value={order.notas}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick={createOrder}>Submit</button>
        </div>
    );
}

export default NewOrderPage;
