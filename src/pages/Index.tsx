import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import repo from "../api/repo";

async function fetchIndex(): Promise<string[]> {
  return repo.fetchIndex();
}

const Index = () => {
  const [recipes, setRecipes] = useState<string[]>([]);

  useEffect(() => {
    fetchIndex().then((recipeJson) => {
      setRecipes(recipeJson);
    });
  }, []);

  return (
    <div className="flex gap-4 flex-wrap">
      {recipes.map((recipe) => (
        <Link key={recipe} to={`/recipe/${recipe}`}>
          <button className="nav">{recipe.replaceAll("-", " ")}</button>
        </Link>
      ))}
    </div>
  );
};

export default Index;
