import { Measurements, PatternData } from "@/types";
import { C, L, M, Point, Q } from "@/utils/patternUtils";
import { PatternPiece } from "./patternPiece";


// --- LOGIC FOR THE FRONT BODICE ---
export class Front extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  protected calculateData(): PatternData {
    const { chest, fullLength, shoulder } = this.measurements;

    const armholeDepth = chest / 8 + 6.5;
    const neckWidth = chest / 12 + 1;
    const neckDepth = chest / 10 + 1;
    const shoulderPlusEase = shoulder + 1;
    const chestWidth = chest / 4;
    const chestWidthPlusEase = chestWidth + 4;

    const p: { [key: number]: Point } = {
      0: new Point(0, 0),
      1: new Point(0, armholeDepth),
      2: new Point(0, fullLength),
      3: new Point(-neckWidth, 0),
      4: new Point(0, neckDepth),
      5: new Point(-shoulderPlusEase, 0),
      6: new Point(-shoulderPlusEase, armholeDepth),
      7: new Point(-shoulderPlusEase, 2),
      8: new Point(-shoulderPlusEase, armholeDepth - 2.5),
      9: new Point(-chestWidthPlusEase, armholeDepth),
      10: new Point(-chestWidthPlusEase, fullLength),
      11: new Point(-chestWidthPlusEase + 2, fullLength),
      12: new Point(-chestWidthPlusEase + 2.5, fullLength + 1.5),
      13: new Point(0, fullLength + 2),
      14: new Point(-(chest / 12 + 1), fullLength + 2), // Waist dart location
      15: new Point(-chestWidthPlusEase, armholeDepth + 5), // Side dart location
      16: new Point(0, armholeDepth + 5), // Armhole dart location
    };

    // --- Path Generation ---
    const waistCurve = Q(p[13], p[12], p[14], 0.2);
    const neckCurve = Q(p[3], p[4], new Point(p[3].x * 0.7, p[4].y * 0.7), 0.5);
    const armholeCurve = Q(p[9], p[7], p[8], 0.4);
    const sideSeamCurve = Q(p[12], p[9], p[11], 0.1);

    const outlinePath = M(p[3]) + neckCurve + L(p[13]) + waistCurve + sideSeamCurve + armholeCurve + L(p[3]);

    // --- DART PATH GENERATION (Based on Page 86) ---
    const dartPaths: string[] = [];
    
    // Define an approximate apex point for darts to aim for
    const apexPoint = new Point(p[14].x, p[16].y);

    // 1. Main Waist Dart at P14 (3cm intake)
    const waistDartTip = new Point(apexPoint.x, apexPoint.y + 2);
    dartPaths.push(
      M(new Point(p[14].x - 1.5, p[14].y)) + 
      L(waistDartTip) + 
      L(new Point(p[14].x + 1.5, p[14].y)) + 
      M(new Point(waistDartTip.x, p[14].y)) +
      L(waistDartTip)

    );

    // 2. Side Dart at P15 (1.5cm intake)
    const sideDartTip = new Point(apexPoint.x - 2, apexPoint.y);
    dartPaths.push(
      M(new Point(p[15].x, p[15].y - 0.75)) +
      L(sideDartTip) + 
      L(new Point(p[15].x, p[15].y + 0.75)) +
      M(new Point(p[15].x, sideDartTip.y)) +
      L(sideDartTip)
    );
    
    // 3. Armhole Dart at P16 (1cm intake)
    const armholeDartTip = new Point(apexPoint.x + 2, apexPoint.y);
    dartPaths.push(
      M(new Point(p[16].x, p[16].y - 0.5)) +
      L(armholeDartTip) +
      L(new Point(p[16].x, p[16].y + 0.5)) +
      M(new Point(p[16].x, armholeDartTip.y)) +
      L(armholeDartTip)
    );
    // 4. Shoulder Dart at P8 (1cm intake)
    // Calculate shoulderDartTip on the line between p[8] and apexPoint using Pythagorean theorem
    const dx = apexPoint.x - p[8].x;
    const dy = apexPoint.y - p[8].y;
    
    const shoulderDartTip = new Point(
      p[8].x + 0.7 * dx,
      p[8].y + 0.7 * dy
    );
    dartPaths.push(
      M(new Point(p[8].x - 0.5, p[8].y)) +
      L(shoulderDartTip) +
      L(new Point(p[8].x + 0.5, p[8].y)) +
      M(new Point(p[8].x, shoulderDartTip.y)) 
    );

    const pointsToRemove = [10, 5, 0, 6, 11, 2, 1];
    for (const pointKey of pointsToRemove) {
      delete p[pointKey];
    }


