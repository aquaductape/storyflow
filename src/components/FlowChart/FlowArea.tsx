import React, { useState, useContext, useEffect } from "react";
import Draggable, { DraggableEvent } from "react-draggable";
// @ts-ignore
import Minimap from "react-minimap";

import FlowContext from "../../context/FlowContext";
import FlowShape from "./FlowShape";
import { connectElementsCooridinates } from "../../lib/connectElementsCooridinates";
import SVGArrowContainer from "./SVGArrowContainer";
import { FlowNodeUI } from "../../models/FlowJsonData";
import { onCreateArrow } from "../../lib/createArrow";
import { convertToText } from "../../lib/contentEditable";
import lsStorage from "../../lib/lsStorage";

export default function FlowArea({
  zoomState: { flowAreaZoom, setFlowAreaZoom }
}: {
  zoomState: {
    flowAreaZoom: number;
    setFlowAreaZoom: React.Dispatch<React.SetStateAction<number>>;
  };
}) {
  const {
    flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    flowConnectState: { isFlowConnecting, setFlowConnecting },
    svgArrowState: { setSvgArrows },
    scrollPositionState: { scrollPosition, setScrollPosition }
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
        if (item.fromId === id || item.toId === id) {
          const { fromId, toId } = item;
          const updatedCooridinates = connectElementsCooridinates({
            fromId,
            toId,
            color: "#000",
            tension: 0
          });
          updatedCooridinates.x1 += scrollPosition.left;
          updatedCooridinates.x2 += scrollPosition.left;
          updatedCooridinates.y1 += scrollPosition.top;
          updatedCooridinates.y2 += scrollPosition.top;

          prev[i] = { ...updatedCooridinates, fromId, toId };
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

  const flowAreaInnerStyle = {
    zoom: `${flowAreaZoom}%`
  };

  return (
    <>
      {/* <Minimap
        selector="flow-area-outer"
        className="flow-area-minimap"
        keepAspectRation={true}
      ></Minimap> */}
      <div className="flow-area-outer" onScroll={onScroll}>
        <div className="flow-area-inner" style={flowAreaInnerStyle}>
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
                isConnected
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
                  key={idx}
                ></FlowShape>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
