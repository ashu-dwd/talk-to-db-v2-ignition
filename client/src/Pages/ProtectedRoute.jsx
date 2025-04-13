// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/authContext'; // Make sure the path is correct

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const location = useLocation(); // Get the current location

    if (!isLoggedIn) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to in the state. This allows us to send them back after login.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children; // If logged in, render the child component (e.g., ChatInterface)
};

export default ProtectedRoute;
