type Answers = {
  m: string;
  next: number | string | undefined;
};

export interface FlowJsonData {
  id: string;
  m?: string;
  index: number;
  question?: string;
  next: number | string | undefined;
  answers?: Answers[];
}

export interface FlowInstruction {
  currentIdx: number;
  getCurrentItem(): FlowJsonData;
  reset(): void;
  next(answer?: string | undefined): true | null;
}

export type FlowType = "decision" | "process" | "start" | "exit";

export interface FlowNodeAnswers {
  id: string;
  type: "answer";
  isConnected: boolean;
  top: number;
  left: number;
  translateX: number;
  translateY: number;
  content: string;
  arrowTo: string;
  arrowFrom: string[];
}

export interface FlowNodeUI {
  id: string;
  top: number;
  left: number;
  arrowTo: string;
  arrowFrom: string[];
  translateX: number;
  translateY: number;
  content: string;
  isConnected: boolean;
  type: FlowType;
  answers?: FlowNodeAnswers[];
}
