import { L, M, Q } from "@/utils/patternUtils";
import { Measurements, PatternData } from "../types";
import {
  Back as SareeBlouseBackPiece,
  Front as SareeBlouseFrontPiece,
} from "./sareeBlousePattern"; // Assuming sareeBlouse.ts is in the same directory

export class Back extends SareeBlouseBackPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  protected calculateData(): PatternData {
    // Start with all the points from the SareeBlouse back piece
    const baseData = super.calculateData();
    const p = baseData.points;
    const { chest } = this.measurements;

    // --- Override neckline points based on Page 90 ---
    p["3"] = { x: -(chest / 12), y: 0 };
    p["4"] = { x: p["3"].x, y: p["3"].y + 1.5 };

    // Re-create the outline path with the new neckline
    const neckCurve = L(p["4"]) + L(p["0"]); // High neck back is straight
    const armholeCurve = Q(
      p["7"],
      p["8"],
      { x: (p["7"].x + p["8"].x) / 2, y: (p["7"].y + p["8"].y) / 2 },
      0.5
    );
    baseData.outlinePath =
      M(p["0"]) +
      neckCurve +
      L(p["7"]) +
      armholeCurve +
      L(p["10"]) +
      L(p["2"]) +
      L(p["0"]);

    return baseData;
  }
}

export class Front extends SareeBlouseFrontPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  protected calculateData(): PatternData {
    const baseData = super.calculateData();
    const p = baseData.points;
    const { chest } = this.measurements;

    // --- Override neckline points based on Page 90 ---
    p["18"] = { x: -(chest / 12 + 1), y: 0 };
    p["19"] = { x: p["18"].x, y: p["18"].y + 2.5 };
    p["20"] = { x: p["19"].x + (chest / 12 + 2.5), y: p["19"].y }; // V-shape point
    p["X"] = { x: p["20"].x, y: 0 }; // Top reference point

    // const neckCurve = L(p["19"]) + L(p["20"]); // V-neck
    const armholeCurve = Q(p["23"], p["16"], p["24"], 0.5);
    const sideSeam = L(p["25"]);

    baseData.outlinePath =
      M(p["20"]) +
      L(p["X"]) +
      L(p["23"]) +
      armholeCurve +
      sideSeam +
      L(p["26"]) +
      L(p["20"]);

    return baseData;
  }
}
