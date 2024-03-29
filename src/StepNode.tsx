// Tree node used to construct a recipe tree
// components/Step.tsx can render this

import { RecipeDTO, StepDTO } from "./api/types/Recipe";

export default class StepNode {
  data: string;
  children: StepNode[];
  depth: number;

  constructor(data: string, depth: number) {
    this.data = data;
    this.depth = depth;
    this.children = [];
  }

  addChild(node: StepNode) {
    this.children.push(node);
  }

  traverse(): string[] {
    let data = this.data;
    if (this.depth === 0) data = "";

    return [data]
      .concat(this.children.flatMap((child) => child.traverse()))
      .flatMap((f) => (f ? [f] : [])); // removes nulls and is type safe
  }

  toDTO(): StepDTO[] {
    return this.children.map((child) => this.transformStepNodeToDTO(child));
  }

  private transformStepNodeToDTO(node: StepNode): StepDTO {
    const stepDTO: StepDTO = {
      label: node.data,
      children: node.children.map((child) =>
        this.transformStepNodeToDTO(child)
      ),
    };

    if (node.depth === 0) {
      stepDTO.skippable = true;
    }

    return stepDTO;
  }
}
