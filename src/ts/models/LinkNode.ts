export interface ILinkNode {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  fromId: string;
  toId: string;
  scale: number;
  color?: string;
  tension?: number;
  strokeDashArray?: string;
}

export interface IGhostArrow {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  scale: number;
  strokeDashArray?: string;
}
