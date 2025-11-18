import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecipientOverview() {
  const [availableDonations, setAvailableDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/api/donations/available", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Available donations response:", res.data);
        const donationsArray = Array.isArray(res.data)
          ? res.data
          : res.data.donations || []; // fallback if wrapped
        setAvailableDonations(donationsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching available donations:", err);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-2">🎁 Available Donations</h2>
      <p className="italic text-green-800 mb-4">
        “The best way to find yourself is to lose yourself in the service of others.” – Mahatma Gandhi
      </p>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        Browse what's currently available. You can request items when you're ready!
      </p>

      {loading ? (
        <p className="text-gray-500">Loading available donations...</p>
      ) : availableDonations.length === 0 ? (
        <p className="text-gray-500">No donations available at the moment. Please check back soon!</p>
      ) : (
        <div className="grid gap-4 mb-6">
          {availableDonations.map((donation) => (
            <div
              key={donation._id}
              className="bg-white dark:bg-gray-800 p-4 rounded shadow"
            >
              <h3 className="text-lg font-semibold">{donation.item}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Qty: {donation.quantity}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: {donation.status}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate("/recipient-requests/new")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        📝 Start Requesting
      </button>
    </div>
  );
}