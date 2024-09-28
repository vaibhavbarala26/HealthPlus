import React, { createContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [Admin, setAdmin] = useState(() => {
        // Check local storage for Admin data on initial render
        const storedUser = localStorage.getItem('Admin');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Effect to save Admin data to local storage whenever it changes
    useEffect(() => {
        if (Admin) {
            localStorage.setItem('Admin', JSON.stringify(Admin));
        } else {
            localStorage.removeItem('Admin');
        }
    }, [Admin]);

    const login = (userData) => {
        setAdmin(userData);
    };

    const logout = () => {
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider value={{ Admin, login, logout }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    return React.useContext(AdminAuthContext);
};
