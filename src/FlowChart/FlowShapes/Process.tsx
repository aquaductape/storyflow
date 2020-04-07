import React, { useContext, useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import AntMenu from "../../assets/ant-menu.svg";
import { FlowDraggable } from "../../ts/models/FlowShape";
import FlowControl from "../Control";

export default function Process({
  id,
  type,
  isConnected,
  content,
  arrowConnectState,
  position: { top, left, translateX, translateY },
  dragState: { dragHandlers, onStart, onDrag, onStop, handleDragDelta },
  onBlur,
  arrowTo,
}: FlowDraggable) {
  const elementRef = useRef<HTMLDivElement>(null);
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <Draggable
      {...dragHandlers}
      onStart={onStart}
      onDrag={(e, ui) => {
        // rather than use isConnected property, use arrowFrom and arrowTo to determine if node is connected
        // isConnected is redundant
        onDrag({ id, isConnected });
      }}
      onStop={() => onStop({ id, element: elementRef.current! })}
      defaultPosition={{ x: translateX, y: translateY }}
      // *** corrects position on removed node but messes up zoom*** //
      position={{ x: translateX, y: translateY }}
      // *** corrects position on removed node but messes up zoom*** //
      // scale={flowAreaZoom / 100}
    >
      <div
        id={id}
        className="flow-shape flow-process"
        style={{
          position: "absolute",
          top: `${top || 0}px`,
          left: `${left || 0}px`,
        }}
        ref={elementRef}
      >
        <div
          className="textareaInput flow-decision-content"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(e) => onBlur(e, id)}
        >
          {content}
        </div>
        <FlowControl {...{ id, arrowTo, type }}></FlowControl>
        <style jsx>{`
          .process {
          }
        `}</style>
      </div>
    </Draggable>
  );
}
