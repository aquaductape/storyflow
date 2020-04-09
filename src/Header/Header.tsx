import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearchMinus,
  faSearchPlus,
  faVectorSquare,
} from "@fortawesome/free-solid-svg-icons";
import InstructionRunner from "../InstructionsRunner/InstructionRunner";
import { saveWork, exportWork } from "../ContextMenu/flowNodesSlice";

import { setScale, decrement, increment } from "./scaleSlice";

export default function Header() {
  const dispatch = useDispatch();
  const [displayRunner, setDisplayRunner] = useState(false);
  const areaInnerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const areaInner = document.querySelector(
      ".flow-area-inner"
    )! as HTMLElement;
    areaInnerRef.current = areaInner;
  }, []);

  useEffect(() => {
    const zoomKeyInput = (e: KeyboardEvent | WheelEvent) => {
      if (e.type === "wheel") {
        e = e as WheelEvent;
        if (e.ctrlKey && e.deltaY < 0) {
          e.preventDefault();
          return onZoom("plus");
        }
        if (e.ctrlKey && e.deltaY > 0) {
          e.preventDefault();
          return onZoom("minus");
        }
      }
      if (e.type === "keydown") {
        e = e as KeyboardEvent;
        if (e.ctrlKey && e.key.match(/\=|\+/)) {
          e.preventDefault();
          return onZoom("plus");
        }
        if (e.ctrlKey && e.key.match(/\_|\-/)) {
          e.preventDefault();
          return onZoom("minus");
        }
      }
    };
    document.addEventListener("keydown", zoomKeyInput);
    document.addEventListener("wheel", zoomKeyInput, { passive: false });
    return () => {
      document.removeEventListener("keydown", zoomKeyInput, true);
      document.removeEventListener("wheel", zoomKeyInput);
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
    dispatch(saveWork());
  };

  const onRun = () => {
    setDisplayRunner(() => true);
  };

  const onExport = () => {
    dispatch(exportWork({ type: "json" }));
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
