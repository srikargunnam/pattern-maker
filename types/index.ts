export interface Point {
  x: number;
  y: number;
}

export interface Measurements {
  chest: number;
  waist: number;
  fullLength: number;
  shoulder: number;
  blouseLength: number;
  armhole: number;
  sleeveLength: number;
  sleeveRound: number;
  neckFront: number;
  neckBack: number;
  height: number;
  // Add other measurements like sleeveLength if needed by other pieces
}

// Defines the output of a pattern piece's logic
export interface PatternData {
  points: { [key: string]: Point };
  outlinePath: string;
  dartPaths: string[];
}
