import { findP1 } from "@/utils/patternUtils";
import React from "react";
import { Circle, G, Line, Path, Svg, Text as SvgText } from "react-native-svg";

const cm = (value: number) => value; // keep 1:1 for now, or apply scaling if needed

const FrontBodiceManual = () => {
  const chest = 80;
  const waist = 66;
  const fullLength = 33;
  const shoulder = 17;
  const sleeveLength = 58;
  const sleeveRound = 24;

  // Derived values
  const neckWidth = chest / 12 + 1;
  const neckDepth = chest / 10 + 1;
  const armholeDepth = chest / 8 + 6.5; // fixed for now, can be chest/4 if needed
  const shoulderPlusEase = shoulder + 1;
  const chestWidth = chest / 4;
  const chestWidthPlusEase = chestWidth + 4;
  const dartTopToHem = 8.5; // 33 - 24.5 (where dart curve ends)

  // Define points dynamically
  const points = {
    "0": [0, 0],
    "1": [0, armholeDepth],
    "2": [0, fullLength],
    "3": [-neckWidth, 0],
    "4": [0, neckDepth],
    "5": [-shoulderPlusEase, 0],
    "6": [-shoulderPlusEase, armholeDepth],
    "7": [-shoulderPlusEase, 2],
    "8": [-shoulderPlusEase, armholeDepth - 2.5],
    "9": [-chestWidthPlusEase, armholeDepth], // extended armhole
    "10": [-chestWidthPlusEase, fullLength],
    "11": [-chestWidthPlusEase + 2, fullLength],
    "12": [-chestWidthPlusEase + 2.5, fullLength + 1.5],
    "13": [0, fullLength + 2],
  };

  const line = (a, b) => (
    <Line
      x1={cm(points[a][0])}
      y1={cm(points[a][1])}
      x2={cm(points[b][0])}
      y2={cm(points[b][1])}
      stroke="black"
      strokeWidth="0.3"
    />
  );

  const dot = (label, x, y) => (
    <React.Fragment key={label}>
      <Circle cx={cm(x)} cy={cm(y)} r={0.5} fill="red" />
      <SvgText x={cm(x + 1)} y={cm(y - 1)} fontSize="2" fill="black">
        {label}
      </SvgText>
    </React.Fragment>
  );

  const quadraticBezier = (
    p0: number[],
    p2: number[],
    bt: number[],
    t: number
  ) => {
    const p1 = findP1(p0, p2, bt, t);
    console.log(p1);
    return `${p1.join(",")}`;
  };

  return (
    <Svg viewBox="-30 10 50 50" width="100%" height="100%">
      <G>
        {Object.entries(points).map(([label, [x, y]]) => dot(label, x, y))}

        {line("3", "7")}
        {line("4", "13")}
        {line("12", "13")}

        {/* Neck */}
        <Path
          d={`M ${points["3"].join(",")} Q ${quadraticBezier(points["3"], points["4"], [points["3"][0] * 0.7, points["4"][1] * 0.7], 0.5)} ${points["4"].join(",")}`}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
        />
        {/* Armhole */}
        <Path
          d={`M ${points["9"].join(",")} Q ${quadraticBezier(points["9"], points["5"], points["8"], 0.4)} ${points["7"].join(",")}`}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
        />
        {/* Armhole to waist */}
        <Path
          d={`M ${points["12"].join(",")} Q ${quadraticBezier(points["12"], points["9"], points["11"], 0.1)} ${points["9"].join(",")}`}
          stroke="black"
          fill="none"
          strokeWidth="0.3"
        />
      </G>
    </Svg>
  );
};

export default FrontBodiceManual;
