import React, { useState } from 'react';
import axios from 'axios';

function NewClientPage() {
    const [client, setClient] = useState({
        nombreCliente: '',
        apellidoCliente: '',
        nombreNegocio: '',
        tipoNegocio: '',
        otroTipoNegocio: '', //campo especifica el tipo si es -> Otro
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

    const [isOtro, setIsOtro] = useState(false); //Si es "otro" en tipo de negocio

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
        <div>
            <table>
                <h2>Informacion Personal</h2>
                <tr>
                    <td>
                        <input
                            name="nombreCliente"
                            placeholder="Nombre(s)"
                            value={client.nombreCliente}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <input
                            name="apellidoCliente"
                            placeholder="Apellidos"
                            value={client.apellidoCliente}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            name="nombreNegocio"
                            placeholder="Nombre del Negocio"
                            value={client.nombreNegocio}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <select
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
                    </td>
                </tr>
                {/*Campo si selecciona "Otro"*/}
                {isOtro && (
                    <tr>
                        <td>
                            <input
                                name="otroTipoNegocio"
                                placeholder="Especifique el tipo de negocio"
                                value={client.otroTipoNegocio}
                                onChange={handleChange}
                                required
                            />
                        </td>
                    </tr>
                )}

                <h2>Contacto</h2>
                <tr>
                    <td>
                        <input
                            name="telefono"
                            placeholder="Telefono"
                            value={client.telefono}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <input
                            name="email"
                            placeholder="Email"
                            value={client.email}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>

                <h2>Direccion</h2>
                <tr>
                    <td>
                        <input
                            name="calle"
                            placeholder="Calle"
                            value={client.calle}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <input
                            name="ciudad"
                            placeholder="Ciudad"
                            value={client.ciudad}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <input
                            name="codigoPostal"
                            placeholder="Codigo Postal"
                            value={client.codigoPostal}
                            onChange={handleChange}
                        />
                    </td>
                    <td>
                        <input
                            name="pais"
                            placeholder="País"
                            value={client.pais}
                            onChange={handleChange}
                        />
                    </td>
                </tr>
                <h2>Notas</h2>
                <tr>
                    <td>
                        <input
                            name="notas"
                            placeholder="Notas"
                            value={client.notas}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>
            </table>
            <button onClick={createClient}>Submit</button>
        </div>
    );
}

export default NewClientPage;