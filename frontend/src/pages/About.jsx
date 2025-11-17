import React from "react";

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌍 About Zero Waste Exchange</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Our Mission</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Zero Waste Exchange bridges the gap between surplus and need. We empower donors to share excess food and recipients to access it with dignity — reducing waste, fighting hunger, and building a more compassionate community.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Our Goals</h2>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>🥕 Reduce food waste at the source</li>
          <li>🍽️ Improve food access for vulnerable communities</li>
          <li>🔄 Create a transparent, real-time exchange system</li>
          <li>🌱 Align with UN Sustainable Development Goals (SDG 2 & 12)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-600 mb-2">How It Works</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Donors post surplus food. Recipients request and confirm pickups. Admins verify and track impact. Our platform ensures secure, role-based access and real-time coordination — all designed to maximize social good.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-green-600 mb-2">Join the Movement</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Whether you're a donor, recipient, or advocate — your actions matter. Together, we can build a world where no good food goes to waste and no one goes hungry.
        </p>
      </section>
    </div>
  );
};

export default About;