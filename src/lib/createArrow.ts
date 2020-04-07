import { connectElementsCooridinates } from "./connectElementsCooridinates";
import { v4 as uuid } from "uuid";
import { FlowConnecting, FlowScrollPosition } from "../ts/models/FlowContext";
import { FlowNodeUI, FlowNodeAnswers } from "../ts/models/FlowInstructionData";
import { ILinkNode } from "../ts/models/LinkNode";

export const onCreateArrow = async ({
  currentTarget,
  isNodeConnecting,
  nodes,
  nodeLinks,
  scrollPosition,
}: {
  currentTarget: HTMLElement;
  isNodeConnecting: FlowConnecting;
  nodes: FlowNodeUI[];
  nodeLinks: ILinkNode[];
  scrollPosition: FlowScrollPosition;
}) => {
  const { fromId } = isNodeConnecting;
  let answerId = "";
  const target = nodes.find((item) => item.id === currentTarget.id)!;
  let sourceVal;
  let sourceAnswer;

  sourceVal = nodes.find((item) => {
    if (item.id === fromId) return true;

    if (!item.answers) return false;
    const foundAnswer = item.answers.find((answer) => answer.id === fromId)!;
    if (foundAnswer) {
      sourceAnswer = foundAnswer;

      return true;
    }
  })!;
  sourceVal = sourceAnswer ? sourceAnswer : sourceVal;
  // Property is used before being assigned TS Error
  // using different variable to avoid that error
  const source = sourceVal as FlowNodeUI | FlowNodeAnswers;

  source.arrowTo = currentTarget.id;
  target.arrowFrom.push(fromId);
  source.isConnected = true;
  target.isConnected = true;

  if (source.type === "decision") {
    const sourceBounding = document
      .getElementById(source!.id)!
      .getBoundingClientRect();
    const targetBounding = document
      .getElementById(target.id)!
      .getBoundingClientRect();

    answerId = uuid();
    if (!source.answers) {
      source.answers = [];
    }
    source.answers!.push({
      id: answerId,
      type: "answer",
      arrowFrom: [fromId],
      arrowTo: currentTarget.id,
      isConnected: true,
      content: "yes/no",
      left:
        (sourceBounding.left + targetBounding.right) / 2 + scrollPosition.left,
      top: (sourceBounding.top + targetBounding.top) / 2 + scrollPosition.top,
      translateX: -50,
      translateY: -50,
    });
  }

  //////////////////////////////////////////////////

  if (answerId) {
    // source to quesiton
    let elementsCooridinates = connectElementsCooridinates({
      fromId,
      toId: answerId,
      color: "#000",
      tension: 0,
    });

    elementsCooridinates.x1 += scrollPosition.left;
    elementsCooridinates.x2 += scrollPosition.left;
    elementsCooridinates.y1 += scrollPosition.top;
    elementsCooridinates.y2 += scrollPosition.top;

    const result = [
      { ...elementsCooridinates, id: uuid(), fromId, toId: answerId, scale: 1 },
    ];
    // question to target
    elementsCooridinates = connectElementsCooridinates({
      toId: currentTarget.id,
      fromId: answerId,
      color: "#000",
      tension: 0,
    });

    elementsCooridinates.x1 += scrollPosition.left;
    elementsCooridinates.x2 += scrollPosition.left;
    elementsCooridinates.y1 += scrollPosition.top;
    elementsCooridinates.y2 += scrollPosition.top;

    result.push({
      ...elementsCooridinates,
      id: uuid(),
      fromId: answerId,
      toId: currentTarget.id,
      scale: 1,
    });

    setSvgArrows((prev) => [...prev, ...result]);
  } else {
    const elementsCooridinates = connectElementsCooridinates({
      // fromId: currentTarget.id,
      // toId: fromId,
      fromId,
      toId: currentTarget.id,
      color: "#000",
      tension: 0,
    });

    elementsCooridinates.x1 += scrollPosition.left;
    elementsCooridinates.x2 += scrollPosition.left;
    elementsCooridinates.y1 += scrollPosition.top;
    elementsCooridinates.y2 += scrollPosition.top;
    setSvgArrows((prev) => [
      ...prev,
      // { ...elementsCooridinates, fromId, toId: currentTarget.id }
      {
        ...elementsCooridinates,
        id: uuid(),
        fromId,
        toId: currentTarget.id,
        scale: 1,
      },
    ]);
  }

  return false;
};
