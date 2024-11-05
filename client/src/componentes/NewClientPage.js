import React, { useState } from 'react';
import axios from 'axios';

function NewClientPage() {
    const [client, setClient] = useState({
        nombre: '',
        apellidos: '',
        telefono: '',
        email: '',
        calle: '',
        ciudad: '',
        codigoPostal: '',
        pais: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient({ ...client, [name]: value });
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
                            name="nombre"
                            placeholder="Nombre(s)"
                            value={client.nombre}
                            onChange={handleChange}
                            required
                        />
                    </td>
                    <td>
                        <input
                            name="apellidos"
                            placeholder="Apellidos"
                            value={client.apellidos}
                            onChange={handleChange}
                            required
                        />
                    </td>
                </tr>

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
            </table>
            <button onClick={createClient}>Submit</button>
        </div>
    );
}

export default NewClientPage;