import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import socket from "./socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; 
import Signup from "./pages/Signup";
import Donations from "./pages/Donations";
import DonorDonations from "./pages/DonorDonations";
import AvailableDonations from "./pages/AvailableDonations";
import VerifyDonations from "./pages/VerifyDonations";
import ManageUsers from "./pages/ManageUsers";
import DonorOverview from "./pages/DonorOverview";
import RecipientOverview from "./pages/RecipientOverview";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import DonorDashboard from "./pages/DonorDashboard";
import Unauthorized from "./pages/Unauthorized";
import RecipientDashboard from "./pages/RecipientDashboard";
import DonorImpact from "./pages/DonorImpact";
import RecipientRequests from "./pages/RecipientRequests";
import RecipientImpact from "./pages/RecipientImpact";
import About from "./pages/About";

function App() {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

    //  Decode token to extract role
  let role = "guest";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      role = decoded.role || "guest"; // Adjust based on your backend's token structure
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }


  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/notifications", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        console.warn("Failed to fetch notifications:", res.status);
        setNotifications([]);
        return;
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        setNotifications(Array.isArray(data) ? data : []);
      } else {
        const fallbackText = await res.text();
        console.error("Expected JSON response but received:", fallbackText);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/users/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Marked as read");
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark as read:", err.message);
    }
  };
  const toggleTheme = () => {
  const current = localStorage.getItem("theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", current);
  document.documentElement.classList.toggle("dark", current === "dark");
};

  const handleMarkAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    try {
      await Promise.all(
        unread.map((n) =>
          fetch(`http://localhost:5000/api/users/notifications/${n._id}/read`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${token}` },
          })
        )
      );
      toast.info("All notifications marked as read");
      fetchNotifications();
    } catch (err) {
      console.error("Failed to mark all as read:", err.message);
    }
  };

  useEffect(() => {
    if (token) fetchNotifications();
  }, [token]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    const handleSocketEvent = (message, icon, type) => {
      toast(message, {
        icon,
        theme: "light",
        position: "top-right",
        autoClose: 5000,
      });
      setNotifications((prev) => [
        { message, createdAt: new Date(), read: false, type },
        ...prev,
      ]);
    };

    socket.on("test-message", (data) =>
      console.log("Received test message:", data.message)
    );

    socket.on("donation-created", (data) =>
      handleSocketEvent(
        `${data.message} (${data.foodType}, ${data.quantity})`,
        "🥕",
        "donation"
      )
    );

    socket.on("pickup-requested", (data) =>
      handleSocketEvent(
        `Pickup requested for "${data.foodName}" by ${data.recipientName}`,
        "🚚",
        "pickup"
      )
    );

    socket.on("donation-completed", (data) =>
      handleSocketEvent(
        `Donation "${data.foodName}" has been successfully completed!`,
        "✅",
        "completed"
      )
    );

    socket.on("admin-verified", (data) =>
      handleSocketEvent(
        `Admin verified donation: "${data.foodName}"`,
        "🛡️",
        "admin"
      )
    );

    return () => {
      socket.off("connect");
      socket.off("test-message");
      socket.off("donation-created");
      socket.off("pickup-requested");
      socket.off("donation-completed");
      socket.off("admin-verified");
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/donor-donations" element={<DonorDonations />} />
        <Route path="/available-donations" element={<AvailableDonations />} />
        <Route path="/verify" element={<VerifyDonations />} />
       <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/donor-overview" element={<DonorOverview />} />
        <Route path="/recipient-overview" element={<RecipientOverview />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

<Route
  path="/donor-dashboard"
  element={
    <PrivateRoute allowedRoles={["donor"]}>
      <DonorDashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/recipient-dashboard"
  element={
    <PrivateRoute allowedRoles={["recipient"]}>
      <RecipientDashboard />
    </PrivateRoute>
  }
/>

<Route
  path="/verify"
  element={
    <PrivateRoute allowedRoles={["admin"]}>
      <VerifyDonations />
    </PrivateRoute>
  }
/>

<Route
  path="/manage-users"
  element={
    <PrivateRoute allowedRoles={["admin"]}>
      <ManageUsers />
    </PrivateRoute>
  }
/>
<Route
  path="/donor-impact"
  element={
    <PrivateRoute allowedRoles={["donor"]}>
      <DonorImpact />
    </PrivateRoute>
  }
/>
<Route
  path="/recipient-requests"
  element={
    <PrivateRoute allowedRoles={["recipient"]}>
      <RecipientRequests />
    </PrivateRoute>
  }
/>
<Route
  path="/recipient-impact"
  element={
    <PrivateRoute allowedRoles={["recipient"]}>
      <RecipientImpact />
    </PrivateRoute>
  }
/>

        <Route
          path="/"
          element={
            token ? (
              <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
                <Navbar
                  notifications={notifications}
                  handleMarkAsRead={handleMarkAsRead}
                  handleMarkAllAsRead={handleMarkAllAsRead}
                />
                <main className="p-4 sm:p-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-green-700">
                    Zero Waste Exchange Frontend is Live!
                  </h1>
                </main>
                <Dashboard role={role} />
                <ToastContainer />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;