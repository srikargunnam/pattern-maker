import { Measurements, PatternData, Point } from "../types";
import { PatternPiece } from "./patternPiece";
import { M, L, Q } from "@/utils/patternUtils";
import { Back as PlainBack, Front as PlainFront } from "./basicBlousePattern"; // Assuming plainBlouse.ts exists

// --- Bodice pieces are modifications of the Plain Blouse ---
export class Back extends PlainBack {
    // The back bodice is modified only at the armscye/shoulder line
    // For simplicity, we can just redefine its path here
    public getOutlinePath(): string {
        const p = this.data.points;
        const neckCurve = Q(p["4"], p["3"], {x: p["4"].x * 0.5, y: p["3"].y + 1}, 0.5);
        // The Raglan modification is the straight line from neck to underarm
        const raglanScye = L(p["9"]);
        return M(p["3"]) + neckCurve + L(p["10"]) + L(p["2"]) + L(p["3"]);
    }
}

export class Front extends PlainFront {
    // The front bodice has a similar modification
    public getOutlinePath(): string {
        const p = this.data.points;
        const neckCurve = Q(p["3"], p["4"], { x: p["3"].x * 0.7, y: p["4"].y * 0.7 }, 0.5);
        const raglanScye = L(p["9"]); // Straight line from neck to underarm
        return M(p["3"]) + neckCurve + L(p["13"]) + L(p["12"]) + L(p["9"]) + L(p["3"]);
    }
}

// --- The unique Raglan Sleeve piece ---
export class Sleeve extends PatternPiece {
  constructor(measurements: Measurements) {
    super(measurements);
    this.data = this.calculateData();
  }

  private calculateData(): PatternData {
    const { chest, sleeveLength, sleeveRound } = this.measurements;
    const p: { [key: string]: Point } = {};

    // Calculations based on the Raglan Sleeve diagram on Page 91
    p['0'] = { x: 0, y: 0 };
    p['2'] = { x: 0, y: sleeveLength + 1.5 };
    p['3'] = { x: (chest / 12) + 1, y: 0 };
    p['5'] = { x: p['3'].x, y: p['3'].y + 1 }; // Dart point
    p['7'] = { x: chest / 4 + 4, y: chest / 8 + 6.5 };
    p['8'] = { x: (chest / 8), y: chest / 8 + 6.5 };
    p['10'] = { x: sleeveRound / 2 + 1.5, y: p['2'].y };
    
    // Create mirrored points for the other half
    p['3m'] = { x: -p['3'].x, y: p['3'].y };
    p['7m'] = { x: -p['7'].x, y: p['7'].y };
    p['10m'] = { x: -p['10'].x, y: p['10'].y };
    
    const backSeam = L(p['7']);
    const frontSeam = L(p['7m']);
    
    const outlinePath = M(p['0']) + L(p['3']) + L(p['5']) + L(p['7']) + L(p['10']) + L(p['10m']) + L(p['7m']) + L(p['3m']) + L(p['0']);

    return { points: p, outlinePath, dartPaths: [] };
  }
}