import Card from './Card';
import React from 'react';

export default function Inicio() {
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
      <Card title="Vendedores Activos" value="12" />
      <Card title="Pedidos por entregar" value="80" />
      <Card title="Pedidos entregados" value="120" />
    </div>
  );
}
