import React from "react";
import { Line, Text as SvgText } from "react-native-svg";

const scale = 10; // 1 inch = 10 units

type PatternGridProps = {
  width: number;
  height: number;
  showInchMarks?: boolean;
};

export default function PatternGrid({
  width,
  height,
  showInchMarks = true,
}: PatternGridProps) {
  const inchSpacing = scale; // 1 inch
  const lines = [];

  // Vertical lines
  for (let x = 0; x <= width; x += inchSpacing) {
    lines.push(
      <Line
        key={`v-${x}`}
        x1={x}
        y1={0}
        x2={x}
        y2={height}
        stroke="#e5e7eb"
        strokeWidth={0.5}
      />
    );

    if (showInchMarks && x !== 0) {
      lines.push(
        <SvgText
          key={`v-label-${x}`}
          x={x + 2}
          y={12}
          fontSize="8"
          fill="#9ca3af"
        >
          {x / scale}&quot;
        </SvgText>
      );
    }
  }

  // Horizontal lines
  for (let y = 0; y <= height; y += inchSpacing) {
    lines.push(
      <Line
        key={`h-${y}`}
        x1={0}
        y1={y}
        x2={width}
        y2={y}
        stroke="#e5e7eb"
        strokeWidth={0.5}
      />
    );

    if (showInchMarks && y !== 0) {
      lines.push(
        <SvgText
          key={`h-label-${y}`}
          x={2}
          y={y - 2}
          fontSize="8"
          fill="#9ca3af"
        >
          {y / scale}&quot;
        </SvgText>
      );
    }
  }

  return <>{lines}</>;
}
