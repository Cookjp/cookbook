import React, { useState } from "react";
import StepNode from "../StepNode";

interface Props {
    node: StepNode
    ingredients: string[]
    isCompactMode: boolean
  }
  
  export const Step = ({node, ingredients, isCompactMode}: Props) => {
    const [show, setShow] = useState(true)

    let compactData = node.data;
    ingredients.forEach((ingredient: string, idx: number) => {
      const regexPattern = new RegExp("(?<![a-zA-Z])" + ingredient + "(?![a-zA-Z])", "g");
      compactData = compactData.replace(regexPattern, `${idx+1}`);
    });
    

    const isRoot = node.depth === 0
    const hasChildren = node.children.length !== 0 

    return (
    <div className="flex">
     {!isRoot && <button className="dropdown" onClick={() => setShow(!show)}><div className={`${show ? 'rotate-90' : ''}`}>{">"}</div></button> }
      <div className={`block ${show ? '' : 'invisible h-0'}`}>
        {!isRoot && (
                <li
                    key={node.data}
                    className={`li-indent-${node.depth} ${node.depth === 1 ? "font-bold" : ""}`}
                >
                    {isCompactMode ? compactData : node.data}
                </li>
        )}
        {hasChildren && (
          <ol className="list-decimal list-inside" start={1}>
            {node.children.map((child) =>
            <Step key={child.data} node={child} ingredients={ingredients} isCompactMode={isCompactMode}/>
            )}
          </ol>
        )}
      </div>
      </div>
    );
  }


//                   {/* <button classNameonClick={() => setShow(!show)}>{">"}</button> */}
