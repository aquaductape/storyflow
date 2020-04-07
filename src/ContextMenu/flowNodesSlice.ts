import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FlowNodeUI, FlowNodeAnswers } from "../ts/models/FlowInstructionData";
import lsStorage from "../lib/lsStorage";
import { ILinkNode, IGhostArrow } from "../ts/models/LinkNode";
import { updateNodeLinks, updateNodes } from "../lib/updateInstructions";
import { FlowConnecting } from "../ts/models/FlowContext";

type CurrentNodeState = {
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
      state.nodeLinkGhost = { ...payload };
    },
    removeGhostNodeLink(state) {
      state.nodeLinkGhost = null;
    },
    setNodeConnecting(state, action: PayloadAction<FlowConnecting>) {
      const { payload } = action;
      state.isNodeConnecting = { ...payload };
    },
    addNode(state, action: PayloadAction<FlowNodeUI>) {
      const { payload } = action;
      state.nodes = [...state.nodes, payload];
    },
    editNode(state, action: PayloadAction<FlowNodeUI[]>) {
      const { payload } = action;
      state.nodes = payload;
    },
    removeNode(state, action: PayloadAction<string>) {
      const id = action.payload;
      let isFound = false;
      state.nodes = state.nodes.filter((node) => {
        if (isFound) return true;
        if (node.id === id) {
          state.removedNode = node;
          isFound = true;
          return false;
        }

        if (node.answers) {
          if (
            node.answers.some((answer) => {
              if (answer.id === id) {
                state.removedNodeAnswer = answer;
                return true;
              }
              return false;
            })
          ) {
            isFound = true;
            return false;
          }
        }
      });
    },
    addNodeLink(state, action: PayloadAction<ILinkNode>) {
      const item = action.payload;
      state.nodeLinks = [...state.nodeLinks, item];
    },
    removeNodeLink(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.nodeLinks = state.nodeLinks.filter(
        (nodeLink) => nodeLink.id !== id
      );
    },
  },
});

export const {
  addNode,
  editNode,
  removeNode,
  addNodeLink,
  removeNodeLink,
  removeGhostNodeLink,
  setGhostNodeLink,
  setNodeConnecting,
} = flowNodesSlice.actions;

export default flowNodesSlice.reducer;
