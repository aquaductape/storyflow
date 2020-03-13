import { FlowJsonData, FlowNodeUI } from "./FlowInstructionData";
import { ISVGArrow } from "./SVGArrow";
import { AsyncSetState } from "../lib/useAsyncSetState";

export type FlowConnecting = {
  fromId: string;
  toId: string;
  connecting: boolean;
};

export type FlowScrollPosition = {
  top: number;
  left: number;
};

export interface IFlowContext {
  flowAreaZoomState: {
    flowAreaZoom: number;
    setFlowAreaZoom: React.Dispatch<React.SetStateAction<number>>;
  };
  flowJsonDataState: {
    flowJsonData: FlowJsonData[];
    setFlowJsonData: React.Dispatch<React.SetStateAction<FlowJsonData[]>>;
  };
  flowNodeUIState: {
    flowNodeUI: FlowNodeUI[];
    setFlowNodeUI: AsyncSetState<FlowNodeUI[]>;
  };
  flowConnectState: {
    isFlowConnecting: FlowConnecting;
    setFlowConnecting: AsyncSetState<FlowConnecting>;
  };
  svgArrowState: {
    svgArrows: ISVGArrow[];
    setSvgArrows: React.Dispatch<React.SetStateAction<ISVGArrow[]>>;
  };
  scrollPositionState: {
    scrollPosition: FlowScrollPosition;
    setScrollPosition: React.Dispatch<React.SetStateAction<FlowScrollPosition>>;
  };
}
