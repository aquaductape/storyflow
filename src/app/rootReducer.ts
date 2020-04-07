import { combineReducers } from "@reduxjs/toolkit";
import scaleReducer from "../Header/scaleSlice";
import flowNodesReducer from "../ContextMenu/flowNodesSlice";

const rootReducer = combineReducers({
  scale: scaleReducer,
  flowNodes: flowNodesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
