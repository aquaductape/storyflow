import closestPointPretty from "./closestPointPretty";

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

  const result = closestPointPretty({ elFrom, elTo, scale: scale || 1 });

  // const leftPos = left.getBoundingClientRect();

  // let x1 = leftPos.x * (scale ? 1 / scale : 1);
  // let y1 = leftPos.y * (scale ? 1 / scale : 1);
  // result.x1 *= scale ? 1 / scale : 1;
  // result.x2 *= scale ? 1 / scale : 1;
  // result.y1 *= scale ? 1 / scale : 1;
  // result.y2 *= scale ? 1 / scale : 1;

  // x1 += left.clientWidth;
  // y1 += left.clientHeight / 2;

  // const rightPos = right.getBoundingClientRect();

  // let x2 = rightPos.x * (scale ? 1 / scale : 1);
  // let y2 = rightPos.y * (scale ? 1 / scale : 1);

  // y2 += right.clientHeight / 2;

  // const width = x2 - x1;
  // const height = y2 - y1;

  return { ...result, color, tension };
}
