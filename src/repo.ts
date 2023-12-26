import { kv } from "@vercel/kv";
import { Recipe } from "./types/Recipe";

type Error = {
  status: "Error"
}

type RecipeSuccess = {
  status: "Success"
  recipe: Recipe
}

type RecipeRes = RecipeSuccess | Error

const ERROR: Error = { status: "Error" }

const fetchRecipe = (filename: string): Promise<RecipeRes> => {
  return kv.get<Recipe>(filename).then((response) => {
    if(!response) {
      return ERROR
    } else {
      return {status: "Success" as const, recipe: response}
    }
  })
  // Not sure why, but this is not called when an error occurs in kv.get (problem in 3rd party?)
  .catch(() => { 
    return ERROR
  })
}

export default { fetchRecipe }