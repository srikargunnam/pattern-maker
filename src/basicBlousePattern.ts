// src/logic/blousePatterns.ts

import { C, L, M, Q } from "@/utils/patternUtils";
import { Measurements, PatternData, Point } from "../types";
import { PatternPiece } from "./patternPiece";

// --- LOGIC FOR THE FRONT BODICE ---
export class Front extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  protected calculateData(): PatternData {
    const { chest, fullLength, shoulder } = this.measurements;

    // All your calculations go here, cleanly separated from any UI code
    const armholeDepth = chest / 8 + 6.5;
    const neckWidth = chest / 12 + 1;
    const neckDepth = chest / 10 + 1;
    const shoulderPlusEase = shoulder + 1;
    const chestWidth = chest / 4;
    const chestWidthPlusEase = chestWidth + 4;

    // Define points dynamically
    const p: { [key: number]: Point } = {
      0: { x: 0, y: 0 },
      1: { x: 0, y: armholeDepth },
      2: { x: 0, y: fullLength },
      3: { x: -neckWidth, y: 0 },
      4: { x: 0, y: neckDepth },
      5: { x: -shoulderPlusEase, y: 0 },
      6: { x: -shoulderPlusEase, y: armholeDepth },
      7: { x: -shoulderPlusEase, y: 2 },
      8: { x: -shoulderPlusEase, y: armholeDepth - 2.5 },
      9: { x: -chestWidthPlusEase, y: armholeDepth }, // extended armhole
      10: { x: -chestWidthPlusEase, y: fullLength },
      11: { x: -chestWidthPlusEase + 2, y: fullLength },
      12: { x: -chestWidthPlusEase + 2.5, y: fullLength + 1.5 },
      13: { x: 0, y: fullLength + 2 },
    };

    const neckCurve = Q(p[3], p[4], { x: p[3].x * 0.7, y: p[4].y * 0.7 }, 0.5);
    const armholeCurve = Q(p[9], p[7], p[8], 0.4);
    const sideSeamCurve = Q(p[12], p[9], p[11], 0.1);

    const outlinePath =
      M(p[3]) +
      neckCurve +
      L(p[13]) +
      L(p[12]) +
      sideSeamCurve +
      armholeCurve +
      L(p[3]);

    // In a real scenario, you would calculate dart paths here as well
    const dartPaths: string[] = [];

    return {
      points: p,
      outlinePath,
      dartPaths,
    };
  }
}

// --- LOGIC FOR THE BACK BODICE ---
export class Back extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  private calculateData(): PatternData {
    const { chest, fullLength, shoulder } = this.measurements;

    // All your calculations go here, cleanly separated from any UI code
    const armholeDepth = chest / 8 + 6.5;
    const neckWidth = chest / 12 + 1;
    const neckDepth = 6.5;
    const shoulderPlusEase = shoulder + 1;
    const chestWidth = chest / 4;
    const chestWidthPlusEase = chestWidth + 4;

    // Define points dynamically
    const p: { [key: number]: Point } = {
      0: { x: 0, y: 0 },
      1: { x: 0, y: armholeDepth },
      2: { x: 0, y: fullLength },
      3: { x: -neckWidth, y: 0 },
      5: { x: -shoulderPlusEase, y: 0 },
      6: { x: -shoulderPlusEase, y: armholeDepth },
      7: { x: -shoulderPlusEase, y: 2 },
      9: { x: -chestWidthPlusEase, y: armholeDepth }, // extended armhole
      10: { x: -chestWidthPlusEase, y: fullLength },
      11: { x: -chestWidthPlusEase + 2, y: fullLength },
      12: { x: -chestWidthPlusEase + 2.5, y: fullLength + 1.5 },
      13: { x: 0, y: fullLength + 2 },
      17: { x: 0, y: neckDepth },
      18: { x: -shoulderPlusEase - 0.5, y: armholeDepth - 6.5 },
    };

    const neckCurve = Q(
      p[3],
      p[17],
      { x: p[3].x * 0.7, y: p[17].y * 0.7 },
      0.5
    );
    const armholeCurve = Q(p[9], p[7], p[18], 0.65);
    const sideSeamCurve = Q(p[12], p[9], p[11], 0.1);

    const outlinePath =
      M(p[3]) +
      neckCurve +
      L(p[13]) +
      L(p[12]) +
      sideSeamCurve +
      armholeCurve +
      L(p[3]);

    // In a real scenario, you would calculate dart paths here as well
    const dartPaths: string[] = [];

    return {
      points: p,
      outlinePath,
      dartPaths,
    };
  }
}

// --- LOGIC FOR THE SLEEVE (Based on Page 46) ---
export class SleevePiece extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  private calculateData(): PatternData {
    const { chest, sleeveLength, sleeveRound } = this.measurements;
    const p: { [key: string]: Point } = {};

    // --- Point calculations based directly on the draft from Page 46 ---
    // The draft is for one half (the back), which we will mirror for the front.
    // The Y-axis (x=0) represents the center fold line 0-2.

    const armholeDepthLine = chest / 8 + 6.5;

    // Key construction points for the BACK HALF
    p["0"] = { x: 0, y: 0 }; // Top center of sleeve cap
    p["1"] = { x: armholeDepthLine, y: 0 }; // Bicep line
    p["2"] = { x: 0, y: sleeveLength + 1 }; // Bottom center of hem
    p["3"] = { x: armholeDepthLine, y: sleeveLength + 1 };
    p["4"] = { x: armholeDepthLine, y: chest / 8 }; // Bicep width point
    p["5"] = { x: 2.5, y: 0.3 }; // Back curve guide point
    const line4_5_midpoint = {
      x: (p["4"].x + p["5"].x) / 2,
      y: (p["4"].y + p["5"].y) / 2,
    };
    p["6"] = line4_5_midpoint;
    p["7"] = { x: p["6"].x, y: p["6"].y - 2 }; // Back curve shaper
    p["8"] = { x: p["4"].x - 5, y: p["4"].y }; // Back shoulder notch (8-4 = 5cm)
    p["10"] = { x: sleeveRound / 2 + 1.5, y: p["2"].y }; // Back hem corner

    // --- Mirrored points for the FRONT HALF ---
    p["8m"] = { x: -p["8"].x, y: p["8"].y }; // Front shoulder notch
    p["4m"] = { x: -p["4"].x, y: p["4"].y }; // Front bicep width point
    p["5m"] = { x: -p["5"].x, y: p["5"].y }; // Front curve guide point
    p["7m"] = { x: -p["6"].x, y: p["6"].y - 2 }; // Back curve shaper
    // Point 9 is on the line between 8 and 5. We'll use a mirrored version for the front curve.
    const line8m_5m_midpoint = {
      x: (p["8m"].x + p["5m"].x) / 2,
      y: (p["8m"].y + p["5m"].y) / 2,
    };
    p["9m"] = line8m_5m_midpoint;
    p["10m"] = { x: -p["10"].x, y: p["10"].y }; // Front hem corner

    // --- Construct the final outline path ---
    const outlinePath =
      M(p[10]) +
      L(p[4]) +
      C(p[4], p[0], p[8], 0.2, p[5], 0.9) +
      L(p["5m"]) +
      Q(p["5m"], p["4m"], p["7m"], 0.5) +
      L(p["10m"]) +
      L(p[10]);

    // Add all calculated points to the final points map for rendering
    const allPoints = { ...p };

    return {
      points: allPoints,
      outlinePath: true ? outlinePath : "",
      dartPaths: [],
    };
  }
}
