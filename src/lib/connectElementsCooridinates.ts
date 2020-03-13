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
  const left = document.getElementById(fromId)!;
  const right = document.getElementById(toId)!;

  const leftPos = left.getBoundingClientRect();

  let x1 = leftPos.x;
  let y1 = leftPos.y;
  x1 += left.offsetWidth;
  // x1 *= scale
  y1 += left.offsetHeight / 2;
  // y1 *= scale

  const rightPos = right.getBoundingClientRect();

  let x2 = rightPos.x;
  let y2 = rightPos.y;
  // x2 += right.offsetWidth / 2;
  y2 += right.offsetHeight / 2;

  const width = x2 - x1;
  const height = y2 - y1;

  return { x1, x2, y1, y2, color, tension };
}
