import React from 'react';
import Card from './Card';

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <Card title="Numero de vendedores activos" value="12" />
      <Card title="Pedidos por entregar" value="80" />
      <Card title="Pedidos entregados" value="120" />
      <Card title="Ganancia mensual" value="$30,000" />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: '2rem',
  }
};

export default Dashboard;
