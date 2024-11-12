import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Create.css';
import BackgroundCard from '../componentes/BackgroundCard';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewClientPage() {
    const [client, setClient] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        nombreNegocio: '',
        tipoNegocio: '',
        otroTipoNegocio: '', // Campo para especificar el tipo si es "Otro"
        contacto: {
            telefono: '',
            email: ''
        },
        direccion: {
            calle: '',
            ciudad: '',
            codigo_postal: '',
            pais: ''
        },
        notas: ''
    });

    const [isOtro, setIsOtro] = useState(false); // Estado para "otro" tipo de negocio

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'tipoNegocio') {
            setIsOtro(value === 'Otro');
            setClient(prev => ({
                ...prev,
                tipoNegocio: value,
                otroTipoNegocio: '' // Resetear otroTipoNegocio si cambia
            }));

        } else if (name === 'telefono' || name === 'email') {
            setClient(prev => ({
                ...prev,
                contacto: {
                    ...prev.contacto,
                    [name]: value
                }
            }));
        } else if (['calle', 'ciudad', 'codigo_postal', 'pais'].includes(name)) {
            setClient(prev => ({
                ...prev,
                direccion: {
                    ...prev.direccion,
                    [name]: value
                }
            }));
        } else {
            setClient({ ...client, [name]: value });
        }
    };

    const createClient = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/clientes', client);
            console.log('Cliente creado:', response.data);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    return (
        <BackgroundCard>
            <div className="main-content centered-form container">
                <h2>Información Personal</h2>
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
                <div className="form-group">
                    <label htmlFor="apellidoCliente">Apellidos</label>
                    <input
                        type="text"
                        className="form-control"
                        id="apellidoCliente"
                        name="apellidoCliente"
                        placeholder="Apellidos"
                        value={client.apellidoCliente}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tipoNegocio">Tipo de Negocio</label>
                    <select
                        className="form-control"
                        id="tipoNegocio"
                        name="tipoNegocio"
                        value={client.tipoNegocio}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona tipo de negocio</option>
                        <option value="Tienda de Barrio">Tienda de Barrio</option>
                        <option value="Minorista">Minorista</option>
                        <option value="Mayorista">Mayorista</option>
                        <option value="Supermercado">Supermercado</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
                {isOtro && (
                    <div className="form-group">
                        <label htmlFor="otroTipoNegocio">Especifique el tipo de negocio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="otroTipoNegocio"
                            name="otroTipoNegocio"
                            placeholder="Especifique el tipo de negocio"
                            value={client.otroTipoNegocio}
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}

                <h2>Contacto</h2>
                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="telefono"
                        name="telefono"
                        placeholder="Teléfono"
                        value={client.contacto.telefono}
                        onChange={handleChange}
                        required
                    />
                </div>
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

                <h2>Dirección</h2>
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
                    />
                </div>
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
                    />
                </div>

                <h2>Notas</h2>
                <div className="form-group">
                    <label htmlFor="notas">Notas</label>
                    <textarea
                        className="form-control"
                        id="notas"
                        name="notas"
                        placeholder="Notas"
                        value={client.notas}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" onClick={createClient}>Submit</button>
            </div>
        </BackgroundCard>
    );
}

export default NewClientPage;
