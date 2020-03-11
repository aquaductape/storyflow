import React, { useEffect } from "react";
import { ISVGArrow } from "../../models/SVGArrow";

export default function SVGArrow({
  x1,
  y1,
  x2,
  y2,
  color,
  tension
}: Omit<ISVGArrow, "fromId" | "toId">) {
  const delta = (x2 - x1) * (tension || 0);
  const hx1 = x1 + delta;
  const hy1 = y1;
  const hx2 = x2 - delta;
  const hy2 = y2;
  const d = `M ${x1} ${y1} C ${hx1} ${hy1} ${hx2} ${hy2} ${x2} ${y2}`;

  return <path d={d} fill="none" stroke={color} strokeWidth="2px" />;
}
