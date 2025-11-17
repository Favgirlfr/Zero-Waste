import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DonorOverview() {
  const [recentDonations, setRecentDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("/api/donations/recent", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("Recent donations response:", res.data);
        const donationsArray = Array.isArray(res.data)
          ? res.data
          : res.data.donations || []; // fallback if wrapped in { donations: [...] }
        setRecentDonations(donationsArray);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recent donations:", err);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-2">🌍 Community Donations</h2>
      <p className="italic text-green-800 mb-4">
        “Small acts, when multiplied by millions of people, can transform the world.” – Howard Zinn
      </p>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        See what others are contributing to reduce food waste. You can donate too when you're ready!
      </p>

      {loading ? (
        <p className="text-gray-500">Loading recent donations...</p>
      ) : recentDonations.length === 0 ? (
        <p className="text-gray-500">No donations yet — be the first to contribute!</p>
      ) : (
        <div className="grid gap-4 mb-6">
          {recentDonations.map((donation) => (
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
        onClick={() => navigate("/donor-donations")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Start Donating
      </button>
    </div>
  );
}