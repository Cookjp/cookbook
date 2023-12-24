import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import StepNode, { Step } from "../StepNode";
import load from "../TreeBuilder";
import { Link } from "react-router-dom";

function Recipe() {
  const { slug } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState<StepNode>();
  const [isCompactMode, setCompactMode] = useState(false);
  let loaded = false;
  if (!slug) return null;

  useEffect(() => {
    load(slug).then((result) => {
      setSteps(result.stepTree);

      const allStepLabels = result.stepTree?.traverse().join(" ");

      const ingredients = result.ingredients.filter((x: string) => {
        return allStepLabels.includes(x);
      });
      const sorted = ingredients.sort((a: string, b: string) => {
        return allStepLabels.indexOf(a) - allStepLabels.indexOf(b);
      });

      setIngredients(sorted);

      loaded = true;
    });
  }, []);

  return (
    <>
      <div className="flex gap-4">
        <Link to="/">
          <button>Home</button>
        </Link>
        <button
          onClick={() => {
            setCompactMode(!isCompactMode);
          }}
        >
          Compact Mode
        </button>
      </div>
      <div className="md:flex gap-24 flex-wrap">
        <div className="block">
          <h4 className="font-bold text-4xl mt-6 mb-2">Ingredients</h4>
          <ol start={1} className="list-decimal list-outside ml-4">
            {ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ol>
        </div>
        <div className="block">
          <h4 className="font-bold text-4xl mt-12 md:mt-6 mb-2">Steps</h4>
          <ol className="ml-5">{steps?.render(ingredients, isCompactMode)}</ol>
        </div>
      </div>
    </>
  );
}

export default Recipe;
