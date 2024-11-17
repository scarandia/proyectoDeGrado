import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackgroundCard = ({ children }) => {
  return (
    <div className="card bg-light" style={styles.card}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

const styles = {
  card: {
    position: 'absolute',
    top: '60px',  // Deja 100px de margen en la parte superior
    left: '300px', // La sidebar tiene 250px de ancho, por lo tanto, dejamos 250px a la izquierda
    right: '60px', // Deja 100px de margen en el lado derecho
    bottom: '60px', // Deja 100px de margen en la parte inferior
    borderRadius: '22px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    overflowY: 'auto',
    zIndex: '-1', // Asegura que el BackgroundCard quede por debajo de otros componentes
  }
};

// Media queries para dispositivos móviles (ajustar tamaño en pantallas pequeñas)
const mediaStyles = {
  '@media (max-width: 768px)': {
    card: {
      top: '20px',
      left: '20px',
      right: '20px',
      bottom: '20px',
      width: 'auto', // Ajuste del tamaño de la tarjeta para móviles
    }
  }
};

export default BackgroundCard;
