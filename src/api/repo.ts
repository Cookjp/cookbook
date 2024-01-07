import { RecipeDTO } from "./types/Recipe";
import client from "./client";

type Error = {
  status: "Error";
};

type RecipeSuccess = {
  status: "Success";
  recipe: RecipeDTO;
};

type RecipeRes = RecipeSuccess | Error;

const ERROR: Error = { status: "Error" };

const fetchRecipe = (filename: string): Promise<RecipeRes> => {
  return (
    client
      .get<RecipeDTO>(filename)
      .then((response) => {
        if (!response) {
          return ERROR;
        } else {
          return { status: "Success" as const, recipe: response };
        }
      })
      // Not sure why, but this is not called when an error occurs in kv.get (problem in 3rd party?)
      .catch(() => {
        return ERROR;
      })
  );
};

const setRecipe = (name: string, recipe: RecipeDTO) => {
  const key = name.replace(/ /g, "-").toLowerCase();
  return client.set<RecipeDTO>(key, recipe);
};

const fetchIndex = () => {
  return client.scan().then((res) => res);
};

export default { fetchRecipe, setRecipe, fetchIndex };
