// src/components/BlousePattern.tsx

import { Measurements } from "@/types";
import React from "react";
import Svg, { G } from "react-native-svg";
import * as BasicBlouse from "@/src/basicBlousePattern";
import * as SareeBlouse from "@/src/sareeBlousePattern";
import { View } from "react-native";
import { PatternPiece } from "./PatternPiece";

interface Props {
  measurements: Measurements;
  blouseStyle: string;
}

// Map blouse styles to class references
const blousePatternMap = {
  plain_blouse: {
    front: BasicBlouse.Front,
    back: BasicBlouse.Back,
    sleeve: BasicBlouse.SleevePiece,
  },
  saree_blouse: {
    front: SareeBlouse.Front,
    back: SareeBlouse.Back,
    sleeve: BasicBlouse.SleevePiece, // fallback to basic
  },
};

type BlouseStyle = keyof typeof blousePatternMap;

export const PatternView: React.FC<Props> = ({ measurements, blouseStyle }) => {
  const patternInfo =
    blousePatternMap[blouseStyle as BlouseStyle] ||
    blousePatternMap["plain_blouse"];
  const {
    front: FrontClass,
    back: BackClass,
    sleeve: SleeveClass,
  } = patternInfo;

  const frontPiece = React.useMemo(
    () => new FrontClass(measurements),
    [FrontClass, measurements]
  );
  const backPiece = React.useMemo(
    () => new BackClass(measurements),
    [BackClass, measurements]
  );
  const sleevePiece = React.useMemo(
    () => new SleeveClass(measurements),
    [SleeveClass, measurements]
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

        {/* Render the Sleeve Piece, offset to the side */}
        <G x={10} y={55}>
          <PatternPiece data={sleevePiece.data} color="lightgreen" />
        </G>
      </Svg>
    </View>
  );
};
