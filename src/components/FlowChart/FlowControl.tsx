import React, { useContext } from "react";
import FlowContext from "../../context/FlowContext";

type IFlowControl = {
  id: string;
  arrowTo?: string | undefined;
  // direction: string;
};
export default function FlowControl({ id, arrowTo }: IFlowControl) {
  const {
    flowConnectState: { isFlowConnecting, setFlowConnecting }
  } = useContext(FlowContext)!;
  let btnCreateArrowContent = isFlowConnecting.connecting
    ? "Connect"
    : "Create Arrow";
  let btnConnect = isFlowConnecting.fromId === id ? "Cancel" : "Connect";

  return (
    <div className="flow-control">
      {!arrowTo && !isFlowConnecting.connecting ? (
        <button className="btn flow-btn-create-arrow">Create Arrow</button>
      ) : null}
      {isFlowConnecting.connecting ? (
        <button className="btn flow-btn-create-arrow">{btnConnect}</button>
      ) : null}
      <button className="btn flow-btn-remove-node">Remove Node</button>
      <button className="btn flow-btn-remove-arrow">Remove Arrow</button>
      <style jsx>
        {`
          .btn {
            border: none;
            border-radius: 5px;
            font-weight: 700;
            display: block;
            margin: 5px auto;
            width: 80%;
          }
          .flow-btn-create-arrow {
            background: #4caf50;
            color: #fff;
          }
          .flow-btn-remove-node,
          .flow-btn-remove-arrow {
            background: #f44336;
            color: #fff;
          }
          .flow-control {
            position: absolute;
            top: 0;
            right: -2px;
            left: -2px;
            min-width: 225px;
            min-height: 50px;
            max-height: 350px;
            border: 2px solid #000;
            background: #fff;
            transform: translateY(-100%);
          }
        `}
      </style>
    </div>
  );
}
