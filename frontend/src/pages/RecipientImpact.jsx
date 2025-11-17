import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RecipientImpact = () => {
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/food/my-completed", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCompleted(Array.isArray(res.data) ? res.data : res.data.completed || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your impact");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📊 Your Impact</h2>
      {loading ? (
        <p className="text-gray-500">Loading your pickup history...</p>
      ) : completed.length === 0 ? (
        <p className="text-gray-500">You haven’t completed any pickups yet.</p>
      ) : (
        <div className="grid gap-4">
          {completed.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Picked up on: {new Date(item.pickupDate).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientImpact;