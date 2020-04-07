import React, { useContext, useState } from "react";
import FlowContext from "../../context/FlowContext";
import FlowShape from "./FlowShape";
import { DraggableEvent } from "react-draggable";
import { onCreateArrow } from "../../lib/createArrow";
import {
  removeNode,
  removeAllArrows,
  removeArrow,
} from "../../lib/removeShape";
import { connectElementsCooridinates } from "../../lib/connectElementsCooridinates";
import { convertToText } from "../../lib/contentEditable";
import { RootState } from "../../app/rootReducer";
import { useSelector, shallowEqual } from "react-redux";

export default React.memo(function FlowShupes() {
  const {
    flowNodeUIState: { setFlowNodeUI },
    // flowNodeUIState: { flowNodeUI, setFlowNodeUI },
    flowConnectState: { isFlowConnecting, setFlowConnecting },
    linkNodeState: { setLinkNode },
  } = useContext(FlowContext)!;

  const flowNodeUI = useSelector((state: RootState) => state.flowNodes.nodes);
  const [activeDrags, setActiveDrags] = useState(0);
  const [isStartDrag, setIsStartDrag] = useState(false);
  const [scale, setScale] = useState(100);
  const [scrollPosition, setScrollPosition] = useState({ top: 0, left: 0 });

  const dragStart = () => {
    setActiveDrags((prev) => ++prev);
  };
  const dragStop = () => {
    setActiveDrags((prev) => --prev);
  };

  const onStart = (e: DraggableEvent) => {
    const target = e.target as HTMLElement;
    const currentTarget = e.currentTarget as HTMLElement;

    if (target.closest(".textareaInput")) return false;
    if (
      target.closest(".flow-btn-create-arrow") ||
      target.closest(".flow-connecting")
    ) {
      // onCreateArrow({
      //   currentTarget,
      //   isFlowConnecting,
      //   setFlowConnecting,
      //   setFlowNodeUI,
      //   setSvgArrows: setLinkNode,
      //   scrollPosition,
      // });
      return false;
    }
    if (target.closest(".flow-btn-remove-node")) {
      // removeNode({ currentTarget, setFlowNodeUI });
      // removeAllArrows({ currentTarget, setSvgArrows: setLinkNode });
      return false;
    }
    // // *** better to pass these as functions, instead of searching through whole list by element by id ** //
    if (target.closest(".flow-btn-remove-arrow")) {
      // removeArrow({ currentTarget, setSvgArrows: setLinkNode, setFlowNodeUI });
      return false;
    }
    // if (target.closest(".flow-btn-change-direction"))
    //   return onChangeDirection(currentTarget);
  };

  const onStop = ({
    id,
    parentId,
    element,
  }: {
    id: string;
    element: HTMLDivElement;
    parentId?: string;
  }) => {
    const matchTransform = element.style.transform.match(/-?\d+/g);

    if (!matchTransform) return;

    const [translateX, translateY] = matchTransform.map((el) => parseInt(el));

    setFlowNodeUI((prev) => {
      if (parentId) {
        const parent = prev.find((item) => item.id === parentId)!;
        const item = parent.answers!.find((item) => item.id === id)!;
        item.translateX = translateX;
        item.translateY = translateY;
        return [...prev];
      }
      const item = prev.find((item) => item.id === id)!;
      item.translateX = translateX;
      item.translateY = translateY;
      return [...prev];
    });
    setIsStartDrag(() => false);
  };

  const onDrag = ({
    id,
    isConnected,
  }: {
    id: string;
    isConnected: boolean;
  }) => {
    if (!isConnected) return;

    if (!isStartDrag) {
      const areaInner = document.querySelector(
        ".flow-area-inner"
      )! as HTMLElement;
      const scaleData = parseInt(areaInner.dataset.areaZoom!);
      const scrollTopData = parseInt(areaInner.dataset.areaScrollPositionTop!);
      const scrollLeftData = parseInt(
        areaInner.dataset.areaScrollPositionLeft!
      );

      setIsStartDrag(() => true);
      setScale(() => scaleData / 100);
      setScrollPosition(() => ({ top: scrollTopData, left: scrollLeftData }));
      return;
    }

    setLinkNode((prev) => {
      for (let i = 0; i < prev.length; i++) {
        const item = prev[i];

        if (item.fromId === id || item.toId === id) {
          const { fromId, toId, id } = item;
          const updatedCooridinates = connectElementsCooridinates({
            fromId,
            toId,
            color: "#000",
            tension: 0,
            scale,
          });

          updatedCooridinates.x1 += scrollPosition.left * (1 / scale);
          updatedCooridinates.x2 += scrollPosition.left * (1 / scale);
          updatedCooridinates.y1 += scrollPosition.top * (1 / scale);
          updatedCooridinates.y2 += scrollPosition.top * (1 / scale);

          prev[i] = { ...updatedCooridinates, fromId, toId, id, scale };
        }
      }
      return [...prev];
    });
  };

  const onChangeDirection = (currentTarget: HTMLElement): false => {
    return false;
  };

  const dragHandlers = { onStart: dragStart, onStop: dragStop };

  const onContentInput = (
    e: React.FocusEvent<HTMLElement>,
    id: string,
    parentId?: string
  ) => {
    const target = e.currentTarget;
    const content = convertToText(target.innerHTML);

    setFlowNodeUI((prev) => {
      if (parentId) {
        const parent = prev.find((item) => item.id === parentId)!;
        const item = parent.answers!.find((item) => item.id === id)!;
        item.content = content;
        return [...prev];
      }

      const item = prev.find((item) => item.id === id)!;
      item.content = content;

      return [...prev];
    });
  };
  return (
    <>
      {flowNodeUI.map(
        ({
          id,
          type,
          content,
          top,
          left,
          translateX,
          translateY,
          answers,
          isConnected,
          arrowTo,
        }) => {
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
              key={id}
            ></FlowShape>
          );
        }
      )}
    </>
  );
});
