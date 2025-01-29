import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetailView.css';

const DetailView = ({ entityType, apiEndpoint, fields, id }) => {
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      console.log('Fetching entity details for ID:', id);
      const fetchEntity = async () => {
        try {
          const response = await axios.get(`${apiEndpoint}/${id}`);
          setEntity(response.data);
          setLoading(false);
        } catch (err) {
          console.error(`Error fetching ${entityType}:`, err);
          setError(`Error al cargar el ${entityType}: ${err.message}`);
          setLoading(false);
        }
      };

      fetchEntity();
    }
  }, [apiEndpoint, id, entityType]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="detail-view">
      {entity ? (
        <div>
          {fields.map((field) => {
            let value = field.key.split('.').reduce((o, i) => (o ? o[i] : undefined), entity);
            if (field.key === 'fecha_creado' || field.key === 'fecha_entrega') {
              value = new Date(value).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
            }
            return (
              <p key={field.key}>
                <strong>{field.label}:</strong> {value !== undefined ? value : 'N/A'}
              </p>
            );
          })}
        </div>
      ) : (
        <p>No se encontró el {entityType}</p>
      )}
    </div>
  );
};

export default DetailView;