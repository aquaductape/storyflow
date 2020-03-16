import React, { useContext } from "react";
import FlowContext from "../../context/FlowContext";
import { ReactComponent as IconMenu } from "../../assets/ant-menu.svg";
import { ReactComponent as IconClose } from "../../assets/close.svg";
import { ReactComponent as IconLinkNode } from "../../assets/link-node.svg";
import { ReactComponent as IconLinkNodeRemove } from "../../assets/link-node-remove.svg";

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
    <div className="main">
      {isFlowConnecting.connecting && isFlowConnecting.fromId !== id ? (
        <div className="connecting flow-connecting"></div>
      ) : null}
      <div className="flow-control">
        {/* {!arrowTo && !isFlowConnecting.connecting ? (
          <button className="btn flow-btn-create-arrow">+ Link</button>
        ) : null}
        {isFlowConnecting.connecting ? (
          <button className="btn flow-btn-create-arrow">{btnConnect}</button>
        ) : null}
        <button className="btn flow-btn-remove-node">Remove Node</button>
        <button className="btn flow-btn-remove-arrow">Remove Arrow</button> */}
        <div className="options">
          <div className="options-menu">
            <IconMenu></IconMenu>
          </div>
          {!arrowTo ? (
            <div className="link-node flow-btn-create-arrow">
              <IconLinkNode></IconLinkNode>
            </div>
          ) : (
            <div className="link-node-remove flow-btn-remove-arrow">
              <IconLinkNodeRemove></IconLinkNodeRemove>
            </div>
          )}
        </div>
        <div className="close flow-btn-remove-node">
          <IconClose></IconClose>
        </div>
      </div>
      <style jsx>
        {`
          .connecting {
            position: absolute;
            top: -10px;
            bottom: -10px;
            left: -10px;
            right: -10px;
            border: 5px solid #0072ff;
            border-radius: 10px;
            z-index: 10;
          }
          .connecting:hover {
            background: #0072ff75;
          }
          .flow-control {
            position: absolute;
            top: 5px;
            left: 0;
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 30px;
            color: rgba(0, 0, 0, 0.5);
          }
          .options {
            display: flex;
          }
          .options > div {
            // margin-right: 15px;
            width: 30px;
          }
          .options-menu {
            display: flex;
            padding: 8px;
            width: 40px;
            height: 100%;
            cursor: pointer;
          }
          .options-menu:hover {
            color: #000;
          }
          .link-node,
          .link-node-remove {
            display: flex;
            padding: 8px;
            cursor: pointer;
          }
          .link-node:hover,
          .link-node-remove:hover {
            color: #000;
          }
          .close {
            display: flex;
            padding: 8px;
            height: 100%;
            width: 40px;
            cursor: pointer;
          }
          .close:hover {
            color: #000;
          }
        `}
      </style>
    </div>
  );
}
