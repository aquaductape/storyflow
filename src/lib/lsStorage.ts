import { FlowNodeUI } from "../models/FlowInstructionData";
import { ILinkNode } from "../models/LinkNode";

const getUINodes = (): FlowNodeUI[] | null => {
  const result = localStorage.getItem("UINodes");
  if (result) {
    return JSON.parse(result) as FlowNodeUI[];
  }
  return null;
};

const getSVGArrows = (): ILinkNode[] | null => {
  const result = localStorage.getItem("SVGArrows");
  if (result) {
    return JSON.parse(result) as ILinkNode[];
  }
  return null;
};

const lsStorage = {
  getSVGArrows,
  getUINodes
};

export default lsStorage;
