import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function fetchIndex(): Promise<string[]> {
  return fetch("recipe/index.json", {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json());
}

const Index = () => {
  const [recipes, setRecipes] = useState<string[]>([]);

  useEffect(() => {
    fetchIndex().then((recipeJson) => {
      setRecipes(recipeJson);
    });
  }, []);

  return (
    <div className="flex gap-4">
      {recipes.map((recipe) => (
        <Link key={recipe} to={`/recipe/${recipe}`}>
          <button className="nav">{recipe.replaceAll("-", " ")}</button>
        </Link>
      ))}
    </div>
  );
};

export default Index;
