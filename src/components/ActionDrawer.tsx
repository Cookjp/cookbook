import React from "react";
import repo, { RecipeRes } from "../api/repo";
import { useNavigate } from "react-router-dom";

interface ActionDrawerProps {
  actions: {
    label: string;
    onClick: () => void;
  }[];
}

const ActionDrawer = ({ actions }: ActionDrawerProps) => {
  return (
    <div className="fixed top-0 right-0 h-full p-4 flex flex-col items-end border-l-2 border-gray-400 bg-gray-400">
      <div className="pt-24">
        {actions.map((action, index) => (
          <button
            key={index}
            className="mb-2 p-2 rounded bg-blue-500 text-white"
            onClick={action.onClick}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};

interface ActionDrawerWrapperProps {
  selectedRecipes: Set<string>;
}

const ActionDrawerWrapper = ({ selectedRecipes }: ActionDrawerWrapperProps) => {
  const nav = useNavigate();
  const generateShoppingList = async () => {
    const promises: Promise<RecipeRes>[] = [];
    selectedRecipes.forEach(async (slug) => {
      const promise = repo.fetchRecipe(slug);
      promises.push(promise);
    });
    const result = (await Promise.all(promises)).map((res) => {
      if (res.status == "Success") {
        return res.recipe.ingredients;
      } else {
        return ["could not generate"];
      }
    });
    nav("/shopping-list?ingredients=" + result.join(","));
  };

  return (
    <ActionDrawer
      actions={[{ label: "Generate List", onClick: generateShoppingList }]}
    />
  );
};

export default ActionDrawerWrapper;
