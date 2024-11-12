import React from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const orders = [

];

const OrderList = () => {
  return (
    <div className="background d-flex align-items-center justify-content-center min-vh-100">
      <BackgroundCard>
        <div>
        </div>
      </BackgroundCard>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    gap: '20px',
  }
};

export default OrderList;
