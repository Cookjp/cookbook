import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import RecipeForm from "./RecipeForm";

const Admin = () => {
  const { user, loading } = useAuth();
  const nav = useNavigate();

  // If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!user && !loading) {
      nav("/login");
    }
  }, [user, loading]);

  if (!user || loading) return null;
  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-800 text-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4">Admin Page</h2>
        <p>Welcome, {user.email}!</p>
        {/* Add admin-specific content here */}
      </div>
      <div className="w-full">
        <RecipeForm />
      </div>
    </>
  );
};

export default Admin;
