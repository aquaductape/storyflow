import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import FlowContext from "../context/FlowContext";
import { createInstruction } from "../lib/createInstruction";

export default function Header({
  zoomState: { flowAreaZoom, setFlowAreaZoom }
}: {
  zoomState: {
    flowAreaZoom: number;
    setFlowAreaZoom: React.Dispatch<React.SetStateAction<number>>;
  };
}) {
  const {
    flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    flowConnectState: { isFlowConnecting, setFlowConnecting },
    svgArrowState: { svgArrows, setSvgArrows },
    scrollPositionState: { scrollPosition, setScrollPosition }
  } = useContext(FlowContext)!;

  const onZoom = (zoom: "plus" | "minus") => {
    setFlowAreaZoom(prev => (zoom === "minus" ? prev - 5 : prev + 5));
  };
  const onSave = () => {
    const uiNodesStr = JSON.stringify(flowNodeUI);
    const svgArrowsStr = JSON.stringify(svgArrows);
    localStorage.setItem("UINodes", uiNodesStr);
    localStorage.setItem("SVGArrows", svgArrowsStr);
  };

  const onRun = () => {
    createInstruction(flowNodeUI);
  };
  return (
    <header className="main-header">
      <div className="toolbar">
        <div className="toolbar-item" onClick={() => onZoom("minus")}>
          <FontAwesomeIcon icon={faSearchMinus}></FontAwesomeIcon>
        </div>
        <div className="toolbar-item" onClick={() => onZoom("plus")}>
          <FontAwesomeIcon icon={faSearchPlus}></FontAwesomeIcon>
        </div>
        <div className="toolbar-item" onClick={onSave}>
          Save
        </div>
        <div className="toolbar-item">Export as JSON</div>
        <div className="toolbar-item" onClick={onRun}>
          Run
        </div>
      </div>
    </header>
  );
}
