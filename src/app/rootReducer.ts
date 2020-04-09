import { combineReducers } from "@reduxjs/toolkit";
import scaleReducer from "../Header/scaleSlice";
import flowNodesReducer from "../ContextMenu/flowNodesSlice";
import scrollPositionReducer from "../FlowChart/Area/scrollPositionSlice";

const rootReducer = combineReducers({
  scale: scaleReducer,
  flowNodes: flowNodesReducer,
  scroll: scrollPositionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
