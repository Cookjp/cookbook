import React from 'react'

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

    traverse(): string[] {
      let data = this.data
      if (this.depth === 0 ) data = ''
      
      return [data]
      .concat(this.children.flatMap((child) => child.traverse()))
      .flatMap(f => f ? [f] : []); // removes nulls and is type safe
    }

    render(ingredients: string[], isCompactMode: boolean) {

      let compactData = this.data
      ingredients.forEach((ingredient: string, idx: number) => {
        compactData = compactData.replace(ingredient, (idx).toString())
      });

      return (
      <>
      {this.depth !== 0  && <li key={this.data} className={this.depth === 1 ? 'font-bold' : ''}>{isCompactMode ? compactData : this.data}</li>}
      {this.children.length !== 0
      && <ol start={0}>
        {this.children.map((child) =>  child.render(ingredients, isCompactMode))}  
      </ol>
      }
      </>
      )
    }
  }

export type { Step }