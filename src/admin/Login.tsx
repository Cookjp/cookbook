import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const { login, user, loading } = useAuth();

  const onSuccess = () => {
    nav("/admin");
  };

  // if user is authenticated, redirect to Admin page
  useEffect(() => {
    if (user && !loading) {
      nav("/admin");
    }
  }, [user, loading]);

  const handleLogin = () => {
    if (email && password) {
      login(email, password).then(onSuccess);
    } else {
      setError("Please provide both email and password.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-800 text-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            className="border border-gray-600 rounded w-full py-2 px-3 text-white"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 text-sm font-bold mb-2">
            Password:
          </label>
          <input
            className="border border-gray-600 rounded w-full py-2 px-3 text-white"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          type="button"
          onClick={handleLogin}
        >
          Login
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
