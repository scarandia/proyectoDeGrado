import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    padding: '1.5rem',
    textAlign: 'center',
    width: '200px',
    backgroundColor:'white',
    borderRadius: '22px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    margin: '20px'
  
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  value: {
    fontSize: '1.5rem'
  }
};

export default Card;
