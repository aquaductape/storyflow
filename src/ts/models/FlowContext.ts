import { FlowJsonData, FlowNodeUI } from "./FlowInstructionData";
import { ILinkNode, IGhostArrow } from "./LinkNode";

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
  };
  flowConnectState: {
    isFlowConnecting: FlowConnecting;
  };
  linkNodeState: {
    linkNode: ILinkNode[];
    setLinkNode: React.Dispatch<React.SetStateAction<ILinkNode[]>>;
  };
  ghostArrowState: {
    ghostArrow: IGhostArrow | null;
    setGhostArrow: React.Dispatch<React.SetStateAction<IGhostArrow | null>>;
  };
  scrollPositionState: {
    scrollPosition: FlowScrollPosition;
    setScrollPosition: React.Dispatch<React.SetStateAction<FlowScrollPosition>>;
  };
}
