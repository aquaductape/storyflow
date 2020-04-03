import React, { useRef } from "react";
import Draggable from "react-draggable";
import { IDecisionAnswers } from "../../models/FlowShape";
import FlowControl from "./FlowControl";
export default function DecisionAnswers({
  arrowConnectState,
  content,
  dragState: { dragHandlers, onDrag, onStart, onStop },
  id,
  arrowTo,
  type,
  isConnected,
  onBlur,
  parentId,
  position: { left, top, translateX, translateY }
}: IDecisionAnswers) {
  const elementRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      {...dragHandlers}
      onStart={onStart}
      onStop={() => onStop({ id, parentId, element: elementRef.current! })}
      onDrag={(e, ui) => {
        onDrag({ id, parentId, isConnected });
      }}
      defaultPosition={{ x: translateX, y: translateY }}
      // *** corrects position on removed node but messes up zoom*** //
      position={{ x: translateX, y: translateY }}
      // *** corrects position on removed node but messes up zoom*** //
      // scale={flowAreaZoom / 100}
    >
      <div
        id={id}
        data-flow-type="answer"
        className="flow-shape flow-decision flow-decision-question"
        style={{
          position: "absolute",
          top: `${top || 0}px`,
          left: `${left || 0}px`
        }}
        ref={elementRef}
      >
        <div
          onBlur={e => onBlur(e, id, parentId)}
          className="textareaInput flow-decision-content"
          contentEditable={true}
          suppressContentEditableWarning={true}
        >
          {content}
        </div>
        <FlowControl {...{ id, type, arrowTo }}></FlowControl>
        <style jsx>
          {`
            .flow-decision-question {
              min-width: 100px;
              background: #f6d7a6;
            }
          `}
        </style>
      </div>
    </Draggable>
  );
}
