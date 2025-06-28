// src/components/BlousePattern.tsx

import { Measurements } from "@/types";
import React, { useMemo } from "react";
import Svg, { G } from "react-native-svg";
// import { BackBodicePiece, SleevePiece } from '../logic/blousePatterns'; // You would import these too
import {
  BackBodicePiece,
  FrontBodicePiece,
  SleevePiece,
} from "@/src/blousePatterns";
import { View } from "react-native";
import { PatternPieceView } from "./PatternPieceView";

interface Props {
  measurements: Measurements;
}

export const BlousePattern: React.FC<Props> = ({ measurements }) => {
  // useMemo prevents recalculating the pattern on every render
  const frontPiece = useMemo(
    () => new FrontBodicePiece(measurements),
    [measurements]
  );

  const backPiece = useMemo(
    () => new BackBodicePiece(measurements),
    [measurements]
  );

  const sleevePiece = useMemo(
    () => new SleevePiece(measurements),
    [measurements]
  );

  console.log("mesurements", measurements);
  return (
    <View className="border border-black h-full">
      <Svg viewBox="-30 0 80 40" width="100%" height="100%">
        {/* Render the Front Piece */}
        <G>
          <PatternPieceView data={frontPiece.data} color="lightpink" />
        </G>

        {/* Render the Back Piece, offset to the side */}
        <G x={35}>
          <PatternPieceView data={backPiece.data} color="lightblue" />
        </G>

        {/* Render the Back Piece, offset to the side */}
        <G x={10} y={55}>
          <PatternPieceView data={sleevePiece.data} color="lightgreen" />
        </G>
      </Svg>
    </View>
  );
};
