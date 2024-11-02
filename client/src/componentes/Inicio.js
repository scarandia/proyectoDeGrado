import Card from './Card';
import React, { useState } from 'react';
import Sidebar from './Sidebar';


export default function Inicio() {
    
    const [isOpen, setIsOpen] = useState(false); // Estado para la sidebar
    
    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Alterna el estado
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            padding: '10'
        }
    };

    return (
        <div style={styles.container}>
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <Card title="PUPIPUPI" value="12" />
            <Card title="Pedidos por entregar" value="80" />
            <Card title="Pedidos entregados" value="120" />
        </div>
    );
}