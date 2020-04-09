import React, { useState, useEffect } from "react";
import { FlowJsonData, FlowNodeUI } from "../ts/models/FlowInstructionData";
import FlowContext from "./FlowContext";
import { ILinkNode, IGhostArrow } from "../ts/models/LinkNode";
import { FlowConnecting, FlowScrollPosition } from "../ts/models/FlowContext";
import { useAsyncSetState } from "../utils/useAsyncSetState";
import lsStorage from "../utils/lsStorage";
import { updateNodes, updateNodeLinks } from "../utils/updateInstructions";

const FlowProvider = (props: React.Props<any>) => {
  const [flowJsonData, setFlowJsonData] = useState<FlowJsonData[]>([]);
  const [flowAreaZoom, setFlowAreaZoom] = useState(100);
  const [ghostArrow, setGhostArrow] = useState<IGhostArrow | null>(null);
  const [flowNodeUI, setFlowNodeUI] = useAsyncSetState<FlowNodeUI[]>([]);
  const [linkNode, setLinkNode] = useState<ILinkNode[]>([]);
  const [scrollPosition, setScrollPosition] = useState<FlowScrollPosition>({
    top: 0,
    left: 0,
  });
  const [isFlowConnecting, setFlowConnecting] = useAsyncSetState<
    FlowConnecting
  >({
    fromId: "",
    toId: "",
    connecting: false,
  });

  useEffect(() => {
    // support prev version
    // setFlowNodeUI(() => updateNodes(lsStorage.getUINodes() || []));
    setFlowNodeUI(() => lsStorage.getUINodes() || []);

    // support prev version
    // setLinkNode(() => updateNodeLinks(lsStorage.getSVGArrows() || []));
    setLinkNode(() => lsStorage.getSVGArrows() || []);
  }, []);

  return (
    <FlowContext.Provider
      value={{
        ghostArrowState: {
          ghostArrow,
          setGhostArrow,
        },
        flowAreaZoomState: { flowAreaZoom, setFlowAreaZoom },
        flowConnectState: {
          isFlowConnecting,
          setFlowConnecting,
        },
        flowJsonDataState: { flowJsonData, setFlowJsonData },
        flowNodeUIState: {
          flowNodeUI,
          setFlowNodeUI,
        },
        linkNodeState: { linkNode, setLinkNode },
        scrollPositionState: { scrollPosition, setScrollPosition },
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;
