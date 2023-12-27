import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { kv } from "@vercel/kv";

async function fetchIndex(): Promise<string[]> {
  return kv.scan(0).then((res) => {
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
