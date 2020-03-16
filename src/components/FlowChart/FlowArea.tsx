import React, { useState, useContext, useEffect } from "react";
import Draggable, { DraggableEvent } from "react-draggable";

import FlowContext from "../../context/FlowContext";
import FlowShape from "./FlowShape";
import { connectElementsCooridinates } from "../../lib/connectElementsCooridinates";
import SVGArrowContainer from "./SVGArrowContainer";
import { FlowNodeUI } from "../../models/FlowInstructionData";
import { onCreateArrow } from "../../lib/createArrow";
import { convertToText } from "../../lib/contentEditable";
import lsStorage from "../../lib/lsStorage";
import {
  removeNode,
  removeAllArrows,
  removeArrow
} from "../../lib/removeShape";
import closestPointPretty from "../../lib/closestPointPretty";

export default function FlowArea() {
  const {
    flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    flowConnectState: { isFlowConnecting, setFlowConnecting },
    svgArrowState: { setSvgArrows },
    scrollPositionState: { scrollPosition, setScrollPosition },
    flowAreaZoomState: { flowAreaZoom }
  } = useContext(FlowContext)!;
  const [activeDrags, setActiveDrags] = useState(0);

  const dragStart = () => {
    setActiveDrags(prev => ++prev);
  };
  const dragStop = () => {
    setActiveDrags(prev => --prev);
  };

  const onStart = (e: DraggableEvent) => {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    if (target.closest(".textareaInput")) return false;
    if (target.closest(".flow-btn-create-arrow")) {
      onCreateArrow({
        currentTarget,
        isFlowConnecting,
        setFlowConnecting,
        setFlowNodeUI,
        setSvgArrows,
        scrollPosition
      });
      return false;
    }
    if (target.closest(".flow-btn-remove-node")) {
      console.log("remove node");
      removeNode({ currentTarget, setFlowNodeUI });
      removeAllArrows({ currentTarget, setSvgArrows });
      return false;
    }
    // *** better to pass these as functions, instead of searching through whole list by element by id ** //
    if (target.closest(".flow-btn-remove-arrow")) {
      console.log("remove arrow");
      removeArrow({ currentTarget, setSvgArrows, setFlowNodeUI });
      return false;
    }
    if (target.closest(".flow-btn-change-direction"))
      return onChangeDirection(currentTarget);
  };

  const onStop = ({
    id,
    parentId,
    element
  }: {
    id: string;
    element: HTMLDivElement;
    parentId?: string;
  }) => {
    const matchTransform = element.style.transform.match(/-?\d+/g);
    console.log("stop");

    if (!matchTransform) return;

    const [translateX, translateY] = matchTransform.map(el => parseInt(el));

    setFlowNodeUI(prev => {
      if (parentId) {
        const parent = prev.find(item => item.id === parentId)!;
        const item = parent.answers!.find(item => item.id === id)!;
        item.translateX = translateX;
        item.translateY = translateY;
        return [...prev];
      }
      const item = prev.find(item => item.id === id)!;
      // item.left = item.left - translateX;
      // item.top = item.top - translateY;
      // element.style.transform = "";
      item.translateX = translateX;
      item.translateY = translateY;
      return [...prev];
    });
  };

  const onDrag = ({
    id,
    isConnected
  }: {
    id: string;
    isConnected: boolean;
  }) => {
    if (!isConnected) return;

    setSvgArrows(prev => {
      for (let i = 0; i < prev.length; i++) {
        const item = prev[i];
        const scale = flowAreaZoom / 100;
        const startingTop = 50;
        if (item.fromId === id || item.toId === id) {
          const { fromId, toId } = item;
          const updatedCooridinates = connectElementsCooridinates({
            fromId,
            toId,
            color: "#000",
            tension: 0,
            scale
          });

          updatedCooridinates.x1 += scrollPosition.left * (1 / scale);
          updatedCooridinates.x2 += scrollPosition.left * (1 / scale);
          updatedCooridinates.y1 += scrollPosition.top * (1 / scale);
          updatedCooridinates.y2 += scrollPosition.top * (1 / scale);

          // updatedCooridinates.y1 += startingTop / (startingTop * (1 / scale));
          // updatedCooridinates.y2 += startingTop / (startingTop * (1 / scale));
          // updatedCooridinates.y1 -=
          //   startingTop - startingTop / (startingTop * (1 / scale));
          // updatedCooridinates.y2 -=
          //   startingTop - startingTop / (startingTop * (1 / scale));

          prev[i] = { ...updatedCooridinates, fromId, toId, scale };
        }
      }
      return [...prev];
    });
  };

  const onChangeDirection = (currentTarget: HTMLElement): false => {
    console.log("change direction");
    return false;
  };

  const dragHandlers = { onStart: dragStart, onStop: dragStop };

  const onScroll = (e: React.UIEvent) => {
    const target = e.target as HTMLElement;
    const { scrollTop, scrollLeft } = target;
    setScrollPosition(() => ({ top: scrollTop, left: scrollLeft }));
  };

  const onContentInput = (
    e: React.FocusEvent<HTMLElement>,
    id: string,
    parentId?: string
  ) => {
    const target = e.currentTarget;
    const content = convertToText(target.innerHTML);

    setFlowNodeUI(prev => {
      if (parentId) {
        const parent = prev.find(item => item.id === parentId)!;
        console.log(parent);
        const item = parent.answers!.find(item => item.id === id)!;
        item.content = content;
        console.log(prev);
        return [...prev];
      }

      const item = prev.find(item => item.id === id)!;
      item.content = content;

      return [...prev];
    });
  };

  return (
    <div className="flow-area-outer" onScroll={onScroll}>
      <div className="flow-area-inner">
        <SVGArrowContainer></SVGArrowContainer>
        {flowNodeUI.map(
          (
            {
              id,
              type,
              content,
              top,
              left,
              translateX,
              translateY,
              answers,
              isConnected,
              arrowTo
            },
            idx
          ) => {
            return (
              <FlowShape
                id={id}
                isConnected={isConnected}
                type={type}
                arrowConnectState={true}
                content={content}
                dragState={{ dragHandlers, onStart, onDrag, onStop }}
                onBlur={onContentInput}
                position={{ left, top, translateX, translateY }}
                answers={answers}
                arrowTo={arrowTo}
                key={idx}
              ></FlowShape>
            );
          }
        )}
      </div>
      <style jsx global>
        {`
          .flow-area-inner {
            transform: scale(${flowAreaZoom / 100});
            transform-origin: 0 0;
          }
          .flow-shape {
            padding: 30px;
            border: 2px solid #000;
            min-width: 225px;
            background: #fff;
          }
          .flow-shape:hover {
            cursor: grab;
          }
          .flow-shape.flow-decision {
            background: #f6d7a6;
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
