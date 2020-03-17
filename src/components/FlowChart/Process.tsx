import React, { useContext, useState, useEffect, useRef } from "react";
import { FlowDraggable } from "../../models/FlowShape";
import Draggable from "react-draggable";
import FlowControl from "./FlowControl";
import FlowContext from "../../context/FlowContext";
import AntMenu from "../../assets/ant-menu.svg";

export default function Process({
  id,
  type,
  isConnected,
  content,
  arrowConnectState,
  position: { top, left, translateX, translateY },
  dragState: { dragHandlers, onStart, onDrag, onStop, handleDragDelta },
  onBlur,
  arrowTo
}: FlowDraggable) {
  const {
    flowAreaZoomState: { flowAreaZoom }
  } = useContext(FlowContext)!;
  const elementRef = useRef<HTMLDivElement>(null);
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <Draggable
      {...dragHandlers}
      onStart={onStart}
      onDrag={(e, ui) => {
        onDrag({ id, isConnected });
        // handleDragDelta!(e, ui);
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
          left: `${left || 0}px`
        }}
        ref={elementRef}
      >
        Process
        <div
          className="textareaInput flow-decision-content"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={e => onBlur(e, id)}
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
