import {
  DraggableEventHandler,
  DraggableData,
  DraggableEvent
} from "react-draggable";
import { FlowType } from "./FlowInstructionData";

export interface FlowDraggable {
  id: string;
  elementRef?: React.RefObject<HTMLDivElement>;
  isConnected: boolean;
  content: string;
  position: {
    top: number;
    left: number;
    translateX: number;
    translateY: number;
  };
  answers?: {
    id: string;
    top: number;
    left: number;
    translateX: number;
    translateY: number;
    content: string;
    arrowTo: string;
    arrowFrom: string[];
  }[];

  arrowTo: string | undefined;
  arrowConnectState: boolean;
  dragState: {
    dragHandlers: {
      onStart: () => void;
      onStop: () => void;
    };
    handleDragDelta?: (e: DraggableEvent, ui: DraggableData) => void;
    onStart: DraggableEventHandler;
    onDrag: Function;
    onStop: ({
      id,
      parentId,
      element
    }: {
      id: string;
      parentId?: string;
      element: HTMLDivElement;
    }) => void;
  };
  onBlur: (
    e: React.FocusEvent<HTMLElement>,
    id: string,
    parentId?: string
  ) => any;
}

export interface IDecisionAnswers extends Omit<FlowDraggable, "answers"> {
  parentId: string;
}

export interface IFlowShape extends FlowDraggable {
  type: FlowType;
}
