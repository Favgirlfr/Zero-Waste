import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import PickupForm from '../components/PickupForm';
import  socket  from '../socket'; 

const DonorDashboard = () => {
  const [myFoodItems, setMyFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get('/api/food/my-items', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        const itemsArray = Array.isArray(res.data)
          ? res.data
          : res.data.foodItems || [];
        setMyFoodItems(itemsArray);
        setLoading(false);
      })
      .catch(() => {
        toast.error('Failed to load your donations');
        setLoading(false);
      });
  }, [navigate]);

  // ✅ Real-time listener for new recipient requests
  useEffect(() => {
    socket.on("new-request", (data) => {
      toast.info(`📦 New request: ${data.item} (${data.quantity})`);
    });

    return () => {
      socket.off("new-request");
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-2">🌱 Welcome, Donor!</h2>
      <p className="italic text-green-800 mb-4">
        “Giving is not just about making a donation. It is about making a difference.” – Kathy Calvin
      </p>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => navigate("/donor-donations")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Create New Donation
        </button>
        <button
          onClick={() => navigate("/donor-impact")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          📊 View Your Impact
        </button>
        <button
          onClick={() => navigate("/donor-overview")}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          🧾 View Overview
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading your donations...</p>
      ) : myFoodItems.length === 0 ? (
        <p className="text-gray-500">You haven’t donated yet. Start by creating your first donation!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myFoodItems.map(item => (
            <div key={item._id} className="border p-4 rounded shadow bg-white dark:bg-gray-800">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Status: {item.status}</p>
              {item.status === 'requested' && (
                <div className="mt-2">
                  <PickupForm foodId={item._id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;