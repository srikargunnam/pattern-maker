// src/components/BlousePattern.tsx

import { Measurements } from "@/types";
import React, { useMemo } from "react";
import Svg, { G } from "react-native-svg";
// import { BackBodicePiece, SleevePiece } from '../logic/blousePatterns'; // You would import these too
import { Back, Front, SleevePiece } from "@/src/basicBlousePattern";
import { View } from "react-native";
import { PatternPiece } from "./patterns/PatternPiece";

interface Props {
  measurements: Measurements;
}

export const PatternView: React.FC<Props> = ({ measurements }) => {
  // useMemo prevents recalculating the pattern on every render
  const frontPiece = useMemo(() => new Front(measurements), [measurements]);

  const backPiece = useMemo(() => new Back(measurements), [measurements]);

  const sleevePiece = useMemo(
    () => new SleevePiece(measurements),
    [measurements]
  );

  console.log("mesurements", measurements);
  return (
    <View className="h-full">
      <Svg viewBox="-30 0 80 40" width="100%" height="100%">
        {/* Render the Front Piece */}
        <G>
          <PatternPiece data={frontPiece.data} color="lightpink" />
        </G>

        {/* Render the Back Piece, offset to the side */}
        <G x={35}>
          <PatternPiece data={backPiece.data} color="lightblue" />
        </G>

        {/* Render the Back Piece, offset to the side */}
        <G x={10} y={55}>
          <PatternPiece data={sleevePiece.data} color="lightgreen" />
        </G>
      </Svg>
    </View>
  );
};
