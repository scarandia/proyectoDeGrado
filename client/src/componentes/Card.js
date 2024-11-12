import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Card = ({ title, value }) => {
  return (
    <div className="card text-center mb-3" style={styles.card}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{value}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '18rem',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
};

export default Card;
