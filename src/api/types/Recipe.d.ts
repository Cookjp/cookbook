export interface RecipeDTO {
  name: string;
  ingredients: string[];
  steps: StepDTO[];
}

export interface StepDTO {
  label: string;
  skippable?: boolean;
  children?: StepDTO[];
}
