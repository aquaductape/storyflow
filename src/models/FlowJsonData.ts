type Answers = {
  m: string;
  next: string;
};

export interface FlowJsonData {
  id: string;
  m?: string;
  index: number;
  question?: string;
  next?: string;
  answers?: Answers[];
}

export type FlowType = "decision" | "process" | "start" | "exit";

export interface FlowNodeUI {
  id: string;
  top: number;
  left: number;
  arrowTo: string[];
  arrowFrom: string[];
  translateX: number;
  translateY: number;
  content: string;
  isConnected: boolean;
  type: FlowType;
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
}
