const loggingMiddleware = (req, res, next) => {
    const startTime = Date.now(); // Inicio del tiempo de la solicitud

    // Registrar las solicitudes relevantes (POST, GET, PUT, DELETE)
    if (['POST', 'GET', 'PUT', 'DELETE'].includes(req.method)) {
        console.log(`Solicitud ${req.method} recibida en ${req.originalUrl} con datos:`, req.body);
    }

    // Detalles de PUT, mostrar los datos que se están actualizando
    if (req.method === 'PUT' && req.body) {
        console.log(`Datos para actualizar: ${JSON.stringify(req.body)}`);
    }

    // Respuesta para registrar éxito, error y tiempo de respuesta
    res.on('finish', () => {
        const duration = Date.now() - startTime; // Duración de la solicitud

        if (['POST', 'GET', 'PUT', 'DELETE'].includes(req.method)) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log(`Éxito: ${req.method} en ${req.originalUrl} - Código de estado: ${res.statusCode} - Tiempo: ${duration}ms`);
            } else {
                console.error(`Error: ${req.method} en ${req.originalUrl} - Código de estado: ${res.statusCode} - Tiempo: ${duration}ms`);
            }
        }
    });

    // Manejar errores
    res.on('error', (err) => {
        console.error(`Error en la solicitud ${req.method} en ${req.originalUrl}: ${err.message}`);
    });

    next();
};

module.exports = loggingMiddleware;
