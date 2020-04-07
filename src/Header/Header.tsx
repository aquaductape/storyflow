import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchMinus,
  faSearchPlus,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";
import FlowContext from "../context/FlowContext";
import { createInstruction } from "../lib/createInstruction";
import InstructionRunner from "../InstructionsRunner/InstructionRunner";
import downloadObjectAsJson from "../lib/downloadObjectAsJSON";

import { setScale, decrement, increment } from "./scaleSlice";
import { RootState } from "../app/rootReducer";

export default function Header() {
  const {
    flowNodeUIState: { flowNodeUI },
    linkNodeState: { linkNode },
  } = useContext(FlowContext)!;
  const [displayRunner, setDisplayRunner] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const zoomKeyInput = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.match(/\=|\+/)) {
        e.preventDefault();
        return onZoom("plus");
      }
      if (e.ctrlKey && e.key.match(/\_|\-/)) {
        e.preventDefault();
        return onZoom("minus");
      }
    };
    document.addEventListener("keydown", zoomKeyInput);
    return () => {
      document.removeEventListener("keydown", zoomKeyInput);
    };
  }, []);

  const onZoom = (zoom: "plus" | "minus" | "reset") => {
    switch (zoom) {
      case "minus":
        dispatch(decrement());
        break;
      case "plus":
        dispatch(increment());
        break;
      case "reset":
        dispatch(setScale(100));
        break;
    }
  };
  const onSave = () => {
    const uiNodesStr = JSON.stringify(flowNodeUI);
    const svgArrowsStr = JSON.stringify(linkNode);
    localStorage.setItem("UINodes", uiNodesStr);
    localStorage.setItem("SVGArrows", svgArrowsStr);
  };

  const onRun = () => {
    setDisplayRunner(() => true);
  };

  const onExport = () => {
    const data = createInstruction(flowNodeUI);
    downloadObjectAsJson(data, "storyflow");
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
        <div className="toolbar-item" onClick={() => onZoom("reset")}>
          Reset Zoom
          <FontAwesomeIcon icon={faVectorSquare}></FontAwesomeIcon>
        </div>
        <div className="toolbar-item" onClick={onSave}>
          Save
        </div>
        <div className="toolbar-item" onClick={onExport}>
          Export as JSON
        </div>
        <div className="toolbar-item" onClick={onRun}>
          Run
        </div>
      </div>
      {displayRunner ? (
        <InstructionRunner
          setDisplayRunner={setDisplayRunner}
        ></InstructionRunner>
      ) : null}
      <style jsx>
        {`
          .main-header {
            height: 50px;
            width: 100%;
            padding: 5px;
            background-image: linear-gradient(
              90.5deg,
              #d029c7 1.6%,
              #b64ce9 98.2%
            );
          }

          .toolbar {
            display: flex;
            align-items: center;
            height: 100%;
          }
          .toolbar-item {
            color: #fff;
            font-size: 25px;
            padding: 5px;
            // margin-right: 10px;
            border-right: 1px solid #fff;
          }
          .toolbar-item:hover {
            cursor: pointer;
          }
        `}
      </style>
    </header>
  );
}
