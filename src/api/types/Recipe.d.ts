export interface RecipeDTO {
  ingredients: string[];
  steps: StepDTO[];
}

export interface StepDTO {
  label: string;
  skippable?: boolean;
  children?: StepDTO[];
}
