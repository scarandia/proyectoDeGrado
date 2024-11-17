import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const BackgroundCard = ({ children }) => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="card bg-light w-100" style={styles.card}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    marginLeft: '250px', // Deja espacio para la sidebar
    padding: '20px',
    borderRadius: '22px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    height: 'calc(100vh - 120px)',
  },
};

export default BackgroundCard;