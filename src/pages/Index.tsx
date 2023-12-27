import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

async function fetchIndex(): Promise<string[]> {
  return client.scan(0).then((res) => {
    return res[1];
  });
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
