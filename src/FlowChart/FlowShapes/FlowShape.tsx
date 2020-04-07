import React from "react";
import Process from "./Process";
import Start from "./Start";
import { FlowDraggable } from "../../ts/models/FlowShape";
import Decision from "./Decision";

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
  arrowTo,
}: FlowDraggable) {
  switch (type) {
    case "decision":
      return (
        <Decision
          {...{
            id,
            type,
            content,
            arrowConnectState,
            dragState: { ...dragState },
            position,
            answers,
            isConnected,
            arrowTo,
            onBlur,
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
            dragState: { ...dragState },
            position,
            isConnected,
            arrowTo,
            onBlur,
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
            dragState: { ...dragState },
            position,
            isConnected,
            arrowTo,
            onBlur,
          }}
        ></Start>
      );
    default:
      return null;
  }
}
