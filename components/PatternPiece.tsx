// src/components/PatternPieceView.tsx

import { PatternData } from "@/types";
import React from "react";
import { Circle, G, Path, Text as SvgText } from "react-native-svg";

interface Props {
  data: PatternData;
  color: string;
}

export const PatternPiece: React.FC<Props> = ({ data, color }) => {
  return (
    <G>
      {/* Main Outline */}
      <Path
        d={data.outlinePath}
        fill={color}
        stroke="black"
        strokeWidth={0.15}
      />

      {/* Darts (if any) */}
      {data.dartPaths.map((path, i) => (
        <Path
          key={i}
          d={path}
          fill="none"
          stroke="red"
          strokeWidth={0.15}
          strokeDasharray="0.3,0.3"
        />
      ))}

      {/* Points and Labels */}
      {Object.entries(data.points).map(([label, point]) => (
        <React.Fragment key={label}>
          <Circle cx={point.x} cy={point.y} r={0.3} fill="red" />
          <SvgText x={point.x + 1} y={point.y - 1} fontSize="2" fill="black">
            {label}
          </SvgText>
        </React.Fragment>
      ))}
    </G>
  );
};
