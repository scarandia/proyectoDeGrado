import React from 'react';
import BackgroundCard from '../componentes/BackgroundCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const clients = [
  
];

const ClientList = () => {
  return (
    <div className="background d-flex align-items-center justify-content-center min-vh-100">
    <BackgroundCard>
    <div className="container">
        <div className="row">
          {clients.map((client, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{client.name}</h5>
                  <p className="card-text">{client.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BackgroundCard>
    </div>
  );
};

export default ClientList;
