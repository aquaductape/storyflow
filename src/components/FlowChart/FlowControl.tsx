import React, { useContext } from "react";
import FlowContext from "../../context/FlowContext";

type IFlowControl = {
  id: string;
  onChangeDirection: () => any;
  onCreateArrow: () => any;
  direction: string;
};
export default function FlowControl({
  id,
  onChangeDirection,
  onCreateArrow,
  direction
}: IFlowControl) {
  const {
    flowConnectState: { isFlowConnecting, setFlowConnecting }
  } = useContext(FlowContext)!;
  let btnCreateArrowContent = isFlowConnecting.connecting
    ? "Connect"
    : "Create Arrow";
  btnCreateArrowContent =
    isFlowConnecting.fromId === id ? "Cancel" : btnCreateArrowContent;

  return (
    <div className="flow-control">
      <button className="btn flow-btn-create-arrow" onClick={onCreateArrow}>
        {btnCreateArrowContent}
      </button>
      <button
        className="btn flow-btn-change-direction"
        onClick={onChangeDirection}
      >
        {direction}
      </button>
    </div>
  );
}
