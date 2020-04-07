import React, { useEffect } from "react";
import { ILinkNode } from "../../ts/models/LinkNode";
import { flowChartContainerTop } from "../../lib/constants";

export default function NodeLink({
  x1,
  y1,
  x2,
  y2,
  color,
  scale,
  strokeDashArray,
  tension,
}: Omit<ILinkNode, "id" | "fromId" | "toId">) {
  const delta = (x2 - x1) * (tension || 0);
  // x2 = (x1 + x2) / 2;
  // y2 = (y1 + y2) / 2;
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  // const d1 = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;
  const d1 = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;

  return (
    <>
      <path
        // style={{
        //   transform: `translateY(-${svgContainerTop / scale -
        //     svgContainerTop}px)`
        // }}
        d={d1}
        strokeLinecap="round"
        fill="none"
        stroke={"#636363"}
        strokeWidth="2px"
        strokeDasharray={strokeDashArray}
        markerEnd="url(#triangle)"
      />
    </>
  );
}
