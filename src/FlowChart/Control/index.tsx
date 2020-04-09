import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as IconMenu } from "../../assets/ant-menu.svg";
import { ReactComponent as IconClose } from "../../assets/close.svg";
import { ReactComponent as IconLinkNode } from "../../assets/link-node.svg";
import { ReactComponent as IconLinkNodeRemove } from "../../assets/link-node-remove.svg";
import addEscapeHatch from "../../utils/addEscapeHatch";
import { closestPointCoor } from "../../utils/closestPoint";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../app/rootReducer";
import {
  setGhostNodeLink,
  removeGhostNodeLink,
  setNodeConnecting,
  createAnswerNode,
  renderNodeLink,
  establishLinkage,
  removeNode,
} from "../../ContextMenu/flowNodesSlice";

type IFlowControl = {
  id: string;
  type: string;
  arrowTo?: string | undefined;
};

export default function FlowControl({ id, arrowTo, type }: IFlowControl) {
  const btnRemoveNodeRef = useRef<HTMLDivElement>(null);
  const btnCreateArrowRef = useRef<HTMLDivElement>(null);
  const [isStartDrag, setIsStartDrag] = useState(false);

  const dispatch = useDispatch();
  const areaInnerRef = useRef<HTMLElement | null>(null);
  const isNodeConnecting = useSelector(
    (state: RootState) => state.flowNodes.isNodeConnecting
  );
  const nodeLinks = useSelector(
    (state: RootState) => state.flowNodes.nodeLinks
  );
  const nodes = useSelector((state: RootState) => state.flowNodes.nodes);

  useEffect(() => {
    const areaInner = document.querySelector(
      ".flow-area-inner"
    )! as HTMLElement;
    areaInnerRef.current = areaInner;
  }, []);

  const getScale = () => {
    const { dataset } = areaInnerRef.current!;
    return parseInt(dataset.areaZoom!);
  };
  const getScrollPosition = () => {
    const { dataset } = areaInnerRef.current!;
    const top = parseInt(dataset.areaScrollPositionTop!);
    const left = parseInt(dataset.areaScrollPositionLeft!);
    return { top, left };
  };
  // needs rework, goal, modal listener,
  const onGhostArrow = (e: React.MouseEvent) => {
    const flowChartContainer = areaInnerRef.current!;
    const idEl = document.getElementById(id)!;

    let trackGhostArrow = (e: MouseEvent) => {
      const scrollPosition = getScrollPosition();
      const scale = getScale() / 100;
      const x = e.clientX;
      const y = e.clientY;
      console.log({ x, y });

      const result = closestPointCoor({
        elFrom: idEl,
        toCoor: { x, y },
        scale,
      });

      result.x1 += scrollPosition.left * (1 / scale);
      result.x2 += scrollPosition.left * (1 / scale);
      result.y1 += scrollPosition.top * (1 / scale);
      result.y2 += scrollPosition.top * (1 / scale);

      dispatch(setGhostNodeLink({ ...result, scale, strokeDashArray: "12px" }));
    };

    addEscapeHatch({
      target: btnCreateArrowRef.current!,
      build: () => {
        console.log("add");
        flowChartContainer.addEventListener("mousemove", trackGhostArrow);
        dispatch(setNodeConnecting({ fromId: id, toId: "", connecting: true }));
      },
      onStart: (e) => {
        const target = e.event.target as HTMLElement;
        if (target.closest(".flow-connecting")) {
          dispatch(removeGhostNodeLink());
          flowChartContainer.removeEventListener("mousemove", trackGhostArrow);
          return false;
        }
        return true;
      },
      onExit: () => {
        console.log("delete");
        dispatch(removeGhostNodeLink());
        flowChartContainer.removeEventListener("mousemove", trackGhostArrow);

        dispatch(
          setNodeConnecting({
            fromId: "",
            toId: "",
            connecting: false,
          })
        );
      },
    });
  };

  const onRemoveNode = () => {
    console.log("remove");
    dispatch(removeNode(id));
  };

  const onConnectNodes = () => {
    const scrollPosition = getScrollPosition();

    dispatch(establishLinkage({ id }));
    // create answer if from node is a descision
    dispatch(createAnswerNode({ id, scrollPosition }));

    setTimeout(() => {
      dispatch(renderNodeLink({ id, scrollPosition }));
      dispatch(
        setNodeConnecting({
          fromId: "",
          toId: "",
          connecting: false,
        })
      );
    }, 100);
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
