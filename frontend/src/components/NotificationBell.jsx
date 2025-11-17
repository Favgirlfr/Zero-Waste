import { FaBell } from 'react-icons/fa';

const NotificationBell = ({ notifications, onClick }) => {
  // notifications can be undefined or an error object when not logged in; guard accordingly
  const list = Array.isArray(notifications) ? notifications : [];
  const unreadCount = list.filter((n) => !n.read).length;

  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <FaBell className="text-xl text-gray-700 hover:text-green-600 transition" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default NotificationBell;