import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RecipientDashboard = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get('/api/food', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const itemsArray = Array.isArray(res.data)
          ? res.data
          : res.data.foodItems || [];
        setFoodItems(itemsArray);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load available donations');
        setLoading(false);
      });
  }, [navigate]);

  const handleRequest = async (id) => {
    try {
      await axios.patch(`/api/food/${id}/request`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success('Request submitted!');
      setFoodItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error('Could not submit request');
    }
  };

  const handleConfirmPickup = async (id) => {
    try {
      await axios.patch(`/api/food/${id}/confirm-pickup`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success('Pickup confirmed!');
      setFoodItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error('Could not confirm pickup');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-2">🍽️ Welcome, Recipient!</h2>
      <p className="italic text-green-800 mb-4">
        “The best way to find yourself is to lose yourself in the service of others.” – Mahatma Gandhi
      </p>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => navigate("/recipient-requests")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          📝 View Your Requests
        </button>
        <button
          onClick={() => navigate("/recipient-impact")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📊 View Your Impact
        </button>
        <button
  onClick={() => navigate("/recipient-overview")}
  className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
>
  🧾 View Overview
</button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading available donations...</p>
      ) : foodItems.length === 0 ? (
        <p className="text-gray-500">No donations available at the moment. Please check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems.map((item) => (
            <div key={item._id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expires: {new Date(item.expiryDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status: {item.status}</p>

              {item.status === 'available' && (
                <button
                  onClick={() => handleRequest(item._id)}
                  className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                >
                  Request
                </button>
              )}

              {item.status === 'pickup-requested' && (
                <button
                  onClick={() => handleConfirmPickup(item._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Confirm Pickup
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientDashboard;