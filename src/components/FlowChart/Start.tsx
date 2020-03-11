import React, { useContext, useState, useRef } from "react";
import { FlowDraggable } from "../../models/FlowShape";
import Draggable from "react-draggable";
import FlowControl from "./FlowControl";
import FlowContext from "../../context/FlowContext";

export default function Start({
  id,
  isConnected,
  content,
  arrowConnectState,
  position: { top, left, translateX, translateY },
  dragState: { dragHandlers, onStart, onDrag, onStop },
  onBlur
}: FlowDraggable) {
  const {
    flowNodeUIState: { setFlowNodeUI },
    svgArrowState: { svgArrows, setSvgArrows }
  } = useContext(FlowContext)!;
  // const [isConnected, setIsConnected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  let direction = "From";
  const onChangeDirection = () => {
    // change array data by grabbing id
  };
  const onCreateArrow = () => {
    // setIsConnected(() => true);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    console.log(e.keyCode);
  };

  return (
    <Draggable
      {...dragHandlers}
      onStart={onStart}
      onStop={() => onStop({ id, element: elementRef.current! })}
      onDrag={(e, ui) => {
        onDrag({ id, isConnected });
      }}
      defaultPosition={{ x: translateX, y: translateY }}
    >
      <div
        id={id}
        className="flow-shape flow-start"
        style={{
          position: "absolute",
          top: `${top || 0}px`,
          left: `${left || 0}px`
        }}
        ref={elementRef}
      >
        Start
        <div
          className="textareaInput flow-decision-content"
          onBlur={e => onBlur(e, id)}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={onKeyDown}
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
