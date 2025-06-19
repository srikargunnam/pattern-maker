import { useAtom } from "jotai";
import React from "react";
import { Text } from "react-native";
import { Circle, G, Line, Path, Text as SvgText } from "react-native-svg";
import { measurementsAtom } from "../../atoms/measurements";

const scale = 10;

export default function BackBodice({
  originX = 400,
  originY = 50,
}: {
  originX?: number;
  originY?: number;
}) {
  const [measurements] = useAtom(measurementsAtom);

  const bust = parseFloat(measurements.bust || "0");
  const waist = parseFloat(measurements.waist || "0");
  const shoulder = parseFloat(measurements.shoulder || "0");
  const blouseLength = parseFloat(measurements.blouseLength || "0");
  const neckDepth = 2; // back neck depth is usually fixed shallow

  const neckWidth = 3;
  const shoulderSlope = 0.75;
  const armholeDepth = bust / 4 + 1.5;

  const x0 = originX;
  const y0 = originY;

  const P = {
    A: [x0, y0],
    B: [x0 + (shoulder / 2) * scale, y0],
    C: [x0 + (shoulder / 2) * scale, y0 + shoulderSlope * scale],
    D: [x0, y0 + armholeDepth * scale],
    E: [x0, y0 + blouseLength * scale],
    F: [x0 + (bust / 4 + 0.5) * scale, y0 + armholeDepth * scale],
    G: [x0 + (waist / 4 + 0.5) * scale, y0 + blouseLength * scale],
    N1: [x0 + neckWidth * scale, y0],
    N2: [x0, y0 + neckDepth * scale],
  };

  if (!bust || !waist || !shoulder || !blouseLength) {
    return <Text>Measurements incomplete</Text>;
  }

  return (
    <G>
      {/* Outline */}
      <Line x1={P.A[0]} y1={P.A[1]} x2={P.B[0]} y2={P.B[1]} stroke="black" />
      <Line x1={P.C[0]} y1={P.C[1]} x2={P.F[0]} y2={P.F[1]} stroke="black" />
      <Line x1={P.F[0]} y1={P.F[1]} x2={P.G[0]} y2={P.G[1]} stroke="black" />
      <Line x1={P.G[0]} y1={P.G[1]} x2={P.E[0]} y2={P.E[1]} stroke="black" />
      <Line x1={P.E[0]} y1={P.E[1]} x2={P.A[0]} y2={P.A[1]} stroke="black" />

      {/* Armhole curve */}
      <Path
        d={`
          M ${P.C[0]} ${P.C[1]}
          Q ${P.F[0]} ${(P.C[1] + P.F[1]) / 2}, ${P.F[0]} ${P.F[1]}
        `}
        stroke="black"
        fill="none"
        strokeWidth={1.5}
      />

      {/* Neckline (shallow curve) */}
      <Path
        d={`
          M ${P.A[0]} ${P.A[1]}
          Q ${x0 + neckWidth * scale * 0.5} ${P.N2[1]}, ${P.N1[0]} ${P.N1[1]}
        `}
        stroke="red"
        fill="none"
        strokeWidth={1.5}
      />

      {/* Debug points */}
      {Object.entries(P).map(([label, [x, y]]) => (
        <React.Fragment key={label}>
          <Circle cx={x} cy={y} r="2" fill="black" />
          <SvgText x={x + 5} y={y - 5} fontSize="10" fill="gray">
            {label}
          </SvgText>
        </React.Fragment>
      ))}
    </G>
  );
}
