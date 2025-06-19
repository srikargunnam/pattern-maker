import { useAtom } from "jotai";
import React from "react";
import { Text, View } from "react-native";
import { Circle, G, Line, Path, Text as SvgText } from "react-native-svg";
import { measurementsAtom } from "../../atoms/measurements";

const scale = 10;

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

  const bust = parseFloat(measurements.bust || "0");
  const waist = parseFloat(measurements.waist || "0");
  const shoulder = parseFloat(measurements.shoulder || "0");
  const blouseLength = parseFloat(measurements.blouseLength || "0");
  const neckDepth = parseFloat(measurements.neckFront || "0");

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
    DartApex: [x0 + (bust / 4 - 1.25) * scale, y0 + (blouseLength / 2) * scale],
  };

  let necklinePath = "";

  if (design === "boatneck") {
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      Q ${x0 + neckWidth * scale * 2.2} ${P.A[1] + scale * 0.5}, ${P.N1[0]} ${P.N1[1]}
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
    // default round neck
    necklinePath = `
      M ${P.A[0]} ${P.A[1]}
      Q ${x0 + neckWidth * scale * 0.5} ${P.N2[1]}, ${P.N1[0]} ${P.N1[1]}
    `;
  }

  if (!bust || !waist || !shoulder || !blouseLength || !neckDepth) {
    return <Text>Measurements incomplete</Text>;
  }

  return (
    <View>
      <Text className="text-base font-bold mb-2">Front Bodice - {design}</Text>
      <G>
        {/* Outline */}
        <Line x1={P.A[0]} y1={P.A[1]} x2={P.B[0]} y2={P.B[1]} stroke="black" />
        <Line x1={P.C[0]} y1={P.C[1]} x2={P.F[0]} y2={P.F[1]} stroke="black" />
        <Line x1={P.F[0]} y1={P.F[1]} x2={P.G[0]} y2={P.G[1]} stroke="black" />
        <Line x1={P.G[0]} y1={P.G[1]} x2={P.E[0]} y2={P.E[1]} stroke="black" />
        <Line x1={P.E[0]} y1={P.E[1]} x2={P.A[0]} y2={P.A[1]} stroke="black" />

        {/* Armhole Curve */}
        <Path
          d={`
            M ${P.C[0]} ${P.C[1]}
            Q ${P.F[0]} ${(P.C[1] + P.F[1]) / 2}, ${P.F[0]} ${P.F[1]}
          `}
          stroke="black"
          fill="none"
          strokeWidth={1.5}
        />

        {/* Dynamic Neckline */}
        <Path d={necklinePath} stroke="red" fill="none" strokeWidth={1.5} />

        {/* Bust Dart */}
        <Line
          x1={P.DartApex[0] - scale * 0.75}
          y1={P.DartApex[1] - scale * 1.75}
          x2={P.DartApex[0]}
          y2={P.DartApex[1]}
          stroke="blue"
        />
        <Line
          x1={P.DartApex[0] + scale * 0.75}
          y1={P.DartApex[1] - scale * 1.75}
          x2={P.DartApex[0]}
          y2={P.DartApex[1]}
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
      </G>
    </View>
  );
}
