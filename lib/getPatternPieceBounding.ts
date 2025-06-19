import { Measurements } from "../types/measurements";

const scale = 10;

export function getPatternPieceBounding(
  part: "front-bodice" | "back-bodice" | "sleeve",
  measurements: Measurements
): { width: number; height: number } {
  const bust = parseFloat(measurements.bust || "0");
  const waist = parseFloat(measurements.waist || "0");
  const shoulder = parseFloat(measurements.shoulder || "0");
  const blouseLength = parseFloat(measurements.blouseLength || "0");
  const sleeveLength = parseFloat(measurements.sleeveLength || "0");

  const armholeDepth = bust / 4 + 1.5;

  if (part === "front-bodice" || part === "back-bodice") {
    const width =
      Math.max(bust / 4 + 0.5, waist / 4 + 0.5, shoulder / 2) * scale + 20;
    const height = (armholeDepth + blouseLength + 1.5) * scale + 20;

    return { width, height };
  }

  if (part === "sleeve") {
    const bicep = bust / 6 + 1.5;
    const sleeveCapHeight = armholeDepth / 2;

    const width = bicep * scale + 20;
    const height = (sleeveLength + sleeveCapHeight) * scale + 20;

    return { width, height };
  }

  return { width: 0, height: 0 };
}
