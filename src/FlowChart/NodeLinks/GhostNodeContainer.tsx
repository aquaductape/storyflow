import React, { useContext } from "react";
import NodeLink from "./NodeLink";
import { flowChartContainerTop } from "../../lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../app/rootReducer";

export default function GhostNodeContainer() {
  const style = {
    position: "absolute",
    top: `-${flowChartContainerTop}px`,
    left: "0",
    zIndex: 100,
    pointerEvents: "none",
  } as React.CSSProperties;

  const ghostNodeLink = useSelector(
    (state: RootState) => state.flowNodes.nodeLinkGhost
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={3000}
      height={3000}
      style={style}
    >
      <defs>
        <marker
          id="triangle"
          viewBox="0 0 2.164 3.7132"
          refX="1.1"
          refY="1.9"
          markerUnits="strokeWidth"
          markerWidth="10"
          markerHeight="8"
          orient="auto"
        >
          <path
            d="m 0.307788,-2.904362e-5 c -0.078502,0 -0.15740737,0.03028225362 -0.2175596,0.09043451362 -0.12030453,0.12030451 -0.12030453,0.31378114 0,0.43408568 L 0.13312018,0.56738292 1.1149807,1.5492434 1.4224579,1.8567207 1.1154974,2.1636813 0.13880464,3.1398574 0.0902284,3.1889502 c -0.12030453,0.1203047 -0.12030453,0.3137815 0,0.4340857 0.12030449,0.1203046 0.3142979,0.1203046 0.43460243,0 l 1.54772197,-1.547722 0.00156,-0.00103 c 0,0 0,-5.159e-4 0,-5.159e-4 0.028079,-0.028157 0.050693,-0.061831 0.066146,-0.09922 1.497e-4,-3.598e-4 3.704e-4,-6.72e-4 5.292e-4,-0.00103 2.91e-4,-6.932e-4 -2.408e-4,-0.00138 0,-0.00207 0.014245,-0.035472 0.023254,-0.074021 0.023254,-0.1147227 0,-0.040878 -0.00889,-0.079598 -0.023254,-0.1152394 -1.382e-4,-4.445e-4 1.608e-4,-0.00112 0,-0.00155 -1.432e-4,-3.466e-4 -3.705e-4,-6.879e-4 -5.292e-4,-0.00103 -0.015455,-0.037437 -0.038068,-0.070997 -0.066146,-0.09922 -7.144e-4,-7.144e-4 -0.00135,-0.00136 -0.00206,-0.00207 0,0 -5.291e-4,-5.159e-4 -5.291e-4,-5.159e-4 L 0.52483083,0.09040547 C 0.46467858,0.03025321 0.38628995,-2.904362e-5 0.307788,-2.904362e-5 Z"
            fill="#636363"
            fillRule="evenodd"
          />
        </marker>
      </defs>
      {ghostNodeLink && <NodeLink {...ghostNodeLink}></NodeLink>}
    </svg>
  );
}
