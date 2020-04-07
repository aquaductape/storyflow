import React, { useContext, useState } from "react";
import FlowContext from "../context/FlowContext";
import { v4 as uuid } from "uuid";
import { FlowType, FlowNodeUI } from "../ts/models/FlowInstructionData";
import { Menu, Item, MenuProvider } from "react-contexify";
import { TriggerEvent } from "react-contexify/lib/types";

export default function ContextMenu() {
  const {
    flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    scrollPositionState: { scrollPosition },
    flowAreaZoomState: { flowAreaZoom },
  } = useContext(FlowContext)!;
  const hasFlowHasStart = flowNodeUI.length
    ? flowNodeUI[0].type === "start"
    : false;
  const [hasStart, setHasStart] = useState(hasFlowHasStart);
  const addFlowShape = (e: TriggerEvent, type: FlowType) => {
    const { pageX, pageY, clientX, clientY } = e;

    const scale = flowAreaZoom === 100 ? 1 : flowAreaZoom / 100 + 1;
    setFlowNodeUI((prev) => {
      const item = {
        id: uuid(),
        isConnected: false,
        content: "",
        top: (clientY + scrollPosition.top) * scale,
        left: (clientX + scrollPosition.left) * scale,
        translateX: 0,
        translateY: 0,
        type,
        arrowFrom: [],
        arrowTo: "",
      } as FlowNodeUI;

      if (type === "start") {
        setHasStart(() => true);
        return [item, ...prev];
      }

      return [...prev, item];
    });
  };
  return (
    <Menu id="flow-context-menu-root">
      {hasStart ? (
        <Item disabled>Start (already added)</Item>
      ) : (
        <Item onClick={(e) => addFlowShape(e.event, "start")}>Start</Item>
      )}
      <Item onClick={(e) => addFlowShape(e.event, "decision")}>Decision</Item>
      <Item onClick={(e) => addFlowShape(e.event, "process")}>Process</Item>
    </Menu>
  );
}
