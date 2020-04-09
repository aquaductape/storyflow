import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowNodeUI, FlowNodeAnswers } from "../ts/models/FlowInstructionData";
import lsStorage from "../utils/lsStorage";
import { ILinkNode, IGhostArrow } from "../ts/models/LinkNode";
import { updateNodeLinks, updateNodes } from "../utils/updateInstructions";
import { FlowConnecting } from "../ts/models/FlowContext";
import { connectElementsCooridinates } from "../utils/connectElementsCooridinates";
import {
  createAnswerNode as createAnswerNodeI,
  establishLinkage as establishLinkageI,
  renderNodeLink as renderNodeLinkI,
} from "../utils/connectNodesWithLink";

export type CurrentNodeState = {
  nodes: FlowNodeUI[];
  nodeLinks: ILinkNode[];
  nodeLinkGhost: IGhostArrow | null;
  isNodeConnecting: FlowConnecting;
  removedNode: FlowNodeUI | null;
  removedNodeAnswer: FlowNodeAnswers | null;
};

const initialState: CurrentNodeState = {
  nodes: updateNodes(lsStorage.getUINodes() || []),
  nodeLinks: updateNodeLinks(lsStorage.getSVGArrows() || []),
  nodeLinkGhost: null,
  isNodeConnecting: { connecting: false, fromId: "", toId: "" },
  removedNode: null,
  removedNodeAnswer: null,
};

const flowNodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setGhostNodeLink(state, action: PayloadAction<IGhostArrow>) {
      const { payload } = action;
      state.nodeLinkGhost = payload;
    },
    updateGhostNodeLink(
      state,
      action: PayloadAction<{ x2?: number; y2?: number }>
    ) {
      const { payload } = action;
      const prev = state.nodeLinkGhost;
      if (prev) {
        if (payload.x2) payload.x2 += prev.x2;
        if (payload.y2) payload.y2 += prev.y2;
        state.nodeLinkGhost = { ...prev, ...payload };
      }
    },
    removeGhostNodeLink(state) {
      state.nodeLinkGhost = null;
    },
    setNodeConnecting(state, action: PayloadAction<FlowConnecting>) {
      const { payload } = action;
      state.isNodeConnecting = payload;
    },
    addNode(state, action: PayloadAction<FlowNodeUI>) {
      const { payload } = action;
      if (payload.type === "start") {
        state.nodes = [payload, ...state.nodes];
      } else {
        state.nodes.push(payload);
      }
    },
    editNodeContent(
      state,
      action: PayloadAction<{ id: string; parentId?: string; content: string }>
    ) {
      const { id, parentId, content } = action.payload;
      if (parentId) {
        const parent = state.nodes.find((item) => item.id === parentId)!;
        const item = parent.answers!.find((item) => item.id === id)!;
        item.content = content;
      } else {
        const item = state.nodes.find((item) => item.id === id)!;
        item.content = content;
      }
    },
    editNodePosition(
      state,
      action: PayloadAction<{
        id: string;
        parentId?: string;
        translateX: number;
        translateY: number;
      }>
    ) {
      const { id, parentId, translateX, translateY } = action.payload;
      if (parentId) {
        const parent = state.nodes.find((item) => item.id === parentId)!;
        const answerNode = parent.answers!.find((item) => item.id === id)!;
        answerNode.translateX = translateX;
        answerNode.translateY = translateY;
      } else {
        const node = state.nodes.find((item) => item.id === id)!;
        node.translateX = translateX;
        node.translateY = translateY;
      }
    },
    removeNode(state, action: PayloadAction<string>) {
      const id = action.payload;
      let isFound = false;

      // using filter to remove references of removed item, on other items
      state.nodes = state.nodes.filter((node) => {
        if (isFound) return true;
        if (node.id === id) {
          state.removedNode = node;
          isFound = true;
          return false;
        }

        node.arrowFrom = node.arrowFrom.filter(
          (arrowFromId) => arrowFromId !== id
        );
        if (node.arrowTo === id) {
          node.arrowTo = "";
        }

        if (node.answers) {
          node.answers = node.answers.filter((answer) => {
            if (answer.arrowTo === id) {
              answer.arrowTo = "";
            }

            if (answer.id === id) {
              isFound = true;
              state.removedNodeAnswer = answer;
              return true;
            }
            return false;
          });
        }
      });
    },
    addNodeLink(state, action: PayloadAction<ILinkNode>) {
      const nodeLink = action.payload;
      state.nodeLinks.push(nodeLink);
    },
    changeLinksPositionOnNode(
      state,
      action: PayloadAction<{
        id: string;
        scale: number;
        scrollPosition: { top: number; left: number };
      }>
    ) {
      const { id, scale, scrollPosition } = action.payload;
      const length = state.nodeLinks.length;

      for (let i = 0; i < length; i++) {
        const item = state.nodeLinks[i];

        if (item.fromId === id || item.toId === id) {
          const { fromId, toId, id } = item;
          const updatedCooridinates = connectElementsCooridinates({
            fromId,
            toId,
            color: "#000",
            tension: 0,
            scale,
          });

          updatedCooridinates.x1 += scrollPosition.left * (1 / scale);
          updatedCooridinates.x2 += scrollPosition.left * (1 / scale);
          updatedCooridinates.y1 += scrollPosition.top * (1 / scale);
          updatedCooridinates.y2 += scrollPosition.top * (1 / scale);

          state.nodeLinks[i] = {
            ...updatedCooridinates,
            fromId,
            toId,
            id,
            scale,
          };
        }
      }
    },
    removeOrphanNodeLinks(state, action: PayloadAction<string>) {
      const { removedNode, removedNodeAnswer } = state;
      const id = action.payload;
      if (removedNode && removedNode.arrowFrom) {
        state.nodeLinks = state.nodeLinks.filter((nodeLink) => {
          if (nodeLink.fromId === id || nodeLink.toId === id) {
            return false;
          }
        });
      }
    },
    createAnswerNode: createAnswerNodeI,
    establishLinkage: establishLinkageI,
    renderNodeLink: renderNodeLinkI,
  },
});

export const {
  addNode,
  editNodePosition,
  editNodeContent,
  removeNode,
  addNodeLink,
  changeLinksPositionOnNode,
  removeOrphanNodeLinks: removeNodeLink,
  removeGhostNodeLink,
  setGhostNodeLink,
  updateGhostNodeLink,
  setNodeConnecting,
  createAnswerNode,
  establishLinkage,
  renderNodeLink,
} = flowNodesSlice.actions;

export default flowNodesSlice.reducer;
