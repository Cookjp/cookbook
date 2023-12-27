import StepNode from "./StepNode";
import repo from "./api/repo";
import { Step } from "./types/Recipe";

type TreeError = {
  status: "Error";
};

type TreeSuccess = {
  status: "Success";
  ingredients: string[];
  stepTree: StepNode;
};

type RecipeTree = TreeError | TreeSuccess;

function addChildren(
  node: StepNode,
  children: Step[] | undefined,
  depth: number
): void {
  if (children) {
    for (const child of children) {
      const childNode = new StepNode(child.label, depth + 1);
      node.addChild(childNode);
      addChildren(childNode, child.children, depth + 1);
    }
  }
}

async function buildStepTreeFromFile(filename: string): Promise<RecipeTree> {
  const result = await repo.fetchRecipe(filename);
  if (result.status === "Error") {
    return { status: "Error" };
  }
  const { ingredients, steps } = result.recipe;

  const rootNode = new StepNode("root", 0);
  addChildren(rootNode, steps, 0);
  return { status: "Success", ingredients, stepTree: rootNode };
}

export default buildStepTreeFromFile;
