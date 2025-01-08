import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetailView.css';

const DetailView = ({ entityType, apiEndpoint, fields, id }) => {
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntity = async () => {
      try {
        const response = await axios.get(`${apiEndpoint}/${id}`);
        setEntity(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Error al cargar el ${entityType}`);
        setLoading(false);
      }
    };

    fetchEntity();
  }, [apiEndpoint, id, entityType]);

  if (loading) return <p>Cargando {entityType}...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detail-view">
      {entity ? (
        <div>
          {fields.map((field) => (
            <p key={field.key}><strong>{field.label}:</strong> {field.key.split('.').reduce((o, i) => o[i], entity)}</p>
          ))}
        </div>
      ) : (
        <p>No se encontró el {entityType}</p>
      )}
    </div>
  );
};

export default DetailView;