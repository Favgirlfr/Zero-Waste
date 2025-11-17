import { useState } from 'react';
import NotificationBell from './NotificationBell';
import NotificationDropdown from './NotificationDropdown';

const Navbar = ({ notifications, handleMarkAsRead, handleMarkAllAsRead }) => {
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'theme',
      document.documentElement.classList.contains('dark') ? 'dark' : 'light'
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md sm:px-6 relative">
      <h1 className="text-lg sm:text-xl font-bold text-green-700 dark:text-green-300">
        Zero Waste Exchange
      </h1>

      <div className="flex items-center gap-4">
        <div onClick={() => setOpen(!open)} className="cursor-pointer">
          <NotificationBell notifications={notifications} />
        </div>

        <button
          onClick={toggleTheme}
          className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
        >
          Toggle Theme
        </button>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 dark:text-red-400 hover:underline"
        >
          Logout
        </button>

        {open && (
          <NotificationDropdown
            notifications={notifications}
            handleMarkAsRead={handleMarkAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;