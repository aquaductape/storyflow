import React, { useState, useRef } from "react";
import { FlowDraggable } from "../../models/FlowShape";
import Decision from "./Decision";
import Process from "./Process";
import Start from "./Start";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";

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
}: FlowDraggable) {
  const { dragHandlers, onDrag, onStart, onStop } = dragState;
  const { translateX, translateY } = position;
  const [deltaPosition, setDeltaPosition] = useState({
    x: 200,
    y: 200
  });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleDragDelta = (e: DraggableEvent, ui: DraggableData) => {
    const { x, y } = deltaPosition;
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
            type,
            elementRef,
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
            type,
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
            type,
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
