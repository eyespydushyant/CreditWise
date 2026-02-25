import React from 'react';
import { useNotification } from '../context/NotificationContext';

function NotificationToast() {
    const { notifications, removeNotification } = useNotification();

    // Only show the last 3 notifications in the toast area to avoid clutter
    const activeNotifications = notifications.slice(0, 3);

    if (activeNotifications.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
            {activeNotifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`
                        p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 ease-in-out
                        ${notification.type === 'error' ? 'bg-red-500' :
                            notification.type === 'success' ? 'bg-green-500' : 'bg-indigo-600'}
                    `}
                >
                    <div className="flex justify-between items-center">
                        <span className="mr-4">{notification.message}</span>
                        <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-white hover:text-gray-200 focus:outline-none"
                        >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NotificationToast;
