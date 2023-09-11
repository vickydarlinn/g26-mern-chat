import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-950">
      <h1 className="text-4xl font-bold mb-4 text-white">
        Welcome to G26 Chat App
      </h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
