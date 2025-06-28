// utils/patternUtils.ts

import { Point } from "@/types";
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

export const M = (point: Point) => {
    return `M ${point.x},${point.y}`;
}

export const L = (point: Point) => {
    return `L ${point.x},${point.y}`;
}

export function Q(p0: Point, p2: Point, b: Point, t: number) {
  // 1. Validate the 't' parameter
  if (t === 0 || t === 1) {
    throw new Error("The parameter 't' cannot be 0 or 1 for this calculation.");
  }

  // 3. Calculate the denominator of the formula
  const denominator = 2 * (1 - t) * t;
  // 4. Calculate the coordinates of P1
  const x1 = (b.x - Math.pow(1 - t, 2) * p0.x - Math.pow(t, 2) * p2.x) / denominator;
  const y1 = (b.y - Math.pow(1 - t, 2) * p0.y - Math.pow(t, 2) * p2.y) / denominator;
  // 5. Return the result as an array
  return `Q ${x1},${y1} ${p2.x},${p2.y}`;
}

export function C(p0: Point, p3: Point, a: Point, t_a: number, b: Point, t_b: number) {
  // 1. Validate input parameters
  if (t_a <= 0 || t_a >= 1 || t_b <= 0 || t_b >= 1 || t_a === t_b) {
    throw new Error("Invalid 't' parameters. They must be unique and between 0 and 1.");
  }

  // 2. Calculate the coefficients of the Bernstein polynomials
  const c_a1 = 3 * Math.pow(1 - t_a, 2) * t_a;
  const c_a2 = 3 * (1 - t_a) * Math.pow(t_a, 2);
  const c_b1 = 3 * Math.pow(1 - t_b, 2) * t_b;
  const c_b2 = 3 * (1 - t_b) * Math.pow(t_b, 2);

  // 3. Calculate the main denominator from the coefficient matrix
  const denominator = (c_a1 * c_b2) - (c_b1 * c_a2);
  if (Math.abs(denominator) < 1e-6) {
    throw new Error("Points are collinear or 't' values are too close, cannot determine control points.");
  }
  
  // 4. Calculate the adjusted known points (A' and B') by removing the influence of P0 and P3
  const ax_prime = a.x - Math.pow(1 - t_a, 3) * p0.x - Math.pow(t_a, 3) * p3.x;
  const ay_prime = a.y - Math.pow(1 - t_a, 3) * p0.y - Math.pow(t_a, 3) * p3.y;
  const bx_prime = b.x - Math.pow(1 - t_b, 3) * p0.x - Math.pow(t_b, 3) * p3.x;
  const by_prime = b.y - Math.pow(1 - t_b, 3) * p0.y - Math.pow(t_b, 3) * p3.y;

  // 5. Solve the system of two linear equations for P1 and P2
  const p1_x = (c_b2 * ax_prime - c_a2 * bx_prime) / denominator;
  const p1_y = (c_b2 * ay_prime - c_a2 * by_prime) / denominator;

  const p2_x = (c_a1 * bx_prime - c_b1 * ax_prime) / denominator;
  const p2_y = (c_a1 * by_prime - c_b1 * ay_prime) / denominator;
  
  return `C ${p1_x},${p1_y} ${p2_x},${p2_y} ${p3.x},${p3.y}`
}