import { Measurements, PatternData } from "../types";

// A base class for any pattern piece
export abstract class PatternPiece {
  readonly measurements: Measurements;
  public data: PatternData;

  constructor(measurements: Measurements) {
    this.measurements = measurements;
    // The data property will be filled by the subclass
    this.data = {
      points: {},
      outlinePath: "",
      dartPaths: [],
    };
  }
}
