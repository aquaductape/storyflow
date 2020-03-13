import React, { useState } from "react";
import { FlowDraggable, IFlowShape } from "../../models/FlowShape";
import Decision from "./Decision";
import Process from "./Process";
import Start from "./Start";
import { DraggableData, DraggableEvent } from "react-draggable";

export default function FlowShape({
  type,
  id,
  isConnected,
  content,
  arrowConnectState,
  dragState,
  answers,
  onBlur,
  position,
  arrowTo
}: IFlowShape) {
  const [deltaPosition, setDeltaPosition] = useState({
    x: 200,
    y: 200
  });

  const handleDragDelta = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = deltaPosition;
    console.log(x, y);
    setDeltaPosition(prev => {
      prev.x = x + ui.deltaX;
      prev.y = y + ui.deltaY;

      return { ...prev };
    });
  };

  switch (type) {
    case "decision":
      return (
        <Decision
          {...{
            id,
            content,
            arrowConnectState,
            dragState: { ...dragState, handleDragDelta },
            position,
            answers,
            isConnected,
            arrowTo,
            onBlur
          }}
        ></Decision>
      );
    case "process":
      return (
        <Process
          {...{
            id,
            arrowConnectState,
            content,
            dragState: { ...dragState, handleDragDelta },
            position,
            isConnected,
            arrowTo,
            onBlur
          }}
        ></Process>
      );
    case "start":
      return (
        <Start
          {...{
            id,
            arrowConnectState,
            content,
            dragState: { ...dragState, handleDragDelta },
            position,
            isConnected,
            arrowTo,
            onBlur
          }}
        ></Start>
      );
    default:
      return <div></div>;
  }
}
