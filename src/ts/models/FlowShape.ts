import {
  DraggableEventHandler,
  DraggableData,
  DraggableEvent,
} from "react-draggable";
import { FlowType, FlowNodeUI } from "./FlowInstructionData";

export interface FlowDraggable
  extends Omit<
    FlowNodeUI,
    "top" | "left" | "translateX" | "translateY" | "arrowFrom"
  > {
  // id: string;
  // type: "start" | "decision" | "process" | "exit" | "answer";
  elementRef?: React.RefObject<HTMLDivElement>;
  // isConnected: boolean;
  // content: string;
  position: {
    top: number;
    left: number;
    translateX: number;
    translateY: number;
  };
  // answers?: {
  //   id: string;
  //   isConnected: boolean;
  //   type: "answer";
  //   top: number;
  //   left: number;
  //   translateX: number;
  //   translateY: number;
  //   content: string;
  //   arrowTo: string;
  //   arrowFrom: string[];
  // }[];

  // arrowTo: string | undefined;
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
      element,
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

export interface IDecisionAnswers
  extends Omit<FlowDraggable, "answers" | "type"> {
  type: "answer";
  parentId: string;
}
