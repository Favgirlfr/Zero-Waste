import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RecipientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("/api/food/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequests(Array.isArray(res.data) ? res.data : res.data.requests || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load your requests");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📝 Your Requests</h2>
      {loading ? (
        <p className="text-gray-500">Loading your requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">You haven’t requested anything yet.</p>
      ) : (
        <div className="grid gap-4">
          {requests.map((item) => (
           <div
  key={item._id}
  className={`border p-4 rounded shadow ${
    item.status === "fulfilled"
      ? "bg-green-100"
      : "bg-white dark:bg-gray-800"
  }`}
>
  <h3 className="font-semibold text-lg">{item.item}</h3>

  <span
    className={`inline-block text-xs font-medium px-2 py-1 rounded mb-2 ${
      item.status === "fulfilled"
        ? "bg-green-200 text-green-800"
        : item.status === "approved"
        ? "bg-blue-200 text-blue-800"
        : item.status === "cancelled"
        ? "bg-red-200 text-red-800"
        : "bg-yellow-200 text-yellow-800"
    }`}
  >
    {item.status}
  </span>

  <p className="text-sm text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
  <p className="text-sm text-gray-500 dark:text-gray-400">
    Requested on: {new Date(item.requestDate).toLocaleDateString()}
  </p>
</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipientRequests;