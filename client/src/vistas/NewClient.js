import React, { useState } from 'react';
import axios from 'axios';
import BackgroundCard from '../componentes/BackgroundCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewClientPage() {
    const [client, setClient] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        CI: '',
        nombreNegocio: '',
        tipoNegocio: '',
        otroTipoNegocio: '',
        direccion: {
            calle: '',
            ciudad: '',
            codigo_postal: '',
            pais: ''
        },
        contacto: {
            telefono: '',
            email: ''
        },
        deuda: 0,
        notas: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/clientes', client);
            console.log('Cliente creado:', response.data);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    return (
        <div className="order-list-container" style={{ width: '1100px', margin: '0 auto' }}>
            <BackgroundCard className="order-list-card">
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Crear Nuevo Cliente</h2>
                <form onSubmit={handleSubmit} className="centered-form">
                    <h3>Información Personal</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="nombreCliente">Nombre(s)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreCliente"
                                    name="nombreCliente"
                                    placeholder="Nombre(s)"
                                    value={client.nombreCliente}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="apellidoCliente">Apellido(s)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="apellidoCliente"
                                    name="apellidoCliente"
                                    placeholder="Apellido(s)"
                                    value={client.apellidoCliente}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="CI">Cédula de Identidad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="CI"
                                    name="CI"
                                    placeholder="Cédula de Identidad"
                                    value={client.CI}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="nombreNegocio">Nombre del Negocio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombreNegocio"
                                    name="nombreNegocio"
                                    placeholder="Nombre del Negocio"
                                    value={client.nombreNegocio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="tipoNegocio">Tipo de Negocio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tipoNegocio"
                                    name="tipoNegocio"
                                    placeholder="Tipo de Negocio"
                                    value={client.tipoNegocio}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="otroTipoNegocio">Otro Tipo de Negocio</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="otroTipoNegocio"
                                    name="otroTipoNegocio"
                                    placeholder="Otro Tipo de Negocio"
                                    value={client.otroTipoNegocio}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <h3>Dirección</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="calle">Calle</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="calle"
                                    name="calle"
                                    placeholder="Calle"
                                    value={client.direccion.calle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="ciudad">Ciudad</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ciudad"
                                    name="ciudad"
                                    placeholder="Ciudad"
                                    value={client.direccion.ciudad}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="codigo_postal">Código Postal</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="codigo_postal"
                                    name="codigo_postal"
                                    placeholder="Código Postal"
                                    value={client.direccion.codigo_postal}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="pais">País</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pais"
                                    name="pais"
                                    placeholder="País"
                                    value={client.direccion.pais}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <h3>Contacto</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="telefono">Teléfono</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="telefono"
                                    name="telefono"
                                    placeholder="Teléfono"
                                    value={client.contacto.telefono}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={client.contacto.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <h3>Información Adicional</h3>
                    <div className="form-group">
                        <label htmlFor="deuda">Deuda</label>
                        <input
                            type="number"
                            className="form-control"
                            id="deuda"
                            name="deuda"
                            placeholder="Deuda"
                            value={client.deuda}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="notas">Notas</label>
                        <textarea
                            className="form-control"
                            id="notas"
                            name="notas"
                            placeholder="Notas"
                            value={client.notas}
                            onChange={handleChange}
                            rows="3"
                        />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <button type="submit" className="btn btn-primary">
                            Crear Cliente
                        </button>
                    </div>
                </form>
            </BackgroundCard>
        </div>
    );
}

export default NewClientPage;