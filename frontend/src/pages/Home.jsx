import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gray-100 dark:bg-gray-900 p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-4">Zero Waste Exchange</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center max-w-xl">
        Bridging abundance and need. Join the movement.
        </p>

      {/* Visual Banner */}
      <img
        src="/images/sdg/12_SDG_MakeEveryDayCount_Gifs_GDU.gif"
        alt="SDG 12"
        className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto mb-2 transition-transform duration-300 hover:scale-105 hover:drop-shadow-lg"
      />
       <p className="text-sm text-green-700 font-semibold text-center">
    Aligned with SDG 12: Responsible Consumption and Production
  </p>


      {/* Role-Specific Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-bold text-green-700">12,480+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Meals Donated</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-bold text-green-700">3,200kg</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Food Waste Prevented</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h3 className="text-xl font-bold text-green-700">850+</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Families Supported</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-4 max-w-3xl">
        <p className="italic text-gray-700 dark:text-gray-300">
          “This platform helped me feed my family when times were tough. I’m forever grateful.” – Amina, Recipient
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 max-w-3xl">
        <p className="italic text-gray-700 dark:text-gray-300">
          “I used to throw away surplus food. Now I know it’s making a difference.” – Kamau, Donor
        </p>
      </div>

      {/* Mission Quote */}
      <p className="italic text-green-800 mb-6">
        “Waste less. Feed more. Build community.”
      </p>

      <a
    href="https://sdgs.un.org/goals/goal12"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-600 underline text-sm mt-1"
  >
    Learn more about SDG 12
  </a>

    </main>
  );
}