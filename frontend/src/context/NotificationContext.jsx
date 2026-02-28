import React, { createContext, useContext, useState, useCallback } from 'react';

/* eslint-disable react-refresh/only-export-components */

const NotificationContext = createContext();

export function useNotification() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    }, []);

    const addNotification = useCallback((message, type = 'info') => {
        const id = Date.now().toString();
        const newNotification = { id, message, type, time: new Date() };

        setNotifications((prev) => [newNotification, ...prev]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(id);
        }, 5000);

        return id;
    }, [removeNotification]);

    const clearNotifications = useCallback(() => {
        setNotifications([]);
    }, []);

    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
}
