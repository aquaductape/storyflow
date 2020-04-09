import { flowChartContainerTop } from "./constants";

interface IClosestPoint {
  elFrom: HTMLElement;
  elTo: HTMLElement;
  scale: number;
}
interface IClosestPointCoor {
  elFrom: HTMLElement;
  toCoor: {
    x: number;
    y: number;
  };
  scale: number;
}

export function closestPointElement({ elFrom, elTo, scale }: IClosestPoint) {
  const elFromPos = elFrom.getBoundingClientRect();
  const elToPos = elTo.getBoundingClientRect();
  const scaleDec = scale;
  scale = 1 / scale;
  const xBoundry = 50 * scaleDec;
  const yBoundry = 50 * scaleDec;
  const xArrowEnd = 15 * scaleDec;
  const yArrowEnd = 15 * scaleDec;

  let xGroup: { x1: number; x2: number };
  let yGroup: { y1: number; y2: number };
  let xPosition = "";
  let yPosition = "";

  // is xLeft
  if (elFromPos.right <= elToPos.left - xBoundry) {
    let x1 = elFromPos.right * scale;
    let x2 = elToPos.left * scale;
    x2 -= xArrowEnd;
    xGroup = {
      x1,
      x2
    };
    // is xRight
  } else if (elFromPos.left >= elToPos.right + xBoundry) {
    let x1 = elFromPos.left * scale;
    let x2 = elToPos.right * scale;
    x2 += xArrowEnd;
    xGroup = {
      x1,
      x2
    };
    // is xCenter
  } else {
    let x1 = elFromPos.left + elFromPos.width / 2;
    x1 *= scale;
    let x2 = elToPos.left + elToPos.width / 2;
    x2 *= scale;
    xGroup = {
      x1,
      x2
    };
    xPosition = "xCenter";
  }

  // top is smaller than bottom since document is upside down graph
  // is yTop
  if (elFromPos.bottom <= elToPos.top - yBoundry) {
    let y1 = elFromPos.bottom * scale;
    y1 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    let y2 = elToPos.top * scale;
    y2 -= yArrowEnd;
    y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
    // is yBottom
  } else if (elFromPos.top >= elToPos.bottom + xBoundry) {
    let y1 = elFromPos.top * scale;
    y1 -= flowChartContainerTop / scale - flowChartContainerTop;
    let y2 = elToPos.bottom * scale;
    y2 += yArrowEnd;
    y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
    // is yCenter
  } else {
    let y1 = elFromPos.top + elFromPos.height / 2;
    y1 *= scale;
    y1 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    let y2 = elToPos.top + elToPos.height / 2;
    y2 *= scale;
    y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
    yPosition = "yCenter";
  }

  return { ...xGroup, ...yGroup };
}

export function closestPointCoor({ elFrom, toCoor, scale }: IClosestPointCoor) {
  const elFromPos = elFrom.getBoundingClientRect();
  const toPos = toCoor;
  const scaleDec = scale;
  scale = 1 / scale;

  const xBoundry = 0;
  const yBoundry = 0;
  const xArrowEnd = 0;
  const yArrowEnd = 0;

  let xGroup: { x1: number; x2: number };
  let yGroup: { y1: number; y2: number };

  // is xLeft
  if (elFromPos.right <= toPos.x - xBoundry) {
    let x1 = elFromPos.right * scale;
    let x2 = toPos.x * scale;
    x2 -= xArrowEnd;
    xGroup = {
      x1,
      x2
    };
    // is xRight
  } else if (elFromPos.left >= toPos.x + xBoundry) {
    let x1 = elFromPos.left * scale;
    let x2 = toPos.x * scale;
    x2 += xArrowEnd;
    xGroup = {
      x1,
      x2
    };
    // is xCenter
  } else {
    let x1 = elFromPos.left + elFromPos.width / 2;
    x1 *= scale;
    let x2 = toPos.x;
    x2 *= scale;
    xGroup = {
      x1,
      x2
    };
  }

  // top is smaller than bottom since document is upside down graph
  // is yTop
  if (elFromPos.bottom <= toPos.y - yBoundry) {
    let y1 = elFromPos.bottom * scale;
    y1 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    let y2 = toPos.y * scale;
    y2 -= yArrowEnd;
    y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
    // is yBottom
  } else if (elFromPos.top >= toPos.y + xBoundry) {
    let y1 = elFromPos.top * scale;
    y1 -= flowChartContainerTop / scale - flowChartContainerTop;
    let y2 = toPos.y * scale;
    y2 += yArrowEnd;
    y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
    // is yCenter
  } else {
    let y1 = elFromPos.top + elFromPos.height / 2;
    y1 *= scale;
    y1 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    let y2 = toPos.y;
    y2 *= scale;
    // y2 -= flowChartContainerTop / scaleDec - flowChartContainerTop;
    yGroup = {
      y1,
      y2
    };
  }

  return { ...xGroup, ...yGroup };
}
