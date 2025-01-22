import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        // If no token or user, redirect to login
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && user.role !== requiredRole) {
        // If user does not have the required role, redirect to unauthorized page
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;