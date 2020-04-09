import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { FlowType } from "../ts/models/FlowInstructionData";
import { Menu, Item } from "react-contexify";
import { TriggerEvent } from "react-contexify/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/rootReducer";
import { addNode } from "./flowNodesSlice";

export default function ContextMenu() {
  const dispatch = useDispatch();
  const flowNodeUI = useSelector((state: RootState) => state.flowNodes.nodes);
  const flowAreaZoom = useSelector(
    (state: RootState) => state.scale.scaleAmount
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.scroll.scrollPosition
  );
  const hasFlowHasStart = flowNodeUI.length
    ? flowNodeUI[0].type === "start"
    : false;
  const [hasStart, setHasStart] = useState(hasFlowHasStart);

  const addFlowShape = (e: TriggerEvent, type: FlowType) => {
    const { clientX, clientY } = e;

    const scale = flowAreaZoom === 100 ? 1 : flowAreaZoom / 100 + 1;
    dispatch(
      addNode({
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
      })
    );

    if (type === "start") {
      setHasStart(() => true);
    }
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
