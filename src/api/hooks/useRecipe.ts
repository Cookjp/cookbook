import { useEffect, useState } from "react";
import load from "../TreeBuilder";
import StepNode from "../../StepNode";

const useRecipe = (slug: string | undefined) => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<StepNode>();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    load(slug).then((result) => {
      if (result.status === "Error") {
        setError(true);
        return;
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
  return { ingredients, steps, error };
};

export default useRecipe;
