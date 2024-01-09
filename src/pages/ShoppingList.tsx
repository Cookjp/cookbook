import React from "react";
import { useSearchParams } from "react-router-dom";

const ShoppingList = () => {
  const [searchParams] = useSearchParams();

  const ingredients = searchParams.get("ingredients"); // "foo,bar"
  const ingredientList = ingredients?.split(",") ?? [];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Shopping List</h1>
      <ul>
        {ingredientList.map((ingredient, index) => (
          <li key={index} className="flex items-center">
            <input type="checkbox" className="mr-2" />
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;
