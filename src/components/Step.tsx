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
    <div className={`flex justify-between ${!isRoot && 'accordion'}`}>
      <div className={`block w-full`}>
        {!isRoot && (
                <li
                    key={node.data}
                    className={`li-indent-${node.depth} mr-8 ${node.depth === 1 ? "font-bold" : ""}`}
                >
                    {isCompactMode ? compactData : node.data}
                </li>
        )}
        {hasChildren && (
          <ol className={`list-decimal list-inside ${show ? '' : 'opacity-0 h-0'}`} start={1}>
            {node.children.map((child) =>
            <Step key={child.data} node={child} ingredients={ingredients} isCompactMode={isCompactMode}/>
            )}
          </ol>
        )}
      </div>
      {!isRoot && hasChildren && <button className="dropdown bg-grey-200 text-[#646cff]" onClick={() => setShow(!show)}><span>{show ? "-" : "+"}</span></button> }
      </div>
    );
  }


//                   {/* <button classNameonClick={() => setShow(!show)}>{">"}</button> */}
