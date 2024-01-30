import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios"; // Make sure this is correctly imported from 'axios' and not 'react-app-store-badge'

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/getUserDetails`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            if (response.data && response.data.user) {
                // Assuming 'role' or 'role_id' is the attribute for user's role
                setUserRole(response.data.user.role || response.data.user.role_id);
            }
        })
        .catch((e) => {
            console.error(e);
        });
    }, []);

    return allowedRoles.includes(userRole) ? children : <Navigate to="/Unauthorized" />;
};

export default ProtectedRoute;
