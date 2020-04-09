import React, { useState, useEffect, useRef } from "react";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import LinkNodeContainer from "../NodeLinks";
import GhostNodeContainer from "../NodeLinks/GhostNodeContainer";
import FlowShapes from "../FlowShapes/index";
import { setScrollPosition } from "./scrollPositionSlice";
import { updateGhostNodeLink } from "../../ContextMenu/flowNodesSlice";

export default function FlowArea() {
  const areaInnerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPositionState] = useState({
    top: 0,
    left: 0,
  });
  const dispatch = useDispatch();

  const flowAreaZoom = useSelector(
    (state: RootState) => state.scale.scaleAmount
  );
  const nodeLinkGhost = useSelector(
    (state: RootState) => state.flowNodes.nodeLinkGhost
  );

  useEffect(() => {
    const areaInner = areaInnerRef.current!;
    areaInner.dataset.areaZoom = `${flowAreaZoom}`;
    areaInner.dataset.areaScrollPositionTop = `${scrollPosition.top}`;
    areaInner.dataset.areaScrollPositionLeft = `${scrollPosition.left}`;
  }, [flowAreaZoom, scrollPosition]);

  const onScroll = (e: React.UIEvent) => {
    const target = e.target as HTMLElement;
    const { scrollTop, scrollLeft } = target;
    const { top, left } = scrollPosition;
    const scale = flowAreaZoom / 100;
    let x2 = 0;
    let y2 = 0;
    dispatch(setScrollPosition({ top: scrollTop, left: scrollLeft }));

    setScrollPositionState(() => ({ top: scrollTop, left: scrollLeft }));

    if (!nodeLinkGhost) return null;

    y2 = scrollTop - top;
    y2 *= 1 / scale;
    x2 = scrollLeft - left;
    x2 *= 1 / scale;

    if (scrollTop > top) {
      dispatch(updateGhostNodeLink({ y2 }));
    } else if (scrollTop < top) {
      dispatch(updateGhostNodeLink({ y2 }));
    }

    if (scrollLeft > left) {
      dispatch(updateGhostNodeLink({ x2 }));
    } else if (scrollLeft < left) {
      dispatch(updateGhostNodeLink({ x2 }));
    }
  };

  return (
    <div className="flow-area-outer" onScroll={onScroll}>
      <div className="flow-area-inner" ref={areaInnerRef}>
        <LinkNodeContainer></LinkNodeContainer>
        <GhostNodeContainer></GhostNodeContainer>
        <FlowShapes></FlowShapes>
      </div>
      <style jsx global>
        {`
          .flow-area-inner {
            transform: scale(${flowAreaZoom / 100});
            transform-origin: 0 0;
          }
          .flow-shape {
            padding: 30px;
            // border: 2px solid #000;
            border-radius: 10px;
            min-width: 225px;
            background: #fff;
          }

          .flow-shape .textareaInput {
            margin-top: 10px;
            min-width: 20px;
            min-height: 20px;
            white-space: nowrap;
            padding: 5px;
            background: #00000012;
          }
          .flow-shape .textareaInput:hover {
            cursor: text;
          }
          .flow-shape:hover {
            cursor: grab;
          }

          .flow-shape.flow-start {
            background: #b4efbf;
          }

          .flow-shape.flow-process {
            background: #d4defa;
          }
        `}
      </style>
    </div>
  );
}
