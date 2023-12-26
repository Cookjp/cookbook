export interface Recipe {
    ingredients: string[]
    steps: Step[]
  }
  
export interface Step {
    label: string
    skippable?: boolean
    children?: Step[]
}