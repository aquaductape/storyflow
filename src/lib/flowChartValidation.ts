import { FlowNodeUI } from "../models/FlowInstructionData";
import { ILinkNode } from "../models/LinkNode";

interface IFlowChartValidation {
  flowNodeUI: FlowNodeUI[];
  svgArrows: ILinkNode[];
}
interface IfindInfiniteProcedure {
  flowNodeUI: FlowNodeUI[];
  id: string;
}
const findInfiniteProcedure = ({ flowNodeUI, id }: IfindInfiniteProcedure) => {
  return true;
};
export default function flowChartValidation({
  flowNodeUI,
  svgArrows
}: IFlowChartValidation) {
  type Imessage = {
    type: string;
    position?: any;
    content?: string;
    info: string;
    level: "warning" | "error";
  };
  const message: Imessage[] = [];
  if (flowNodeUI.length >= 1 && svgArrows.length >= 1) {
    const nodeStart = flowNodeUI[0];
    const info = "Must include a start node";
    if (nodeStart.type !== "start") {
      message.push({ type: "start", level: "error", position: 1, info });
    }
  }

  flowNodeUI.forEach(item => {
    if (item.type === "decision") {
      if (item.answers!.length <= 1) {
        const info = `Must have at least two answers, currently has ${
          item.answers!.length
        }.`;
        message.push({ type: item.type, info, level: "warning" });
      }
    }
  });
}
