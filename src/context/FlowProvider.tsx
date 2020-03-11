import React, { useState } from "react";
import { FlowJsonData, FlowNodeUI } from "../models/FlowJsonData";
import FlowContext from "./FlowContext";
import { ISVGArrow } from "../models/SVGArrow";
import { FlowConnecting, FlowScrollPosition } from "../models/FlowContext";
import { useAsyncSetState } from "../lib/useAsyncSetState";
import lsStorage from "../lib/lsStorage";

const FlowProvider = (props: React.Props<any>) => {
  const [flowJsonData, setFlowJsonData] = useState<FlowJsonData[]>([]);
  const [flowNodeUI, setFlowNodeUI] = useAsyncSetState<FlowNodeUI[]>(
    lsStorage.getUINodes() || []
  );
  const [svgArrows, setSvgArrows] = useState<ISVGArrow[]>(
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
        flowConnectState: {
          isFlowConnecting,
          setFlowConnecting
        },
        flowJsonDataState: { flowJsonData, setFlowJsonData },
        flowNodeUIState: {
          flowNodeUI,
          setFlowNodeUI
        },
        svgArrowState: { svgArrows, setSvgArrows },
        scrollPositionState: { scrollPosition, setScrollPosition }
      }}
    >
      {props.children}
    </FlowContext.Provider>
  );
};

export default FlowProvider;