    return { points: p, outlinePath, dartPaths };
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
    const armholeDepth = chest / 8 + 6.5;
    const neckWidth = chest / 12 + 1;
    const neckDepth = 6.5;
    const shoulderPlusEase = shoulder + 1;
    const chestWidth = chest / 4;
    const chestWidthPlusEase = chestWidth + 4;

    const p: { [key: number]: Point } = {
      0: new Point(0, 0),
      1: new Point(0, armholeDepth),
      2: new Point(0, fullLength),
      3: new Point(-neckWidth, 0),
      4: new Point(0, neckDepth),
      5: new Point(-shoulderPlusEase, 0),
      6: new Point(-shoulderPlusEase, armholeDepth),
      7: new Point(-shoulderPlusEase, 2),
      8: new Point(-shoulderPlusEase, armholeDepth - 2.5),
      9: new Point(-chestWidthPlusEase, armholeDepth),
      10: new Point(-chestWidthPlusEase, fullLength),
      11: new Point(-chestWidthPlusEase + 2, fullLength),
      12: new Point(-chestWidthPlusEase + 2.5, fullLength + 1.5),
      13: new Point(0, fullLength + 2),
      14: new Point(-(chest / 12 + 1), fullLength + 2), // Waist dart location
      15: new Point(-chestWidthPlusEase, armholeDepth + 5), // Side dart location
      16: new Point(0, armholeDepth + 5), // Armhole dart location
      17: new Point(0, neckDepth),
      18: new Point(-shoulderPlusEase - 0.5, armholeDepth - 6.5),
    };


    const neckCurve = Q(p[3], p[17], new Point(p[3].x * 0.7, p[17].y * 0.7), 0.5);
    const armholeCurve = Q(p[9], p[7], p[18], 0.65);
    const sideSeamCurve = Q(p[11], p[9], p[15], 0.7);


    const outlinePath = M(p[3]) + neckCurve + L(p[2]) + L(p[11]) +  sideSeamCurve + armholeCurve + L(p[3]);

    // --- DART PATH GENERATION (Based on Page 86) ---
    const dartPaths: string[] = [];

    const pointsToRemove = [12, 13, 14, 10, 5, 0, 1, 4, 8, 6];
    for (const pointKey of pointsToRemove) {
      delete p[pointKey];
    }


    return { points: p, outlinePath, dartPaths };
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
    p[0] = new Point(0, 0); // Top center of sleeve cap
    p[1] = new Point(armholeDepthLine, 0); // Bicep line
    p[2] = new Point(0, sleeveLength + 1); // Bottom center of hem
    p[3] = new Point(armholeDepthLine, sleeveLength + 1);
    p[4] = new Point(armholeDepthLine, chest / 8); // Bicep width point
    p[5] = new Point(2.5, 0.3); // Back curve guide point
    const line4_5_midpoint = new Point((p[4].x + p[5].x) / 2, (p[4].y + p[5].y) / 2);
    p[6] = line4_5_midpoint;
    p[7] = new Point(p[6].x, p[6].y - 2); // Back curve shaper
    p[8] = new Point(p[4].x - 5, p[4].y); // Back shoulder notch (8-4 = 5cm)
    p[10] = new Point(sleeveRound / 2 + 1.5, p[2].y); // Back hem corner

    // --- Mirrored points for the FRONT HALF ---
    p[-8] = new Point(-p[8].x, p[8].y); // Front shoulder notch
    p[-4] = new Point(-p[4].x, p[4].y); // Front bicep width point
    p[-5] = new Point(-p[5].x, p[5].y); // Front curve guide point
    p[-7] = new Point(-p[6].x, p[6].y - 2); // Back curve shaper
    // Point 9 is on the line between 8 and 5. We'll use a mirrored version for the front curve.
    const line8m_5m_midpoint = new Point((p[-8].x + p[-5].x) / 2, (p[-8].y + p[-5].y) / 2);
    p[-9] = line8m_5m_midpoint;
    p[-10] = new Point(-p[10].x, p[10].y); // Front hem corner

    // --- Construct the final outline path ---
    const outlinePath =
      M(p[10]) +
      L(p[4]) +
      C(p[4], p[0], p[8], 0.2, p[5], 0.9) +
      L(p[-5]) +
      Q(p[-5], p[-4], p[-7], 0.5) +
      L(p[-10]) +
      L(p[10]);


    const pointsToRemove = [1, 3, 6, 7, -8, -9];
    for (const pointKey of pointsToRemove) {
      delete p[pointKey];
    }

    return {
      points: p,
      outlinePath: true ? outlinePath : "",
      dartPaths: [],
    };
  }
}
