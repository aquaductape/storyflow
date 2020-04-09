import React, { useState, useRef } from "react";
import { FlowDraggable } from "../../ts/models/FlowShape";
import Draggable from "react-draggable";
import FlowControl from "../Control";
import DecisionAnswers from "./DecisionAnswers";

export default function Decision({
  id,
  type,
  isConnected,
  content,
  arrowConnectState,
  answers,
  position: { top, left, translateX, translateY },
  dragState,
  onBlur,
}: FlowDraggable) {
  // const [isConnected, setIsConnected] = useState(false);
  const { dragHandlers, onDrag, onStart, onStop } = dragState;
  const elementRef = useRef<HTMLDivElement>(null);
  let parentId = id;

  return (
    <>
      <Draggable
        {...dragHandlers}
        onStart={onStart}
        onStop={() => onStop({ id, element: elementRef.current! })}
        onDrag={(e, ui) => {
          onDrag({ id, isConnected });
        }}
        defaultPosition={{ x: translateX, y: translateY }}
        // *** corrects position on removed node but messes up zoom*** //
        position={{ x: translateX, y: translateY }}
        // *** corrects position on removed node but messes up zoom*** //
        // scale={flowAreaZoom / 100}
      >
        <div
          id={id}
          data-flow-type="decision"
          className="flow-shape flow-decision"
          style={{
            position: "absolute",
            top: `${top || 0}px`,
            left: `${left || 0}px`,
          }}
          ref={elementRef}
        >
          <div
            className="textareaInput flow-decision-content"
            onBlur={(e) => onBlur(e, id)}
            contentEditable={true}
            suppressContentEditableWarning={true}
          >
            {content}
          </div>
          <FlowControl {...{ id, type }}></FlowControl>
        </div>
      </Draggable>

      {answers
        ? answers.map(
            ({
              id,
              type,
              isConnected,
              top,
              left,
              content,
              translateX,
              translateY,
              arrowTo,
              arrowFrom,
            }) => (
              <DecisionAnswers
                arrowConnectState={arrowConnectState}
                id={id}
                type={type}
                parentId={parentId}
                position={{ top, left, translateX, translateY }}
                content={content}
                onBlur={onBlur}
                dragState={dragState}
                isConnected={isConnected}
                arrowTo={arrowTo}
                key={id}
              ></DecisionAnswers>
            )
          )
        : null}
      <style jsx>
        {`
          .flow-decision {
            background: #f6d7a6;
            background: #f5c57a;
          }
        `}
      </style>
    </>
  );
}
