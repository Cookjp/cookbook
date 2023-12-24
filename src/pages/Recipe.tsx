import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import StepNode from "../StepNode";
import load from "../TreeBuilder";
import { Link, useNavigate } from "react-router-dom";
import { Step } from "../components/Step";
import NotFound from "./NotFound";


const useRecipe = (slug :string | undefined) => {
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState<StepNode>();
  const [ok, setOK] = useState(true)

  useEffect(() => {
    if(!slug) return 
    load(slug).then((result) => {
      if(result.status === 404) {
        setOK(false)
        return 
      }
      setSteps(result.stepTree);

      const allStepLabels = result.stepTree?.traverse().join(" ");

      const ingredients = result.ingredients?.filter((x: string) => {
        return allStepLabels.includes(x);
      });
      const sorted = ingredients?.sort((a: string, b: string) => {
        return allStepLabels.indexOf(a) - allStepLabels.indexOf(b);
      });

      setIngredients(sorted);

    });
  }, [slug]);
  return { ingredients, steps, ok }
}

function Recipe() {
  const { slug } = useParams();
  const [isCompactMode, setCompactMode] = useState(false);

  const { steps, ingredients, ok } = useRecipe(slug);

  if(!ok) {
    return <NotFound/>
  }

  if(!ingredients || !steps) return null
  
  return (
    <>
      <div className="flex gap-4">
        <Link to="/">
          <button className="nav">Home</button>
        </Link>
        <button
          className="nav"
          onClick={() => {
            setCompactMode(!isCompactMode);
          }}
        >
          Compact Mode
        </button>
      </div>
      <div className="md:flex gap-24 flex-nowrap">
        {/* Ingredeients List */}
        <div className="block">
          <h4 className="font-bold text-4xl mt-6 mb-2">Ingredients</h4>
          <ol start={1} className="list-decimal list-outside ml-4">
            {ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ol>
        </div>
        {/* Recipe steps list */}
        <div className="block">
          <h4 className="font-bold text-4xl mt-12 md:mt-6 mb-2">Steps</h4>
          {steps && <div className="ml-5"><Step node={steps} ingredients={ingredients} isCompactMode={isCompactMode}/> </div>}
        </div>
      </div>
    </>
  );
}

export default Recipe;
