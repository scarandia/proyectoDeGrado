import React from 'react';
import BackgroundCard from '../componentes/BackgroundCard';

const products = [

];

const ProductList = () => {
  return (
    <div className="background d-flex align-items-center justify-content-center min-vh-100">
      <BackgroundCard>
        <div>
          <h1>PRODUCT LIST</h1>
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

export default ProductList;
