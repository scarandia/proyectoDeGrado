import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  const styles = {
    notFound: {
      background: 'linear-gradient(135deg, #1B8AF1, #B58DED)',
      height: '85vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif',
    },
    content: {
      padding: '20px',
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      fontSize: '5rem',
      marginBottom: '20px',
    },
    paragraph: {
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    homeButton: {
      backgroundColor: '#fff',
      color: '#1B8AF1',
      padding: '10px 20px',
      borderRadius: '15px',
      textDecoration: 'none',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
    },
    homeButtonHover: {
      backgroundColor: '#f0f0f0',
    }
  };

  return (
    <div style={styles.notFound}>
      <div style={styles.content}>
        <h1 style={styles.heading}>404</h1>
        <p style={styles.paragraph}>Oops! La página que buscas no existe.</p>
        <Link
          to="/"
          style={styles.homeButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = styles.homeButtonHover.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = styles.homeButton.backgroundColor}
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
