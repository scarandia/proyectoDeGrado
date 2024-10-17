const loggingMiddleware = (req, res, next) => {

    if (['POST', 'GET', 'PUT', 'DELETE'].includes(req.method)) {
        console.log(`Solicitud ${req.method} recibida en ${req.originalUrl}`);
    }

    // Respuesta para registrar éxito o error
    res.on('finish', () => {
        if (['POST', 'GET', 'PUT', 'DELETE'].includes(req.method)) {
            if (res.statusCode >= 200 && res.statusCode < 300) {
                console.log(`Éxito: ${req.method} en ${req.originalUrl} - Código de estado: ${res.statusCode}`);
            } else {
                console.error(`Error: ${req.method} en ${req.originalUrl} - Código de estado: ${res.statusCode}`);
            }
        }
    });

    next();
};

module.exports = loggingMiddleware;
