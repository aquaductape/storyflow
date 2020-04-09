import { closestPointElement } from "./closestPoint";
import { flowChartContainerTop } from "./constants";

interface IConnectElements {
  fromId: string;
  toId: string;
  color: string;
  tension: number;
  scale?: number;
}

export function connectElementsCooridinates({
  fromId,
  toId,
  color,
  tension,
  scale
}: IConnectElements) {
  const elFrom = document.getElementById(fromId)!;
  const elTo = document.getElementById(toId)!;

  const result = closestPointElement({ elFrom, elTo, scale: scale || 1 });

  // const leftPos = elFrom.getBoundingClientRect();

  // let x1 = leftPos.x * (scale ? 1 / scale : 1);
  // let y1 = leftPos.y * (scale ? 1 / scale : 1);
  // y1 -= svgContainerTop / (scale || 1) - svgContainerTop;

  // x1 += elFrom.clientWidth;
  // y1 += elFrom.clientHeight / 2;

  // const rightPos = elTo.getBoundingClientRect();

  // let x2 = rightPos.x * (scale ? 1 / scale : 1);
  // let y2 = rightPos.y * (scale ? 1 / scale : 1);

  // y2 += elTo.clientHeight / 2;
  // y2 -= svgContainerTop / (scale || 1) - svgContainerTop;

  // const width = x2 - x1;
  // const height = y2 - y1;

  return { ...result, color, tension };
  // return { x1, x2, y1, y2, color, tension };
}
