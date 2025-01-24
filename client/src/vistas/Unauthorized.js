import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
    const styles = {
        unauthorized: {
            background: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
            height: '100vh',
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
            color: '#FF6B6B',
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
        <div className="order-list-container" style={{ width: '1950px', margin: '0 auto' }}>
            <div style={styles.unauthorized}>
                <div style={styles.content}>
                    <h1 style={styles.heading}>403</h1>
                    <p style={styles.paragraph}>Acceso no autorizado. No tienes permiso para acceder a esta página.</p>
                    <Link
                        to="/home"
                        style={styles.homeButton}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.homeButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.homeButton.backgroundColor}
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default Unauthorized;