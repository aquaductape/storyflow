import React, { useState, useRef } from "react";
import { ReactComponent as IconMenu } from "../../assets/ant-menu.svg";
import { ReactComponent as IconClose } from "../../assets/close.svg";
import { ReactComponent as IconLinkNode } from "../../assets/link-node.svg";
import { ReactComponent as IconLinkNodeRemove } from "../../assets/link-node-remove.svg";
import addEscapeHatch from "../../lib/addEscapeHatch";
import { closestPointCoor } from "../../lib/closestPoint";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import {
  setGhostNodeLink,
  removeGhostNodeLink,
  setNodeConnecting,
} from "../../ContextMenu/flowNodesSlice";
import { onCreateArrow } from "../../lib/createArrow";

type IFlowControl = {
  id: string;
  type: string;
  arrowTo?: string | undefined;
};

const refScrollPosition = { left: 0, top: 0 };
const refConnecting = { connecting: false };
let escapeHatchListener: any;
export default function FlowControl({ id, arrowTo, type }: IFlowControl) {
  const btnRemoveNodeRef = useRef<HTMLDivElement>(null);
  const btnCreateArrowRef = useRef<HTMLDivElement>(null);
  const [isStartDrag, setIsStartDrag] = useState(false);
  const dispatch = useDispatch();
  // const [scale, setScale] = useState(100);
  // const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });
  const isNodeConnecting = useSelector(
    (state: RootState) => state.flowNodes.isNodeConnecting
  );

  // const flowAreaZoom = 100;
  const [linkNodeToggle, setLinkNodeToggle] = useState(false);
  // useEffect(() => {
  //   refScrollPosition.left = scrollPosition.left;
  //   refScrollPosition.top = scrollPosition.top;
  // }, [scrollPosition.left, scrollPosition.top]);

  // needs rework, goal, modal listener,
  const onGhostArrow = (e: React.MouseEvent) => {
    const flowChartContainer = document.querySelector(
      ".flow-area-inner"
    )! as HTMLElement;
    const idEl = document.getElementById(id)!;
    const scrollPositionLeft = parseInt(
      flowChartContainer.dataset.areaScrollPositionLeft!
    );
    const scrollPositionTop = parseInt(
      flowChartContainer.dataset.areaScrollPositionTop!
    );
    const scale = parseInt(flowChartContainer.dataset.areaZoom!) / 100;
    let trackGhostArrow = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      console.log({ x, y });

      const result = closestPointCoor({
        elFrom: idEl,
        toCoor: { x, y },
        scale,
      });

      result.x1 += scrollPositionLeft * (1 / scale);
      result.x2 += scrollPositionLeft * (1 / scale);
      result.y1 += scrollPositionTop * (1 / scale);
      result.y2 += scrollPositionTop * (1 / scale);

      dispatch(setGhostNodeLink({ ...result, scale, strokeDashArray: "12px" }));
    };

    escapeHatchListener = addEscapeHatch({
      target: btnCreateArrowRef.current!,
      build: () => {
        console.log("add");
        flowChartContainer.addEventListener("mousemove", trackGhostArrow);
        dispatch(setNodeConnecting({ fromId: id, toId: "", connecting: true }));
      },
      onExit: () => {
        console.log("delete");
        dispatch(removeGhostNodeLink());
        flowChartContainer.removeEventListener("mousemove", trackGhostArrow);

        setTimeout(() => {
          dispatch(
            setNodeConnecting({
              fromId: "",
              toId: "",
              connecting: false,
            })
          );
        }, 100);
      },
    });
  };

  const onRemoveNode = () => {
    console.log("remove");
  };

  const onConnectNodes = () => {
    onCreateArrow({
      currentTarget,
      is,
      setFlowConnecting,
      setFlowNodeUI,
      setSvgArrows: setLinkNode,
      scrollPosition,
    });
  };

  return (
    <div className="main">
      {isNodeConnecting.connecting &&
      isNodeConnecting.fromId !== id &&
      type !== "start" &&
      type !== "answer" ? (
        <div
          className="connecting flow-connecting"
          onClick={onConnectNodes}
        ></div>
      ) : null}
      <div className="flow-control">
        <div className="options">
          <div className="options-menu">
            <IconMenu></IconMenu>
          </div>
          {!arrowTo || type === "decision" ? (
            <div
              className="link-node flow-btn-create-arrow"
              ref={btnCreateArrowRef}
              onClick={onGhostArrow}
            >
              <IconLinkNode></IconLinkNode>
            </div>
          ) : (
            <div className="link-node-remove flow-btn-remove-arrow">
              <IconLinkNodeRemove></IconLinkNodeRemove>
            </div>
          )}
        </div>
        <div
          className="close flow-btn-remove-node"
          ref={btnRemoveNodeRef}
          onClick={onRemoveNode}
        >
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
            cursor: pointer;
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
