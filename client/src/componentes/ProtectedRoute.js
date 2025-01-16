import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token) {
        return <Navigate to="/" />;
    }

    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default ProtectedRoute;