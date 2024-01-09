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
  setIsSelectMode: (isSelectMode: boolean) => void;
  isSelectMode: boolean;
}

const ActionDrawerWrapper = ({
  selectedRecipes,
  setIsSelectMode,
  isSelectMode,
}: ActionDrawerWrapperProps) => {
  const nav = useNavigate();
  const generateShoppingList = async () => {
    const promises: Promise<RecipeRes>[] = [];
    selectedRecipes.forEach(async (slug) => {
      const promise = repo.fetchRecipe(slug);
      promises.push(promise);
    });
    const result = (await Promise.all(promises)).map((res) => {
      if (res.status == "Success") {
        return { name: res.recipe.name, ingredients: res.recipe.ingredients };
      } else {
        return ["could not generate"];
      }
    });
    nav("/shopping-list?recipes=" + JSON.stringify(result));
  };

  const actions = isSelectMode
    ? [
        { label: "Generate List", onClick: generateShoppingList },
        { label: "Cancel", onClick: () => setIsSelectMode(false) },
      ]
    : [{ label: "Select Recipes", onClick: () => setIsSelectMode(true) }];
  return <ActionDrawer actions={actions} />;
};

export default ActionDrawerWrapper;
