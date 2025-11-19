import { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("donor"); // default role

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Register the user
      const registerRes = await fetch("${import.meta.env.VITE_API_URL}/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!registerRes.ok) {
        let errText;
        try {
          const contentType = registerRes.headers.get('content-type') || '';
          errText = contentType.includes('application/json') ? (await registerRes.json()).message : await registerRes.text();
        } catch (e) {
          errText = registerRes.statusText || 'Unknown error';
        }
        alert("Signup failed: " + JSON.stringify(errText));
        return;
      }

      // Step 2: Auto-login after successful signup
      const loginRes = await fetch("${import.meta.env.VITE_API_URL}/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginRes.ok) {
        alert("Signup successful but auto-login failed. Please log in manually.");
        window.location.href = "/login";
        return;
      }

      const loginData = await loginRes.json();
      localStorage.setItem("token", loginData.token);
      localStorage.setItem("user", JSON.stringify(loginData.user));
      localStorage.setItem("role", loginData.user.role);

      // Redirect to dashboard based on role
      if (loginData.user.role === "donor") {
  window.location.href = "/donor-dashboard";
} else if (loginData.user.role === "recipient") {
  window.location.href = "/recipient-dashboard";
} else if (loginData.user.role === "admin") {
  window.location.href = "/admin-verification";
} else {
  window.location.href = "/dashboard"; // fallback
}

    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-green-700">Sign Up</h2>
        <input
          type="text"
          placeholder="Full name"
          className="w-full mb-4 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="donor">Donor</option>
          <option value="recipient">Recipient</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
        <hr className="my-6" />
  <p className="mt-4 text-sm text-gray-600 text-center">
    Already have an account?{" "}
    <Link to="/login" className="text-blue-600 hover:underline">
      Log in
    </Link>
  </p>
</form>
    </div>
  );
}

export default Signup;