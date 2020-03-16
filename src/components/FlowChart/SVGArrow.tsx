import React, { useEffect } from "react";
import { ISVGArrow } from "../../models/SVGArrow";
import { svgContainerTop } from "../../lib/constants";

export default function SVGArrow({
  x1,
  y1,
  x2,
  y2,
  color,
  scale,
  tension
}: Omit<ISVGArrow, "fromId" | "toId">) {
  const delta = (x2 - x1) * (tension || 0);
  // x2 = (x1 + x2) / 2;
  // y2 = (y1 + y2) / 2;
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  // const d1 = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;
  const d1 = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;

  // console.log(scale, " ", svgContainerTop / scale - svgContainerTop);
  return (
    <>
      <path
        // style={{
        //   transform: `translateY(-${svgContainerTop / scale -
        //     svgContainerTop}px)`
        // }}
        d={d1}
        fill="none"
        stroke={color}
        strokeWidth="2px"
        markerEnd="url(#triangle)"
      />
    </>
  );
}
