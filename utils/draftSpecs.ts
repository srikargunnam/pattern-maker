import { Measurements } from "../types/measurements";

export type DraftPoint = [number, number];
export type DraftPoints = Record<string, DraftPoint>;

const scale = 10; // 1 inch = 10px, or adjust as needed

/**
 * Utility functions to calculate derived measurements.
 */
const derive = {
  armholeDepth: (bust: number) => bust / 4 + 1.5,
  neckWidth: (bust: number) => bust / 10,
  neckDepthFront: (bust: number) => bust / 6,
  neckDepthBack: () => 2,
  shoulderSlope: () => 0.75,
  dartLength: (bust: number) => bust / 8 + 2,
  dartWidth: () => 2,
};

/**
 * Realistic front bodice draft points.
 */
export function getFrontBodicePoints(
  measurements: Measurements,
  originX = 0,
  originY = 0
): DraftPoints {
  const bust = parseFloat(measurements.bust || "0");
  const waist = parseFloat(measurements.waist || "0");
  const shoulder = parseFloat(measurements.shoulder || "0");
  const blouseLength = parseFloat(measurements.blouseLength || "0");
  const bustPointDistance = parseFloat(measurements.bustPoint || "6.5"); // default avg

  const armhole = derive.armholeDepth(bust);
  const neckW = derive.neckWidth(bust);
  const neckD = derive.neckDepthFront(bust);
  const slope = derive.shoulderSlope();
  const dartL = derive.dartLength(bust);
  const dartW = derive.dartWidth();

  const dPointY = originY + armhole * scale;
  const ePointY = originY + blouseLength * scale;
  const bustPointX = originX + bustPointDistance * scale;
  const bustPointY = originY + (blouseLength / 2) * scale;

  const P: DraftPoints = {
    A: [originX, originY], // Shoulder neck point
    B: [originX + shoulder * scale, originY], // Shoulder tip
    C: [originX + shoulder * scale, originY + slope * scale], // Shoulder slope end
    D: [originX, dPointY], // Armhole depth
    E: [originX, ePointY], // Waistline
    F: [originX + (bust / 4 + 0.5) * scale, dPointY], // Chest line width
    G: [originX + (waist / 4 + 0.5) * scale, ePointY], // Waistline width
    N1: [originX + neckW * scale, originY], // Neck width horizontal
    N2: [originX, originY + neckD * scale], // Neck depth vertical
    BustPoint: [bustPointX, bustPointY],
    DartLeft: [bustPointX - (dartW / 2) * scale, bustPointY - dartL * scale],
    DartRight: [bustPointX + (dartW / 2) * scale, bustPointY - dartL * scale],
  };

  return P;
}
