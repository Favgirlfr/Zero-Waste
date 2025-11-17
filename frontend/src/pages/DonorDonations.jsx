import { useState, useEffect } from "react";
import axios from "axios";

export default function DonorDonations() {
  const [donations, setDonations] = useState([]);
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/donations/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure the response is an array before setting state to avoid runtime errors
      if (Array.isArray(res.data)) {
        setDonations(res.data);
      } else {
        console.warn('Unexpected donations response:', res.data);
        setDonations([]);
      }
    } catch (err) {
      console.error("Error fetching donations:", err);
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");
    setLoading(true);
    console.log('handleSubmit called', { item, quantity, token });
    
    if (!item || !quantity) {
      setError("Please fill in both item and quantity");
      setLoading(false);
      return;
    }
    
    try {
      const res = await axios.post(
        "http://localhost:5000/api/donations",
        { item, quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Donation created:', res.data);
      setItem("");
      setQuantity("");
      setError("");
      fetchDonations();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || "Failed to create donation";
      console.error("Error creating donation:", errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🧑‍🌾 Your Active Donations</h2>

      {/* New Donation Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium">Item</label>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            required
            disabled={loading}
          />
        </div>
        <button type="button" onClick={handleSubmit} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? "Adding..." : "➕ Add Donation"}
        </button>
      </form>

      {/*  Donation List */}
      <div className="grid gap-4">
        {donations.map((donation) => (
          <div key={donation._id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{donation.item}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Qty: {donation.quantity}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Status: {donation.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}