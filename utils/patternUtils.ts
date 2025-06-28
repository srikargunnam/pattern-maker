// utils/patternUtils.ts

import { Measurements } from "../types/measurements";

export const SCALE = 10;

export const DEFAULT_EASE = {
  bust: 3,
  waist: 2,
  shoulder: 0.5,
  armhole: 1.5,
};

export function applyEase(value: number, ease: number) {
  return value + ease;
}

export function getAdjustedMeasurements(measurements: Measurements) {
  const bust = parseFloat(measurements.bust || "0");
  const waist = parseFloat(measurements.waist || "0");
  const shoulder = parseFloat(measurements.shoulder || "0");

  return {
    bust: applyEase(bust, DEFAULT_EASE.bust),
    waist: applyEase(waist, DEFAULT_EASE.waist),
    shoulder: applyEase(shoulder, DEFAULT_EASE.shoulder),
  };
}

export function getArmholeDepth(bust: number) {
  return bust / 4 + DEFAULT_EASE.armhole;
}

export function getDartApex(
  bustAdjusted: number,
  blouseLength: number,
  dartWidth: number
) {
  return [
    (bustAdjusted / 4 - dartWidth / 2) * SCALE,
    (blouseLength / 2) * SCALE,
  ];
}

export function cm(value: number): number {
  return value * SCALE;
}

export function findP1(p0: number[], p2: number[], b_t: number[], t: number) {
  // 1. Validate the 't' parameter
  if (t === 0 || t === 1) {
    throw new Error("The parameter 't' cannot be 0 or 1 for this calculation.");
  }
  // 2. Destructure coordinate arrays for clarity
  const [x0, y0] = p0;
  const [x2, y2] = p2;
  const [bx, by] = b_t;
  // 3. Calculate the denominator of the formula
  const denominator = 2 * (1 - t) * t;
  // 4. Calculate the coordinates of P1
  const x1 = (bx - Math.pow(1 - t, 2) * x0 - Math.pow(t, 2) * x2) / denominator;
  const y1 = (by - Math.pow(1 - t, 2) * y0 - Math.pow(t, 2) * y2) / denominator;
  // 5. Return the result as an array
  return [x1, y1];
}
