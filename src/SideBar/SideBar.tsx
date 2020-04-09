import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../context/FlowContext";
import { createInstruction } from "../utils/createInstruction";

export default function SideBar() {
  const {
    flowNodeUIState: { flowNodeUI },
    linkNodeState: { linkNode },
  } = useContext(FlowContext)!;
  const [instructionJSON, setInstructionJSON] = useState("");
  useEffect(() => {
    if (!flowNodeUI.length) return;

    const instruction = createInstruction(flowNodeUI);
    setInstructionJSON(() => JSON.stringify(instruction, null, 2));
  }, [linkNode.length]);
  return (
    <div className="main">
      <pre>{instructionJSON}</pre>

      <style jsx>
        {`
          .main {
            position: fixed;
            top: 50px;
            left: 0;
            width: 350px;
            bottom: 0;
            background: #fff;
            overflow: scroll;
            z-index: 5;
          }
        `}
      </style>
    </div>
  );
}
