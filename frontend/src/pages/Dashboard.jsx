import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ role }) => {
  const capitalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-6">
        Welcome, {capitalizedRole}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Shared Section */}
       <Link to="/donations">
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
            Recent Donations
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track new food donations in real time.
          </p>
        </div>
       </Link>

        {/* Donor-specific */}
        {(role === "donor" || role === "admin") && (
            <Link to="/donor-donations">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Your Active Donations
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage and update your donation listings.
            </p>
          </div>
         </Link>
        )}

        {/* Recipient-specific */}
        {(role === "recipient" || role === "admin") && (
           <Link to="/available-donations">  
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
              Available Donations
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Browse and request food donations near you.
            </p>
          </div>
            </Link>
        )}

        {/* Admin-only */}
        {role === "admin" && (
          <>
          <Link to="/verify">
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Verify Donations
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Review and approve new donation entries.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">
                Manage Users
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Oversee donor and recipient accounts.
              </p>
            </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;