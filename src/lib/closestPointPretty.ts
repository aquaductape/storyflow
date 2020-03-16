interface IClosestPoint {
  elFrom: HTMLElement;
  elTo: HTMLElement;
  scale: number;
}

interface IisGreaterThanDegree {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  origin: string;
}

function isGreaterThanDegree(
  degree: number,
  { x1, x2, y1, y2, origin }: IisGreaterThanDegree
) {
  let result = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  // switch (origin) {
  //   case "leftTop":
  //     break;
  //   case "leftBottom":
  //     break;
  //   case "rightTop":
  //     break;
  //   case "rightBottom":
  //     break;
  // }
  console.log(origin, " ", result);
  return degree < Math.abs(result);
}

export default function closestPointPretty({
  elFrom,
  elTo,
  scale
}: IClosestPoint) {
  const elFromPos = elFrom.getBoundingClientRect();
  const elToPos = elTo.getBoundingClientRect();
  const coordinates = { x1: 0, x2: 0, y1: 0, y2: 0 };
  const xBoundry = 50;
  const yBoundry = 50;
  const xArrowEnd = 15;
  const yArrowEnd = 15;
  let minDistance = Number.MAX_SAFE_INTEGER;

  let xGroup: { x1: number; x2: number };
  let yGroup: { y1: number; y2: number };
  let xPosition = "";
  let yPosition = "";

  // is xLeft
  if (elFromPos.right <= elToPos.left - xBoundry) {
    xGroup = {
      x1: elFromPos.right * (1 / scale),
      x2: elToPos.left * (1 / scale) - xArrowEnd * (1 / scale)
    };
    // is xRight
  } else if (elFromPos.left >= elToPos.right + xBoundry) {
    xGroup = {
      x1: elFromPos.left * (1 / scale),
      x2: elToPos.right * (1 / scale) + xArrowEnd * (1 / scale)
    };
    // is xCenter
  } else {
    xGroup = {
      x1: elFromPos.left * (1 / scale) + elFromPos.width / 2,
      x2: elToPos.left * (1 / scale) + elToPos.width / 2
    };
    xPosition = "xCenter";
  }

  // top is smaller than bottom since document is upside down graph
  // is yTop
  if (elFromPos.bottom <= elToPos.top - yBoundry) {
    yGroup = {
      y1: elFromPos.bottom * (1 / scale),
      y2: elToPos.top * (1 / scale) - yArrowEnd * (1 / scale)
    };
    // is yBottom
  } else if (elFromPos.top >= elToPos.bottom + xBoundry) {
    yGroup = {
      y1: elFromPos.top * (1 / scale),
      y2: elToPos.bottom * (1 / scale) + yArrowEnd * (1 / scale)
    };
    // is yCenter
  } else {
    yGroup = {
      y1: elFromPos.top * (1 / scale) + elFromPos.height / 2,
      y2: elToPos.top * (1 / scale) + elToPos.height / 2
    };
    yPosition = "yCenter";
  }

  return { ...xGroup, ...yGroup };
}
