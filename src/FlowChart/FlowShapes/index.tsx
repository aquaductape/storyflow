import React, { useContext, useState, useEffect, useRef } from "react";
import FlowShape from "./FlowShape";
import { DraggableEvent } from "react-draggable";
import { convertToText } from "../../utils/contentEditable";
import { RootState } from "../../app/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  editNodePosition,
  changeLinksPositionOnNode,
  editNodeContent,
} from "../../ContextMenu/flowNodesSlice";

export default React.memo(function FlowShapes() {
  const dispatch = useDispatch();
  const areaInnerRef = useRef<HTMLElement | null>(null);
  const [activeDrags, setActiveDrags] = useState(0);

  const nodes = useSelector((state: RootState) => state.flowNodes.nodes);

  useEffect(() => {
    const areaInner = document.querySelector(
      ".flow-area-inner"
    )! as HTMLElement;
    areaInnerRef.current = areaInner;
  }, []);

  const getScrollPosition = () => {
    const { dataset } = areaInnerRef.current!;
    const top = parseInt(dataset.areaScrollPositionTop!);
    const left = parseInt(dataset.areaScrollPositionLeft!);
    return { top, left };
  };

  const getScale = () => {
    const { dataset } = areaInnerRef.current!;
    return parseInt(dataset.areaZoom!);
  };

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

    dispatch(editNodePosition({ id, parentId, translateX, translateY }));
  };

  const onDrag = ({
    id,
    isConnected,
  }: {
    id: string;
    isConnected: boolean;
  }) => {
    if (!isConnected) return;

    const scrollPosition = getScrollPosition();
    const scale = getScale() / 100;

    dispatch(changeLinksPositionOnNode({ id, scale, scrollPosition }));
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
    dispatch(editNodeContent({ id, parentId, content }));

    // setFlowNodeUI((prev) => {
    //   if (parentId) {
    //     const parent = prev.find((item) => item.id === parentId)!;
    //     const item = parent.answers!.find((item) => item.id === id)!;
    //     item.content = content;
    //     return [...prev];
    //   }

    //   const item = prev.find((item) => item.id === id)!;
    //   item.content = content;

    //   return [...prev];
    // });
  };
  useEffect(() => {
    console.log(nodes);
  }, [nodes]);
  return (
    <>
      {nodes.map(
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
