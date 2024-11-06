import React from 'react';

const BackgroundCard = ({ children }) => {
  return (
    <div style={styles.card}>
      {children}
    </div>
  );
};

const styles = {
  card: {
    position: 'fixed',
    top: '50px',
    left: '300px',
    right: '50px',
    bottom: '50px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '22px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    zIndex: '-1', 
    padding: '1.5rem',
    margin: '20px',
    overflowY: 'auto',
  }
};

export default BackgroundCard;
