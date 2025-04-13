// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check local storage on initial load
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token'); // Assuming you store a token
        if (storedUser && storedToken) {
            try {
                setUser(JSON.parse(storedUser));
                setIsLoggedIn(true);
                // You might want to add token validation here in a real app
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                logout(); // Clear invalid stored data
            }
        }
    }, []);

    const login = (userData, token) => {
        // Assuming userData contains { name, email } or similar
        // and token is a JWT or session identifier from your backend
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token); // Store the token
        setUser(userData);
        setIsLoggedIn(true);
        console.log("User logged in:", userData);
        // Optional: Redirect user after login, e.g., to dashboard or chat
        // navigate('/chat'); // Or wherever appropriate
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Remove the token
        setUser(null);
        setIsLoggedIn(false);
        console.log("User logged out");
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};
