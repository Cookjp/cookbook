import React from "react";
import { StepDTO } from "../../api/types/Recipe";

interface StepProps {
  step: StepDTO;
  id: string;
  parentChange: (step: StepDTO, id: string) => void;
  handleSkippableChange: (index: number) => void;
}

const StepInput = ({
  step,
  id,
  parentChange,
  handleSkippableChange,
}: StepProps) => {
  const handlChildStepChange = (newStep: StepDTO, id: string) => {
    parentChange(newStep, id);
  };

  const handleInputChange = (input: string) => {
    const newStep = { ...step, label: input };
    parentChange(newStep, id);
  };

  const addChild = () => {
    const newChildren = [
      ...(step.children || []),
      { label: "", skippable: false },
    ];
    const newStep = { ...step, children: newChildren };
    parentChange(newStep, id);
  };

  const removeChild = (idx: number) => {
    const newChildren = step.children;
    if (!newChildren) {
      throw new Error("Cannot remove child step");
    }
    newChildren.splice(idx, 1);
    const newStep = { ...step, children: newChildren };
    parentChange(newStep, id);
  };

  return (
    <div className="ml-2">
      <div className="flex items-center mt-2">
        <hr className={`border-t border-2 w-[${id.length * 2}px]`} />
        <input
          key={id}
          type="text"
          value={step.label}
          onChange={(e) => {
            const val = e.target.value;
            handleInputChange(val);
          }}
          className="w-3/4 p-2 border rounded mr-2"
        />
        {/* <label className="flex items-center">
            <input
              type="checkbox"
              checked={step.skippable}
              onChange={() => handleSkippableChange(index)}
              className="mr-1"
            />
            <span className="text-sm">Skippable</span>
          </label> */}
        <button
          className="p-1 text-xs text-white rounded"
          onClick={() => addChild()}
        >
          Add Child Step
        </button>
      </div>
      {step.children?.map((step, idx) => {
        return (
          <div key={id + "." + idx}>
            <div>{id + "." + idx}</div>
            <button
              className="p-1 text-xs text-white rounded"
              onClick={() => removeChild(idx)}
            >
              Remove
            </button>
            <StepInput
              id={id + "." + idx.toString()}
              step={step}
              handleSkippableChange={handleSkippableChange}
              parentChange={handlChildStepChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StepInput;
