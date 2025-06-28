import { useAtom } from "jotai";
import React from "react";
import { Circle, Line, Path, Text as SvgText } from "react-native-svg";
import { measurementsAtom } from "../../atoms/measurements";
import { getFrontBodicePoints } from "../../utils/draftSpecs";
import { cm } from "../../utils/patternUtils";

type FrontBodiceProps = {
  design: "boatneck" | "v-neck" | "square-neck" | "round-neck";
  originX?: number;
  originY?: number;
};

export default function FrontBodice({
  design,
  originX = 50,
  originY = 50,
}: FrontBodiceProps) {
  const [measurements] = useAtom(measurementsAtom);

  const P = getFrontBodicePoints(measurements, originX, originY);

  let necklinePath = "";

  if (design === "boatneck") {
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      Q ${P.N1[0] + cm(2)} ${P.A[1] + cm(0.5)}, ${P.N1[0]} ${P.N1[1]}
    `;
  } else if (design === "v-neck") {
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      L ${P.N2[0]} ${P.N2[1]}
      L ${P.N1[0]} ${P.N1[1]}
    `;
  } else if (design === "square-neck") {
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      L ${P.A[0]} ${P.N2[1]}
      L ${P.N1[0]} ${P.N2[1]}
      L ${P.N1[0]} ${P.N1[1]}
    `;
  } else {
    // round-neck
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      Q ${(P.A[0] + P.N1[0]) / 2} ${P.N2[1]}, ${P.N1[0]} ${P.N1[1]}
    `;
  }

  return (
    <>
      {/* Outline */}
      <Line x1={P.A[0]} y1={P.A[1]} x2={P.B[0]} y2={P.B[1]} stroke="black" />
      <Line x1={P.C[0]} y1={P.C[1]} x2={P.F[0]} y2={P.F[1]} stroke="black" />
      <Line x1={P.F[0]} y1={P.F[1]} x2={P.G[0]} y2={P.G[1]} stroke="black" />
      <Line x1={P.G[0]} y1={P.G[1]} x2={P.E[0]} y2={P.E[1]} stroke="black" />
      <Line x1={P.E[0]} y1={P.E[1]} x2={P.A[0]} y2={P.A[1]} stroke="black" />

      {/* Armhole */}
      <Path
        d={`
          M ${P.C[0]} ${P.C[1]}
          Q ${P.F[0]} ${(P.C[1] + P.F[1]) / 2}, ${P.F[0]} ${P.F[1]}
        `}
        stroke="black"
        fill="none"
        strokeWidth={1.5}
      />

      {/* Neckline */}
      <Path d={necklinePath} stroke="red" fill="none" strokeWidth={1.5} />

      {/* Dart */}
      <Line
        x1={P.DartLeft[0]}
        y1={P.DartLeft[1]}
        x2={P.BustPoint[0]}
        y2={P.BustPoint[1]}
        stroke="blue"
      />
      <Line
        x1={P.DartRight[0]}
        y1={P.DartRight[1]}
        x2={P.BustPoint[0]}
        y2={P.BustPoint[1]}
        stroke="blue"
      />

      {/* Debug Points */}
      {Object.entries(P).map(([label, [x, y]]) => (
        <React.Fragment key={label}>
          <Circle cx={x} cy={y} r="2" fill="black" />
          <SvgText x={x + 5} y={y - 5} fontSize="10" fill="gray">
            {label}
          </SvgText>
        </React.Fragment>
      ))}
    </>
  );
}
