import React, { useContext, useState } from "react";
import FlowContext from "../context/FlowContext";
import { v4 as uuid } from "uuid";
import { FlowType, FlowNodeUI } from "../models/FlowJsonData";
import { Menu, Item, MenuProvider } from "react-contexify";
import { TriggerEvent } from "react-contexify/lib/types";

export default function ContextMenu() {
  const {
    flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    scrollPositionState: { scrollPosition }
  } = useContext(FlowContext)!;
  const hasFlowHasStart = flowNodeUI.length
    ? flowNodeUI[0].type === "start"
    : false;
  const [hasStart, setHasStart] = useState(hasFlowHasStart);
  const addFlowShape = (e: TriggerEvent, type: FlowType) => {
    const { pageX, pageY } = e;
    console.log({ pageX, pageY });

    setFlowNodeUI(prev => {
      const id = uuid();
      const item = {
        id,
        isConnected: false,
        content: "",
        top: pageY + scrollPosition.top,
        left: pageX + scrollPosition.left,
        translateX: 0,
        translateY: 0,
        type,
        arrowFrom: [],
        arrowTo: []
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
        <Item onClick={e => addFlowShape(e.event, "start")}>Start</Item>
      )}
      <Item onClick={e => addFlowShape(e.event, "decision")}>Decision</Item>
      <Item onClick={e => addFlowShape(e.event, "process")}>Process</Item>
    </Menu>
  );
}
