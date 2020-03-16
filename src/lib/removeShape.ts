import { FlowNodeUI } from "../models/FlowInstructionData";
import { ISVGArrow } from "../models/SVGArrow";
import { JSON_Parse_Stringify } from "./jsonParseStringify";

export function removeNode({
  currentTarget,
  setFlowNodeUI
}: {
  currentTarget: HTMLElement;
  setFlowNodeUI: React.Dispatch<React.SetStateAction<FlowNodeUI[]>>;
}) {
  setFlowNodeUI(prev => {
    const newPrev = prev.filter(item => {
      if (item.id === currentTarget.id) {
        return false;
      }

      item.arrowFrom = item.arrowFrom.filter(id => id !== currentTarget.id);
      if (item.arrowTo === currentTarget.id) {
        item.arrowTo = "";
      }

      if (item.answers) {
        item.answers.forEach(answer => {
          if (answer.arrowTo === currentTarget.id) {
            answer.arrowTo = "";
          }
        });
      }

      return true;
    });
    console.log(prev, newPrev);
    return [...newPrev];
  });
}

export function removeAllArrows({
  currentTarget,
  setSvgArrows
}: {
  currentTarget: HTMLElement;
  setSvgArrows: React.Dispatch<React.SetStateAction<ISVGArrow[]>>;
}) {
  setSvgArrows(prev => {
    const decisionSiblingArrow = <{ [key: string]: boolean | undefined }>{};
    let newPrev;

    if (currentTarget.dataset.flowType === "decision") {
      newPrev = prev.filter(item => {
        if (item.toId === currentTarget.id) return false;

        if (item.fromId === currentTarget.id) {
          decisionSiblingArrow[item.toId] = true;
          return false;
        }
        if (decisionSiblingArrow[item.fromId]) return false;
        return true;
      });
    } else {
      newPrev = prev.filter(item => {
        if (
          item.fromId === currentTarget.id ||
          item.toId === currentTarget.id
        ) {
          return false;
        }
        return true;
      });
    }
    console.log(currentTarget, prev, newPrev);
    return [...newPrev];
  });
}

export function removeArrow({
  currentTarget,
  setSvgArrows,
  setFlowNodeUI
}: {
  currentTarget: HTMLElement;
  setFlowNodeUI: React.Dispatch<React.SetStateAction<FlowNodeUI[]>>;
  setSvgArrows: React.Dispatch<React.SetStateAction<ISVGArrow[]>>;
}) {
  setSvgArrows(prev => {
    const newPrev = prev.filter(item => {
      if (item.fromId === currentTarget.id) {
        setFlowNodeUI(prevNode => {
          const node = prevNode.find(item => item.id === currentTarget.id)!;
          node.arrowTo = "";
          return [...prevNode];
        });

        return false;
      }
      return true;
    });
    console.log(prev, newPrev);
    return [...newPrev];
  });
}
