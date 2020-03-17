import React, { useContext, useEffect, useState } from "react";
import FlowContext from "../../context/FlowContext";
import { createInstruction } from "../../lib/createInstruction";

export default function SideBar() {
  const {
    flowNodeUIState: { flowNodeUI },
    linkNodeState: { linkNode },
    flowAreaZoomState: { setFlowAreaZoom }
  } = useContext(FlowContext)!;
  const [instructionJSON, setInstructionJSON] = useState("");
  useEffect(() => {
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
