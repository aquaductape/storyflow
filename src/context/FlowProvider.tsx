import React, { useState } from "react";
import { FlowJsonData, FlowNodeUI } from "../models/FlowInstructionData";
import FlowContext from "./FlowContext";
import { ILinkNode, IGhostArrow } from "../models/LinkNode";
import { FlowConnecting, FlowScrollPosition } from "../models/FlowContext";
import { useAsyncSetState } from "../lib/useAsyncSetState";
import lsStorage from "../lib/lsStorage";

const FlowProvider = (props: React.Props<any>) => {
  const [flowJsonData, setFlowJsonData] = useState<FlowJsonData[]>([]);
  const [flowAreaZoom, setFlowAreaZoom] = useState(100);
  const [ghostArrow, setGhostArrow] = useState<IGhostArrow | null>(null);
  const [flowNodeUI, setFlowNodeUI] = useAsyncSetState<FlowNodeUI[]>(
    lsStorage.getUINodes() || []
  );
  const [linkNode, setLinkNode] = useState<ILinkNode[]>(
    lsStorage.getSVGArrows() || []
  );
  const [scrollPosition, setScrollPosition] = useState<FlowScrollPosition>({
    top: 0,
    left: 0
  });
  const [isFlowConnecting, setFlowConnecting] = useAsyncSetState<
    FlowConnecting
  >({
    fromId: "",
    toId: "",
    connecting: false
  });

  return (
    <FlowContext.Provider
      value={{
        ghostArrowState: {
          ghostArrow,
          setGhostArrow
        },
        flowAreaZoomState: { flowAreaZoom, setFlowAreaZoom },
        flowConnectState: {
          isFlowConnecting,
          setFlowConnecting
        },
        flowJsonDataState: { flowJsonData, setFlowJsonData },
        flowNodeUIState: {
          flowNodeUI,
          setFlowNodeUI
        },
        linkNodeState: { linkNode, setLinkNode },
        scrollPositionState: { scrollPosition, setScrollPosition }
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;
