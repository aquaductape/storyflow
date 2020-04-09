import { connectElementsCooridinates } from "./connectElementsCooridinates";
import { v4 as uuid } from "uuid";
import { FlowConnecting, FlowScrollPosition } from "../ts/models/FlowContext";
import { FlowNodeUI, FlowNodeAnswers } from "../ts/models/FlowInstructionData";
import { ILinkNode } from "../ts/models/LinkNode";
import { CurrentNodeState } from "../ContextMenu/flowNodesSlice";
import { PayloadAction } from "@reduxjs/toolkit";

let answerId = "";
let sourceIdx = 0;

export const establishLinkage = (
  state: CurrentNodeState,
  action: PayloadAction<{ id: string }>
) => {
  const {
    isNodeConnecting: { fromId },
    nodes,
  } = state;
  const { id: targetId } = action.payload;

  const target = nodes.find((item) => item.id === targetId)!;
  let sourceVal;
  let sourceAnswer;

  sourceVal = nodes.find((item) => {
    if (item.id === fromId) return true;

    sourceIdx++;
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

  source.arrowTo = targetId;
  target.arrowFrom.push(fromId);
  source.isConnected = true;
  target.isConnected = true;
};

export const createAnswerNode = (
  state: CurrentNodeState,
  action: PayloadAction<{
    id: string;
    scrollPosition: { top: number; left: number };
  }>
) => {
  const {
    isNodeConnecting: { fromId },
    nodes,
  } = state;
  const { id, scrollPosition } = action.payload;

  const source = nodes[sourceIdx];

  if (source.type === "decision") {
    const sourceBounding = document
      .getElementById(source!.id)!
      .getBoundingClientRect();
    const targetBounding = document
      // .getElementById(target.id)!
      .getElementById(id)!
      .getBoundingClientRect();

    answerId = uuid();
    if (!source.answers) {
      source.answers = [];
    }
    source.answers!.push({
      id: answerId,
      type: "answer",
      arrowFrom: [fromId],
      arrowTo: id,
      isConnected: true,
      content: "yes/no",
      left:
        (sourceBounding.left + targetBounding.right) / 2 + scrollPosition.left,
      top: (sourceBounding.top + targetBounding.top) / 2 + scrollPosition.top,
      translateX: -50,
      translateY: -50,
    });
  }
  sourceIdx = 0;
};

export const renderNodeLink = (
  state: CurrentNodeState,
  action: PayloadAction<{
    id: string;
    scrollPosition: { top: number; left: number };
  }>
) => {
  const {
    isNodeConnecting: { fromId },
    nodeLinks,
  } = state;
  const { id, scrollPosition } = action.payload;
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

    const newNodeLinks = [
      { ...elementsCooridinates, id: uuid(), fromId, toId: answerId, scale: 1 },
    ];
    // question to target
    elementsCooridinates = connectElementsCooridinates({
      toId: id,
      fromId: answerId,
      color: "#000",
      tension: 0,
    });

    elementsCooridinates.x1 += scrollPosition.left;
    elementsCooridinates.x2 += scrollPosition.left;
    elementsCooridinates.y1 += scrollPosition.top;
    elementsCooridinates.y2 += scrollPosition.top;

    newNodeLinks.push({
      ...elementsCooridinates,
      id: uuid(),
      fromId: answerId,
      toId: id,
      scale: 1,
    });

    nodeLinks.push(...newNodeLinks);
  } else {
    const elementsCooridinates = connectElementsCooridinates({
      fromId,
      toId: id,
      color: "#000",
      tension: 0,
    });

    elementsCooridinates.x1 += scrollPosition.left;
    elementsCooridinates.x2 += scrollPosition.left;
    elementsCooridinates.y1 += scrollPosition.top;
    elementsCooridinates.y2 += scrollPosition.top;

    nodeLinks.push({
      ...elementsCooridinates,
      id: uuid(),
      fromId,
      toId: id,
      scale: 1,
    });
  }
};
