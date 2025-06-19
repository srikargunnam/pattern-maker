import { useAtom } from "jotai";
import React from "react";
import { Circle, Line, Path, Text as SvgText } from "react-native-svg";
import { measurementsAtom } from "../../atoms/measurements";

const scale = 10;

export default function Sleeve({
  originX = 50,
  originY = 400,
}: {
  originX?: number;
  originY?: number;
}) {
  const [measurements] = useAtom(measurementsAtom);

  const bust = parseFloat(measurements.bust || "0");
  const sleeveLength = parseFloat(measurements.sleeveLength || "0");

  const armholeDepth = bust / 4 + 1.5;
  const bicep = bust / 6 + 1.5;

  const x0 = originX;
  const y0 = originY;

  const sleeveCapHeight = armholeDepth / 2;

  const P = {
    A: [x0, y0], // top-left
    B: [x0 + bicep * scale, y0], // top-right
    C: [x0 + bicep * scale, y0 + sleeveLength * scale], // bottom-right
    D: [x0, y0 + sleeveLength * scale], // bottom-left
    CapTop: [x0 + (bicep * scale) / 2, y0 - sleeveCapHeight * scale], // arc peak
  };

  return (
    <>
      {/* Sleeve Outline */}
      <Line x1={P.A[0]} y1={P.A[1]} x2={P.B[0]} y2={P.B[1]} stroke="black" />
      <Line x1={P.B[0]} y1={P.B[1]} x2={P.C[0]} y2={P.C[1]} stroke="black" />
      <Line x1={P.C[0]} y1={P.C[1]} x2={P.D[0]} y2={P.D[1]} stroke="black" />
      <Line x1={P.D[0]} y1={P.D[1]} x2={P.A[0]} y2={P.A[1]} stroke="black" />

      {/* Sleeve Cap Curve */}
      <Path
        d={`
          M ${P.A[0]} ${P.A[1]}
          Q ${P.CapTop[0]} ${P.CapTop[1]}, ${P.B[0]} ${P.B[1]}
        `}
        stroke="red"
        fill="none"
        strokeWidth={1.5}
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
