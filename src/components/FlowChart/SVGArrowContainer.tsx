import React, { useContext } from "react";
import FlowContext from "../../context/FlowContext";
import SVGArrow from "./SVGArrow";
import { svgContainerTop } from "../../lib/constants";

export default function SVGArrowContainer() {
  const {
    svgArrowState: { svgArrows, setSvgArrows }
  } = useContext(FlowContext)!;
  const style = {
    position: "absolute",
    top: `-${svgContainerTop}px`,
    left: "0"
  } as React.CSSProperties;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={3000}
      height={3000}
      style={style}
    >
      <defs>
        <marker
          id="triangle"
          viewBox="0 0 10 10"
          refX="0"
          refY="5"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="8"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z"></path>
        </marker>
      </defs>
      {svgArrows.map(({ x1, x2, y1, y2, color, tension, scale }, idx) => (
        <SVGArrow
          {...{ x1, x2, y1, y2, color, tension, scale }}
          key={idx}
        ></SVGArrow>
      ))}
    </svg>
  );
}
