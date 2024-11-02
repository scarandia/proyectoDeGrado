# Sistema de gestión de inventario y mejora de la logística de equipo de ventas para pequeñas y medianas empresas
Este proyecto es un sistema de inventario desarrollado en Node.js y Express con MongoDB. Su objetivo es gestionar el flujo de información entre distribuidores, clientes, pedidos, productos y fabricantes, con roles específicos como vendedor y administrador.

### Nota: Este proyecto está en desarrollo y tiene como finalidad ser un proyecto de grado

# Instalación
1. **Clonar el repositorio**:
   bash
   ```
   git clone https://github.com/tu_usuario/nombre_del_repositorio.git
   cd nombre_del_repositorio
   ```
2. Desde la raíz del proyecto
   ```npm install```
3. Inicia mongo
   ```mongod```
4. Inicia el servidor
   ```npm run dev```
5. Inicia el lado del cliente React
   ```npm start```

## Rutas Principales
Autenticación
POST /api/auth/register: Registrar un nuevo usuario.
POST /api/auth/login: Iniciar sesión para obtener un token JWT.

### Entidades
Clientes: CRUD para clientes del sistema.
Fabricantes: CRUD para fabricantes y productos.
Pedidos: Gestión de pedidos y su relación con los clientes.
Distribuidores: Gestión de distribuidores, asignación de pedidos y rutas.
Productos: CRUD de productos en stock.
Ejemplos de Uso

## Dependencias Principales
### Backend

- **express**: Framework de servidor web para Node.js.
- **mongoose**: Librería para modelado de datos en MongoDB.
- **dotenv**: Manejo de variables de entorno.
- **bcryptjs**: Cifrado de contraseñas para autenticación.
- **jsonwebtoken**: Creación y validación de tokens JWT para autenticación.
- **express-validator**: Validación de los datos recibidos en las solicitudes.

### Frontend

- **react**: Librería para la creación de interfaces de usuario.
- **react-router-dom**: Navegación para aplicaciones en React.
