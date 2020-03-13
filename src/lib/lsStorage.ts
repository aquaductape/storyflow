import { FlowNodeUI } from "../models/FlowInstructionData";
import { ISVGArrow } from "../models/SVGArrow";

const getUINodes = (): FlowNodeUI[] | null => {
  const result = localStorage.getItem("UINodes");
  if (result) {
    return JSON.parse(result) as FlowNodeUI[];
  }
  return null;
};

const getSVGArrows = (): ISVGArrow[] | null => {
  const result = localStorage.getItem("SVGArrows");
  if (result) {
    return JSON.parse(result) as ISVGArrow[];
  }
  return null;
};

const lsStorage = {
  getSVGArrows,
  getUINodes
};

export default lsStorage;
