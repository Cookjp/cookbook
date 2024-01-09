import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import repo from "../api/repo";
import ActionDrawer from "../components/ActionDrawer";

async function fetchIndex(): Promise<string[]> {
  return repo.fetchIndex();
}

const Index = () => {
  const [recipes, setRecipes] = useState<string[]>([]);
  const [selectedRecipes, setSelectedRecipes] = useState<Set<string>>(
    new Set()
  );

  const [isSelectMode, setIsSelectMode] = useState(false);

  useEffect(() => {
    fetchIndex().then((recipeJson) => {
      setRecipes(recipeJson);
    });
  }, []);

  const handleSelection = (event: any) => {
    const { value } = event.target;
    const newSelectedRecipes = new Set(selectedRecipes);
    if (newSelectedRecipes.has(value)) {
      newSelectedRecipes.delete(value);
    } else {
      newSelectedRecipes.add(value);
    }
    setSelectedRecipes(newSelectedRecipes);
  };

  return (
    <div>
      <div className="flex gap-4 flex-wrap">
        {recipes.map((recipe) => (
          <div className="flex gap-4" key={recipe}>
            {isSelectMode ? (
              <button
                className={`nav ${
                  selectedRecipes.has(recipe) ? "border-2 border-blue-800" : ""
                }`}
                onClick={handleSelection}
                value={recipe}
              >
                {recipe.replaceAll("-", " ")}
              </button>
            ) : (
              <Link to={`/recipe/${recipe}`}>
                <button className="nav">{recipe.replaceAll("-", " ")}</button>
              </Link>
            )}
            {/* <label htmlFor={recipe} className="flex gap-12">
              <input
                type="checkbox"
                id={recipe}
                value={recipe}
                checked={selectedRecipes.has(recipe)}
                onChange={handleSelection}
              />
            </label> */}
          </div>
        ))}
      </div>
      <ActionDrawer
        selectedRecipes={selectedRecipes}
        setIsSelectMode={setIsSelectMode}
        isSelectMode={isSelectMode}
      />
    </div>
  );
};

export default Index;
