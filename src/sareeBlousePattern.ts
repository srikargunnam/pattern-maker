import { L, M, Q } from "@/utils/patternUtils";
import { Measurements, PatternData, Point } from "../types";
import { PatternPiece } from "./patternPiece";

// --- LOGIC FOR THE SAREE BLOUSE BACK PIECE (Based on Page 88) ---

export class Back extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  private calculateData(): PatternData {
    const { chest, fullLength, shoulder } = this.measurements;
    const p: { [key: string]: Point } = {};

    // Point calculations based on the Saree Blouse diagram
    p["0"] = { x: 0, y: 0 };
    p["1"] = { x: 0, y: chest / 8 + 5 };
    p["2"] = { x: 0, y: fullLength - 1.5 };
    p["3"] = { x: -(chest / 8), y: 0 };
    p["4"] = { x: -(chest / 12), y: 0 };
    p["5"] = { x: -(shoulder + 1), y: 0 };
    p["7"] = { x: p["5"].x, y: p["5"].y + 1.5 };
    p["8"] = { x: -(chest / 4), y: p["1"].y };
    p["10"] = { x: p["8"].x + 2, y: p["2"].y }; // Adjusted side seam point
    p["11"] = { x: -(chest / 12 + 1.5), y: p["2"].y };
    p["12"] = { x: p["11"].x, y: p["11"].y - 4 }; // Dart tip

    const neckCurve = Q(
      p["4"],
      p["3"],
      { x: p["4"].x * 0.5, y: p["3"].y + 1 },
      0.5
    );
    const armholeCurve = Q(
      p["7"],
      p["8"],
      { x: (p["7"].x + p["8"].x) / 2, y: (p["7"].y + p["8"].y) / 2 },
      0.5
    );

    const outlinePath =
      M(p["3"]) +
      neckCurve +
      L(p["7"]) +
      armholeCurve +
      L(p["10"]) +
      L(p["2"]) +
      L(p["3"]);

    // The back waist dart
    const dartPaths: string[] = [
      M({ x: p["11"].x - 1, y: p["11"].y }) +
        L(p["12"]) +
        L({ x: p["11"].x + 1, y: p["11"].y }),
    ];

    return { points: p, outlinePath, dartPaths };
  }
}

// --- LOGIC FOR THE SAREE BLOUSE FRONT PIECE (Based on Page 88) ---

export class Front extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  private calculateData(): PatternData {
    const { chest, fullLength, shoulder } = this.measurements;
    const p: { [key: string]: Point } = {};

    // All calculations based on instructions and diagram from Page 88
    p["13"] = { x: 0, y: 0 };
    p["14"] = { x: 0, y: chest / 8 + 5 };
    p["15"] = { x: 0, y: fullLength - 1.5 };
    p["16"] = { x: -(chest / 4 + 4), y: p["14"].y };
    p["18"] = { x: -(chest / 12), y: 0 };
    p["19"] = { x: p["18"].x, y: p["18"].y + 2.5 };
    p["20"] = { x: 0, y: chest / 8 };
    p["21"] = { x: -(shoulder + 1), y: 0 };
    p["23"] = { x: p["21"].x, y: p["21"].y + 1.5 };
    p["24"] = { x: p["21"].x, y: p["14"].y - 2.5 }; // Armhole dart point
    p["25"] = { x: p["16"].x + 2, y: p["15"].y }; // Adjusted side seam
    p["26"] = { x: 0, y: p["15"].y };
    p["27"] = { x: -(chest / 12 + 2), y: p["14"].y };
    p["28"] = { x: p["27"].x, y: p["27"].y + (chest / 8 - 4) }; // Apex point
    p["29"] = { x: -(chest / 12 + 1.5), y: p["15"].y }; // Center of waist dart
    p["30"] = { x: p["16"].x, y: p["16"].y + 2.5 }; // Side seam dart point
    p["31"] = { x: -(chest / 8), y: p["14"].y }; // Center front dart point

    const neckCurve = Q(p["18"], p["20"], p["19"], 0.5);
    const armholeCurve = Q(p["23"], p["16"], p["24"], 0.5);
    const sideSeam = L(p["25"]);

    const outlinePath =
      M(p["20"]) +
      neckCurve +
      L(p["23"]) +
      armholeCurve +
      sideSeam +
      L(p["26"]) +
      L(p["20"]);

    // The four front darts all pointing to the apex (P28)
    const dartPaths: string[] = [
      M({ x: p["29"].x - 2, y: p["29"].y }) +
        L(p["28"]) +
        L({ x: p["29"].x + 2, y: p["29"].y }), // Waist Dart
      M(p["30"]) + L(p["28"]), // Side Seam Dart
      M(p["24"]) + L(p["28"]), // Armhole Dart
      M(p["31"]) + L(p["28"]), // Center Front Dart
    ];

    return { points: p, outlinePath, dartPaths };
  }
}
