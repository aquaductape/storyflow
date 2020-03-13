import React, { useRef } from "react";
import Draggable from "react-draggable";
import { IDecisionAnswers } from "../../models/FlowShape";
export default function DecisionAnswers({
  arrowConnectState,
  content,
  dragState: { dragHandlers, onDrag, onStart, onStop },
  id,
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
        <style jsx>
          {`
            .flow-decision-question {
              min-width: 100px;
            }
          `}
        </style>
      </div>
    </Draggable>
  );
}
