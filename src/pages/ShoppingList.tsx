import React from "react";
import { useSearchParams } from "react-router-dom";
import { RecipeDTO } from "../api/types/Recipe";

const ShoppingList = () => {
  const [searchParams] = useSearchParams();

  const recipesParam = searchParams.get("recipes"); // "foo,bar"

  const recipes: RecipeDTO[] = JSON.parse(recipesParam || "")
  
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <ul>
        {recipes.map((recipe) => (
          <div key={recipe.name}>
            <div className="font-bold text-3xl">
            {recipe.name}
            </div>
            <ul>
              {recipe.ingredients.map((ingredient) => (
                <li key={recipe + ingredient}>
                   <input type="checkbox" className="mr-2" />
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
