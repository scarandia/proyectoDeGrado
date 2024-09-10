const app = require('./app');
const connectDB = require('./config/database');

const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
