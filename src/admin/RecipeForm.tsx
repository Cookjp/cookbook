import React, { useState } from "react";
import { Recipe, Step } from "../types/Recipe";
import StepInput from "./components/StepInput";

const RecipeForm = () => {
  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [steps, setSteps] = useState<Step[]>([{ label: "", skippable: false }]);

  const handleIngredientChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const amendStep = (
    newStep: Step,
    idArray: number[],
    currentStep: Step
  ): Step => {
    const index = idArray[0];
    if (idArray.length === 0) {
      return newStep;
    }
    idArray.shift();
    const newChildren = currentStep.children?.map((step, i) => {
      if (i === index) {
        return amendStep(newStep, idArray, step);
      }
      return step;
    });
    return { ...currentStep, children: newChildren };
  };

  const handleStepChange = (newStep: Step, id: string) => {
    const idArray = id.split(".").map(parseFloat);
    const first = idArray[0];
    idArray.shift();
    const newChild = amendStep(newStep, idArray, steps[first]);
    const newSteps = steps.map((step, i) => {
      if (i === parseInt(id[0])) {
        return newChild;
      }
      return step;
    });
    setSteps(newSteps);
  };

  const handleSkippableChange = (index: number) => {
    const newSteps = [...steps];
    newSteps[index].skippable = !newSteps[index].skippable;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, { label: "", skippable: false }]);
  };

  const handleSubmit = () => {
    const recipe: Recipe = { ingredients, steps };
    console.log(recipe);
  };

  const removeStep = (idx: number) => {
    setSteps((oldSteps) => {
      return oldSteps.filter((_, i) => i !== idx);
    });
  };

  return (
    <div className="m-8 p-4 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Recipe Form</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Ingredients
        </label>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            className="w-full mt-2 p-2 border rounded"
          />
        ))}
        <button
          className="p-1 text-xs text-white rounded"
          onClick={() => addIngredient()}
        >
          Add Ingredient
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Steps</label>
        {steps.map((step, index) => {
          return (
            <div key={index}>
              <div>{index}</div>
              <button
                className="p-1 text-xs text-white rounded"
                onClick={() => removeStep(index)}
              >
                Remove
              </button>
              <StepInput
                key={index}
                id={index.toString()}
                step={step}
                handleSkippableChange={handleSkippableChange}
                parentChange={handleStepChange}
              />
            </div>
          );
        })}
        <button
          onClick={() => handleAddStep()}
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Step
        </button>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full p-2 bg-green-500 text-white rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default RecipeForm;
