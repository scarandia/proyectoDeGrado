const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Para parsear JSON

// Rutas para pedidos y entregas
app.get('/', (req, res) => {
  res.send('Microservicio de distribución funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
