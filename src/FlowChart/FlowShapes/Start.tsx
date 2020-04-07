import React, { useRef } from "react";
import Draggable from "react-draggable";
import { FlowDraggable } from "../../ts/models/FlowShape";
import FlowControl from "../Control";

export default function Start({
  id,
  type,
  isConnected,
  content,
  arrowTo,
  arrowConnectState,
  position: { top, left, translateX, translateY },
  dragState: { dragHandlers, onStart, onDrag, onStop },
  onBlur,
}: FlowDraggable) {
  const elementRef = useRef<HTMLDivElement>(null);

  return (
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
        className="flow-shape flow-start"
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
        <FlowControl {...{ id, arrowTo, type }}></FlowControl>
      </div>
    </Draggable>
  );
}
