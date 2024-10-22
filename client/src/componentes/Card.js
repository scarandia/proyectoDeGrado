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
    borderRadius: '8px',
    padding: '1.5rem',
    textAlign: 'center',
    width: '200px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  value: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }
};

export default Card;
