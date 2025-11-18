import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-6 text-center">
          🌍 About Zero Waste Exchange
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Zero Waste Exchange bridges the gap between surplus and need. We empower donors to share excess food and recipients to access it with dignity — reducing waste, fighting hunger, and building a more compassionate community.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Our Goals</h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
            <li>🥕 Reduce food waste at the source</li>
            <li>🍽️ Improve food access for vulnerable communities</li>
            <li>🔄 Create a transparent, real-time exchange system</li>
            <li>🌱 Align with UN Sustainable Development Goals (SDG 2 & 12)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">How It Works</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Donors post surplus food. Recipients request and confirm pickups. Admins verify and track impact. Our platform ensures secure, role-based access and real-time coordination — all designed to maximize social good.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">Join the Movement</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you're a donor, recipient, or advocate — your actions matter. Together, we can build a world where no good food goes to waste and no one goes hungry.
          </p>
        </section>

        <div className="text-center">
          <a
            href="https://sdgs.un.org/goals/goal12"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 dark:text-green-300 underline text-sm"
          >
            Learn more about SDG 12: Responsible Consumption and Production
          </a>
        </div>
      </div>

      <footer className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
        © {new Date().getFullYear()} Zero Waste Exchange. Built with purpose.
      </footer>
    </div>
  );
};

export default About;