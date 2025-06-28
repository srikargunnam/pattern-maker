import { useAtom } from "jotai";
import { Dimensions } from "react-native";
import Svg from "react-native-svg";
import { measurementsAtom } from "../../atoms/measurements";
import { getPatternPieceBounding } from "../../lib/getPatternPieceBounding";
import FrontBodiceManual from "./FrontBodiceManual";
import PatternGrid from "./PatternGrid";

const padding = 40;

type PatternPiece = {
  type: "front" | "back" | "sleeve";
  bounding: { width: number; height: number };
};

type PositionedPattern = PatternPiece & {
  origin: { x: number; y: number };
};

function layoutPatternPieces(
  pieces: PatternPiece[],
  pageWidth: number,
  padding: number
): PositionedPattern[] {
  const layout: PositionedPattern[] = [];

  let x = padding;
  let y = padding;
  let rowHeight = 0;

  for (const piece of pieces) {
    const { width, height } = piece.bounding;

    // wrap to next row if it exceeds canvas width
    if (x + width > pageWidth - padding) {
      x = padding;
      y += rowHeight + padding;
      rowHeight = 0;
    }

    layout.push({
      ...piece,
      origin: { x, y },
    });

    x += width + padding;
    rowHeight = Math.max(rowHeight, height);
  }

  return layout;
}

export default function PatternSheet({ design }: { design: any }) {
  const [measurements] = useAtom(measurementsAtom);
  const { width, height } = Dimensions.get("window");

  // Step 1: Calculate bounding boxes
  const frontBounds = getPatternPieceBounding("front-bodice", measurements);
  const backBounds = getPatternPieceBounding("back-bodice", measurements);
  const sleeveBounds = getPatternPieceBounding("sleeve", measurements);

  const layout = layoutPatternPieces(
    [
      { type: "front", bounding: frontBounds },
      { type: "back", bounding: backBounds },
      { type: "sleeve", bounding: sleeveBounds },
    ],
    width,
    padding
  );

  return (
    <Svg height={height} width={width} style={{ backgroundColor: "#fff" }}>
      <PatternGrid width={width} height={height} />
      {layout.map(({ type, origin }) => {
        if (type === "front") {
          return (
            // <FrontBodice
            //   key="front"
            //   design={design}
            //   originX={origin.x}
            //   originY={origin.y}
            // />
            <FrontBodiceManual
              key="front"
              design={design}
              originX={origin.x}
              originY={origin.y}
            />
          );
        }
        // if (type === "back") {
        //   return (
        //     <BackBodice key="back" originX={origin.x} originY={origin.y} />
        //   );
        // }
        // if (type === "sleeve") {
        //   return <Sleeve key="sleeve" originX={origin.x} originY={origin.y} />;
        // }
        return null;
      })}
    </Svg>
  );
}
