import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-2xl text-center bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Welcome to Wellness 🌿</h1>
        <p className="text-gray-700 text-lg mb-6">
          A peaceful space to create, explore, and engage in meaningful wellness experiences. 
          Whether you're here to reflect, meditate, or guide others, Wellness helps you find your center.
        </p>
        <Link to="/login" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
