import StepNode from "./StepNode";

async function fetchJsonFile(filePath: string) {
  return fetch(filePath, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }).then((response) => response.json());
}

function addChildren(node: StepNode, children: any[], depth: number): void {
  if (children) {
    for (const child of children) {
      const childNode = new StepNode(child["label"], depth + 1);
      node.addChild(childNode);
      addChildren(childNode, child["children"], depth + 1);
    }
  }
}

async function buildStepTreeFromFile(filename: string) {
  const json = await fetchJsonFile(filename + ".json");
  const ingredients = json["ingredients"];
  const rootNode = new StepNode("root", 0);
  addChildren(rootNode, json["steps"], 0);
  return { ingredients, stepTree: rootNode };
}

export default buildStepTreeFromFile;
