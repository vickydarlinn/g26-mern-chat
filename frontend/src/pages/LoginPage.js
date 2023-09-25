import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/store";

function LoginPage() {
  const navigate = useNavigate();
  const [loginUserFn] = useLoginMutation();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here using credentials.email and credentials.password
    try {
      setIsLoading(true);
      const resp = await loginUserFn(credentials);
      setIsLoading(false);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("userId", resp.data.userId);
      localStorage.setItem("userName", resp.data.userName);

      return navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginAsGuest = () => {
    // Fill in the email and password fields with guest credentials
    setCredentials({
      email: "vicky@gmail.com",
      password: "123456",
    });
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Login to G26 Chat App</h1>
      <form className="w-full max-w-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email or Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email or Username"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <button
            className={`${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type="button"
            onClick={handleLoginAsGuest}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as a Guest"}
          </button>
        </div>
        <p>
          Account doesn't exist? <Link to="/register">Create here</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
