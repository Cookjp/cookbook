import React from "react";
import { useAuth } from "../admin/AuthProvider";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="z-10 relative bg-gray-800 p-4 text-white flex justify-between items-center">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold">Cookbook</h1>
      </Link>
      {user && (
        <div className="flex items-center">
          <p className="mr-2 md:text-l text-xs">Welcome, {user.email}!</p>
          <button
            className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
