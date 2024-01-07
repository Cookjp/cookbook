import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import RecipeForm from "./RecipeForm";
import useRecipe from "../api/hooks/useRecipe";
import { RecipeDTO } from "../api/types/Recipe";

const Admin = () => {
  const { slug } = useParams();
  const { user, loading } = useAuth();
  const nav = useNavigate();

  const fetchedRecipe = useRecipe(slug);

  // should have made RecipeForm accept a StepNode instead of a list of steps
  // then this `toDTO()` method wouldn't be needed 
  // I can't be bothered to sort this out as it means reworking the whole form.
  const steps = fetchedRecipe.steps?.toDTO() || [];

  const recipe: RecipeDTO = {
    ingredients: fetchedRecipe.ingredients,
    steps: steps
  };

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
      </div>
      <div className="w-full">
        <RecipeForm recipe={recipe} slug={slug} />
      </div>
    </>
  );
};

export default Admin;
