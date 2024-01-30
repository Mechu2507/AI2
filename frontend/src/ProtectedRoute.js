import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import axios from "react-app-store-badge";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const [user_id, setUser_id] = useState('');

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/getUserDetails`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                if (response.data && response.data.user) {
                    setUser_id(response.data.user.id);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    }, []);

    return allowedRoles.includes(user_id) ? children : <Navigate to="/Unauthorized" />;
};

export default ProtectedRoute;
