import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-green-700 dark:text-green-400">Zero Waste Exchange</h1>
        <div className="space-x-4 text-sm sm:text-base">
          <button onClick={() => navigate("/donor-donations")} className="text-green-700 dark:text-green-300 hover:underline">
            Donate
          </button>
          <button onClick={() => navigate("/recipient-requests")} className="text-green-700 dark:text-green-300 hover:underline">
            Request
          </button>
          <button onClick={() => navigate("/login")} className="text-green-700 dark:text-green-300 hover:underline">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="text-green-700 dark:text-green-300 hover:underline">
            Sign Up
          </button>
          <button onClick={() => navigate("/about")} className="text-green-700 dark:text-green-300 hover:underline">
            About
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow px-6 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-green-700 dark:text-green-300 mb-4">
            Bridging abundance and need.
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Join the movement to rescue surplus food and support families in need.
          </p>

          {/* Visual Banner */}
          <img
            src="/images/foodbank.jpg"
            alt="SDG 12"
            className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto mx-auto mb-2 transition-transform duration-300 hover:scale-105 hover:drop-shadow-lg"
          />
          <p className="text-sm text-green-700 dark:text-green-400 font-semibold mb-6">
            Aligned with SDG 12: Responsible Consumption and Production
          </p>

          {/* Role-Specific Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={() => navigate("/signup?role=donor")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              🍽 I want to donate food
            </button>
            <button
              onClick={() => navigate("/signup?role=recipient")}
              className="bg-white text-green-600 border border-green-600 px-6 py-2 rounded hover:bg-green-50"
            >
              🛒 I need food support
            </button>
          </div>

          {/* Real-Time Impact Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-10">
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">12,480+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Meals Donated</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">3,200kg</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Food Waste Prevented</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300">850+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Families Supported</p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 max-w-3xl mx-auto">
            <p className="italic text-gray-700 dark:text-gray-300">
              “This platform helped me feed my family when times were tough. I’m forever grateful.” – Amina, Recipient
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-10 max-w-3xl mx-auto">
            <p className="italic text-gray-700 dark:text-gray-300">
              “I used to throw away surplus food. Now I know it’s making a difference.” – Kamau, Donor
            </p>
          </div>

          {/* Mission Quote */}
          <p className="italic text-green-800 dark:text-green-400 mb-6">
            “Waste less. Feed more. Build community.”
          </p>

          <a
            href="https://sdgs.un.org/goals/goal12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-300 underline text-sm"
          >
            Learn more about SDG 12
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
        © {new Date().getFullYear()} Zero Waste Exchange. All rights reserved.
      </footer>
    </div>
  );
}