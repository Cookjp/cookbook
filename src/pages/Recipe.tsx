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
      <h4 className="font-bold text-4xl mt-6 mb-2">Ingredients</h4>
      <ol start={0} className="list-decimal list-outside">
        {ingredients.map((ingredient) => {
          return <li key={ingredient}>{ingredient}</li>;
        })}
      </ol>
      <h4 className="font-bold text-4xl mt-12 mb-2">Steps</h4>
      <ol>{steps?.render(ingredients, isCompactMode)}</ol>
    </>
  );
}

export default Recipe;
