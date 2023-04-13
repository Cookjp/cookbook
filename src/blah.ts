import { satisfies } from "semver";

interface Step {
  data: string;
  depth: number;
}
// implements Iterable<Step>
export default class StepNode  {
    data: string;
    children: StepNode[];
    depth: number;
  
    constructor(data: string, depth: number) {
      this.data = data;
      this.depth = depth;
      this.children = [];
    }
    
  // [Symbol.iterator](): Iterator<Step, any, undefined> {
  //   throw new Error("Method not implemented.");
  // }
  
    addChild(node: StepNode) {
      this.children.push(node);
    }

    traverse(): Step[] {
      let data: Step | null = {data: this.data, depth: this.depth}
      if (this.depth === 0 ) data = null
      
      return [data]
      .concat(this.children.flatMap((child) => child.traverse()))
      .flatMap(f => f ? [f] : []); // removes nulls and is type safe
    }
  }

export type { Step }