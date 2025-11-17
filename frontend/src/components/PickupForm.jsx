import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const PickupForm = ({ foodId }) => {
  const [pickupTime, setPickupTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/food/${foodId}/schedule-pickup`, {
        pickupTime,
        pickupLocation
      });
      toast.success('Pickup scheduled!');
    } catch (err) {
      toast.error('Failed to schedule pickup');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Pickup Time</span>
        <input
          type="datetime-local"
          value={pickupTime}
          onChange={(e) => setPickupTime(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Pickup Location</span>
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          className="mt-1 block w-full border rounded px-2 py-1"
          required
        />
      </label>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Schedule Pickup
      </button>
    </form>
  );
};

export default PickupForm;