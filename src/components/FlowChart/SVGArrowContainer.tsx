import React, { useEffect, useContext } from "react";
import FlowContext from "../../context/FlowContext";
import SVGArrow from "./SVGArrow";
import { ISVGArrow } from "../../models/SVGArrow";
import lsStorage from "../../lib/lsStorage";

export default function SVGArrowContainer() {
  const {
    svgArrowState: { svgArrows, setSvgArrows }
  } = useContext(FlowContext)!;
  const style = {
    position: "absolute",
    top: "-50px",
    left: "0"
  } as React.CSSProperties;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={3000}
      height={3000}
      style={style}
    >
      {svgArrows.map(({ x1, x2, y1, y2, color, tension }, idx) => (
        <SVGArrow {...{ x1, x2, y1, y2, color, tension }} key={idx}></SVGArrow>
      ))}
    </svg>
  );
}
