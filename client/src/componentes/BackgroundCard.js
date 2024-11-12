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
    
    //position: 'fixed',
    //top: '50px',
    //left: '300px',
    //right: '50px',
    //bottom: '50px',
    //zIndex: '-1',
    overflowY: 'auto',
    borderRadius: '22px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }
};

export default BackgroundCard;