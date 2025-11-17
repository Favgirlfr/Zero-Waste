import React from 'react';

const NotificationDropdown = ({
  notifications,
  handleMarkAsRead,
  handleMarkAllAsRead
}) => {
  const iconMap = {
    donation: '🥕',
    pickup: '🚚',
    completed: '✅',
    admin: '🛡️',
    default: '🔔'
  };

  return (
    <div className="absolute right-2 top-full mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 shadow-none rounded-md z-50 border border-gray-200 dark:border-gray-700 transition-all duration-200 ease-in-out">
      <div className="p-4 border-b font-semibold text-green-700 dark:text-green-300">Notifications</div>
      <ul role="list" className="max-h-64 sm:max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <li className="p-4 text-gray-500 dark:text-gray-400 text-sm">No notifications</li>
        ) : (
          notifications.map((n) => (
            <li
              key={n._id}
              className={`p-3 border-b hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer ${
                n.read ? 'opacity-60' : 'text-gray-800 dark:text-gray-200 font-medium'
              }`}
              onClick={() => handleMarkAsRead(n._id)}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg">{iconMap[n.type] || iconMap.default}</span>
                <div>
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(n.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>

      {notifications.length > 0 && (
        <button
          onClick={handleMarkAllAsRead}
          className="w-full text-center py-2 text-sm text-green-600 hover:underline border-t"
        >
          Mark all as read
        </button>
      )}
    </div>
  );
};

export default NotificationDropdown;