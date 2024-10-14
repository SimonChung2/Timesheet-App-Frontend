import React from 'react';

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage

    // If there's no token, redirect to the login page
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If token exists, render the child component and pass the user prop
    return React.cloneElement(children, { user });
};

export default ProtectedRoute;

