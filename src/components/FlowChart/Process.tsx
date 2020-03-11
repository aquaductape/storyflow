import React, { useContext, useState, useEffect, useRef } from "react";
import { FlowDraggable } from "../../models/FlowShape";
import Draggable from "react-draggable";
import FlowControl from "./FlowControl";
import FlowContext from "../../context/FlowContext";

export default function Process({
  id,
  isConnected,
  content,
  arrowConnectState,
  position: { top, left, translateX, translateY },
  dragState: { dragHandlers, onStart, onDrag, onStop, handleDragDelta },
  onBlur
}: FlowDraggable) {
  const {
    flowNodeUIState: { setFlowNodeUI },
    svgArrowState: { svgArrows, setSvgArrows }
  } = useContext(FlowContext)!;
  const elementRef = useRef<HTMLDivElement>(null);
  // const [isConnected, setIsConnected] = useState(false);

  let direction = "From";
  const onChangeDirection = () => {
    // change array data by grabbing id
  };
  const onCreateArrow = () => {
    // setIsConnected(() => true);
  };

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
        <FlowControl
          {...{ id, direction, onChangeDirection, onCreateArrow }}
        ></FlowControl>
      </div>
    </Draggable>
  );
}
