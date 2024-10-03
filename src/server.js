const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Cliente = require('./models/clienteModel');

const app = express();
const PORT = process.env.PORT || 5000;

//parsear JSON
app.use(express.json());

//Conectar a MongoDB
connectDB();

//Insertar un cliente
app.post('/api/clientes', async (req, res) => {
    try {
        //Crea cliente con datos recibidos
        const nuevoCliente = new Cliente(req.body);
        await nuevoCliente.save(); //Guarda cliente en bd
        
        //log
        const clientes = await Cliente.find();
        console.log('Clientes actuales:', clientes);

        res.status(201).send(nuevoCliente);
    } catch (error) {
        res.status(400).send(error);
        res.status(400).send({ message: 'Error al crear cliente', error });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
