import React from "react";
import { IFlowContext } from "../ts/models/FlowContext";

// this is the equivalent to the createStore method of Redux
// https://redux.js.org/api/createstore

const FlowContext = React.createContext<IFlowContext | undefined>(undefined);

export default FlowContext;
