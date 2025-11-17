// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.text();
        alert("Login failed: " + error);
        return;
      }

      const data = await res.json();
    localStorage.setItem("token", data.token);
localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("role", data.user.role);

if (data.user.role === "donor") {
  window.location.href = "/donor-dashboard";
} else if (data.user.role === "recipient") {
  window.location.href = "/recipient-dashboard";
} else if (data.user.role === "admin") {
  window.location.href = "/admin-verification";
} else {
  window.location.href = "/"; // fallback
}
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
    <div className="flex flex-col">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Log In
        </button>
      </form>
      <p className="text-sm mt-6 text-center text-gray-600 dark:text-gray-300">
        Don’t have an account?{" "}
        <a href="/signup" className="text-green-600 hover:underline">
          Sign up here
        </a>
      </p>
     </div>
    </div>
   </div>
  );
}

export default Login;