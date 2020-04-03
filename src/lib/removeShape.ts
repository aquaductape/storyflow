import { FlowNodeUI } from "../models/FlowInstructionData";
import { ILinkNode } from "../models/LinkNode";

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
        item.answers = item.answers.filter(answer => {
          if (answer.arrowTo === currentTarget.id) {
            answer.arrowTo = "";
          }

          return answer.id !== currentTarget.id;
        });
      }

      return true;
    });
    return [...newPrev];
  });
}

export function removeAllArrows({
  currentTarget,
  setSvgArrows
}: {
  currentTarget: HTMLElement;
  setSvgArrows: React.Dispatch<React.SetStateAction<ILinkNode[]>>;
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
  setSvgArrows: React.Dispatch<React.SetStateAction<ILinkNode[]>>;
}) {
  setSvgArrows(prev => {
    const newPrev = prev.filter(item => {
      if (item.fromId === currentTarget.id) {
        if (currentTarget.dataset.flowType === "answer") {
          setFlowNodeUI(prevNode => {
            prevNode.find(item => {
              if (item.answers) {
                const answerNode = item.answers.find(
                  answer => answer.id === currentTarget.id
                );

                if (answerNode) {
                  answerNode.arrowTo = "";
                }
              }
            });

            return [...prevNode];
          });
        } else {
          setFlowNodeUI(prevNode => {
            const node = prevNode.find(item => item.id === currentTarget.id)!;
            node.arrowTo = "";
            node.isConnected = false;
            return [...prevNode];
          });
        }

        return false;
      }
      return true;
    });
    return [...newPrev];
  });
}
